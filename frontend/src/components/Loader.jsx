import React from 'react'
import loading from '../background/loader.gif'
import '../index.css'

const Loader = () => {
  return (
    <div >
        <img src={loading} alt="" style={{ /*border: "2px solid  black",*/width:'12rem'}}/>
    </div>
  )
}

export default Loader