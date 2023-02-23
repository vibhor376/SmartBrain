import React from "react";
import "./ImageLinkForm.css"
const ImageLinkForm = ({ searchChange, onBtnClick }) => {
    return (
        <div>
            <p className="f3" style={{
                color: 'white'
            }}> {'This magic brain will detect the faces in your pictures. Give it a try!!'}</p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input type="text" className="f4 pa2 w-70 center" onChange={searchChange} />
                    <button className="w-30 grow f4 link ph3 pv2 dib" onClick={onBtnClick}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;