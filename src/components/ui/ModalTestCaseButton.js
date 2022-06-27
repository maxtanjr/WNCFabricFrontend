import {ReactComponent as AddIconSvg} from '../../images/add.svg';


const ModalTestCaseButton = (props) => {

    const selectTestCase = () => {
        
        props.setTestCaseTitle(props.title);
        props.setTestCaseVal(props.testCaseSelected);

        console.log(props.title + " selected, with mode value " + props.testCaseSelected);

        props.setModalState(false);
    }

    return (
        <div role="button" className="test-case-btn" onClick={selectTestCase}>
            <div className="test-case-btn-elem">
                <div className="test-case-btn-title">
                    {props.title}
                </div>
                <div className="test-case-btn-desc">
                    {props.description}
                </div>
            </div>
            <div className='test-case-btn-icon'>
                <AddIconSvg fill='#60d5dc'/>
            </div>
            
        </div>
    );
}

export default ModalTestCaseButton;