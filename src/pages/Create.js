//import packages and components
import MainNavigation from "../components/Layout/MainNavigation";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect } from "react";

//creates account
function Create() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  // gets the values inputed in the forms
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userFname, setUserFname] = useState("");
  const [userMname, setUserMname] = useState("");
  const [userLname, setUserLname] = useState("");
  const [userDob, setUserDob] = useState("");
  const [userSex, setUserSex] = useState("Female");
  const [userAcc, setUserAcc] = useState("Savings");
  const [userAddress, setUserAddress] = useState("");
  const [userPassword, setUserPassword] = useState("");
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
      const fName = userFname;
      const mName = userMname;
      const lName = userLname;
      const dOB = userDob;
      const gender = userSex;
      const accountType = userAcc;
      const address = userAddress;
      const phoneNo = userPhone;
      const password = userPassword;

      //api call for sending the user data to the backend
      await fetch("http://localhost:5000/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          fName,
          mName,
          lName,
          dOB,
          gender,
          accountType,
          address,
          phoneNo,
          password,
        }),
      })
        .then((res) => {
          if (res.status !== 200) {
            return navigate("/status", { state: "Email Already exists" });
          } else {
            return res.json();
          }
        })
        .then(function (data) {
          return navigate("/verify", { state: data.email });
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <MainNavigation />
      <div className="form-signin shadowB">
        <form onSubmit={onSubmitForm}>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              minLength="11"
              autoComplete="off"
              value={userEmail}
              name="email"
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">Email</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              name="name"
              className="form-control"
              value={userFname}
              onChange={(e) => setUserFname(e.target.value)}
              autoComplete="off"
              required
            />
            <label htmlFor="floatingInput">First Name</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              name="name"
              value={userMname}
              onChange={(e) => setUserMname(e.target.value)}
              autoComplete="off"
              required
            />
            <label htmlFor="floatingInput">Middle Name</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              name="name"
              value={userLname}
              onChange={(e) => setUserLname(e.target.value)}
              autoComplete="off"
              required
            />
            <label htmlFor="floatingInput">Last Name</label>
          </div>
          <div className="form-floating">
            <input
              className="form-control"
              type="date"
              id="start"
              value={userDob}
              onChange={(e) => setUserDob(e.target.value)}
              required
            />
            <label>Date Of Birth(MM/DD/YYYY)</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              name="name"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
              autoComplete="off"
              required
            />
            <label>Address</label>
          </div>
          <div className="form-floating">
            <input
              type="tell"
              className="form-control"
              autoComplete="off"
              minLength="11"
              maxLength="11"
              pattern="[0-9]+"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              required
            />
            <label>Phone Number</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              name="password"
              className="form-control"
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
              className="form-select"
              aria-label="Default select example"
            >
              <option>Savings</option>
              <option>Current</option>
            </select>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="Gender"
              value="Male"
              onChange={(e) => setUserSex(e.target.value)}
              required
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Male
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="Gender"
              value="Female"
              onChange={(e) => setUserSex(e.target.value)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Female
            </label>
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

          <button className="w-100 btn btn-lg btn-light" type="submit">
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

export default Create;
