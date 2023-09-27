/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const DashboardIndex = () => {

    const [data,setData] = useState()

    const fetchCounts = () => {
        fetch(`http://localhost:3010/api/frequentResearch/dashboard`)
        .then((res) => res.json())
        .then((data) => {
            setData(data.data)
        });
    }

    useEffect(()=>{
        fetchCounts()
    },[])

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                </ol>
            </nav>

            <div className='content-base'>
                <div className='d-flex align-items-center justify-content-between mb-4'>
                    <h2>Dashboard</h2>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <Link to='/country' className='text-decoration-none text-dark'>
                            <div className='content-base d-flex justify-content-around align-items-center gap-5'>
                                <i className="fa-solid fa-earth-americas" style={{ fontSize: '75px' }}></i>
                                <div>
                                    <p className='fw-bold fs-5'>Country</p>
                                    <p>{data?.country}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-3">
                        <Link to='/state' className='text-decoration-none text-dark'>
                            <div className='content-base d-flex justify-content-around align-items-center gap-5'>
                                <i className="fa-brands fa-usps" style={{ fontSize: '75px' }}></i>
                                <div>
                                    <p className='fw-bold fs-5'>State</p>
                                    <p>{data?.state}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-3">
                        <Link to='/city' className='text-decoration-none text-dark'>
                            <div className='content-base d-flex justify-content-around align-items-center gap-5'>
                                <i className="fa-solid fa-city" style={{ fontSize: '75px' }}></i>
                                <div>
                                    <p className='fw-bold fs-5'>City</p>
                                    <p>{data?.city}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-3">
                        <Link to='/user' className='text-decoration-none text-dark'>
                            <div className='content-base d-flex justify-content-around align-items-center gap-5'>
                                <i className="fa-solid fa-user" style={{ fontSize: '75px' }}></i>
                                <div>
                                    <p className='fw-bold fs-5'>User</p>
                                    <p>{data?.user}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardIndex