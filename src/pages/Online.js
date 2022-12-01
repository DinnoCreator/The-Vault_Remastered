import MainNavigation from "../components/Layout/MainNavigation";
import { Link, useNavigate } from "react-router-dom";
import { Fragment, useState, useRef, useEffect } from "react";

function Online() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  // gets the values inputed in the forms
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dip, setDip] = useState("none");

  //password visibility state
  const [show, setshow] = useState(false);
  const pass = useRef();

  let navigate = useNavigate();

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
      const email = userEmail;
      const password = userPassword;

      //api call for sending the user data to the backend
      await fetch("https://thevault-api.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => {
          if (res.status === 401) {
            setDip("block");
            setLoading(false);
            return setLoginError("Incorrect email or password...");
          } else if (res.status === 403) {
            setDip("block");
            setLoading(false);
            return setLoginError("Customer is not registered for online banking...");
          } else if (res.status === 411) {
            setDip("block");
            setLoading(false);
            return setLoginError("Server error...");
          } else {
            setLoading(false);
            return res.json();
          }
        })
        .then(function (data) {
          sessionStorage.setItem("token", "Bearer " + data.token);
          return navigate("/dashboard");
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <MainNavigation />
      <div className="form-signin shadowB" style={{ marginTop: "3%" }}>
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
              type="password"
              className="form-control roborobo shadowB"
              ref={pass}
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              autoComplete="new-password"
              minLength="8"
              required
            />
            <label>Password</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input shadowB"
              type="checkbox"
              onClick={showpassword}
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Show Password
            </label>
          </div>

          <button className="w-100 btn btn-lg btn-light mb-2 shadowB" type="submit">
            {loading ? (
              <>
                <div
                  style={{ display: "inline-block" }}
                  className="loader"
                ></div>
              </>
            ) : (
              <>Log In</>
            )}
          </button>
          <Link to="/reset">Forgotten password?</Link>
          <Link to="/signuponline">Sign Up?</Link>
          <p className="mt-5 mb-3 text-muted centree">Edify IT © 2022</p>
        </form>
      </div>
    </Fragment>
  );
}

export default Online;
