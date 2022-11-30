import DashNav from "../components/Layout/DashNav";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

function Dashboard() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [accounts, setAccounts] = useState([]);
  let navigate = useNavigate();

  const getUser = useCallback(async () => {
    try {
      await fetch("http://localhost:5000/user", {
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
          setAccounts(jsonData.accounts);
        });
    } catch (err) {
      console.error(err.message);
    }
  }, [navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    getUser();
  }, [getUser]);

  // States for carousel
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

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
    if (accounts.length === 1) {
      // Result when user is authenticated and has only 1 account
      const listAccounts = accounts.map((account) => {
        return (
          <section id="testimonials">
            <div
              id="testimonialcarousels"
              className="carousel slide"
              data-bs-touch="true"
            >
              <div className="carousel-inner cardi">
                <div className="carousel-item active">
                  <h2 className="testimonial-text" style={{ fontSize: "35px" }}>
                    N{Number(account.account_bal).toLocaleString()}
                  </h2>
                  <strong>
                    <em className="fonte">{account.account_name}</em>
                  </strong>
                  <br />
                  <em>Acc No: {account.account_no}</em>
                  <br />
                  <em>Acc type: {account.account_type}</em>
                  <br />
                  <br />
                  <div
                    className="container"
                    style={{
                      backgroundColor: "#E4E9FD",
                      paddingTop: "5%",
                      paddingBottom: "5%",
                    }}
                  >
                    <div className="container text-center shadowB">
                      <div className="row">
                        <div className="rL lR col fumu">
                          <Link
                            to="/transfer"
                            state={{
                              accName: account.account_name,
                              accNo: account.account_no,
                              accType: account.account_type,
                            }}
                          >
                            <span className="dash">
                              Cash Transfer
                            </span>
                            &nbsp;<i className="fa-solid fa-arrow-right"></i>
                          </Link>
                        </div>
                        <div className="lR col fumu">
                          <Link
                            to="/transfer"
                            state={{
                              accName: account.account_name,
                              accNo: account.account_no,
                              accType: account.account_type,
                            }}
                          >
                            <span className="dash">
                              Mobile/Data Top-up
                            </span>
                            &nbsp;<i className="fa-solid fa-wifi"></i>
                          </Link>
                        </div>
                        <div className="lR col fumu">
                          <Link
                            to="/transfer"
                            state={{
                              accName: account.account_name,
                              accNo: account.account_no,
                              accType: account.account_type,
                            }}
                          >
                            <span className="dash">
                              Bills Payment
                            </span>
                            &nbsp;<i className="fa-solid fa-clipboard"></i>
                          </Link>
                        </div>
                        <div className="lR col fumu">
                          <Link to="/transactions" state={account.account_no}>
                            <span className="dash">History</span>
                            &nbsp;<i className="fa-solid fa-clock"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      });
      return (
        // Display when user is authenticated and has only 1 account
        <>
          <DashNav />
          {listAccounts}
        </>
      );
    } else {
      // Result when user is authenticated and has more than 1 account
      const listAccountss = accounts.map((account) => {
        return (
          <Carousel.Item interval={60000}>
            <h2 className="testimonial-text" style={{ fontSize: "35px" }}>
              N{Number(account.account_bal).toLocaleString()}
            </h2>
            <strong>
              <em className="fonte fumu">{account.account_name}</em>
            </strong>
            <br />
            <em className="fumu">Acc No: {account.account_no}</em>
            <br />
            <em className="fumu">Acc type: {account.account_type}</em>
            <br />
            <br />
            <div
              className="container"
              style={{
                backgroundColor: "#E4E9FD",
                paddingTop: "5%",
                paddingBottom: "5%",
              }}
            >
              <div className="container text-center shadowB">
                <div className="row">
                  <div className="rL lR col fumu">
                    <Link
                      to="/transfer"
                      state={{
                        accName: account.account_name,
                        accNo: account.account_no,
                        accType: account.account_type,
                      }}
                    >
                      <span className="dash">Cash Transfer</span>
                      &nbsp;<i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                  <div className="lR col fumu">
                    <Link
                      to="/transfer"
                      state={{
                        accName: account.account_name,
                        accNo: account.account_no,
                        accType: account.account_type,
                      }}
                    >
                      <span className="dash">
                        Mobile/Data Top-up
                      </span>
                      &nbsp;<i className="fa-solid fa-wifi"></i>
                    </Link>
                  </div>
                  <div className="lR col fumu">
                    <Link
                      to="/transfer"
                      state={{
                        accName: account.account_name,
                        accNo: account.account_no,
                        accType: account.account_type,
                      }}
                    >
                      <span className="dash">Bills Payment</span>
                      &nbsp;<i className="fa-solid fa-clipboard"></i>
                    </Link>
                  </div>
                  <div className="lR col fumu">
                    <Link to="/transactions" state={account.account_no}>
                      <span className="dash">History</span>
                      &nbsp;<i className="fa-solid fa-clock"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
        );
      });
      return (
        // Display when user is authenticated and has more than 1 account
        <>
          <DashNav />
          <div className="carousel-inner cardi">
            <Carousel activeIndex={index} onSelect={handleSelect}>
              {listAccountss}
            </Carousel>
          </div>
        </>
      );
    }
  }
}

export default Dashboard;
