
import { useLocation } from "react-router-dom";
import DashNav from "../components/Layout/DashNav";
import React, { useEffect } from "react";
import moment from "moment";

const TransView = () => {
    const location = useLocation();
    const printHandler = () => {
        return window.print();
      };

      useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, []);

    return <>
    <DashNav/>
    <div className="container" style={{ paddingTop: "1%" }}>
          <button
            className="btn btn-primary shadowB"
            type="button"
            onClick={printHandler}
          >
            Print transaction
          </button>
        </div>
    <div className="container">
          {/* <div className="col-lg-12 pushDownMid1"> */}
          <div class="card text-center pushDownMid1 shadowB" id="roborobo1">
            <div
              class="card-header"
              style={{
                color:
                  location.state.status === "Successful"
                    ? "green"
                    : "red",
              }}
            >
              {location.state.status}...
            </div>
            <div class="card-body">
              <em>
                <h6>ID: {location.state.id}</h6>
              </em>
              {location.state.status === "Successful" ? (
                <h5
                  class="card-title"
                  style={{
                    color:
                    location.state.type === "Credit"
                        ? "green"
                        : "red",
                  }}
                >
                  {" "}
                  {location.state.type} of N
                  {Number(
                    location.state.amount
                  ).toLocaleString()}
                </h5>
              ) : (
                <h5 class="card-title">
                  {location.state.type} of N
                  {Number(
                    location.state.amount
                  ).toLocaleString()}
                </h5>
              )}

              <p class="card-text" style={{ paddingTop: "0" }}>
                From
                <br /> {location.state.sender}
                <br />
                {location.state.senderNo} <br />
                To
                <br /> {location.state.receiver} <br />
                {location.state.receiverNo} <br />
              </p>
            </div>
            <div class="card-footer text-muted">
              Date:{" "}
              <strong>
              {moment(location.state.date).format(
                  "MMMM Do YYYY"
                )}
              </strong>{" "}
              &nbsp;&nbsp;Time:{" "}
              <strong>{location.state.time}</strong>
            </div>
          </div>
          {/* </div> */}
        </div>
    </>

}

export default TransView;