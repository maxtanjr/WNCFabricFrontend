import React, { useState } from 'react';
import '../../css/CCTVCard.css';
import CctvModal from './CctvModal';

const CctvCard = (props) => {
    const [modalState, setModalState] = useState(false);
    const [isStopped, setStopped] = useState(false);

    const openVideoModal = () => {
        setModalState(true);
    }

    return (
        <div className='col'>
            <span id={'cctv-'+props.cctvId+'-card'}>
                <div className='cctv-sim-running'>
                    {isStopped 
                        ? <div className='cctv-device-title-container'>CCTV {props.cctvId}-Disconnected</div>
                        : <div className='cctv-device-title-container'>CCTV {props.cctvId}</div>
                    }

                    <div className='rule mt-3 mb-4'></div>

                    <div className='row'>
                        <div className='cctv-data-container'>
                            <div className='my-1 cctv-data-box'>

                                <div className='mx-4 my-1 cctv-data-box-row self-stretch'>
                                    <div className='field-box'>
                                        <label>Building</label>
                                    </div>
                                
                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='cctv-value-box'>
                                        {isStopped
                                            ? <label>Disconnected</label>
                                            : <label>{props.building} North Coast</label>
                                        }
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 cctv-data-box-row self-stretch'>
                                    <div className='cctv-field-box'>
                                        <label>Zone</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='cctv-value-box'>
                                        {isStopped
                                            ? <label>Disconnected</label>
                                            : <label>{props.zone}</label>
                                        }
                                    </div>   
                                </div>

                                <div className='mx-4 my-1 cctv-data-box-row self-stretch'>
                                    <div className='cctv-field-box'>
                                        <label>Level</label>
                                    </div>

                                    <div className='mx-4 border-l self-stretch'></div>

                                    <div className='cctv-value-box'>
                                        {isStopped
                                            ? <label>Disconnected</label>
                                            : <label>{props.level}</label>
                                        }
                                    </div>   
                                </div>

                            </div>
                        </div>

                        <div className='cctv-action-box'>
                            <button id='startbutton' name='startbutton' className='cctv-action-button' onClick={openVideoModal}>View</button>
                        </div>

                        {modalState 
                            ? <CctvModal id={'cctv-'+props.cctvId+'-box'} {...props} setModalState={setModalState}/> 
                            : null
                        }

                    </div>
                </div>        

            </span>
        </div>

    )
}

export default CctvCard;