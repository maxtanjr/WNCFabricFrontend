import '../css/Lift.css';
import React, { useEffect, useState, Fragment } from 'react' 
import SelectBuilding from './ui/SelectBuilding';
import LiftCard from './ui/LiftCard';
import Loading from './ui/Loading';

let Lift = (props) => {

    const config = require("../config/config.json");
    const liftDataRoute = config.backendHost + ":" + config.backendPort + config.getLiftDataRoute;

    const liftConfig = require("../config/liftConfig.json");
    const liftConfigJson = liftConfig["lifts"];
    const liftDoorModeJson = liftConfig["doorModes"];
    const liftModeJson = liftConfig["modes"];
    const liftMoveModeJson = liftConfig["moveModes"];

    const liftModeArr = [];
    const doorModeArr = [];
    const moveArr = [];

    // populate arrays from liftConfig.json
    for (var i in liftDoorModeJson) {
        doorModeArr.push(liftDoorModeJson[i]);
    }
    for (var i in liftModeJson) {
        liftModeArr.push(liftModeJson[i]);
    }
    for (var i in liftMoveModeJson) {
        moveArr.push(liftMoveModeJson[i]);
    }


    // state variables
    const [lifts, setLifts] = useState([]);
    const [error, setError] = useState("");

    const [isAllSelected, setAllSelected] = useState(true);
    const [isBuildingOneSelected, setBuildingOneSelected] = useState(false);
    const [isBuildingSevenSelected, setBuildingSevenSelected] = useState(false);

    const [testCaseArr, setTestCaseArr] = useState([]);
    
    const testCaseConfig = require('../config/testcases.json');
    const liftTestCasesConfigJson = testCaseConfig["lifts"];

    const convertTestCaseTitleToId = (title) => {
        var titleId = title.toLowerCase().replace("_", "").replace("-", "").replace(" ", "");
        return titleId;
    }

    const buildTestCaseArrays = () => {
        var arr= [];

        for (var testCase in liftTestCasesConfigJson) {

            var testCaseJson = liftTestCasesConfigJson[testCase];
            testCaseJson.id = convertTestCaseTitleToId(testCase);
            testCaseJson.title = testCase;

            arr.push(testCaseJson)
        }

        return arr;
    }


    // fetch lift data
    let fetchLiftData = () => {
        fetch(liftDataRoute)
        .then((response) => {
            if (response.status !== 200) {
                setError("Invalid response code:", response.status);
            } else {
                setError(null);
            }
            return response.json();
        })
        .then((json) => {
            setLifts(json.liftData);    // liftData is the key to access the nested json data of all the lifts (set in routeHandler.go in fabric backend)
        })
    }

    useEffect(
        () => {
            let liftInterval = setInterval(() => fetchLiftData(), (500 * 1)) //update every second

            var arr = buildTestCaseArrays();
            setTestCaseArr(arr);
            
            return () => {
                clearInterval(liftInterval);
            }
        },
        [lifts]     //will mount the component only when there is a change in the value of "lifts"
    );

    
    // begin processing of incoming lift data
    if (error !== null) {
        return (
            <Loading />
        ) 
    } else {
        var liftDataArr = [];

        if (lifts.length !== 0) {

            // debugging
            // console.log(lifts);

            for (var id in lifts) {
                var liftData = lifts[id];
                var testCase = liftData["test-case"];
                testCase = testCase.toLowerCase().replace("_", " ")
                testCase = testCase.charAt(0).toUpperCase() + testCase.substring(1);
                liftData.testCase = testCase;

                // building
                if (liftData["building"] === "B01") {
                    liftData.building = 1;
                } else if (liftData["building"] === "B07") {
                    liftData.building = 7;
                }

                // floor
                var floor = liftData["loc"];
                switch(floor) {
                    case 1:
                        liftData.floor = "B1";
                        break;
                    default:
                        liftData.floor = '' + floor - 1;
                        break;
                }

                // door status
                if (liftData["close"] === true) {
                    liftData.door_status = "Closed";
                } else if (liftData["open"] === true) {
                    liftData.door_status = "Opened";
                }

                // door mode
                liftData.door_mode = doorModeArr[liftData.doorMode];

                // load
                if (liftData.load === true) {
                    liftData.load_status = "Yes"
                } else {
                    liftData.load_status = "No"
                }

                // move
                liftData.move_status = moveArr[liftData.move];

                // mode
                liftData.mode_status = liftModeArr[liftData.mode];

                // type (taken from config)
                var type = liftConfigJson[id]["type"]
                liftData.type = type;


                liftDataArr.push(liftData);
            }
        }
        
    }

    let renderB01LiftCard = (liftData) => (
        <Fragment>
            {liftData.building === 1 
                ?<LiftCard 
                    liftId={liftData.ID}
                    type={liftData.type}
                    building={liftData.building}
                    testCase={liftData.testCase}
                    mode={liftData.mode_status}
                    floor={liftData.floor}
                    moveStatus={liftData.move_status}
                    doorStatus={liftData.door_status}
                    doorMode={liftData.door_mode}
                    loadStatus={liftData.load_status}
                    testCaseArr={testCaseArr}
                />
                : null
            }
        </Fragment>
       
    );

    let renderB07LiftCard = (liftData) => (
        <Fragment>
            {liftData.building === 7 
                ?<LiftCard 
                    liftId={liftData.ID}
                    type={liftData.type}
                    building={liftData.building}
                    testCase={liftData.testCase}
                    mode={liftData.mode_status}
                    floor={liftData.floor}
                    moveStatus={liftData.move_status}
                    doorStatus={liftData.door_status}
                    doorMode={liftData.door_mode}
                    loadStatus={liftData.load_status}
                    testCaseArr={testCaseArr}
                />
                : null
            }
        </Fragment>
    );


    return (
        <Fragment>
            <div className='lift-header'>
                <div style={{display:"flex",justifyContent:"center", alignItems:"center", fontSize:"24px"}}>WNC Lifts</div>
               
                <SelectBuilding
                    isAllSelected={isAllSelected}
                    isBuildingOneSelected={isBuildingOneSelected}
                    isbuildingSevenSelected={isBuildingSevenSelected}

                    setAllSelected={setAllSelected}
                    setBuildingOneSelected={setBuildingOneSelected}
                    setBuildingSevenSelected={setBuildingSevenSelected}
                />

                <div className='ml-1'></div>
     
            </div>

            <div className='lift-card-container'>

                {liftDataArr.map((liftData) => (  
                    <Fragment>
                        {isBuildingOneSelected || isAllSelected
                            ? renderB01LiftCard(liftData)
                            :null
                        }

                        {isBuildingSevenSelected || isAllSelected
                            ? renderB07LiftCard(liftData)
                            :null
                        }
                        
                    </Fragment>
                ))}

            </div>
        </Fragment>
    )


}


export default Lift;