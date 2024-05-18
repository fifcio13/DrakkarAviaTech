import React, { useState, useRef, useEffect } from 'react'
import { APIProvider, Map, Marker, AdvancedMarker } from '@vis.gl/react-google-maps'
import jsonFlightData from './assets/data.json'
import UserMarker from './components/UserMarker'
import ThermalMarker from './components/ThermalMarker'
import Loader from './components/Loader'

function App() {
  const [shouldShowLoader, setShouldShowLoader] = useState(true)
  const [isApiLoaded, setIsApiLoaded] = useState(false)
  const [flightData, setFlightData] = useState(jsonFlightData)
  const [refresh, setRefresh] = useState(0)

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
    }, 10000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const loadFlightData = async () => {
      const { default: newFlightData } = await import('./assets/data.json')
      setFlightData(newFlightData)
    }

    loadFlightData()
  }, [refresh])

  const userDataMock = {
    lat: 53.7128,
    lng: 14.006,
    direction: 0
  }

  return (
    <>
      <APIProvider apiKey={'AIzaSyC6683MhH9u4L1iAdQX6JM-axhi6yB6X3k'} onLoad={apiLoadEvent}>
        <Map
          style={{ width: '100vw', height: '100vh' }}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={5}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          mapTypeId="terrain"
          mapId={'c3a8b31d60f8d993'}
        >
          <UserMarker
            lat={userDataMock.lat}
            lng={userDataMock.lng}
            direction={userDataMock.direction}
          />
          {flightData.map((item) => {
            return <ThermalMarker key={item.id} lat={item.lat} lng={item.lng} />
          })}
          <Marker position={{ lat: 53.54992, lng: 10.00678 }} />
        </Map>
      </APIProvider>
      {shouldShowLoader && <Loader isApiLoaded={isApiLoaded} />}
    </>
  )
}

export default App
