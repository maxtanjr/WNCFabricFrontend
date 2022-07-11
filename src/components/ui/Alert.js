// npm install react-confirm-alert --save

// function that accepts arguments
const Alert = (props) => {
    return(
        <div className={`alert ${props.alertType}`} role="alert">
            {props.alertMessage}
        </div>
    );
}

export default Alert;