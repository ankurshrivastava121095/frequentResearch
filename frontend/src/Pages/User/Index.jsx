/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";
import { parse } from 'date-fns';


const UserIndex = () => {
  const fields = {
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    state: "",
    country: "",
    gender: "",
    dob: "",
    age: "",
  };

  const [validationError, setValidationError] = useState('');
  const [isDateOfBirthValid, setIsDateOfBirthValid] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [list, setList] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [data, setData] = useState(fields);
  const [userID, setUserID] = useState();
  const [handleDrawer, setHandleDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [responseStatus, setResponseStatus] = useState();
  const [responseMessage, setResponseMessage] = useState();

  const handleAddNewButton = () => {
    setIsEdit(false)
    setData({
        ...data,
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        state: "",
        country: "",
        gender: "",
        dob: "",
        age: "",
    })
    setHandleDrawer(true)
  }

  const fetchUsers = () => {
    fetch(`http://localhost:3010/api/frequentResearch/show-user`)
      .then((res) => res.json())
      .then((data) => {
        setList(data?.data);
      });
  };

  const fetchCountries = () => {
    fetch(`http://localhost:3010/api/frequentResearch/show-country`)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data?.data);
      });
  };

  const fetchStates = (countryID) => {
    fetch(`http://localhost:3010/api/frequentResearch/show-state-by-country/${countryID}`)
      .then((res) => res.json())
      .then((data) => {
        setStates(data?.data);
      });
  };

  const fetchCities = (stateID) => {
    fetch(`http://localhost:3010/api/frequentResearch/show-city-by-state/${stateID}`)
      .then((res) => res.json())
      .then((data) => {
        setCities(data?.data);
      });
  };

  const handleInput = (e) => {
    if (e.target.name == 'dob') {
        const currentDate = new Date();
        const dob = parse(e.target.value, 'yyyy-MM-dd', new Date());
    
        const calculatedAge =  Math.floor((currentDate - dob) / 31536000000);
        
        setData({
            ...data,
            dob: e.target.value,
            age: calculatedAge
        })

        if (calculatedAge <= 14) {
            setIsDateOfBirthValid(true)
        } else {
            setIsDateOfBirthValid(false)
        }
    } else {     
        setData({
          ...data,
          [e.target.name]: e.target.value,
        });
    }
  };

  const handleCountryInput = (e) => {
    setData({
        ...data,
        country: e.target.value,
        state: '',
        city: ''
    })

    setCities([])
    setStates([])

    const countryID = e.target.value
    fetchStates(countryID)
  }

  const handleStateInput = (e) => {
    setData({
        ...data,
        state: e.target.value,
        city: ''
    })

    setCities([])

    const stateID = e.target.value
    fetchCities(stateID)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValid = emailRegex.test(data?.email);

    if (data?.age > 14) {
      if (!isNaN(data?.firstName) || !isNaN(data?.lastName) || !isValid) {
        setValidationError('Check if Firstname and Lastname contains Alphabet and Email should have valid format!')
      } else {
        setLoading(true);

        const option = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        };
        if (!isEdit) {
          fetch(`http://localhost:3010/api/frequentResearch/store-user`, option)
            .then((res) => res.json())
            .then((data) => {
              setLoading(false);
              fetchUsers()
              setResponseMessage(data?.message);
              setResponseStatus(data?.status);
              setShowResponse(true);
              fetchCountries();
              setHandleDrawer(false);
            });
        } else {
          fetch(
            `http://localhost:3010/api/frequentResearch/update-user/${userID}`,
            option
          )
            .then((res) => res.json())
            .then((data) => {
              setLoading(false);
              fetchUsers()
              setResponseMessage(data?.message);
              setResponseStatus(data?.status);
              setShowResponse(true);
              fetchCountries();
              setHandleDrawer(false);
            });
        }
      } 
    } else {
        setLoading(false); 
        setIsDateOfBirthValid(true)
    }
  };

  const handleEdit = (id) => {
    setIsEdit(true);
    setUserID(id);

    fetch(`http://localhost:3010/api/frequentResearch/view-user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data?.data);
        fetchStates(data?.data?.country)
        fetchCities(data?.data?.state)
      });

    setHandleDrawer(true)
  };

  const handleDelete = (id) => {

    const confirmed = window.confirm('Are you sure you want to delete?');

    if (!confirmed) {
      return;
    } else {
        fetch(`http://localhost:3010/api/frequentResearch/delete-user/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setLoading(false);
            setResponseMessage(data?.message);
            setResponseStatus(data?.status);
            setShowResponse(true);
            fetchUsers();
          });
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCountries();
  }, []);

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none text-dark">
              Dashboard
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            User
          </li>
        </ol>
      </nav>
      <div className="content-base">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2>User List</h2>
          <button
            type="button"
            title="Add New User"
            className="btn btn-sm btn-dark-custom"
            onClick={handleAddNewButton}
          >
            <i className="fa-solid fa-plus"></i> Add New
          </button>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div style={{ overflowX: "auto" }}>
              {showResponse && (
                <div
                  className={`alert alert-${
                    responseStatus == 201 ? "success" : "danger"
                  }`}
                  role="alert"
                >
                  {responseStatus == 201 ? (
                    <i className="fa-solid fa-circle-check"></i>
                  ) : (
                    <i className="fa-solid fa-circle-xmark"></i>
                  )}
                  &nbsp;&nbsp;{responseMessage}
                </div>
              )}
              <table className="table table-striped table-hover">
                <thead>
                  <th>#</th>
                  <th>FIRST NAME</th>
                  <th>LAST NAME</th>
                  <th>EMAIL</th>
                  <th>GENDER</th>
                  <th>DATE OF BIRTH</th>
                  <th>AGE</th>
                  <th>ACTION</th>
                </thead>
                <tbody>
                  {list?.length != 0 ? (
                    Array.isArray(list) &&
                    list?.map((val, key) => (
                      <tr key={key}>
                        <td>{key + 1}.</td>
                        <td>{val?.firstName}</td>
                        <td>{val?.lastName}</td>
                        <td>{val?.email}</td>
                        <td>{val?.gender}</td>
                        <td>{val?.dob}</td>
                        <td>{val?.age}</td>
                        <td className="d-flex gap-3">
                          <button
                            type="button"
                            title="Edit"
                            className="btn btn-sm btn-dark-custom"
                            onClick={() => handleEdit(val?._id)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            type="button"
                            title="Delete"
                            className="btn btn-sm btn-dark-custom"
                            onClick={() => handleDelete(val?._id)}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center">
                        No Data Available
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <th>#</th>
                  <th>FIRST NAME</th>
                  <th>LAST NAME</th>
                  <th>EMAIL</th>
                  <th>GENDER</th>
                  <th>DATE OF BIRTH</th>
                  <th>AGE</th>
                  <th>ACTION</th>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Drawer starts */}
        <div
          className={`offcanvas offcanvas-end ${
            handleDrawer ? "show" : "hiding"
          }`}
          style={{ width: "40%" }}
          tabIndex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasRightLabel">
                {
                    !isEdit ?
                    <>Add New User</>
                    :
                    <>Edit User</>
                }
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setHandleDrawer(false)}
            ></button>
          </div>
          <div className="offcanvas-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="firstName">
                  First Name <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="firstName"
                  value={data?.firstName}
                  placeholder="Enter First Name"
                  onChange={handleInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName">
                  Last Name <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="lastName"
                  value={data?.lastName}
                  placeholder="Enter Last Name"
                  onChange={handleInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email">
                  Email <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="email"
                  value={data?.email}
                  placeholder="Enter Email"
                  onChange={handleInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="country">
                  Country <span className="text-danger fw-bold">*</span>
                </label>
                <select name="country" id="country" value={data?.country} onChange={handleCountryInput} className="form-select">
                    <option value="">---- Select Country ----</option>
                    {
                        Array.isArray(countries) && countries?.map((country,key)=>(
                            <>
                                <option key={key} value={country?._id}>{country?.countryName}</option>
                            </>
                        ))
                    }
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="state">
                  State <span className="text-danger fw-bold">*</span>
                </label>
                <select name="state" id="state" value={data?.state} onChange={handleStateInput} className="form-select">
                    <option value="">---- Select State ----</option>
                    {
                        Array.isArray(states) && states?.map((val,key)=>(
                            <>
                                <option key={key} value={val?._id}>{val?.stateName}</option>
                            </>
                        ))
                    }
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="city">
                  City <span className="text-danger fw-bold">*</span>
                </label>
                <select name="city" id="city" value={data?.city} onChange={handleInput} className="form-select">
                    <option value="">---- Select City ----</option>
                    {
                        Array.isArray(cities) && cities?.map((val,key)=>(
                            <>
                                <option key={key} value={val?._id}>{val?.cityName}</option>
                            </>
                        ))
                    }
                </select>
              </div>
              <div className="mb-3">
                <label>
                  Gender <span className="text-danger fw-bold">*</span>
                </label><br />
                <input 
                    type="radio" 
                    className="form-check-input" 
                    name="gender" 
                    value='Male'
                    checked={data?.gender == 'Male' ? true : false} 
                    onChange={handleInput} 
                /> Male <br />
                <input 
                    type="radio" 
                    className="form-check-input" 
                    name="gender" 
                    value='Female' 
                    checked={data?.gender == 'Female' ? true : false}
                    onChange={handleInput} 
                /> Female
              </div>
              <div className="mb-3">
                <label htmlFor="dob">
                  Date of Birth <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  name="dob"
                  value={data?.dob}
                  onChange={handleInput}
                />
                {isDateOfBirthValid && (
                    <div className="text-danger fw-bold">Must be older than 14 years.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="age">
                  Age <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="age"
                  value={data?.age}
                  placeholder="Enter Age"
                  onChange={handleInput}
                  disabled
                />
              </div>

              {loading ? (
                <Loader />
              ) : (
                <button type="submit" className="btn btn-sm btn-dark-custom">
                  {
                    isEdit ?
                    <>Update</>
                    :
                    <>Save</>
                  }
                </button>
              )}
              {
                validationError != '' && <><p className="text-danger fw-bold">{validationError}</p></>
              }
            </form>
          </div>
        </div>
        {/* Drawer ends */}
      </div>
    </>
  );
};

export default UserIndex;
