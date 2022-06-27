import React, {Fragment, useRef, useState} from "react";
import ReactDOM from 'react-dom';
import VideoFeed from "./CctvVideoFeed";
import '../../css/CCTV.css'


const CctvModal = (props) => {

    // Originating from CCTV.js
    const cctvId = props.cctvId;
    const videoUrl = props.url;
    const name = props.name;
    const building = props.building;
    const zone = props.zone;
    const level = props.level;

    // close the modal by clicking outside of it
    const modalRef = useRef();

    const closeModalOutside = (evt) => {
        if (evt.target === modalRef.current) {
            props.setModalState(false);
        }
    }

    const closeModal = () => {
        props.setModalState(false);
    }

    

    // render the modal JSX in the portal div defined in index.html
    return ReactDOM.createPortal(
        <div id={'cctv-' + cctvId + '-portal-container'} className="cctv-portal-container" ref={modalRef} onClick={closeModalOutside}>
            
            <div id={'cctv-' + cctvId + '-container-modal'} className="cctv-modal">

                <div className="header-box">
                    <h2 style={{fontSize:"20px"}}>{name}:&nbsp;&nbsp;Level {level} of {building} North Coast</h2>
                    <button onClick={closeModal}>Close</button>
                </div>

                <div className="test-case-container">
                    <VideoFeed
                        src = {videoUrl}
                    />
                </div>

                
            </div>
        </div>,
        document.getElementById("root")
    );

}

export default CctvModal;
