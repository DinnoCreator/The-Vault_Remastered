import { useEffect } from "react";
import MainNavigation from "../components/Layout/MainNavigation";
import { Fragment } from "react";

function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <Fragment>
      <MainNavigation />
      <div className="box">
        <h1 className="mb-4">Banking Made Easy and fun</h1>
        <h3>Download our mobile app</h3>
        <button className="btn fumub btn-lg ms-3 download-button" type="button">
          <i className="fab fa-apple"></i> Download
        </button>
        <button
          className="btn btn btn-outline-dark ms-2 btn-lg download-button"
          type="button"
        >
          <i className="fab fa-google-play"></i> Download
        </button>
      </div>
    </Fragment>
  );
}

export default Home;
