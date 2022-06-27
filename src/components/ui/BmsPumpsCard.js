import '../../css/PumpsCard.css';
import '../../css/Modal.css';
import {ReactComponent as DropdownSvg} from '../../images/dropdown.svg';
import React, { useState } from 'react';
import BmsModal from './BmsModal';

const BmsPumpsCard = (props) => {
    const [modalState, setModalState] = useState(false);
    // title of selected test case shown on the UI
    const [testCaseTitle, setTestCaseTitle] = useState("");
    // value associated with the test case. This is used to set the mode via MQTT payload (toggle test case)
    const [testCaseVal, setTestCaseVal] = useState("");

    const config = require("../../config/config.json");
    const togglePumpsTestCaseRoute = config.backendHost + ":" + config.backendPort + config.toggleBmsTestCaseRoute;

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

        fetch(togglePumpsTestCaseRoute, requestOpts)
        .then((response) => {
            if (response.status !== 200) {
                console.log("Error calling toggle API");
                return;
            }
        })
    }


    return (
        <div className='col'>
            <span id={'pumps-'+props.deviceId+'-card'}>
                <div className='pumps-sim-running'>
                    
                    <div className='pumps-device-title-container'>Pump {props.deviceId}</div>
                    
                    <div className='rule mt-3 mb-4'></div>

                    <div className='row'>
                        <div className='pumps-data-container'>
                            <div className='my-1 pumps-data-box'>

                                <div className='mx-4 my-1 pumps-data-box-row self-stretch'>
                                    <div className='pumps-field-box'>
                                        <label>Type</label>
                                    </div>
                                
                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='pumps-value-box'>
                                         <label>{props.type}</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 pumps-data-box-row self-stretch'>
                                    <div className='pumps-field-box'>
                                        <label>Building</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='pumps-value-box'>
                                        <label>{props.building} North Coast</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 pumps-data-box-row self-stretch'>
                                    <div className='pumps-field-box'>
                                        <label>Level</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='pumps-value-box'>
                                        <label>{props.level}</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 pumps-data-box-row self-stretch'>
                                    <div className='pumps-field-box'>
                                        <label>Test Case</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='pumps-value-box'>
                                        <label>{props.testCase}</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 pumps-data-box-row self-stretch'>
                                    <div className='pumps-field-box'>
                                        <label>Status</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='pumps-value-box'>
                                        <label>{props.status}</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 pumps-data-box-row self-stretch'>
                                    <div className='pumps-field-box'>
                                        <label>Trip</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='pumps-value-box'>
                                        <label>{props.trip}</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 pumps-data-box-row self-stretch'>
                                    <div className='pumps-field-box'>
                                        <label>Kw</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='pumps-value-box'>
                                        <label>{props.kw}</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 pumps-data-box-row self-stretch'>
                                    <div className='pumps-field-box'>
                                        <label>Kwh</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='pumps-value-box'>
                                        <label>{props.kwh}</label>
                                    </div>   
                                </div>

                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='my-1 pumps-mode-select-container'>
                                <div style={{height: "70px", width: "200px", justifyContent:"center", alignItems:"center", marginLeft:"5px"}} className='pumps-data-box'>
                                    <div style={{fontSize:"16px"}} id="testcasebox" name="testcasebox" className='mx-4 pumps-data-box-row'>
                                        
                                        <label id="testcaseval" name="testcaseval">
                                            {/* Get value from modal selection */}
                                            {testCaseTitle}
                                        </label>
                                    </div>
                                </div>
                                <button id={'pumps-select-button-'+props.deviceId} name={'pumps-select-button-'+props.deviceId} onClick={openModal} className='pumps-mode-select-button'>
                                    <div className='pumps-mode-select-text'>Select</div>
                                    <DropdownSvg style={{width:"24px"}} className='pumps-mode-select-text' fill="white"/>                                
                                </button>
                            </div>
                        </div>

                        

                        <div className='pumps-action-box'>
                            <button id='startbutton' name='startbutton' className='pumps-action-button' onClick={runTestCase}>Run</button>
                        </div>

                        {modalState 
                            ? <BmsModal id={'pumps-'+props.deviceId+'-box'} {...props} setModalState={setModalState} setTestCaseTitle={setTestCaseTitle} setTestCaseVal={setTestCaseVal}/> 
                            : null
                        }

                    </div>
                </div>        

            </span>
        </div>

    )

}

export default BmsPumpsCard;