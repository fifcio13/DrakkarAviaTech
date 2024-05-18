import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Marker, InfoWindow, useAdvancedMarkerRef, AdvancedMarker } from '@vis.gl/react-google-maps'

const ThermalMarker = ({ lat, lng }) => {
  const [markerRef, marker] = useAdvancedMarkerRef()
  const [infoWindowShown, setInfoWindowShown] = useState(false)
  const containerRef = useRef(null)

  const handleMarkerClick = useCallback(() => {
    setInfoWindowShown((isShown) => !isShown)
  }, [])

  const handleClose = useCallback(() => setInfoWindowShown(false), [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setInfoWindowShown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [containerRef])

  return (
    <div ref={containerRef}>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: lat, lng: lng }}
        onClick={handleMarkerClick}
      />
      {infoWindowShown && (
        <InfoWindow anchor={marker} onClose={handleClose}>
          <div className="modal-content">
            <p>Some arbitrary html to be rendered into the InfoWindow.</p>
          </div>
        </InfoWindow>
      )}
    </div>
  )
}

export default ThermalMarker
