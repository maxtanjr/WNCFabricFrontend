import '../../css/LiftCard.css';
import '../../css/Modal.css';
import {ReactComponent as DropdownSvg} from '../../images/dropdown.svg';
import React, { useState } from 'react';
import LiftModal from './LiftModal';

const LiftCard = (props) => {

    const [modalState, setModalState] = useState(false);
    // title of selected test case shown on the UI
    const [testCaseTitle, setTestCaseTitle] = useState("");
    // value associated with the test case. This is used to set the mode via MQTT payload (toggle test case)
    const [testCaseVal, setTestCaseVal] = useState("");

    const [isStopped, setStopped] = useState(false);

    const config = require("../../config/config.json");
    const toggleLiftTestCaseRoute = config.backendHost + ":" + config.backendPort + config.toggleLiftTestCaseRoute;


    
    // var arr = buildTestCaseArrays();
    // setTestCaseArr(arr);



    const openLiftModal = () => {
        setModalState(true);
    }

    const runTestCase = () => {
        // get the user from the local session storage
        var user = window.localStorage.getItem("user");

        console.log("Action by " + user);

        /**
         * POWER-SAVING, EMERGENCY-POWER, HOMED, SERVICING, ATTENDANT, OOO, FIRE, MANTRAP, CRIME, AGV, RESERVED, COBOT,
         * OVERLOAD, LIFT-DISCONNECTED, DOOR-CURTAIN-BLOCKED, DOOR-SAFETY-TRIGGER, EXTERNAL-CONTROL
         */

        var togglePayload = {
            'user': user + "_fabric",
            'id': (props.liftId).toString(),
            'test-case': testCaseVal,
            't': (Date.now()/1000).toString().split(".")[0],
        }

        const requestOpts = {
            method: "POST",
            body: JSON.stringify(togglePayload),
        }

        fetch(toggleLiftTestCaseRoute, requestOpts)
        .then((response) => {
            if (response.status !== 200) {
                console.log("Error calling toggle API");
                return;
            }
            else {
                // need to match the strings in the switch case of SimulatorThread.java (line 464)
                if (testCaseVal === "LIFT-DISCONNECTED") {
                    setStopped(true);
                } else {
                    setStopped(false);
                }
            }
        })
    }

    return (
        <div className='col'>

            <span id= {'lift-'+ props.liftId + '-card'}>
                
                <div className='sim-running'>

                    {isStopped 
                        ? <h2 style={{color:"white", fontSize:"24px", textAlign:"center"}}>Lift {props.liftId}-Disconnected</h2>
                        : <h2 style={{color:"white", fontSize:"22px", textAlign:"center"}}>Lift {props.liftId}</h2>
                    }
                    
                    <div className='rule mt-3 mb-4'></div>

                    <div className='row'>
                        <div className='data-container'>
                            <div className='my-1 data-box'>

                                    <div className='mx-4 my-1 data-box-row self-stretch'>
                                        <div className='field-box'>
                                            <label>Type</label>
                                        </div>
                                        
                                        <div className='mx-4 border-l self-stretch'></div>

                                        <div className='value-box'>
                                            {isStopped
                                                ? <label>Disconnected</label>
                                                : <label>{props.type}</label>
                                            }
                                        </div>   
                                    </div>

                                    <div className='mx-4 my-1 data-box-row self-stretch'>
                                        <div className='field-box'>
                                            <label>Building</label>
                                        </div>
                                        
                                        <div className='mx-4 border-l self-stretch'></div>

                                        <div className='value-box'>
                                            {isStopped
                                                ? <label>Disconnected</label>
                                                : <label>{props.building} North Coast</label>
                                            }
                                        </div>   
                                    </div>

                                    <div className='mx-4 my-1 data-box-row self-stretch'>
                                        <div className='field-box'>
                                            <label>Test Case</label>
                                        </div>
                                        
                                        <div className='mx-4 border-l self-stretch'></div>

                                        <div className='value-box'>
                                            {isStopped
                                                ? <label>Disconnected</label>
                                                : <label>{props.testCase}</label>
                                            }
                                        </div>   
                                    </div>  

                                    <div className='mx-4 my-1 data-box-row self-stretch'>
                                        <div className='field-box'>
                                            <label>Mode</label>
                                        </div>
                                        
                                        <div className='mx-4 border-l self-stretch'></div>

                                        <div className='value-box'>
                                            {isStopped
                                                ? <label>Disconnected</label>
                                                : <label>{props.mode}</label>
                                            }
                                        </div>   
                                    </div>  

                                    <div className='mx-4 my-1 data-box-row self-stretch'>
                                        <div className='field-box'>
                                            <label>Floor</label>
                                        </div>

                                        <div className='mx-4 border-l self-stretch'></div>
                                        
                                        <div className='value-box'>
                                            {isStopped
                                                ? <label>0</label>
                                                : <label>{props.floor}</label>
                                            }  
                                        </div> 

                                    </div>
                                    <div className='mx-4 my-1 data-box-row self-stretch'>
                                    
                                        <div className='field-box'>
                                            <label>Direction</label>
                                        </div>

                                        <div className='mx-4 border-l self-stretch'></div>

                                        <div className='value-box'>
                                            {isStopped
                                                ? <label>Disconnected</label>
                                                : <label>{props.moveStatus}</label>
                                            }
                                        </div>  

                                    </div>
                                    <div className='mx-4 my-1 data-box-row self-stretch'>
                                        <div className='field-box'>
                                            <label>Door Status</label>
                                        </div>

                                        <div className='mx-4 border-l self-stretch'></div>

                                        <div className='value-box'>
                                            {isStopped
                                                ? <label>Disconnected</label>
                                                : <label>{props.doorStatus}</label>
                                            }
                                        </div> 

                                    </div>
                                    <div className='mx-4 my-1 data-box-row self-stretch'>
                                        <div className='field-box'>
                                            <label>Door Mode</label>
                                        </div>

                                        <div className='mx-4 border-l self-stretch'></div>

                                        <div className='value-box'>
                                            {isStopped
                                                ? <label>Disconnected</label>
                                                : <label>{props.doorMode}</label>
                                            }
                                        </div> 

                                    </div>
                                    <div className='mx-4 my-1 data-box-row self-stretch'>
                                        <div className='field-box'>
                                            <label>Full-load?</label>
                                        </div>

                                        <div className='mx-4 border-l self-stretch'></div>

                                        <div className='value-box'>
                                            {isStopped
                                                ? <label>Disconnected</label>
                                                : <label>{props.loadStatus}</label>
                                            }
                                        </div>    

                                    </div>          
                            </div>
                        </div>
                    </div>

                    <div className='row mt-3'>
                        <div className='my-1 mode-select-container'>
                            <div style={{height: "40px", width: "200px", justifyContent:"center", alignItems:"center", marginLeft:"5px"}} className='data-box'>
                                <div style={{fontSize:"16px"}} id="testcasebox" name="testcasebox" className='mx-4 data-box-row'>
                                    
                                    <label id="testcaseval" name="testcaseval">
                                        {/* Get value from modal selection */}
                                        {testCaseTitle}
                                    </label>
                                </div>
                            </div>
                            <button id={'lift-select-button-'+props.liftId} name={'lift-select-button-'+props.liftId} onClick={openLiftModal} className='mode-select-button'>
                                <div className='mode-select-text'>Select</div>
                                <DropdownSvg style={{width:"24px"}} className='mode-select-text' fill="white"/>                                
                            </button>

                            {modalState 
                                ? <LiftModal id={'lift-'+props.liftId+'-box'} {...props} setModalState={setModalState} setTestCaseTitle={setTestCaseTitle} setTestCaseVal={setTestCaseVal}/> 
                                : null
                            }
                        </div>
                    </div>

                    
                    <div className='action-box'>
                        <button id='startbutton' name='startbutton' className='action-button' onClick={runTestCase}>Run</button>
                    </div>

                    
                </div>
                
            </span>
            
        </div>
    )
}

export default LiftCard;