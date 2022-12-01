//import packages and components
import DashNav from "../components/Layout/DashNav";
import { useState, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Fragment, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import PinComponent from "react-pin-component";

//creates account
function Transfer() {
  //  Authentication
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  // sets location and navigation
  let navigate = useNavigate();
  const location = useLocation();

  // Checks if user is authenticated
  const getUser = useCallback(async () => {
    try {
      await fetch("https://thevault-api.onrender.com/user", {
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
        });
    } catch (err) {
      console.error(err.message);
    }
  }, [navigate]);
  useEffect(() => {
    getUser();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [getUser]);

  // gets the values inputed in the forms
  const [amount, setAmount] = useState(100);
  const [receiver, setReceiver] = useState("");
  const [gotReceiver, setGotReceiver] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // Request proccessing state
  const [loading, setLoading] = useState(false);
  const [retrieving, setRetrieving] = useState(false);

  // Error visibility state
  const [dip, setDip] = useState("none");
  const [dip1, setDip1] = useState("none");
  const [loginError, setLoginError] = useState("");
  const [loginError1, setLoginError1] = useState("");

  // Modal visibility
  const [show, setShow] = useState(false);

  // Modal visibility handler
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //submit handler
  const onSubmitForm = async () => {
    try {
      setLoading(true);
      //values from form
      const cash = amount;
      const sender = location.state.accNo;
      const benefactor = receiver;
      const password = userPassword;

      //api call for sending the user data to the backend
      await fetch("https://thevault-api.onrender.com/transfers", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          cash,
          sender,
          password,
          benefactor,
        }),
      }).then((res) => {
        if (res.status === 401) {
          setDip1("block");
          setLoading(false);
          return setLoginError1("Unauthenticated request...");
        } else if (res.status === 400) {
          setDip1("block");
          setLoading(false);
          return setLoginError1("Incorrect Pin...");
        } else if (res.status === 411) {
          setDip1("block");
          setLoading(false);
          return setLoginError1("Please type in your pin...");
        } else if (res.status === 403) {
          setDip1("block");
          setLoading(false);
          return setLoginError1(
            "Your account has been blocked, please contact us for more info..."
          );
        } else if (res.status === 405) {
          setDip1("block");
          setLoading(false);
          return setLoginError1("Insufficient funds...");
        } else if (res.status === 200) {
          return navigate("/status", { state: "Successful" });
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (isAuthenticating) {
    // Result when user is still being authenticated
    return (
      <div className="center">
        <div></div>
        <div
          style={{ display: "inline-block" }}
          class="loaderBig pushDownBig"
        ></div>
      </div>
    );
  } else if (!isAuthenticating && gotReceiver === "") {
    // Result when user is authenticated
    return (
      <Fragment>
        <DashNav />
        <div
          className="pushDownSmall"
          style={{ color: "#896abe", textAlign: "center" }}
        >
          <h4>
            Transfer cash easily 😉. Transfer only works for our customers😎.
          </h4>
        </div>
        <div className="form-signin dropDown shadowB">
          {loginError && ( // then if changed flag is false show error message.
            <div style={{ color: "red", display: { dip } }}>
              <span>{loginError}</span>
            </div>
          )}
          <form>
            <div className="form-floating">
              <input
                type="number"
                min="50"
                step="50"
                className="form-control roborobo shadowB"
                autoComplete="off"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <label htmlFor="floatingInput">Amount</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control roborobo shadowB"
                autoComplete="off"
                value={location.state.accName}
                readOnly
              />
              <label htmlFor="floatingInput">Account Name</label>
            </div>
            <div className="form-floating roborobo shadowB">
              <input
                type="text"
                className="form-control roborobo shadowB"
                autoComplete="off"
                value={location.state.accNo}
                readOnly
              />
              <label htmlFor="floatingInput">Account Number</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control roborobo shadowB"
                autoComplete="off"
                minLength="10"
                maxLength="10"
                pattern="[0-9]+"
                value={receiver}
                // On change gets the receiver from the backend
                onChange={async (e) => {
                  try {
                    setReceiver(e.target.value);
                    const receiverNo = e.target.value;
                    const senderNo = location.state.accNo;

                    //api call to get receiver account name
                    if (e.target.value.length > 9) {
                      setRetrieving(true);
                      await fetch(https://thevault-api.onrender.com/receiver", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          authorization: sessionStorage.getItem("token"),
                        },
                        body: JSON.stringify({
                          receiverNo,
                          senderNo,
                        }),
                      })
                        .then((res) => {
                          if (res.status !== 200) {
                            setDip("block");
                            return setLoginError(
                              "Customer Doesn't Bank with us, transfer to our customers only..."
                            );
                          } else {
                            return res.json();
                          }
                        })
                        .then(function (data) {
                          return setGotReceiver(data.receiver);
                        });
                    }
                  } catch (error) {
                    console.error(error);
                  }
                }}
                required
              />
              <label htmlFor="floatingInput">Receiver AccNo</label>
            </div>
            {retrieving ? (
              <>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{ display: "inline-block", marginTop: "3%" }}
                    className="loaderW"
                  ></div>
                </div>
              </>
            ) : (
              <></>
            )}
            <p className={`mt-5 mb-3 text-muted centree`}>Edify IT © 2022</p>
          </form>
        </div>
      </Fragment>
    );
  } else if (!isAuthenticating && gotReceiver !== "") {
    return (
      <Fragment>
        <DashNav />
        <div
          className="pushDownSmall"
          style={{ color: "#896abe", textAlign: "center" }}
        >
          <h4>
            Transfer cash easily 😉. Transfer only works for our customers😎.
          </h4>
        </div>
        <div className="form-signin dropDown shadowB">
          <form>
            <div>
              <input
                type="number"
                className="form-control roborobo shadowB"
                autoComplete="off"
                min="50"
                step="50"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control roborobo shadowB"
                autoComplete="off"
                value={location.state.accName}
                readOnly
              />
              <label htmlFor="floatingInput">Sender's Name</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control roborobo shadowB"
                autoComplete="off"
                value={location.state.accNo}
                readOnly
              />
              <label htmlFor="floatingInput">Sender's Number</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control roborobo shadowB"
                autoComplete="off"
                minLength="10"
                maxLength="10"
                value={gotReceiver}
                readOnly
              />
              <label htmlFor="floatingInput">Receiver's Name</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control roborobo shadowB"
                autoComplete="off"
                minLength="10"
                maxLength="10"
                value={receiver}
                readOnly
              />
              <label htmlFor="floatingInput">Receiver's AccNo</label>
            </div>

            <button
              style={{ marginTop: "3%" }}
              className="w-100 btn btn-lg btn-light shadowB"
              type="button"
              onClick={handleShow}
            >
              {loading ? (
                <>
                  <div
                    style={{ display: "inline-block" }}
                    className="loader"
                  ></div>
                </>
              ) : (
                <>Proceed</>
              )}
            </button>
            <p className={`mt-5 mb-3 text-muted centree`}>Edify IT © 2022</p>
          </form>
        </div>

        {/* Handles transaction confrimation */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm your Transaction 😃</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {loginError1 && ( // then if changed flag is false show error message.
              <div
                style={{ color: "red", display: { dip1 }, textAlign: "center" }}
              >
                <span>{loginError1}</span>
              </div>
            )}
            <div style={{ textAlign: "center", lineHeight: "1" }}>
              <p>Transfer N{Number(amount).toLocaleString()}</p>
              <p style={{paddingTop: "0"}}>
                from <br /> {location.state.accName} <br />{" "}
                {location.state.accNo}
              </p>

              <p style={{paddingTop: "0"}}>
                To <br />
                {gotReceiver}
                <br />
                {receiver}
              </p>
              <span style={{color: "green"}}>You'd be charged N{Number(amount * 0.5/100).toLocaleString()} for this transaction.</span>
            </div>

            {/* Handles 4Digit pin */}
            <PinComponent
              // defined length for the pin. This will render a specific number of input boxes.
              length={4}
              // You can choose to take effect on the completed pin here, but also have access to the pin along the way.
              onChange={(pin, completed) => {
                if (pin.length === 4 && completed) {
                  setUserPassword(pin);
                }
              }}
              // A simple function to check the values match. All values come out as strings.
              validate={(value) => Number(value) < 8}
              // Full regex strings supported. This will check if the number validates above AND if it passes the regex string
              // you do not need to use both, just different ways to use it.
              regexCriteria={/^[0-9]*$/}
              // styles for the entire pin component
              style={{
                paddingTop: "2%",
              }}
              InputComponent={
                <input
                  type="password"
                  style={{
                    backgroundColor: "darkgrey",
                    borderRadius: "50%",
                    margin: "4px",
                  }}
                  inputMode="numeric"
                  pattern="^[0-9]+$"
                  autoComplete="off"
                />
              }
              inputOptions={{
                // styles to be send and shown only when an input box is in focus.
                inputFocusStyle: {
                  border: "2px solid #896abe",
                  // If you want to remove the browser focus outline set this.
                  outline: 0,
                },
                debug: true,
              }}
              // Adds a divider component into the pin input every 3 values.
              addSplit={{
                component: <h1>-</h1>,
                every: 5,
              }}
            />
            
          </Modal.Body>
          <Modal.Footer>
            <button
              className="w-100 btn btn-lg btn-light fumub roborobo shadowB"
              style={{marginBottom: "0"}}
              type="button"
              onClick={onSubmitForm}
            >
              {loading ? (
                <>
                  <div
                    style={{ display: "inline-block" }}
                    className="loader"
                  ></div>
                </>
              ) : (
                "Pay"
              )}
            </button>
            <Link to="/reset">Forgot Pin?</Link>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  }
}

export default Transfer;
