import React from "react";
import DashNav from "../components/Layout/DashNav";
import { useState, useCallback } from "react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";

function Transaction() {
  const location = useLocation();
  //  Authentication
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [tansactionDetail, setTransactionDetails] = useState([]);

  // sets location and navigation
  let navigate = useNavigate();

  // Checks if user is authenticated
  const getUser = useCallback(async () => {
    try {
      await fetch(`https://thevault-api.onrender.com/transactions/${location.state}`, {
        method: "GET",
        headers: { authorization: sessionStorage.getItem("token") },
      })
        .then((res) => {
          if (res.status !== 200) {
            return navigate("/online");
          } else {
            return res.json();
          }
        })
        .then(function (jsonData) {
          setIsAuthenticating(false);
          return setTransactionDetails(jsonData.transactions);
        });
    } catch (err) {
      console.error(err.message);
    }
  }, [navigate, location.state, setTransactionDetails]);
  useEffect(() => {
    getUser();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [getUser]);

  const printHandler = () => {
    return window.print();
  };

  if (isAuthenticating && tansactionDetail.length === 0) {
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
  } else if (!isAuthenticating && tansactionDetail.length === 0) {
    return (
      <>
        <DashNav />
        <div className="cardi">
          <h1>Nothing to show...</h1>
        </div>
      </>
    );
  } else {
    const transacts = tansactionDetail.map((tansactionDetails) => {
      return (
        <div className="container">
          {/* <div className="col-lg-12 pushDownMid1"> */}
          <div class="card text-center pushDownMid1 shadowB" id="roborobo1">
            <div
              class="card-header"
              style={{
                color:
                  tansactionDetails.transaction_status === "Successful"
                    ? "green"
                    : "red",
              }}
            >
              {tansactionDetails.transaction_status}...
            </div>
            <div class="card-body">
              <em>
                <h6 className="bolder">
                  ID: {tansactionDetails.parent_transaction_id}
                </h6>
              </em>
              {tansactionDetails.transaction_status === "Successful" ? (
                <h5
                  class="card-title"
                  style={{
                    color:
                      tansactionDetails.transaction_type === "Credit"
                        ? "green"
                        : "red",
                  }}
                >
                  {" "}
                  {tansactionDetails.transaction_type} of N
                  {Number(
                    tansactionDetails.transaction_amount
                  ).toLocaleString()}
                </h5>
              ) : (
                <h5 class="card-title">
                  {tansactionDetails.transaction_type} of N
                  {Number(
                    tansactionDetails.transaction_amount
                  ).toLocaleString()}
                </h5>
              )}

              <p class="card-text bolder" style={{ paddingTop: "0" }}>
                From
                <br /> {tansactionDetails.s_account}
                <br />
                {tansactionDetails.s_account_no} <br />
                To
                <br /> {tansactionDetails.r_account} <br />
                {tansactionDetails.r_account_no} <br />
              </p>
              <button
                className="btn blueViolet shadowB"
                type="button"
                onClick={() => {
                  navigate("/transview", {
                    state: {
                      amount: tansactionDetails.transaction_amount,
                      sender: tansactionDetails.s_account,
                      senderNo: tansactionDetails.s_account_no,
                      receiver: tansactionDetails.r_account,
                      receiverNo: tansactionDetails.r_account_no,
                      time: tansactionDetails.transaction_time,
                      date: tansactionDetails.transaction_date,
                      status: tansactionDetails.transaction_status,
                      type: tansactionDetails.transaction_type,
                      id: tansactionDetails.parent_transaction_id,
                    },
                  });
                }}
              >
                {" "}
                View
              </button>
            </div>
            <div class="card-footer text-muted">
              Date:{" "}
              <strong>
                {moment(tansactionDetails.transaction_date).format(
                  "MMMM Do YYYY"
                )}
              </strong>{" "}
              &nbsp;&nbsp;Time:{" "}
              <strong>{tansactionDetails.transaction_time}</strong>
            </div>
          </div>
          {/* </div> */}
        </div>
      );
    });

    return (
      // Display when user is authenticated and has more than 1 account
      <>
        <DashNav />
        <div className="container" style={{ paddingTop: "1%" }}>
          <button
            className="btn btn-primary shadowB"
            type="button"
            onClick={printHandler}
          >
            Print bank statement
          </button>
        </div>
        {transacts}
      </>
    );
  }
}

export default Transaction;
