'use client'
import React, { useState } from 'react'
import Navbar from './Navbar'
import MobileNav from './MobileNav'

const ResponsiveNav = () => {

    const [openNav, setOpenNav] = useState (false)

    const handleclick = () => {
        setOpenNav (!openNav)
    } 

    return (
        <div>
            <Navbar openNav= {handleclick} />
            {openNav && <MobileNav  openNav={openNav} closeNav = {handleclick} /> }
            
        </div>
    )
}

export default ResponsiveNav
