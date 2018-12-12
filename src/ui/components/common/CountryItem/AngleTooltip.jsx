import React from 'react';
import ReactSVG from 'react-svg';
import ResourceLogo from '../../../../assets/svg/resource.svg';
import SportCultureLogo from '../../../../assets/svg/sportculture.svg';
import TourismLogo from '../../../../assets/svg/tourism.svg';
import BusinessLogo from '../../../../assets/svg/business.svg';
import NationalWealthLogo from '../../../../assets/svg/nat-wealth.svg';


const AngleTooltip = ({data, currencySymbol, getHumanValue}) => {
    return(
        <div 
            className={`Angle-Tooltip ${showTooltip ? 'show' :''}`}
            onClick={onBarClick}>
            <div className="arrow" />
            <div className="holder">
                <ReactSVG 
                    className={`angletooltip__icon`} 
                    src={NationalWealthLogo} />
                <p>National Wealth {currencySymbol} {getHumanValue(data["National Net Wealth"])}</p>
            </div>
            <div className="holder">
                <ReactSVG 
                    className={`angletooltip__icon`} 
                    src={BusinessLogo} />
                <p>Business {currencySymbol} {getHumanValue(data["Business (Top Bank and Company)"])}</p>
            </div>
            <div className="holder">
                <ReactSVG 
                    className={`angletooltip__icon`} 
                    src={ResourceLogo} />
                <p>Resource {currencySymbol} {getHumanValue(data["Resource (Gold and FX Reserves)"])}</p>
            </div>
            <div className="holder">
                <ReactSVG 
                    className={`angletooltip__icon`} 
                    src={TourismLogo} />
                <p>Tourism {currencySymbol} {getHumanValue(data["Tourism Receipts"])}</p>
            </div>
            <div className="holder">
                <ReactSVG 
                    className={`angletooltip__icon`} 
                    src={SportCultureLogo} />
                <p>Sport & Culture {currencySymbol} {getHumanValue(data["Sport & Culture (Top Footballer and Piece of Art)"])}</p>
            </div>
        </div>
    )
}

export default AngleTooltip;