import BusinessLogo from '../../../../assets/svg/business.svg';
import NationalWealthLogo from '../../../../assets/svg/nat-wealth.svg';
import React from 'react';
import ReactSVG from 'react-svg';
import ResourceLogo from '../../../../assets/svg/resource.svg';
import SportCultureLogo from '../../../../assets/svg/sportculture.svg';
import TourismLogo from '../../../../assets/svg/tourism.svg';

const AngleTooltip = ({
    data, 
    currencySymbol, 
    currencyRate,
    getHumanValue, 
    showTooltip, 
    onBarClick
}) => {
    return(
        <div 
            className={`Angle-Tooltip ${showTooltip ? 'show' :''}`}
            onClick={onBarClick}>
            <div className="arrow" />
            <div className="holder">
                <ReactSVG 
                    className={`angletooltip__icon`} 
                    src={BusinessLogo} />
                <p>Business {currencySymbol} {getHumanValue(data["BUSINESS AND FINANCE TOTAL"])}</p>
            </div>
            <div className="holder">
                <ReactSVG 
                    className={`angletooltip__icon`} 
                    src={ResourceLogo} />
                <p>Resource {currencySymbol} {getHumanValue(data["RESOURCE TOTAL"])}</p>
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
                <p>Sport & Culture {currencySymbol} {getHumanValue(data["SPORT & CULTURE TOTAL"])}</p>
            </div>
        </div>
    )
}

export default AngleTooltip;