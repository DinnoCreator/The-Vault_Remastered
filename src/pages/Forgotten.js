import ForgotPass from "../components/ForgotPass";
import ForgotPin from "../components/ForgotPin";
import DashNav from "../components/Layout/DashNav";
import MainNavigation from "../components/Layout/MainNavigation";
import React, { useEffect, useCallback, useState } from "react";

function Forgotten() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [pass, setPass] = useState(false);
  const getUser = useCallback(async () => {
    try {
      await fetch("https://thevault-api.onrender.com/user", {
        method: "GET",
        headers: { authorization: sessionStorage.getItem("token") },
      }).then((res) => {
        if (res.status !== 200) {
          setIsAuthenticating(false);
          return setPass(true);
        } else {
          setPass(false);
          return setIsAuthenticating(false);
        }
      });
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    getUser();
  }, [getUser]);

  if (isAuthenticating && !pass) {
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
  } else if (!isAuthenticating && pass) {
    return (
      <>
        <MainNavigation />
        <ForgotPass />
      </>
    );
  } else {
    return (
      <>
        <DashNav />
        <ForgotPin />
      </>
    );
  }
}

export default Forgotten;
