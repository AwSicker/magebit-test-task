import React from "react";
import { useMediaQuery } from "react-responsive";

import { Header } from "./Header";
import { Main } from "./Main";

import coolImage from "./images/image_summer.png";
import "./layout.scss";

export const Layout = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });

  return (
    <div className="Layout">
      <div className="Layout__header">
        <Header />
      </div>
      <div className="Layout__main">
        <Main />
      </div>

      {isDesktopOrLaptop && (
        <div className="Layout__content">
          <img src={coolImage} alt="coolImage" style={{ height: "100%" }} />
        </div>
      )}
    </div>
  );
};
