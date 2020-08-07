import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";
import ladingImg from "../../assets/images/landing.svg";
import studyIcon from "../../assets/images/icons/study.svg";
import giveClassesIcon from "../../assets/images/icons/give-classes.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";

import "./style.css";

import api from "../../services/api";

export default function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get("connections").then((response) => {
      const { total } = response.data;

      setTotalConnections(total);
    });
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Proffy" />
          <h2>Your online study platform</h2>
        </div>

        <img
          src={ladingImg}
          alt="Online study platform"
          className="hero-image"
        />

        <div className="buttons-container">
          <Link to="/learn" className="learn">
            <img src={studyIcon} alt="learn" />
            Learn
          </Link>

          <Link to="/teach" className="teach">
            <img src={giveClassesIcon} alt="teach" />
            Teach
          </Link>
        </div>

        <span className="total-connections">
          Total of {totalConnections} connections
          <img src={purpleHeartIcon} alt="purple heart" />
        </span>
      </div>
    </div>
  );
}
