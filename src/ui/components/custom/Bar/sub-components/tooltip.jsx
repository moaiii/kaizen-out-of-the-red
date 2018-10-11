import React from 'react';
import ReactSVG from "react-svg";

export const Tootip = ({ data, handleCTAClick }) => {

  return(
    <div className={`Tooltip`} >
      <div className="header"></div>
      <div className="body">
        <div className="country">
          <ReactSVG path={null}/>
          <p className="country-name"></p>
        </div>
        <div className="items">
          <div className="amount"></div>
          <div className="percentage"></div>
          <div className="leftover"></div>
        </div>
        <div className="cta">
          <button onClick={handleCTAClick}>
            View country >
          </button>
        </div>
      </div>
    </div>
  )
}