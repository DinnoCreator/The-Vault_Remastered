//import packages and components
import DashNav from "../components/Layout/DashNav";
import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect } from "react";

//creates account
function NewAcc() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  let navigate = useNavigate();

  // Checks if user is authenticated
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
  const [userAcc, setUserAcc] = useState("Savings");
  const [userPassword, setUserPassword] = useState("");

  // Error visibility handler state
  const [loginError, setLoginError] = useState("");
  const [dip, setDip] = useState("none");

  // Loading visibility state handler
  const [loading, setLoading] = useState(false);

  //password visibility state
  const [show, setshow] = useState(false);
  const pass = useRef();

  //password visibility handler
  const showpassword = () => {
    setshow(!show);
    pass.current.type = show ? "password" : "text";
  };

  //submit handler
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      //values from form
      const accType = userAcc;
      const password = userPassword;

      //api call for sending the user data to the backend
      await fetch("http://localhost:5000/newaccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          accType,
          password,
        }),
      })
        .then((res) => {
          if (res.status !== 200) {
            setDip("block");
            setLoading(false);
            return setLoginError(
              "Something went wrong, login and try again..."
            );
          } else {
            return res.json();
          }
        })
        .then(function (data) {
          //return to homepage
          return navigate("/status", { state: data.account });
        });
    } catch (err) {
      console.error(err);
    }
  };

  if (isAuthenticating) {
    return (
      <div className="center">
        <div></div>
        <div
          style={{ display: "inline-block" }}
          class="loaderBig pushDownBig"
        ></div>
      </div>
    );
  } else {
    return (
      <Fragment>
        <DashNav />
        <div
          className="pushDownSmall"
          style={{ color: "#896abe", textAlign: "center" }}
        >
          <h4>
            Create another account easily 😉. Just select an account type and
            type in a pin.
          </h4>
        </div>
        <div className="form-signin dropDown shadowB">
          {loginError && ( // then if changed flag is false show error message.
            <div style={{ color: "red", display: { dip } }}>
              <span>{loginError}</span>
            </div>
          )}
          <form onSubmit={onSubmitForm}>
            <div className="form-floating">
              <input
                type="password"
                className="form-control roborobo shadowB"
                ref={pass}
                minLength="4"
                maxLength="4"
                pattern="[0-9]+"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                required
              />
              <label htmlFor="floatingPassword">4digit-pin</label>
            </div>
            <div className="form-floating">
              <select
                name="Acctype"
                value={userAcc}
                onChange={(e) => setUserAcc(e.target.value)}
                className="form-select shadowB"
                aria-label="Default select example"
                style={{marginBottom: "10px",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                  borderBottomRightRadius: "12px",
                  borderBottomLeftRadius: "12px"}}
              >
                <option>Savings</option>
                <option>Current</option>
              </select>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                onClick={showpassword}
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Show 4Digit-Pin
              </label>
            </div>

            <button className="w-100 btn btn-lg btn-light roborobo shadowB" type="submit">
              {loading ? (
                <>
                  <div
                    style={{ display: "inline-block" }}
                    className="loader"
                  ></div>
                </>
              ) : (
                <>Create Account</>
              )}
            </button>
            <p className={`mt-5 mb-3 text-muted centree`}>Edify IT © 2022</p>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default NewAcc;
