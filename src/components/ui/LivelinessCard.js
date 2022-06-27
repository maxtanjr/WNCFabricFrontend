import '../../css/Liveliness.css';
import {ReactComponent as StatusSvg} from '../../images/status.svg';

const LivelinessCard = (props) => {
    
    const renderContent = () => {

        var deviceId = props.deviceId;
        var type = props.type;
        var building = props.buildingVal;


        if (props.showOnlineSelected) {
            if (props.isAlive) {
                return (
                    <div className='alive-data-container'>
                        <div className='alive-value-box'>
                            {deviceId}
                        </div>
                        <div className='alive-value-box'>
                            {type}
                        </div>
                        <div className='alive-value-box'>
                            {building}
                        </div>
                        <div className='alive-value-box'>
                            <label> <StatusSvg fill='lime' /></label>
                        </div>
                    </div>
                )
            } else {
                return null;
            }
        } else {
            return (
                <div className='alive-data-container'>
                    <div className='alive-value-box'>
                        {deviceId}
                    </div>
                    <div className='alive-value-box'>
                        {type}
                    </div>
                    <div className='alive-value-box'>
                        {building}
                    </div>
                    <div className='alive-value-box'>
                        {props.isAlive 
                        ? <label> <StatusSvg fill='lime' /></label>
                        : <label> <StatusSvg fill='grey' /></label>
                        }
                        
                    </div>
                </div>
            )
        }
    }

    return (
        renderContent()
    )
}

export default LivelinessCard;