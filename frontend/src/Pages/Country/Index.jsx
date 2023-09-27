/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";

const CountryIndex = () => {
  const fields = {
    countryName: "",
  };

  const [countryId, setCountryId] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [list, setList] = useState([]);
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
        countryName: ''
    })
    setHandleDrawer(true)
  }

  const fetchCountries = () => {
    fetch(`http://localhost:3010/api/frequentResearch/show-country`)
      .then((res) => res.json())
      .then((data) => {
        setList(data?.data);
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
      fetch(`http://localhost:3010/api/frequentResearch/store-country`, option)
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setResponseMessage(data?.message);
          setResponseStatus(data?.status);
          setShowResponse(true);
          fetchCountries();
          setHandleDrawer(false);
        });
    } else {
      fetch(
        `http://localhost:3010/api/frequentResearch/update-country/${countryId}`,
        option
      )
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setResponseMessage(data?.message);
          setResponseStatus(data?.status);
          setShowResponse(true);
          fetchCountries();
          setHandleDrawer(false);
        });
    }
  };

  const handleEdit = (id) => {
    setIsEdit(true);
    setCountryId(id);

    fetch(`http://localhost:3010/api/frequentResearch/view-country/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData({
          ...data,
          countryName: data?.data?.countryName,
        });
      });

    setHandleDrawer(true)
  };

  const handleDelete = (id) => {

    const confirmed = window.confirm('Are you sure you want to delete?');

    if (!confirmed) {
      return;
    } else {
        fetch(`http://localhost:3010/api/frequentResearch/delete-country/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setLoading(false);
            setResponseMessage(data?.message);
            setResponseStatus(data?.status);
            setShowResponse(true);
            fetchCountries();
          });
    }
  };

  useEffect(() => {
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
            Country
          </li>
        </ol>
      </nav>
      <div className="content-base">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2>Country List</h2>
          <button
            type="button"
            title="Add New Country"
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
                  <th>COUNTRY NAME</th>
                  <th>ACTION</th>
                </thead>
                <tbody>
                  {list?.length != 0 ? (
                    Array.isArray(list) &&
                    list?.map((val, key) => (
                      <tr key={key}>
                        <td>{key + 1}.</td>
                        <td>{val?.countryName}</td>
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
                  <th>COUNTRY NAME</th>
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
                    <>Add New Country</>
                    :
                    <>Edit Country</>
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
                <label htmlFor="countryName">
                  Country Name <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="countryName"
                  value={data?.countryName}
                  placeholder="Enter Country Name"
                  onChange={handleInput}
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
            </form>
          </div>
        </div>
        {/* Drawer ends */}
      </div>
    </>
  );
};

export default CountryIndex;
