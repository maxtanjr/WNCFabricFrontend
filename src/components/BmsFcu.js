import '../css/Bms.css';
import React, {useEffect, useState, Fragment} from 'react'
import SelectBuilding from './ui/SelectBuilding';
import BmsFcuCard from './ui/BmsFcuCard';
import Loading from './ui/Loading';


let BmsFcu = (props) => {
    const config = require("../config/config.json");
    const fcuDataRoute = config.backendHost + ":" + config.backendPort + config.getFcuDataRoute;

    // state variables
    const [fcu, setFcu] = useState([]);
    const [error, setError] = useState("");

    const [isAllSelected, setAllSelected] = useState(true);
    const [isBuildingOneSelected, setBuildingOneSelected] = useState(false);
    const [isBuildingSevenSelected, setBuildingSevenSelected] = useState(false);

    const [testCaseArr, setTestCaseArr] = useState([]);
    
    const testCaseConfig = require('../config/testcases.json');
    const fcuTestCasesConfigJson = testCaseConfig["BMS"]["FCU"];

    const convertTestCaseTitleToId = (title) => {
        var titleId = title.toLowerCase().replace("'", "").replace("-", "").replace(" ", "-");
        return titleId;
    }

    const buildTestCaseArrays = () => {
        var arr= [];

        for (var testCase in fcuTestCasesConfigJson) {

            var testCaseJson = fcuTestCasesConfigJson[testCase];
            testCaseJson.id = convertTestCaseTitleToId(testCase);
            testCaseJson.title = testCase;

            arr.push(testCaseJson)
        }

        return arr;
    }

    // fetch btu data
    let fetchFcuData = () => {
        fetch(fcuDataRoute)
        .then((response) => {
            if (response.status !== 200) {
                setError("Invalid response code:", response.status);
            } else {
                setError(null);
            }
            return response.json();
        })
        .then((json) => {
            setFcu(json.fcuData);    // fcuData is the key to access the nested json data of all the lifts (set in routeHandler.go in fabric backend)
        })
    }

    useEffect(
        () => {
            let interval = setInterval(() => fetchFcuData(), (500 * 1)) //update every second

            var arr = buildTestCaseArrays();
            setTestCaseArr(arr);
            
            return () => {
                clearInterval(interval);
            }
        },
        [fcu]     //will mount the component only when there is a change in the value of "fcu"
    );


    // begin processing of incoming fcu data
    if (error !== null) {
        return (
            <Loading />
        )
    } else {
        // console.log(fcu)
        var fcuDataArr = []
        if (fcu.length !== 0) {

            for (var id in fcu) {
                var fcuData = fcu[id];

                var testCase = fcuData["test-case"];
                testCase = testCase.toLowerCase().replace("_", " ");
                testCase = testCase.charAt(0).toUpperCase() + testCase.substring(1);
                fcuData.testCase = testCase;

                // type
                var split = id.split("_");
                var type = split[1];
                var deviceId = (split.slice(1)).join("-");;
                var level = split[2][1];

                fcuData.type = type;
                fcuData.deviceId = deviceId;
                fcuData.level = level;

                // console.log(level)
                // console.log(fcuData)

                fcuDataArr.push(fcuData);
            }
        }
    }


    let renderB01FcuCard = (fcuData) => (
        <Fragment>
            {fcuData.building === "1" 
                ?<BmsFcuCard 
                    id={fcuData.ID}
                    deviceId={fcuData.deviceId}
                    type={fcuData.type}
                    building={fcuData.building}
                    level={fcuData.level}
                    testCase={fcuData.testCase}
                    cmd={fcuData.cmd}
                    status={fcuData.status}
                    trip={fcuData.trip}
                    swMode={fcuData["sw-mode"]}
                    airflowst={fcuData["air-fl-st"]}
                    rat={fcuData.rat}
                    ratSp={fcuData["rat-sp"]}
                    mvMode={fcuData["mv-mode"]}
                    mvCmd={fcuData["mv-cmd"]}
                    unmchAlarm={fcuData["unmch-alrm"]}
                    waterLeakAlarm={fcuData["wtr-lk-alrm"]}
                    runtime={fcuData["run_time"]}
                    testCaseArr={testCaseArr}
                />
                : null
            }
        </Fragment>
       
    );

    let renderB07FcuCard = (fcuData) => (
        <Fragment>
            {fcuData.building === "7" 
                ?<BmsFcuCard 
                id={fcuData.ID}
                deviceId={fcuData.deviceId}
                type={fcuData.type}
                building={fcuData.building}
                level={fcuData.level}
                testCase={fcuData.testCase}
                cmd={fcuData.cmd}
                status={fcuData.status}
                trip={fcuData.trip}
                swMode={fcuData["sw-mode"]}
                airflowst={fcuData["air-fl-st"]}
                rat={fcuData.rat}
                ratSp={fcuData["rat-sp"]}
                mvMode={fcuData["mv-mode"]}
                mvCmd={fcuData["mv-cmd"]}
                unmchAlarm={fcuData["unmch-alrm"]}
                waterLeakAlarm={fcuData["wtr-lk-alrm"]}
                runtime={fcuData["run_time"]}
                testCaseArr={testCaseArr}
                />
                : null
            }
        </Fragment>
    );


    return (
        <Fragment>
            <div className='bms-header'>
                <div style={{display:"flex",justifyContent:"center", alignItems:"center", fontSize:"24px"}}>WNC ACMV-FCU (BMS)</div>
               
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

            <div className='bms-card-container'>

                {fcuDataArr.map((fcuData) => (  
                    <Fragment>
                        {isBuildingOneSelected || isAllSelected
                            ? renderB01FcuCard(fcuData)
                            :null
                        }

                        {isBuildingSevenSelected || isAllSelected
                            ? renderB07FcuCard(fcuData)
                            :null
                        }
                        
                    </Fragment>
                ))}

            </div>
        </Fragment>
    )

}

export default BmsFcu;