import '../../css/FcuCard.css';
import '../../css/Modal.css';
import {ReactComponent as DropdownSvg} from '../../images/dropdown.svg';
import React, { useState } from 'react';
import BmsModal from './BmsModal';

const BmsFcuCard = (props) => {
    const [modalState, setModalState] = useState(false);
    // title of selected test case shown on the UI
    const [testCaseTitle, setTestCaseTitle] = useState("");
    // value associated with the test case. This is used to set the mode via MQTT payload (toggle test case)
    const [testCaseVal, setTestCaseVal] = useState("");

    const config = require("../../config/config.json");
    const toggleFcuTestCaseRoute = config.backendHost + ":" + config.backendPort + config.toggleFcuTestCaseRoute;

    const openModal = () => {
        setModalState(true);
    }

    const runTestCase = () => {
        // get the user from the local session storage
        var user = window.localStorage.getItem("user");

        console.log("Action by " + user);

        var togglePayload = {
            'user': user + "_fabric",
            'id': (props.id).toString(),
            'test-case': testCaseVal,
            't': (Date.now()/1000).toString().split(".")[0],
        }

        const requestOpts = {
            method: "POST",
            body: JSON.stringify(togglePayload),
        }

        fetch(toggleFcuTestCaseRoute, requestOpts)
        .then((response) => {
            if (response.status !== 200) {
                console.log("Error calling toggle API");
                return;
            }
        })
    }


    return (
        <div className='col'>
            <span id={'fcu-'+props.deviceId+'-card'}>
                <div className='fcu-sim-running'>
                    
                    <div className='fcu-device-title-container'>{props.deviceId}</div>
                    
                    <div className='rule mt-3 mb-4'></div>

                    <div className='row'>
                        <div className='fcu-data-container'>
                            <div className='my-1 fcu-data-box'>

                                <div className='mx-4 my-1 fcu-data-box-row self-stretch'>
                                    <div className='fcu-field-box'>
                                        <label>Type</label>
                                    </div>
                                
                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='fcu-value-box'>
                                         <label>{props.type}</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 fcu-data-box-row self-stretch'>
                                    <div className='fcu-field-box'>
                                        <label>Building</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='fcu-value-box'>
                                        <label>{props.building} North Coast</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 fcu-data-box-row self-stretch'>
                                    <div className='fcu-field-box'>
                                        <label>Level</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='fcu-value-box'>
                                        <label>{props.level}</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 fcu-data-box-row self-stretch'>
                                    <div className='fcu-field-box'>
                                        <label>Test Case</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='fcu-value-box'>
                                        <label>{props.testCase}</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 fcu-data-box-row self-stretch'>
                                    <div className='fcu-field-box'>
                                        <label>CMD</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='fcu-value-box'>
                                        <label>{props.cmd}</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 fcu-data-box-row self-stretch'>
                                    <div className='fcu-field-box'>
                                        <label>Status</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='fcu-value-box'>
                                        <label>{props.status}</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 fcu-data-box-row self-stretch'>
                                    <div className='fcu-field-box'>
                                        <label>Trip</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='fcu-value-box'>
                                        <label>{props.trip}</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 fcu-data-box-row self-stretch'>
                                    <div className='fcu-field-box'>
                                        <label>SW Mode</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='fcu-value-box'>
                                        <label>{props.swMode}</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 fcu-data-box-row self-stretch'>
                                    <div className='fcu-field-box'>
                                        <label>Air Flow (St)</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='fcu-value-box'>
                                        <label>{props.airflowst}</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 fcu-data-box-row self-stretch'>
                                    <div className='fcu-field-box'>
                                        <label>Rat</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='fcu-value-box'>
                                        <label>{props.rat}</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 fcu-data-box-row self-stretch'>
                                    <div className='field-box'>
                                        <label>Rat (Sp)</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='fcu-value-box'>
                                        <label>{props.ratSp}</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 fcu-data-box-row self-stretch'>
                                    <div className='fcu-field-box'>
                                        <label>MV Mode</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='fcu-value-box'>
                                        <label>{props.mvMode}</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 fcu-data-box-row self-stretch'>
                                    <div className='fcu-field-box'>
                                        <label>MV CMD</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='fcu-value-box'>
                                        <label>{props.mvCmd}</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 fcu-data-box-row self-stretch'>
                                    <div className='fcu-field-box'>
                                        <label>UNMCH Alarm</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='fcu-value-box'>
                                        <label>{props.unmchAlarm}</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 fcu-data-box-row self-stretch'>
                                    <div className='fcu-field-box'>
                                        <label>Water Leak Alarm</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='fcu-value-box'>
                                        <label>{props.waterLeakAlarm}</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 fcu-data-box-row self-stretch'>
                                    <div className='fcu-field-box'>
                                        <label>Runtime</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='fcu-value-box'>
                                        <label>{props.runtime}</label>
                                    </div>   
                                </div>


                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='my-1 fcu-mode-select-container'>
                                <div style={{height: "70px", width: "200px", justifyContent:"center", alignItems:"center", marginLeft:"5px"}} className='fcu-data-box'>
                                    <div style={{fontSize:"16px"}} id="testcasebox" name="testcasebox" className='mx-4 fcu-data-box-row'>
                                        
                                        <label id="testcaseval" name="testcaseval">
                                            {/* Get value from modal selection */}
                                            {testCaseTitle}
                                        </label>
                                    </div>
                                </div>
                                <button id={'fcu-select-button-'+props.deviceId} name={'fcu-select-button-'+props.deviceId} onClick={openModal} className='fcu-mode-select-button'>
                                    <div className='mode-select-text'>Select</div>
                                    <DropdownSvg style={{width:"24px"}} className='mode-select-text' fill="white"/>                                
                                </button>
                            </div>
                        </div>

                        

                        <div className='fcu-action-box'>
                            <button id='startbutton' name='startbutton' className='fcu-action-button' onClick={runTestCase}>Run</button>
                        </div>

                        {modalState 
                            ? <BmsModal id={'fcu-'+props.deviceId+'-box'} {...props} setModalState={setModalState} setTestCaseTitle={setTestCaseTitle} setTestCaseVal={setTestCaseVal}/> 
                            : null
                        }

                    </div>
                </div>        

            </span>
        </div>

    )

}

export default BmsFcuCard;