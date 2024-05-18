import React, { useState, useRef, useEffect } from 'react'
import { APIProvider, Map, Marker, AdvancedMarker } from '@vis.gl/react-google-maps'
import jsonFlightData from './assets/dataMock.json'
import UserMarker from './components/UserMarker'
import ThermalMarker from './components/ThermalMarker'
import Loader from './components/Loader'

const userDataMock = {
  lat: 50.2990944,
  lng: 21.4808552,
  direction: 90
}

function App() {
  const [shouldShowLoader, setShouldShowLoader] = useState(true)
  const [isApiLoaded, setIsApiLoaded] = useState(false)
  const [flightData, setFlightData] = useState(jsonFlightData)
  const [refresh, setRefresh] = useState(0)
  const [center, setCenter] = useState({ lat: userDataMock.lat, lng: userDataMock.lng })
  const [dynamicMockData, setDynamicMockData] = useState({
    lat: userDataMock.lat,
    lng: userDataMock.lng
  })

  const apiLoadEvent = () => {
    console.log('API LOADED')
    setIsApiLoaded(true)
    setTimeout(() => {
      setShouldShowLoader(false)
    }, 5000)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRefresh((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const loadFlightData = async () => {
      const { default: newFlightData } = await import('./assets/dataMock.json')
      setFlightData(newFlightData)
      setCenter({ lat: dynamicMockData.lat, lng: dynamicMockData.lng })
    }

    loadFlightData()
  }, [refresh])

  useEffect(() => {
    window.api
      .dbQuery('SELECT * FROM user')
      .then((results) => {
        console.log(results)
      })
      .catch((error) => {
        console.error('Database query failed', error)
      })
  }, [])

  // Dynamic mock data
  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicMockData((prevData) => {
        const newLng = prevData.lng + 0.05
        // setCenter({ lat: newLat, lng: prevData.lng });
        return { ...prevData, lng: newLng }
      })
    }, 1000)

    return () => clearInterval(interval) // Cleanup interval on component unmount
  }, [])

  return (
    <>
      <APIProvider apiKey={'AIzaSyC6683MhH9u4L1iAdQX6JM-axhi6yB6X3k'} onLoad={apiLoadEvent}>
        <Map
          style={{ width: '100vw', height: '100vh' }}
          defaultCenter={{ lat: userDataMock.lat, lng: userDataMock.lng }}
          defaultZoom={5}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          mapTypeId="terrain"
          mapId={'c3a8b31d60f8d993'}
          center={center}
        >
          <UserMarker
            lat={dynamicMockData.lat}
            lng={dynamicMockData.lng}
            direction={userDataMock.direction}
          />
          {flightData.map((item) => {
            return <ThermalMarker key={item.id} lat={item.lat} lng={item.lng} date={item.date} />
          })}
        </Map>
      </APIProvider>
      {shouldShowLoader && <Loader isApiLoaded={isApiLoaded} />}
    </>
  )
}

export default App
