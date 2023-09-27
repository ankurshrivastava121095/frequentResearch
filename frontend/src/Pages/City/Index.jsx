/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";

const CityIndex = () => {
  const fields = {
    cityName: "",
    state: "",
  };

  const [cityId, setCityId] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [list, setList] = useState([]);
  const [states, setStates] = useState([]);
  const [data, setData] = useState(fields);
  const [handleDrawer, setHandleDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [responseStatus, setResponseStatus] = useState();
  const [responseMessage, setResponseMessage] = useState();

  const handleAddNewButton = () => {
    setIsEdit(false)
    setData({
        ...data,
        cityName: "",
        state: "",
    })
    setHandleDrawer(true)
  }
  
    const fetchCities = () => {
      fetch(`http://localhost:3010/api/frequentResearch/show-city`)
        .then((res) => res.json())
        .then((data) => {
          setList(data?.data);
        });
    };

  const fetchStates = () => {
    fetch(`http://localhost:3010/api/frequentResearch/show-state`)
      .then((res) => res.json())
      .then((data) => {
        setStates(data?.data);
      });
  };

  const handleInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const option = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    };

    if (!isEdit) {
      fetch(`http://localhost:3010/api/frequentResearch/store-city`, option)
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setResponseMessage(data?.message);
          setResponseStatus(data?.status);
          setShowResponse(true);
          fetchStates();
          fetchCities();
          setHandleDrawer(false);
        });
    } else {
      fetch(
        `http://localhost:3010/api/frequentResearch/update-city/${cityId}`,
        option
      )
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setResponseMessage(data?.message);
          setResponseStatus(data?.status);
          setShowResponse(true);
          fetchCities();
          setHandleDrawer(false);
        });
    }
  };

  const handleEdit = (id) => {
    setIsEdit(true);
    setCityId(id);

    fetch(`http://localhost:3010/api/frequentResearch/view-city/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData({
          ...data,
          cityName: data?.data?.cityName,
          state: data?.data?.state,
        });
      });

    setHandleDrawer(true)
  };

  const handleDelete = (id) => {

    const confirmed = window.confirm('Are you sure you want to delete?');

    if (!confirmed) {
      return;
    } else {
        fetch(`http://localhost:3010/api/frequentResearch/delete-city/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setLoading(false);
            setResponseMessage(data?.message);
            setResponseStatus(data?.status);
            setShowResponse(true);
            fetchCities();
          });
    }
  };

  useEffect(() => {
    fetchStates();
    fetchCities();
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
            City
          </li>
        </ol>
      </nav>
      <div className="content-base">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2>City List</h2>
          <button
            type="button"
            title="Add New City"
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
                  <th>CITY NAME</th>
                  <th>ACTION</th>
                </thead>
                <tbody>
                  {list?.length != 0 ? (
                    Array.isArray(list) &&
                    list?.map((val, key) => (
                      <tr key={key}>
                        <td>{key + 1}.</td>
                        <td>{val?.cityName}</td>
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
                      <td colSpan={3} className="text-center">
                        No Data Available
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <th>#</th>
                  <th>CITY NAME</th>
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
                    <>Add New City</>
                    :
                    <>Edit City</>
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
                <label htmlFor="cityName">
                    City Name <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="cityName"
                  value={data?.cityName}
                  placeholder="Enter City Name"
                  onChange={handleInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="state">
                  State <span className="text-danger fw-bold">*</span>
                </label>
                <select name="state" id="state" value={data?.state} onChange={handleInput} className="form-select">
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
            </form>
          </div>
        </div>
        {/* Drawer ends */}
      </div>
    </>
  );
};

export default CityIndex;
