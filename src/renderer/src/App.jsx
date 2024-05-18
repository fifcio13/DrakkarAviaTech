import React, { useState, useRef, useEffect } from 'react'
import { APIProvider, Map, MapControl, ControlPosition } from '@vis.gl/react-google-maps'
import jsonFlightData from './assets/dataMock.json'
import UserMarker from './components/UserMarker'
import ThermalMarker from './components/ThermalMarker'
import Loader from './components/Loader'

const userDataMock = {
  lat: 50.2990944,
  lng: 21.4808552,
  direction: 0
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
  const [zoom, setZoom] = useState(14)

  const mapRef = useRef(null)

  const apiLoadEvent = () => {
    setIsApiLoaded(true)
    setTimeout(() => {
      setShouldShowLoader(false)
    }, 5000)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRefresh((prev) => prev + 1)
    }, 500)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (isApiLoaded && mapRef.current) {
      const map = mapRef.current
      map.setHeading(180) // Rotate the map to face south (180 degrees)
      map.setTilt(45) // Set the tilt of the map (optional, for 3D effect)
    }
  }, [isApiLoaded])

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
        const newLat = prevData.lat + 0.0001
        return { ...prevData, lat: newLat }
      })
    }, 200)

    return () => clearInterval(interval) // Cleanup interval on component unmount
  }, [])

  return (
    <>
      <APIProvider apiKey={'AIzaSyC6683MhH9u4L1iAdQX6JM-axhi6yB6X3k'} onLoad={apiLoadEvent}>
        <Map
          style={{ width: '100vw', height: '100vw', rotate: '0deg' }}
          // Rotate whole map depending on userDirection (technical issue)
          defaultCenter={{ lat: userDataMock.lat, lng: userDataMock.lng }}
          defaultZoom={zoom}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          mapTypeId="terrain"
          mapId={'c3a8b31d60f8d993'}
          center={center}
          zoom={zoom}
        >
          <UserMarker
            lat={dynamicMockData.lat}
            lng={dynamicMockData.lng}
            direction={userDataMock.direction}
          />
          {flightData.map((item) => {
            return <ThermalMarker key={item.id} lat={item.lat} lng={item.lng} date={item.date} />
          })}
          {/* <MapControl position={ControlPosition.BOTTOM_RIGHT}> */}
          <div className="map-navigation">
            {/* Buttons to zoom out and zoom in */}
            <button
              onClick={() =>
                setZoom((prevZoom) => {
                  if (prevZoom < 20) {
                    return prevZoom + 1
                  }
                  return prevZoom
                })
              }
            >
              +
            </button>
            <button
              onClick={() =>
                setZoom((prevZoom) => {
                  if (prevZoom > 0) {
                    return prevZoom - 1
                  }
                  return prevZoom
                })
              }
            >
              -
            </button>
          </div>
          {/* </MapControl> */}
        </Map>
      </APIProvider>
      {shouldShowLoader && <Loader isApiLoaded={isApiLoaded} />}
    </>
  )
}

export default App
