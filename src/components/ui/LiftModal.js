import React, {Fragment, useRef, useState} from "react";
import ReactDOM from 'react-dom';
import ModalTestCaseButton from "./ModalTestCaseButton";

const LiftModal = (props) => {

    // Originating from Lift.js
    var testCaseArr = props.testCaseArr;

    const liftId = parseInt(props.liftId);

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


    /**
     * POWER-SAVING, EMERGENCY-POWER, HOMED, SERVICING, ATTENDANT, OOO, FIRE, MANTRAP, CRIME, AGV, RESERVED, COBOT,
     * OVERLOAD, LIFT-DISCONNECTED, DOOR-CURTAIN-BLOCKED, DOOR-SAFETY-TRIGGER, EXTERNAL-CONTROL
     */

    // render the modal JSX in the portal div defined in index.html
    return ReactDOM.createPortal(
        <div id={'lift-' + liftId + '-portal-container'} className="portal-container" ref={modalRef} onClick={closeModalOutside}>
            
            <div id={'lift-' + liftId + '-container-modal'} className="modal">

                <div className="header-box">
                    <h2 style={{fontSize:"20px"}}>Select Test Case for Lift {liftId}</h2>
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

export default LiftModal;
