import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Pin, InfoWindow, useAdvancedMarkerRef, AdvancedMarker } from '@vis.gl/react-google-maps'

/* PROPS */
// lat: number
// lng: number

const ThermalMarker = ({ lat, lng, date, time, height, thermal_state }) => {
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
  // if the date is less than 0,5 hours old, if between 0,5 and 1,5 hours old or if older than 1,5 hours but maximum 5 hours
  const dateNow = new Date()
  const dateThermal = new Date(date)
  const diff = dateNow - dateThermal
  let fresh = null
  if (diff < 1800000) {
    fresh = 0
  } else if (diff < 5400000) {
    fresh = 1
  } else if (diff < 18000000) {
    fresh = 2
  }

  const markerColors = {
    0: '#ff0000',
    1: '#ffa500aa',
    2: '#00800055'
  }
  const markerColor = markerColors[fresh]

  // if (!fresh) {
  //   return null
  // }

  const [datePart, timePart] = date.split('T')

  return (
    <div ref={containerRef} onClick={handleMarkerClick}>
      <AdvancedMarker ref={markerRef} position={{ lat: lat, lng: lng }} onClick={handleMarkerClick}>
        <Pin
          background={markerColor}
          borderColor={markerColor}
          style={{ opacity: 0.5, rotate: `90deg` }}
        />
      </AdvancedMarker>
      {infoWindowShown && (
        <InfoWindow anchor={marker} onClose={handleClose}>
          <div className="modal-content">
            <p>
              Height: <b>{height}m</b>
            </p>
            <p>
              Avg. Vertical speed: <b>2m/s</b>
            </p>
            <p>
              {datePart} <b>{timePart}</b>
            </p>
          </div>
        </InfoWindow>
      )}
    </div>
  )
}

export default ThermalMarker
