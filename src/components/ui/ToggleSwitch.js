import React from 'react'
import '../../css/ToggleSwitch.css'

const ToggleSwitch = (props) => {
    const toggleSwitch = () => {
        var flag = props.showOnlineSelected;
        props.setShowOnlineSelected(!flag);
    }

    return (
        <div className='toggle-switch-container'>
            <div className='toggle-switch-label'>
                Show Live
            </div>

            {props.showOnlineSelected
                ? <button id='toggle-btn' name='toggle-btn' className='toggle-show-online-button' onClick={toggleSwitch}>
                    <span className='toggle-show-online-knob'></span>
                </button>
                :<button id='toggle-btn' name='toggle-btn' className='toggle-show-all-button' onClick={toggleSwitch}>
                    <span className='toggle-show-all-knob'></span>
                </button>
            }
        </div>
    )
}

export default ToggleSwitch;