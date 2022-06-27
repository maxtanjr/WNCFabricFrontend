import React, { useEffect, useState, Fragment } from 'react'
import '../css/Liveliness.css';

import './ui/SelectSystem';
import SelectSystem from './ui/SelectSystem';
import ToggleSwitch from './ui/ToggleSwitch';
import LivelinessCard from './ui/LivelinessCard';

import Loading from './ui/Loading';


let Home = () => {
    const [liveliness, setLiveliness] = useState([]);
    const [isAllSelected, setAllSelected] = useState(true);
    const [isLiftsSelected, setLiftsSelected] = useState(false);
    const [isAcmvSelected, setAcmvSelected] = useState(false);
    const [isPnsSelected, setPnsSelected] = useState(false);
    const [isCctvSelected, setCctvSelected] = useState(false);
    const [showOnlineSelected, setShowOnlineSelected] = useState(false);

    const [error, setError] = useState("");

    const config = require('../config/config.json');
    const liftConfig = require("../config/liftConfig.json");

    const livelinessDataRoute = config.backendHost + ":" + config.backendPort + config.getLivelinessRoute;
    
    const liftConfigJson = liftConfig["lifts"];

    let fetchLivelinessData = () => {
        fetch(livelinessDataRoute)
        .then((response) => {
            if (response.status !== 200) {
                setError("Invalid response code:", response.status);
            } else {
                setError(null);
            }

            return response.json();
        })
        .then((json) => {
            // debugging
            // console.log(json.liveliness)

            setLiveliness(json.liveliness);     // 'liveliness' is the key to access the nested json data of the liveliness payload (set by fabric backend in routeHandler.go)
        });
    }

    useEffect(() => {
        let interval = setInterval(() => fetchLivelinessData(), (500 * 1));
        return () => clearInterval(interval);
    }, [liveliness]);



    if (error !== null) {
        // Loader scss class imported in index.js
        return (
            <Loading />
        ) 
    } else {
        var liftLivelinessArr = [];
        // ACMV
        var fcuLivelinessArr = [];
        var btuLivelinessArr = [];
        // PNS
        var pumpsLivelinessArr = [];
        var tanksLivelinessArr = [];

        if (liveliness.length !== 0) {
            // expect length 23
            var liftLivelinessJson = liveliness["lifts"];
            for (var liftId in liftLivelinessJson) {

                var lift = liftLivelinessJson[liftId];
                // create new keys
                lift.id = "LIFT-" + liftId;

                // for lift system, building and subsystems are taken from the config in config.json
                var type = liftConfigJson[liftId]["type"];
                var building = liftConfigJson[liftId]["building"];
                
                lift.buildingVal = building;
                lift.type = type;


                liftLivelinessArr.push(lift);

                // console.log(lift);

            }

            // For BMS, backend sends data under the keys "fcu", "btu" for ACMV, and "tanks", "pumps" for PNS
            var fcuLivelinessJson = liveliness["fcu"];
            for (var fcuId in fcuLivelinessJson) {
                var fcu = fcuLivelinessJson[fcuId];

                // create new keys
                fcu.id = fcuId.split("_").slice(1).join("-");
                fcu.deviceType = "ACMV";
                fcuLivelinessArr.push(fcu);

                // console.log(fcu);
            }

            var btuLivelinessJson = liveliness["btu"];
            for (var btuId in btuLivelinessJson) {
                var btu = btuLivelinessJson[btuId];

                // create new keys
                btu.id = btuId.split("_").slice(1).join("-")
                btu.deviceType = "ACMV";
                btuLivelinessArr.push(btu);

                // console.log(btu);
            }

            var pumpsLivelinessJson = liveliness["pumps"];
            for (var pumpsId in pumpsLivelinessJson) {
                var pump = pumpsLivelinessJson[pumpsId];

                // create new keys
                pump.id = pumpsId.split("_").slice(1).join("-").replace("PWBP", "PUMP");
                pump.deviceType = "PNS";
                pumpsLivelinessArr.push(pump);

                // console.log(pump);
            }

            var tanksLivelinessJson = liveliness["tanks"];
            for (var tanksId in tanksLivelinessJson) {
                var tank = tanksLivelinessJson[tanksId];

                // create new keys
                tank.id = tanksId.split("_").slice(1).join("-").replace("PWST", "TANK");
                tank.deviceType = "PNS";
                tanksLivelinessArr.push(tank);

                // console.log(tank);
            }
        }
    }
    

    return (
        <Fragment>
            <div className='alive-sim-header'>
                <div style={{display:"flex",justifyContent:"center", alignItems:"center", fontSize:"16px"}}>Liveliness Status</div>

                <SelectSystem
                    setAllSelected = {setAllSelected}
                    setLiftsSelected = {setLiftsSelected}
                    setAcmvSelected = {setAcmvSelected}
                    setPnsSelected = {setPnsSelected}
                    setCctvSelected = {setCctvSelected}

                    isAllSelected = {isAllSelected}
                    isLiftsSelected = {isLiftsSelected}
                    isAcmvSelected = {isAcmvSelected}
                    isPnsSelected = {isPnsSelected}
                    isCctvSelected = {isCctvSelected}
                />
                
                <ToggleSwitch
                    showOnlineSelected = {showOnlineSelected}
                    setShowOnlineSelected = {setShowOnlineSelected}
                />     
            </div>


            <div className='alive-sim-background'>
                <div className='alive-sim-container'>
                    <div className='alive-column-container'>

                         <div className='alive-column-data-container'>
                            <div className='alive-field-value-box'>
                                Device ID
                            </div>
                            <div style={{width:"auto"}} className='alive-field-value-box'>
                                Type
                            </div>
                            <div style={{alignItems:"right"}} className='alive-field-value-box'>
                                Building
                            </div>
                            <div className='alive-field-value-box'>
                                Liveliness
                            </div>
                        </div>
                    </div>

                    <div className='alive-sim-running'>
                        {liftLivelinessArr.map((liftLiveliness) => (
                            <Fragment>
                                {isLiftsSelected || isAllSelected
                                ? <LivelinessCard 
                                    deviceId={liftLiveliness.id}
                                    type={liftLiveliness.type}
                                    buildingVal={liftLiveliness.buildingVal}
                                    isAlive={liftLiveliness["is-alive"]}
                                    showOnlineSelected={showOnlineSelected}
                                    />
                                :null
                                }
                                
                            </Fragment>
                        ))}

                        {fcuLivelinessArr.map((fcuLiveliness) => (
                            <Fragment>
                                {isAcmvSelected || isAllSelected
                                ? <LivelinessCard 
                                    deviceId={fcuLiveliness.id}
                                    type={fcuLiveliness.deviceType}
                                    buildingVal={fcuLiveliness.building}
                                    isAlive={fcuLiveliness["is-alive"]}
                                    showOnlineSelected={showOnlineSelected}
                                    />
                                :null
                                }
                                
                            </Fragment>
                        ))}

                        {btuLivelinessArr.map((btuLiveliness) => (
                            <Fragment>
                                {isAcmvSelected || isAllSelected
                                ? <LivelinessCard 
                                    deviceId={btuLiveliness.id}
                                    type={btuLiveliness.deviceType}
                                    buildingVal={btuLiveliness.building}
                                    isAlive={btuLiveliness["is-alive"]}
                                    showOnlineSelected={showOnlineSelected}
                                    />
                                :null
                                }
                                
                            </Fragment>
                        ))}

                        {pumpsLivelinessArr.map((pumpsLiveliness) => (
                            <Fragment>
                                {isPnsSelected || isAllSelected
                                ? <LivelinessCard
                                    deviceId={pumpsLiveliness.id}
                                    type={pumpsLiveliness.deviceType}
                                    buildingVal={pumpsLiveliness.building}
                                    isAlive={pumpsLiveliness["is-alive"]}
                                    showOnlineSelected={showOnlineSelected}
                                    />
                                :null
                                }
                                
                            </Fragment>
                        ))}

                        {tanksLivelinessArr.map((tanksLiveliness) => (
                            <Fragment>
                                {isPnsSelected || isAllSelected
                                ? <LivelinessCard 
                                    deviceId={tanksLiveliness.id}
                                    type={tanksLiveliness.deviceType}
                                    buildingVal={tanksLiveliness.building}
                                    isAlive={tanksLiveliness["is-alive"]}
                                    showOnlineSelected={showOnlineSelected}
                                    />
                                :null
                                }
                                
                            </Fragment>
                        ))}

                    </div>


                </div>
            </div>

        </Fragment>
    )
}

export default Home;