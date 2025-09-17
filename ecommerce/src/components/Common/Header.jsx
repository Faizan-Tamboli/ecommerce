import React from 'react'
import Topbar from '../Layout/Topbar'
import Navbar from './Navbar'

const Header = () => {
  return (
    <header className='broder-b border-gray-200'>
      <Topbar/>
      <Navbar/>
    </header>
  )
}

export default Header
