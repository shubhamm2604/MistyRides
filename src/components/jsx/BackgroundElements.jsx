import React from 'react'

import '../css/BackgroundElements.css';

const BackgroundElements = () => {
  return (
    <div className="background-elements-root">
      {/* Animated gradient orbs */}
      <div className="background-elements-orb background-elements-orb1"></div>
      <div className="background-elements-orb background-elements-orb2"></div>
      <div className="background-elements-orb background-elements-orb3"></div>
      {/* Grid pattern */}
      <div className="background-elements-grid"></div>
    </div>
  )
}

export default BackgroundElements
