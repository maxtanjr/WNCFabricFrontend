import '../../css/TanksCard.css';
import '../../css/Modal.css';
import {ReactComponent as DropdownSvg} from '../../images/dropdown.svg';
import React, { useState } from 'react';
import BmsModal from './BmsModal';

const BmsTanksCard = (props) => {
    const [modalState, setModalState] = useState(false);
    // title of selected test case shown on the UI
    const [testCaseTitle, setTestCaseTitle] = useState("");
    // value associated with the test case. This is used to set the mode via MQTT payload (toggle test case)
    const [testCaseVal, setTestCaseVal] = useState("");

    const config = require("../../config/config.json");
    const toggleTanksTestCaseRoute = config.backendHost + ":" + config.backendPort + config.toggleTanksTestCaseRoute;

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

        fetch(toggleTanksTestCaseRoute, requestOpts)
        .then((response) => {
            if (response.status !== 200) {
                console.log("Error calling toggle API");
                return;
            }
        })
    }


    return (
        <div className='col'>
            <span id={'tanks-'+props.deviceId+'-card'}>
                <div className='tanks-sim-running'>
                    
                    <div className='tanks-device-title-container'>{props.deviceId}</div>
                    
                    <div className='rule mt-3 mb-4'></div>

                    <div className='row'>
                        <div className='tanks-data-container'>
                            <div className='my-1 tanks-data-box'>

                                <div className='mx-4 my-1 tanks-data-box-row self-stretch'>
                                    <div className='tanks-field-box'>
                                        <label>Type</label>
                                    </div>
                                
                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='tanks-value-box'>
                                         <label>{props.type}</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 tanks-data-box-row self-stretch'>
                                    <div className='tanks-field-box'>
                                        <label>Building</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='tanks-value-box'>
                                        <label>{props.building} North Coast</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 tanks-data-box-row self-stretch'>
                                    <div className='tanks-field-box'>
                                        <label>Level</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='tanks-value-box'>
                                        <label>{props.level}</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 tanks-data-box-row self-stretch'>
                                    <div className='tanks-field-box'>
                                        <label>Test Case</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='tanks-value-box'>
                                        <label>{props.testCase}</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 tanks-data-box-row self-stretch'>
                                    <div className='tanks-field-box'>
                                        <label>Low Level Alarm</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='tanks-value-box'>
                                        <label>{props.lowAlarm}</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 tanks-data-box-row self-stretch'>
                                    <div className='tanks-field-box'>
                                        <label>High Level Alarm</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='tanks-value-box'>
                                        <label>{props.highAlarm}</label>
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 tanks-data-box-row self-stretch'>
                                    <div className='tanks-field-box'>
                                        <label>Overflow Alarm</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='tanks-value-box'>
                                        <label>{props.overflowAlarm}</label>
                                    </div>   
                                </div>


                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='my-1 tanks-mode-select-container'>
                                <div style={{height: "70px", width: "200px", justifyContent:"center", alignItems:"center", marginLeft:"5px"}} className='tanks-data-box'>
                                    <div style={{fontSize:"16px"}} id="testcasebox" name="testcasebox" className='mx-4 tanks-data-box-row'>
                                        
                                        <label id="testcaseval" name="testcaseval">
                                            {/* Get value from modal selection */}
                                            {testCaseTitle}
                                        </label>
                                    </div>
                                </div>
                                <button id={'tanks-select-button-'+props.deviceId} name={'tanks-select-button-'+props.deviceId} onClick={openModal} className='tanks-mode-select-button'>
                                    <div className='tanks-mode-select-text'>Select</div>
                                    <DropdownSvg style={{width:"24px"}} className='tanks-mode-select-text' fill="white"/>                                
                                </button>
                            </div>
                        </div>

                        

                        <div className='tanks-action-box'>
                            <button id='startbutton' name='startbutton' className='tanks-action-button' onClick={runTestCase}>Run</button>
                        </div>

                        {modalState 
                            ? <BmsModal id={'tanks-'+props.deviceId+'-box'} {...props} setModalState={setModalState} setTestCaseTitle={setTestCaseTitle} setTestCaseVal={setTestCaseVal}/> 
                            : null
                        }

                    </div>
                </div>        

            </span>
        </div>

    )

}

export default BmsTanksCard;