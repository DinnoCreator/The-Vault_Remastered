import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

function ForgotPass() {
  // gets the values inputed in the forms
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [sentCode, setSentCode] = useState(false);
  const [code, setCode] = useState("");
  const [verify, setVerify] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginError1, setLoginError1] = useState("");
  const [loading, setLoading] = useState(false);
  const [dip, setDip] = useState("none");
  const [dip1, setDip1] = useState("none");
  const [confirming, setConfirming] = useState(false);

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

      //api call for sending the user data to the backend
      await fetch("https://thevault-api.onrender.com/codecheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
        }),
      }).then((res) => {
        if (res.status === 401) {
          setDip1("block");
          setLoading(false);
          return setLoginError1("Customer doesn't exist...");
        }else if (res.status === 411) {
          setDip1("block");
          setLoading(false);
          return setLoginError1("Server error...");
        } else {
          setDip1("none");
          setLoading(false);
          return setSentCode(true);
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmitForm1 = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      //values from form
      const email = userEmail;
      const password = userPassword;

      //api call for sending the user data to the backend
      await fetch("http://localhost:5000/resetpass", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      }).then((res) => {
        if (res.status !== 200) {
          setUserPassword("");
          setCode("");
          setLoading(false);
          setVerify(false);
          return setSentCode(false);
        } else {
          setLoading(false);
          return navigate("/online");
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!sentCode && !verify) {
    return (
      <>
        <div
          className="pushDownSmall"
          style={{ color: "#896abe", textAlign: "center" }}
        >
          <h4>Enter your email, a verifiation code would be sent to you.</h4>
        </div>
        <div className="form-signin shadowB" style={{ marginTop: "3%" }}>
          {loginError1 && ( // then if changed flag is false show error message.
            <div style={{ color: "red", display: { dip1 } }}>
              <span>{loginError1}</span>
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

            <button
              className="w-100 mt-3 btn btn-lg btn-light shadowB"
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
                <>Verify</>
              )}
            </button>
            <p className="mt-5 mb-3 text-muted centree">Edify IT © 2022</p>
          </form>
        </div>
      </>
    );
  } else if (sentCode && !verify) {
    return (
      <>
        <div
          className="pushDownSmall"
          style={{ color: "#896abe", textAlign: "center" }}
        >
          <h4>Enter the confirmation code sent to your email.</h4>
        </div>
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
                type="text"
                className="form-control roborobo shadowB"
                value={code}
                onChange={async (e) => {
                  try {
                    setCode(e.target.value);
                    const email = userEmail;
                    const code = e.target.value;

                    //api call to get receiver account name
                    if (e.target.value.length > 4) {
                      setConfirming(true);
                      await fetch("https://thevault-api.onrender.com/codechecka", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          email,
                          code,
                        }),
                      }).then((res) => {
                        if (res.status !== 200) {
                          setConfirming(false);
                          setDip("block");
                          return setLoginError(
                            "Incorrect verification code..."
                          );
                        } else if (res.status === 200) {
                          setConfirming(false);
                          return setVerify(true);
                        }
                      });
                    }
                  } catch (error) {
                    console.error(error);
                  }
                }}
                minLength="5"
                maxLength="5"
                autoComplete="off"
                required
              />
              <label>Confirmation code</label>
            </div>

            {confirming ? (
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
            <p className="mt-5 mb-3 text-muted centree">Edify IT © 2022</p>
          </form>
        </div>
      </>
    );
  } else {
    return (
      <div className="form-signin shadowB" style={{ marginTop: "3%" }}>
        <div style={{ color: "green", display: "block" }}>
          <span>Verified... Reset Your Password.</span>
        </div>
        <form onSubmit={onSubmitForm1}>
          <div className="form-floating">
            <input
              type="email"
              className="form-control roborobo shadowB"
              value={userEmail}
              minLength="11"
              autoComplete="off"
              readOnly
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
            <label>New Password</label>
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

          <button className="w-100 btn btn-lg btn-light shadowB" type="submit">
            {loading ? (
              <>
                <div
                  style={{ display: "inline-block" }}
                  className="loader"
                ></div>
              </>
            ) : (
              <>Reset Password</>
            )}
          </button>
          <p className="mt-5 mb-3 text-muted centree">Edify IT © 2022</p>
        </form>
      </div>
    );
  }
}

export default ForgotPass;
