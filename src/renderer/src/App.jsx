import React, { useState, useEffect } from 'react'
import { APIProvider, Map } from '@vis.gl/react-google-maps'
import userDataJson from './assets/data.json'
import UserMarker from './components/UserMarker'
import ThermalMarker from './components/ThermalMarker'
import Loader from './components/Loader'

const jsonFlightData = []

function App() {
  const [userData, setUserData] = useState(userDataJson)
  const [shouldShowLoader, setShouldShowLoader] = useState(true)
  const [isApiLoaded, setIsApiLoaded] = useState(false)
  const [flightData, setFlightData] = useState(jsonFlightData)
  const [refresh, setRefresh] = useState(0)
  const [center, setCenter] = useState({ lat: userData.latitude, lng: userData.longitude })
  const [zoom, setZoom] = useState(14)

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
    const loadLocationData = async () => {
      const { default: newFlightData } = await import('./assets/data.json')
      setUserData(newFlightData)
      setCenter({ lat: newFlightData.latitude, lng: newFlightData.longitude })
    }

    loadLocationData()
  }, [refresh])

  const LoadFlightData = async () => {
    // Get select * from LocationData and setFlightData() with the result
    const selectAllQuery = 'SELECT * FROM LocationData'
    const selectAllResult = await window.api.dbQuery(selectAllQuery)
    setFlightData(selectAllResult)
  }

  const insertStaticData = async () => {
    try {
      // Define the insert query with a static value

      // Select the latitude and longitude from the LocationData table and return null if they are the same as userData.latitude and userData.longitude
      const tolerance = 0.003
      const minLatitude = userData.latitude - tolerance
      const maxLatitude = userData.latitude + tolerance
      const minLongitude = userData.longitude - tolerance
      const maxLongitude = userData.longitude + tolerance

      const selectQuery = `
        SELECT latitude, longitude
        FROM LocationData
        WHERE latitude BETWEEN ${minLatitude} AND ${maxLatitude}
        AND longitude BETWEEN ${minLongitude} AND ${maxLongitude}
      `
      const selectResult = await window.api.dbQuery(selectQuery)

      if (selectResult.length > 0) return null

      const insertQuery = `
        INSERT INTO LocationData (height, latitude, longitude, course, date, lat_dir, lon_dir) 
        VALUES (${userData.height}, ${userData.latitude}, ${userData.longitude}, ${userData.course}, "${userData.date}", "${userData.lat_dir}", "${userData.lon_dir}")
      `

      // Execute the query using window.api.dbQuery without any parameters
      const result = await window.api.dbQuery(insertQuery)

      LoadFlightData()

      console.log('Data inserted successfully:', result)
    } catch (error) {
      console.error('Error occurred while inserting data:', error)
    }
  }

  useEffect(() => {
    LoadFlightData()
  }, [])

  useEffect(() => {
    if (userData.thermal_state === 1) {
      insertStaticData()
    }
  }, [userData, userData.longitude, userData.lat])

  return (
    <>
      <APIProvider apiKey={process.env.VITE_GOOGLE_MAPS_API_KEY} onLoad={apiLoadEvent}>
        <Map
          style={{ width: '100vw', height: '100vw' }}
          defaultCenter={{ lat: userData.latitude, lng: userData.longitude }}
          defaultZoom={zoom}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          mapTypeId="terrain"
          mapId={'c3a8b31d60f8d993'}
          center={center}
          zoom={zoom}
          featureType="road"
        >
          <UserMarker lat={userData.latitude} lng={userData.longitude} course={userData.course} />
          {flightData?.map((item) => {
            return (
              <ThermalMarker
                key={item.latitude}
                lat={item.latitude}
                lng={item.longitude}
                date={item.date}
                time={item.time}
                height={item.height}
              />
            )
          })}
        </Map>
      </APIProvider>
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
      {shouldShowLoader && <Loader isApiLoaded={isApiLoaded} />}
    </>
  )
}

export default App
