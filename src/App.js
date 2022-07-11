import './css/App.css';
import "@fontsource/space-grotesk";
import {ReactComponent as HomeSvg} from './images/home.svg';
import {ReactComponent as LiftSvg} from './images/lift.svg';
import {ReactComponent as BmsSvg} from './images/bms.svg';
import {ReactComponent as CctvSvg} from './images/cctv.svg';
import {ReactComponent as LoginSvg} from './images/login.svg';


import React, { useState, useEffect, Fragment } from 'react'
import {HashRouter as Router, Switch, Route, Link} from 'react-router-dom';

// import components of our pages here
import Login from './components/Login';
import Home from './components/Home';
import Lift from './components/Lift';
import CCTV from './components/CCTV';
import BmsBtu from './components/BmsBtu';
import BmsFcu from './components/BmsFcu';
import BmsPumps from './components/BmsPumps';
import BmsTanks from './components/BmsTanks';


let App = () => {

  const [jwt, setJwt] = useState("");
  const [user, setUser] = useState("");

  // will render the page again when jwt changes
  useEffect(() => {
    let token = window.localStorage.getItem("jwt");
    if (token) {
      // check if the user is already logged in. If not, try and log the user in again
      if (jwt === "") {
        setJwt(JSON.parse(token));
      }
    }
  }, [jwt]);


  const renderLoginButton = () => (
    <Fragment>
      {jwt === "" 
      
      ? <Link to="/login" className='login-button link' role={"button"}>
            <div className='login-button-elem'>       
                <div style={{marginLeft:"5px", marginRight:"10px"}} className='login-button-label'>
                    Login
                </div>
                <LoginSvg fill='white' style={{height: 24, width: 24}} />
            </div>
        </Link>
                
      : <Link to="/logout" className='login-button link' role={"button"} onClick={logout}> 
          <LoginSvg fill='white' style={{height: 24, width: 24}}/>
          <div style={{marginLeft:"10px", marginRight:"5px"}} className='login-button-label'>
              Logout
          </div>

        </Link>  
        
      }
    </Fragment>
  );


  let logout = () => {
    setJwt("");
    setUser("");
    window.localStorage.removeItem("jwt");
    window.localStorage.removeItem("user");
  };

  let handleSessionChange = (loginJsonResponse) => {
    setJwt(loginJsonResponse["jwt"]);
    setUser(loginJsonResponse["user"]);
  }


  let loginButton = renderLoginButton();

  return (
    // everything that we want to be routed must be wrapped in this tag
    <Router>
      <div className='container'>
        <div className='header-container'>

          <div className='title-container'>
            <h1 className='title mt-3'>
              Fabric
            </h1>
          </div>

          <div className='login-button-container'>
            {loginButton}
          </div>
        </div>

        <div className='rule mt-3 mb-4'></div>

        <div className='nav-sidebar-container'>
          <div className='nav-sidebar-box'>

            <div className='nav-sidebar-btn' role={"button"}>
              <Link to="/" className="nav-sidebar-btn-link">
                <div className = 'nav-sidebar-btn-elem'>
                  <HomeSvg fill='white' style={{height:24, width:24}} />

                  <div className='nav-sidebar-btn-label'>
                    Home
                  </div>
                </div>
              </Link>
            </div>

            {jwt !== "" &&
              <Fragment>
                <div className='nav-sidebar-btn' role={"button"}>
                    <Link to="/admin/lifts" className='nav-sidebar-btn-link'>
                        <LiftSvg fill='white' style={{height: 24, width: 24}}/>
                        <div className='nav-sidebar-btn-label'>
                            Lifts
                        </div>
                    </Link>
                </div>

                <div className='nav-sidebar-btn' role={"button"}>
                    <Link to="/admin/acmv/btu" className='nav-sidebar-btn-link'>
                        <BmsSvg fill='white' style={{height: 24, width: 24}}/>
                        <div className='nav-sidebar-btn-label'>
                            ACMV-BTU
                        </div>
                    </Link>
                </div>

                <div className='nav-sidebar-btn' role={"button"}>
                    <Link to="/admin/acmv/fcu" className='nav-sidebar-btn-link'>
                        <BmsSvg fill='white' style={{height: 24, width: 24}}/>
                        <div className='nav-sidebar-btn-label'>
                            ACMV-FCU
                        </div>
                    </Link>
                </div>

                <div className='nav-sidebar-btn' role={"button"}>
                    <Link to="/admin/pns/pumps" className='nav-sidebar-btn-link'>
                        <BmsSvg fill='white' style={{height: 24, width: 24}}/>
                        <div className='nav-sidebar-btn-label'>
                            PNS-Pumps
                        </div>
                    </Link>
                </div>

                <div className='nav-sidebar-btn' role={"button"}>
                    <Link to="/admin/pns/tanks" className='nav-sidebar-btn-link'>
                        <BmsSvg fill='white' style={{height: 24, width: 24}}/>
                        <div className='nav-sidebar-btn-label'>
                            PNS-Tanks
                        </div>
                    </Link>
                </div>

                <div className='nav-sidebar-btn' role={"button"}>
                    <Link to="/admin/cctv" className='nav-sidebar-btn-link'>
                        <CctvSvg fill='white' style={{height: 24, width: 24}}/>
                        <div className='nav-sidebar-btn-label'>
                            CCTV
                        </div>
                    </Link>
                </div>

              </Fragment>
            }

          </div>
        </div>

        <div className='card-container'>
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route exact path="/admin" component={(props) => <Home {...props} jwt={jwt} />} />
            <Route exact path="/logout"><Home /></Route>
            <Route exact path='/login' component={(props) => <Login {...props} handleSessionChange={handleSessionChange} />} />

            {/* Allow the following components access to the JWT token stored in the state */}
            <Route path="/admin/lifts" component={(props) => <Lift {...props} jwt={jwt} />} />
            <Route path="/admin/acmv/btu" component={(props) => <BmsBtu {...props} jwt={jwt} />} />
            <Route path="/admin/acmv/fcu" component={(props) => <BmsFcu {...props} jwt={jwt} />} />
            <Route path="/admin/pns/pumps" component={(props) => <BmsPumps {...props} jwt={jwt} />} />
            <Route path="/admin/pns/tanks" component={(props) => <BmsTanks {...props} jwt={jwt} />} />
            <Route path="/admin/cctv" component={(props) => <CCTV {...props} jwt={jwt} />} />

          </Switch>
        </div>

        <div className='row'>
            <div className='container footer'>
                <div className="rule mt-3 mb-1"></div>    
            </div>  
        </div>

      </div>
    </Router>
  );
}

export default App;
