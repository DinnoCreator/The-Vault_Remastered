//import packages and components
import MainNavigation from "../components/Layout/MainNavigation";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect } from "react";

//creates account
function Verify() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const location = useLocation();
  // gets the values inputed in the forms
  const [confirmationCode, setConfirmationCode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [dip, setDip] = useState("none");
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  //submit handler
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      //values from form
      const email = location.state;
      const code = confirmationCode;

      //api call for sending the user data to the backend
      await fetch("http://localhost:5000/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code,
        }),
      })
        .then((res) => {
          if (res.status === 401) {
            setDip("block");
            setLoading(false);
            return setLoginError(
              "Email does not have a verification code or code expired, please register again..."
            );
          } else if (res.status === 403) {
            setDip("block");
            setLoading(false);
            return setLoginError("Invalid verification code...");
          } else {
            return res.json();
          }
        })
        .then(function (data) {
          return navigate("/status", { state: data.account });
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <MainNavigation />
      <div
        className="pushDownSmall"
        style={{ color: "#896abe", textAlign: "center" }}
      >
        <h3>
          A verification code has been sent to your email, copy and paste it
          here...
        </h3>
      </div>
      <div
        className="form-signin pushDownMid cardi"
        style={{ borderRadius: "5%", textAlign: "left" }}
      >
        {loginError && ( // then if changed flag is false show error message.
          <div style={{ color: "red", display: { dip } }}>
            <span>{loginError}</span>
          </div>
        )}
        <form onSubmit={onSubmitForm}>
          <div className="form-floating">
            <input
              type="email"
              className="form-control roborobo shadowB"
              minLength="11"
              autoComplete="off"
              value={location.state}
              readOnly
            />
            <label>Email</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control roborobo shadowB"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              autoComplete="off"
              required
            />
            <label>Confirmation code</label>
          </div>

          <button
            id="roborobo"
            className="w-100 btn btn-lg btn-light fumub shadowB"
            style={{ marginTop: "4%", color: "#fff" }}
            type="submit"
          >
            {loading ? (
              <>
                <div
                  style={{ display: "inline-block" }}
                  className="loader"
                ></div>
              </>
            ) : (
              <>Verify Email</>
            )}
          </button>
          <p className={`mt-2 mb-3 text-muted centree`}>Edify IT © 2022</p>
        </form>
      </div>
    </Fragment>
  );
}

export default Verify;
