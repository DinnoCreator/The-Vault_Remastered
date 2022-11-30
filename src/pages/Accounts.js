import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import MainNavigation from "../components/Layout/MainNavigation";
import moment from "moment";

const Accounts = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [dip, setDip] = useState("none");
  const [datii, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUser = useCallback(async () => {
    try {
      const id = location.state;

      await fetch(`http://localhost:5000/customersacc/${id}`, {
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
  }, [setData, location.state]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    getUser();
  }, [getUser]);

  let color = "";

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
    const dat1 = datii.accounts.map((data) => {
      data.account_status === "Opened"
        ? (color = "btn-success")
        : (color = "btn-danger");
      return (
        <>
          <tr className="container">
            <td>{data.customer_id}</td>
            <td>{data.account_name}</td>
            <td>{data.account_no}</td>
            <td>N{Number(data.account_bal).toLocaleString()}</td>
            <td>{data.account_type}</td>
            <td>{moment(data.c_date).format("MMMM Do YYYY")}</td>
            <td>{data.c_time}</td>
            <td>
              <button
                className={`btn ${color} shadowB`}
                type="button"
                onClick={async (e) => {
                  try {
                    setLoading(true);
                    setDip("block");
                    const accNo = data.account_no;

                    await fetch("http://localhost:5000/status", {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        accNo,
                      }),
                    }).then((res) => {
                      if (res.status === 200) {
                        setLoading(false);
                        setDip("none");
                        window.location.reload();
                        return res.json();
                      }
                    });
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                {loading ? (
                  <>
                    <div style={{ display: { dip } }} className="loader"></div>
                  </>
                ) : (
                  <>{data.account_status}</>
                )}
              </button>
            </td>
            <td>
              <button
                className="btn blueViolet shadowB"
                type="button"
                onClick={() => {
                  navigate("/customertrans", { state: data.account_no });
                }}
              >
                <i className="fa-solid fa-clock"></i> History
              </button>
            </td>
          </tr>
        </>
      );
    });
    return (
      <>
        <MainNavigation />
        <div className="container-fluid cardi" style={{ overflow: "scroll" }}>
          <table>
            <thead>
              <tr>
                <th>Customer_ID</th>
                <th>Account Name</th>
                <th>Account Number</th>
                <th>Account Balance</th>
                <th>Account Type</th>
                <th>Date Created</th>
                <th>Time Created</th>
                <th>Account Status</th>
                <th>Transaction History</th>
              </tr>
            </thead>
            <tbody>{dat1}</tbody>
          </table>
        </div>
      </>
    );
  }
};

export default Accounts;
