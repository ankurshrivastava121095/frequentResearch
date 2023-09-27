/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom';

const Navbar = () => {

    const location = useLocation()

    const [sidebarToggler,setSidebarToggler] = useState(true)

    useEffect(()=>{
        if (sidebarToggler) {
            document.getElementById("mySidebar").style.width = "250px";
            document.getElementById("main").style.marginLeft = "250px";
        } else {
            document.getElementById("mySidebar").style.width = "0";
            document.getElementById("main").style.marginLeft= "0";
        }
    },[sidebarToggler])

    return (
        <>
            <div id="mySidebar" className="sidebar">
                <h4 className='text-white text-center'>Frequent Research Task</h4>
                <hr className='text-white' />
                <Link to="/" className={`${location.pathname == '/' && 'activeMenu'}`}><i className="fa-solid fa-gauge-high"></i> Dashboard</Link>
                <Link to="/country" className={`${location.pathname == '/country' && 'activeMenu'}`}><i className="fa-solid fa-earth-americas"></i> Country</Link>
                <Link to="/state" className={`${location.pathname == '/state' && 'activeMenu'}`}><i className="fa-brands fa-usps"></i> State</Link>
                <Link to="/city" className={`${location.pathname == '/city' && 'activeMenu'}`}><i className="fa-solid fa-city"></i> City</Link>
                <Link to="/user" className={`${location.pathname == '/user' && 'activeMenu'}`}><i className="fa-solid fa-user"></i> User</Link>
            </div>

            <div id="main">
                <div className='header'>
                    <button className="openbtn" onClick={()=>setSidebarToggler(!sidebarToggler)}>☰</button>  
                </div>
                <div style={{ padding: '30px' }}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Navbar