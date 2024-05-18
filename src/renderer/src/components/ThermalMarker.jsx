import React, { useState, useCallback } from 'react'
import { Marker, InfoWindow, useAdvancedMarkerRef, AdvancedMarker } from '@vis.gl/react-google-maps'

const ThermalMarker = ({ lat, lng }) => {
  const [markerRef, marker] = useAdvancedMarkerRef()
  const [infoWindowShown, setInfoWindowShown] = useState(false)

  const handleMarkerClick = useCallback(() => {
    console.log('Click')
    setInfoWindowShown((isShown) => !isShown)
  }, [])

  const handleClose = useCallback(() => setInfoWindowShown(false), [])

  return (
    <div>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: lat, lng: lng }}
        onClick={handleMarkerClick}
      />
      {infoWindowShown && (
        <InfoWindow anchor={marker} onClose={handleClose}>
          <div className="modal-content">
            <h2>Flight data in here</h2>
            <p>Some arbitrary html to be rendered into the InfoWindow.</p>
          </div>
        </InfoWindow>
      )}
    </div>
  )
}

export default ThermalMarker
