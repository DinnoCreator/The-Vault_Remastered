import { Fragment, useEffect } from "react";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import MainNavigation from "../components/Layout/MainNavigation";

function Signuponline() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  // gets the values inputed in the forms
  const [userEmail, setUserEmail] = useState("");
  const [userAccount, setUserAccount] = useState("");
  const [userFour, setUserFour] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [dip, setDip] = useState("none");
  const [regStatus, setRegStatus] = useState("Proccessing");
  //state for showing modal on load
  const [shown, setShown] = useState(true);
  const [loading, setLoading] = useState(false);

  //password visibility state
  const [show, setshow] = useState(false);
  const pass = useRef();

  //password visibility handler
  const showpassword = () => {
    setshow(!show);
    pass.current.type = show ? "password" : "text";
  };

  let navigate = useNavigate();

  //submit handler
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      //values from form
      const email = userEmail;
      const accNo = userAccount;
      const four = userFour;
      const password = userPassword;

      //api call for sending the user data to the backend
      await fetch("https://thevault-api.onrender.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          accNo,
          four,
          password,
        }),
      }).then((res) => {
        if (res.status === 401) {
          setDip("block");
          setLoading(false);
          return setLoginError(
            "Incorrect email, check your email and try again."
          );
        } else if (res.status === 404) {
          setDip("block");
          setLoading(false);
          return setLoginError(
            "Can not register, Customer has an online banking account already..."
          );
        } else if (res.status === 403) {
          setDip("block");
          setLoading(false);
          return setLoginError("Incorrect account number...");
        } else if (res.status === 406) {
          setDip("block");
          setLoading(false);
          return setLoginError("Invalid 4digitpin...");
        } else {
          setLoading(false);
          return setRegStatus("Successful!");
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  //sends to online banking sign up
  function handleLogin() {
    navigate("/online");
  }

  if (regStatus !== "Successful!") {
    return (
      <Fragment>
        <MainNavigation />
        <div className="form-signin shadowB" style={{marginTop: "3%"}}>
          {loginError && ( // then if changed flag is false show error message.
            <div style={{ color: "red", display: { dip } }}>
              <span>{loginError}</span>
            </div>
          )}
          <form onSubmit={onSubmitForm}>
            <div className="form-floating">
              <input
                type="email"
                style={{
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                }}
                className="form-control roborobo shadowB"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                minLength="11"
                autoComplete="off"
                required
              />
              <label>Email</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control roborobo shadowB"
                value={userAccount}
                onChange={(e) => setUserAccount(e.target.value)}
                maxLength="11"
                pattern="[0-9]+"
                autoComplete="off"
                required
              />
              <label>Acc No</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control roborobo shadowB"
                value={userFour}
                onChange={(e) => setUserFour(e.target.value)}
                autoComplete="new-password"
                minLength="4"
                maxLength="4"
                pattern="[0-9]+"
                required
              />
              <label>4digit-pin</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control roborobo shadowB"
                ref={pass}
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                autoComplete="new-password"
                minLength="8"
                required
              />
              <label htmlFor="floatingPassword">New-password</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                onClick={showpassword}
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Show Password
              </label>
            </div>

            <button className="w-100 btn btn-lg btn-light" type="submit">
              {loading ? (
                <>
                  <div
                    style={{ display: "inline-block" }}
                    className="loader"
                  ></div>
                </>
              ) : (
                <>Sign Up</>
              )}
            </button>
            <p className="mt-5 mb-3 text-muted centree">Edify IT © 2022</p>
          </form>
        </div>
      </Fragment>
    );
  } else {
    return (
      <>
        <Modal show={shown} backdrop="static" centered>
          <Modal.Header>
            <Modal.Title>
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Registration Successful!
              </h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="centree">
              <h3>Online Banking Registration Successful!</h3>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleLogin}>
              LogIn
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Signuponline;
