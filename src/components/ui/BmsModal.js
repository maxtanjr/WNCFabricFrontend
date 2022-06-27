import React, {Fragment, useRef, useState} from "react";
import ReactDOM from 'react-dom';
import ModalTestCaseButton from "./ModalTestCaseButton";
import '../../css/Bms.css';

const BmsModal = (props) => {
    
    var testCaseArr = props.testCaseArr;

    const deviceId = parseInt(props.deviceId);
    const type = props.type.toLowerCase();

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
        <div id={'bms-' + type + '-' + deviceId + '-portal-container'} className="bms-portal-container" ref={modalRef} onClick={closeModalOutside}>
            
            <div id={'bms-' + type + '-' + deviceId + '-container-modal'} className="bms-modal">

                <div className="header-box">
                    <h2 style={{fontSize:"20px"}}>Select Test Case</h2>
                    <button onClick={closeModal}>Close</button>
                </div>

                <div className="test-case-container">
                    {testCaseArr.map((testCase) => (
                        
                        <ModalTestCaseButton id={testCase["id"]}
                            title={testCase["title"]}
                            description={testCase["description"]}
                            testCaseSelected={testCase["value"]}
                            {...props}
                        />
                        
                    ))}

                </div>

                
            </div>
        </div>,
        document.getElementById("root")
    );

}

export default BmsModal;
