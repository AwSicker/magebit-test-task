import React from "react";

import Logo_1 from "./images/logo_pineapple.png";
import Logo_2 from "./images/logo_pineapple2.png";
import "./header.scss";
import { headerItems } from "./headerItems";
import {useMediaQuery} from "react-responsive";

export const Header = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });

  return (
    <div className="Header">
      <nav className="Header__navbar">
        <a href="/">
          <img src={isDesktopOrLaptop ? Logo_1 : Logo_2} alt="logo" />
        </a>
        <ul className="Header__navbar_list">
          {headerItems.map((item) => {
            return (
              <li key={item.title} className="Header__navbar_list-item">
                <a href={item.link}>{item.title}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
