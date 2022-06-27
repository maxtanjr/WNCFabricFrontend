import '../css/Bms.css';
import React, {useEffect, useState, Fragment} from 'react'
import SelectBuilding from './ui/SelectBuilding';
import BmsPumpsCard from './ui/BmsPumpsCard';
import Loading from './ui/Loading';


let BmsPumps = (props) => {
    const config = require("../config/config.json");
    const pumpsDataRoute = config.backendHost + ":" + config.backendPort + config.getPumpsDataRoute;

    // state variables
    const [pumps, setPumps] = useState([]);
    const [error, setError] = useState("");

    const [isAllSelected, setAllSelected] = useState(true);
    const [isBuildingOneSelected, setBuildingOneSelected] = useState(false);
    const [isBuildingSevenSelected, setBuildingSevenSelected] = useState(false);

    const [testCaseArr, setTestCaseArr] = useState([]);
    
    const testCaseConfig = require('../config/testcases.json');
    const pumpsTestCasesConfigJson = testCaseConfig["BMS"]["Pumps"];

    const convertTestCaseTitleToId = (title) => {
        var titleId = title.toLowerCase().replace("'", "").replace("-", "").replace(" ", "-");
        return titleId;
    }

    const buildTestCaseArrays = () => {
        var arr= [];

        for (var testCase in pumpsTestCasesConfigJson) {

            var testCaseJson = pumpsTestCasesConfigJson[testCase];
            testCaseJson.id = convertTestCaseTitleToId(testCase);
            testCaseJson.title = testCase;

            arr.push(testCaseJson)
        }

        return arr;
    }

    // fetch btu data
    let fetchPumpsData = () => {
        fetch(pumpsDataRoute)
        .then((response) => {
            if (response.status !== 200) {
                setError("Invalid response code:", response.status);
            } else {
                setError(null);
            }
            return response.json();
        })
        .then((json) => {
            setPumps(json.pumpsData);    // pumpsData is the key to access the nested json data of all the bms (set in routeHandler.go in fabric backend)
        })
    }

    useEffect(
        () => {
            let interval = setInterval(() => fetchPumpsData(), (500 * 1)) //update every second

            var arr = buildTestCaseArrays();
            setTestCaseArr(arr);
            
            return () => {
                clearInterval(interval);
            }
        },
        [pumps]     //will mount the component only when there is a change in the value of "pumps"
    );


    // begin processing of incoming pumps data
    if (error !== null) {
        return (
            <Loading />
        )
    } else {
        // console.log(fcu)
        var pumpsDataArr = []
        if (pumps.length !== 0) {

            for (var id in pumps) {
                var pumpsData = pumps[id];

                var testCase = pumpsData["test-case"];
                testCase = testCase.toLowerCase().replace("_", " ");
                testCase = testCase.charAt(0).toUpperCase() + testCase.substring(1);
                pumpsData.testCase = testCase;

                // type
                var split = id.split("_");
                var type = "Pump";
                var deviceId = parseInt(split[3]);
                var level = split[2][1];

                pumpsData.type = type;
                pumpsData.deviceId = deviceId;
                pumpsData.level = level;

                // console.log(level)
                // console.log(fcuData)

                pumpsDataArr.push(pumpsData);
            }
        }
    }


    let renderB01PumpsCard = (pumpsData) => (
        <Fragment>
            {pumpsData.building === "1" 
                ?<BmsPumpsCard 
                    id={pumpsData.ID}
                    deviceId={pumpsData.deviceId}
                    type={pumpsData.type}
                    building={pumpsData.building}
                    level={pumpsData.level}
                    testCase={pumpsData.testCase}
                    status={pumpsData.status}
                    trip={pumpsData.trip}
                    kw={pumpsData.kw}
                    kwh={pumpsData.kwh}
                    testCaseArr={testCaseArr}
                />
                : null
            }
        </Fragment>
       
    );

    let renderB07PumpsCard = (pumpsData) => (
        <Fragment>
            {pumpsData.building === "7" 
                ?<BmsPumpsCard 
                    id={pumpsData.ID}
                    deviceId={pumpsData.deviceId}
                    type={pumpsData.type}
                    building={pumpsData.building}
                    level={pumpsData.level}
                    testCase={pumpsData.testCase}
                    status={pumpsData.status}
                    trip={pumpsData.trip}
                    kw={pumpsData.kw}
                    kwh={pumpsData.kwh}
                    testCaseArr={testCaseArr}
                />
                : null
            }
        </Fragment>
    );


    return (
        <Fragment>
            <div className='bms-header'>
                <div style={{display:"flex",justifyContent:"center", alignItems:"center", fontSize:"24px"}}>WNC PNS-PUMPS (BMS)</div>
               
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

                {pumpsDataArr.map((pumpsData) => (  
                    <Fragment>
                        {isBuildingOneSelected || isAllSelected
                            ? renderB01PumpsCard(pumpsData)
                            :null
                        }

                        {isBuildingSevenSelected || isAllSelected
                            ? renderB07PumpsCard(pumpsData)
                            :null
                        }
                        
                    </Fragment>
                ))}

            </div>
        </Fragment>
    )

}

export default BmsPumps;