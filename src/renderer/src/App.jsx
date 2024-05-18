import React, { useState } from 'react'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import Versions from './components/Versions'
import electronLogo from './assets/logo.png'

function App() {
  const [shouldShowLoader, setShouldShowLoader] = useState(true)
  const [isApiLoaded, setIsApiLoaded] = useState(false)

  const apiLoadEvent = () => {
    console.log('API LOADED')
    setIsApiLoaded(true)
    setTimeout(() => {
      setShouldShowLoader(false)
    }, 5000)
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
        >
          <Marker position={{ lat: 53.54992, lng: 10.00678 }} />
        </Map>
      </APIProvider>
      {shouldShowLoader && (
        <div
          className="loader"
          style={{
            opacity: isApiLoaded ? 0 : 1,
            transition: 'opacity 1.5s',
            transitionDelay: '3.5s'
          }}
        >
          <img src={electronLogo} alt="Drakkar" style={{ maxWidth: '100vw', maxHeight: '100vh' }} />
          <Versions />
        </div>
      )}
    </>
  )
}

export default App
