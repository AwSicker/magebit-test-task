import React, { useState } from "react";

import { socialMediasItems } from "./socialMedias";
import successImage from "./images/ic_success.png";

import "./main.scss";
import { db, myTimestamp } from "../../../server/firebase";

export const Main = () => {
  const [emailValue, setEmailValue] = useState("");
  const [success, setSuccess] = useState(false);
  const [wrongEmail, setWrongEmail] = useState("");
  const [noEmailError, setNoEmailError] = useState("");
  const [errorColumbianEmail, setErrorColumbianEmail] = useState("");
  const [disabled, setDisabled] = useState(false);

  const emailHandler = (e) => {
    setEmailValue(e.target.value);

    const valueToString = String(e.target.value);
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const blockColumbianEmails = valueToString.endsWith(".co");
    if (!valueToString.match(re)) {
      setWrongEmail("Wrong email format");
      setDisabled(true);
    } else {
      setWrongEmail("");
      setDisabled(false);
    }

    if (blockColumbianEmails) {
      setErrorColumbianEmail(
        "We are not accepting subscriptions from Colombia emails"
      );
      setDisabled(true);
    } else {
      setDisabled(false);
      setErrorColumbianEmail("");
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (emailValue.length === 0) {
      setNoEmailError("Email address is required");
      return 0;
    } else {
      setNoEmailError("");
    }

    if (
      noEmailError === "Email address is required" ||
      wrongEmail === "Wrong email format" ||
      errorColumbianEmail ===
        "We are not accepting subscriptions from Colombia emails"
    ) {
      return 0;
    }

    await db.collection("subscribers").doc().set({
      email: emailValue.toLowerCase(),
      createdAt: myTimestamp,
    });
    setSuccess(true);
  };

  return (
    <div className={`${!success ? `Main` : `success`}`}>
      <div className="Main__wrapper">
      {!success ? (
        <div className="Main__header">
          <p className="Main__header_title">Subscribe to newsletter</p>
          <p className="Main__header_text">
            Subscribe to our newsletter and get 10% discount on pineapple
            glasses.
          </p>
        </div>
      ) : (
        <div className="Main__header_success">
          <img
            src={successImage}
            alt="successImage"
            className="Main__header_img"
          />
          <p className="Main__header_title">Thanks for subscribing!</p>
          <p className="Main__header_text">
            You have successfully subscribed to our email listing. Check your
            email for the discount code.
          </p>
        </div>
      )}
      {!success ? (
        <div className="Main__form">
          <form onSubmit={(e) => onSubmitHandler(e)}>
            <div className="Main__form_inputWrapper">
              <input
                type="email"
                onChange={(e) => emailHandler(e)}
                value={emailValue}
                className="Main__form_input"
                placeholder="Type your email address here…"
                name="email"
              />
              <input type="submit" value="" disabled={disabled} />
            </div>
            {wrongEmail || errorColumbianEmail || noEmailError}
            <div className="Main__form_checkbox">
              <input
                className="custom-checkbox"
                type="checkbox"
                id="agree"
                name="agree"
                required
              />
              <label htmlFor="agree" />
              <span className="Main__form_checkbox-text">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}I agree
                to <a href="#">terms of service</a>
              </span>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
      <hr className="Main__divider" />
      <div className="Main__socialMedia">
        <ul className="Main__socialMedia_list">
          {socialMediasItems.map((item) => {
            return (
              <li
                className={`Main__socialMedia_list-item-${item.class}`}
                key={item.class}
              >
                <a href={item.link}>{item.icon}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
    </div>
  );
};
