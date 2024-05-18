import React, { useState } from 'react'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import Versions from './components/Versions'
import electronLogo from './assets/logo.png'

function App() {
  const [shouldShowLoader, setShouldShowLoader] = useState(true)
  const applyGlobalStyle = () => {
    setTimeout(() => {
      const style = document.createElement('style')
      style.innerHTML = `
        .loader {
          display: none;
        }
        #root {
          display: block !important;
        }
      `
      document.head.appendChild(style)
    }, 4500)
  }

  return (
    <>
      {shouldShowLoader && (
        <div className="loader fadeOut">
          <img src={electronLogo} alt="Drakkar" style={{ maxWidth: '100vw', maxHeight: '100vh' }} />
          <Versions />
        </div>
      )}
      <APIProvider apiKey={'AIzaSyC6683MhH9u4L1iAdQX6JM-axhi6yB6X3k'} onLoad={applyGlobalStyle}>
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
    </>
  )
}

export default App
