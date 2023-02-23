import React from "react";
import ParticlesBg from 'particles-bg';

const Rank = () => {
    return (
        <>
            <ParticlesBg type="lines" bg={true} />
            <div>
                <div className="w hite f4">
                    {"Vibhor your current rank is.."}
                </div>
                <div className="white f2">
                    {"#4"}
                </div>
            </div>
        </>
    )
}
export default Rank;