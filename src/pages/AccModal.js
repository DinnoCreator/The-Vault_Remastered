// import { Fragment } from "react";
import React, { useState, useRef } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AccModal() {
  const location = useLocation();
  let navigate = useNavigate();

  //state for copy account number button
  const [copySuccess, setCopySuccess] = useState("");

  //state for showing modal on load
  const [show, setShow] = useState(true);

  const accNo = useRef(null);

  //copy to clipboard handler
  function copyToClipboard(e) {
    const copyText = accNo.current.value;
    navigator.clipboard.writeText(copyText);
    setCopySuccess(!copySuccess);
  }

  //sends to home
  function handleHome() {
    navigate("/");
  }
  //sends to create
  function handleCreate() {
    navigate("/create");
  }
  //sends to online banking sign up
  function handleOnline() {
    navigate("/dashboard");
  }
  //sends to customers accounts
  function handleAccounts() {
    navigate("/admindashboard");
  }

  //variable for copy accNo button display text
  const linkName = copySuccess ? "Copied!" : "Copy AccNumber";

  if (location.state === "Successful") {
    return (
      <>
        <Modal show={show} backdrop="static" centered>
          <Modal.Header>
            <Modal.Title>
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Transaction Successful!
              </h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="centree">
              <h3>Transaction Successful! 😁👍</h3>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleOnline}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else if(location.state === "Deleted") {
    return (
      <>
        <Modal show={show} backdrop="static" centered>
          <Modal.Header>
            <Modal.Title>
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Transaction Reversed
              </h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="centree">
              <h3>Transaction Reversed Successfully😁👍</h3>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleAccounts}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else if (location.state === "Email Already exists") {
    return (
      <>
        <Modal show={show} backdrop="static" centered>
          <Modal.Header>
            <Modal.Title>
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Registration Failed!
              </h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="centree">
              <h3>Customer already exists!</h3>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleHome}>
              Home
            </Button>
            <Button variant="primary" onClick={handleCreate}>
              Try Again
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <Modal show={show} backdrop="static" centered>
          <Modal.Header>
            <Modal.Title>
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Registration Successful!
              </h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="centree">
              <strong>
                <h1>Account Details</h1>
              </strong>
              <input
                type="hidden"
                ref={accNo}
                value={location.state.accNo}
              ></input>
              <h3>{location.state.accNo}</h3>
              <h3>{location.state.accName}</h3>
              <h3>{location.state.accType}</h3>
              <button
                type="button"
                className="btn btn-success"
                onClick={copyToClipboard}
              >
                {linkName}
              </button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleOnline}>
              Online Banking
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default AccModal;
