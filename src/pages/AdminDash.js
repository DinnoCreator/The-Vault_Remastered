import React, { useState, useEffect, useCallback } from "react";
import MainNavigation from "../components/Layout/MainNavigation";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  // sets location and navigation
  let navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [datii, setData] = useState([]);

  const getUser = useCallback(async () => {
    try {
      await fetch("https://thevault-api.onrender.com/customers", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then(function (jsonData) {
          setIsAuthenticating(false);
          return setData(jsonData);
        });
    } catch (err) {
      console.error(err.message);
    }
  }, [setData]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    getUser();
  }, [getUser]);

  if (isAuthenticating) {
    // Result when user is still being authenticated
    return (
      <div className="center">
        <div></div>
        <div
          style={{ display: "inline-block" }}
          className="loaderBig pushDownBig"
        ></div>
      </div>
    );
  } else {
   const dat1 = datii.map((data) => {
      return (
        <>
        <tr className="container">
          <td>
            {data.customer_id}
          </td>
          <td>
            {data.customer_email}
          </td>
          <td>
            {data.first_name}
          </td>
          <td>
            {data.middle_name}
          </td>
          <td>
            {data.last_name}
          </td>
          <td>
            {data.customer_gender}
          </td>
          <td>
            {data.customer_phoneno}
          </td>
          <td>
            {data.customer_address}
          </td>
          <td>
          {moment(data.customer_dob).format(
                  "MMMM Do YYYY"
                )}
          </td>
          <td>
          {moment(data.c_date).format(
                  "MMMM Do YYYY"
                )}
          </td>
          <td>
            {data.c_time}
          </td>
          <td>
          <button className="btn blueViolet shadowB" type="button" 
              onClick={() => {
                navigate("/accounts", {state: data.customer_id})
              }}> accounts</button>
          </td>
          </tr>
        </>
      );
    })
    return (
      <>
        <MainNavigation />
        <div className="container-fluid cardi" style={{overflow: "scroll"}}>
          <table>
            <thead>
              <tr>
                <th>
                  ID
                </th>
                <th>
                  Email
                </th>
                <th>
                  First Name
                </th>
                <th>
                  Middle Name
                </th>
                <th>
                  Last Name
                </th>
                <th>
                  Gender
                </th>
                <th>
                  Phone
                </th>
                <th>
                  Address
                </th>
                <th>
                  DOB
                </th>
                <th>
                  Date created
                </th>
                <th>
                  Time created
                </th>
                <th>
                  Accounts
                </th>
              </tr>
            </thead>
            <tbody>
              
                {dat1}
            </tbody>
          </table>
        </div>
      </>
    );
  }
};

export default AdminDashboard;
