import React from "react";
import "./Logo.css"
import brain from "./brain.png";

const Logo = () => {
    return (

        <div className="back ma4 mt0 br2 shadow-2" style={{ height: '6.5rem', width: '6rem' }}>
            <img className="pa3" src={brain} alt="logo" style={{ height: "4.5rem", width: "4rem" }} />
        </div>

    )
}

export default Logo;