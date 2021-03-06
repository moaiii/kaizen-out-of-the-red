import Humanize from 'humanize-plus';
import React from 'react';

export const TooltipOther = ({
  dataProps, 
  currencySymbol, 
  currencyRate, 
  setModalIsActive
}) => {
    return (
        <div className="details__tooltip">
          {
            dataProps.map( (x, index) => {
              let $ = typeof x[1] === 'number'
                ? `${x[0] !== "GOLD Tonnes" ? currencySymbol : ""} ${Humanize.compactInteger(Math.ceil((x[1] * currencyRate)), 1)}`
                : x[1];

              return(
                <span className={'item'} key={`${index}-tooltip-country-detail`}>
                  <p className={`a`}>{x[0].toLowerCase()}</p>
                  <p className={`angle`}> - </p>
                  <p className={`b`}>{$}</p>
                </span>
              )
            })
          }
            <button onClick={() => setModalIsActive(false)}>
              <h2>Close X</h2>  
            </button>        
          </div>
    )
}
