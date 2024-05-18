import React from 'react'
import logo from '../assets/logo.png'
import Versions from './Versions'

const Loader = ({ isApiLoaded }) => {
  return (
    <div
      className="loader"
      style={{
        opacity: isApiLoaded ? 0 : 1,
        transition: 'opacity 1.5s',
        transitionDelay: '3.5s'
      }}
    >
      <img src={logo} alt="Drakkar" style={{ maxWidth: '100vw', maxHeight: '100vh' }} />
      <Versions />
    </div>
  )
}

export default Loader
