import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Pin, InfoWindow, useAdvancedMarkerRef, AdvancedMarker } from '@vis.gl/react-google-maps'

/* PROPS */
// lat: number
// lng: number

const ThermalMarker = ({ lat, lng, date }) => {
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

  // Const fresh is a number between 0 and 2 that determines the color of the marker and is based on the date of the thermal data
  // if the date is less than 0,5 hours old, if between 0,5 and 1,5 hours old or if older than 1,5 hours
  const dateNow = new Date()
  const dateThermal = new Date(date)
  const diff = dateNow - dateThermal
  let fresh = 0
  if (diff < 1800000) {
    fresh = 0
  } else if (diff < 5400000) {
    fresh = 1
  } else {
    fresh = 2
  }

  const markerColors = {
    0: '#ff0000',
    1: '#ffa500aa',
    2: '#00800055'
  }
  const markerColor = markerColors[fresh]

  return (
    <div ref={containerRef}>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: lat, lng: lng }}
        onClick={handleMarkerClick}
        style={{ opacity: 0 }}
      >
        <Pin background={markerColor} borderColor={markerColor} style={{ opacity: 0.5 }} />
      </AdvancedMarker>
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
