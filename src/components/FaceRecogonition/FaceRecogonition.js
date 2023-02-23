import React from "react";
import './FaceRecogonition.css';

const FaceRecoginition = ({ imageURL, box }) => {
    return (
        <div className="center">
            <div className="absolute mt2">
                <img id="inputImage" src={imageURL} width='300px' height='auto' alt="" />
                <div className="boundingBox" style={{ left: box.leftCol, right: box.rightCol, top: box.topRow, bottom: box.bottomRow }}>

                </div>
            </div>
        </div>
    )
}
export default FaceRecoginition;