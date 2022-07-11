

const Input = (props) => {
    return (
        <div className='login-form-container'>
            {/* Using bootstrap styling under classname */}
            <label htmlFor={props.name} className='login-form-label'>{props.title}</label>
            <input type={props.type} className="login-form-box" style={{}} id={props.name} name={props.name} value={props.value} onChange={props.handleChange} placeholder={props.placeholder} autoComplete='off'></input>
            <div className={props.errorDiv}>{props.errorMsg}</div>
        </div>
    );
};

export default Input;