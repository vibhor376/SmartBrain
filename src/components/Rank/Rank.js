import React from "react";
import ParticlesBg from 'particles-bg';
const Rank = ({ user }) => {
    return (
        <>
            <ParticlesBg type="cobweb" bg={{
                position: "fixed",
                zIndex: -1,
                top: 0,
                left: 0,
            }} />
            <div>
                <div className="white f4">
                    {`${user.name} your current rank is..`}
                </div>
                <div className="white f2">
                    {`${user.entries}`}
                </div>
            </div>
        </>
    )
}
export default Rank;