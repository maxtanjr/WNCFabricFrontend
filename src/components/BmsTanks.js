import '../css/Bms.css';
import React, {useEffect, useState, Fragment} from 'react'
import SelectBuilding from './ui/SelectBuilding';
import BmsTanksCard from './ui/BmsTanksCard';
import Loading from './ui/Loading';


let BmsTanks = (props) => {
    const config = require("../config/config.json");
    const tanksDataRoute = config.backendHost + ":" + config.backendPort + config.getTanksDataRoute;

    // state variables
    const [tanks, setTanks] = useState([]);
    const [error, setError] = useState("");

    const [isAllSelected, setAllSelected] = useState(true);
    const [isBuildingOneSelected, setBuildingOneSelected] = useState(false);
    const [isBuildingSevenSelected, setBuildingSevenSelected] = useState(false);

    const [testCaseArr, setTestCaseArr] = useState([]);
    
    const testCaseConfig = require('../config/testcases.json');
    const tanksTestCasesConfigJson = testCaseConfig["BMS"]["Tanks"];

    const convertTestCaseTitleToId = (title) => {
        var titleId = title.toLowerCase().replace("'", "").replace("-", "").replace(" ", "-");
        return titleId;
    }

    const buildTestCaseArrays = () => {
        var arr= [];

        for (var testCase in tanksTestCasesConfigJson) {

            var testCaseJson = tanksTestCasesConfigJson[testCase];
            testCaseJson.id = convertTestCaseTitleToId(testCase);
            testCaseJson.title = testCase;

            arr.push(testCaseJson)
        }

        return arr;
    }

    // fetch btu data
    let fetchTanksData = () => {
        fetch(tanksDataRoute)
        .then((response) => {
            if (response.status !== 200) {
                setError("Invalid response code:", response.status);
            } else {
                setError(null);
            }
            return response.json();
        })
        .then((json) => {
            setTanks(json.tanksData);    // tanksData is the key to access the nested json data of all the bms (set in routeHandler.go in fabric backend)
        })
    }

    useEffect(
        () => {
            let interval = setInterval(() => fetchTanksData(), (500 * 1)) //update every second

            var arr = buildTestCaseArrays();
            setTestCaseArr(arr);
            
            return () => {
                clearInterval(interval);
            }
        },
        [tanks]     //will mount the component only when there is a change in the value of "tanks"
    );


    // begin processing of incoming tanks data
    if (error !== null) {
        return (
            <Loading />
        )
    } else {
        // console.log(fcu)
        var tanksDataArr = []
        if (tanks.length !== 0) {

            for (var id in tanks) {
                var tanksData = tanks[id];

                var testCase = tanksData["test-case"];
                testCase = testCase.toLowerCase().replace("_", " ");
                testCase = testCase.charAt(0).toUpperCase() + testCase.substring(1);
                tanksData.testCase = testCase;

                // type
                var split = id.split("_");
                var type = "Tank";
                var deviceId = (split.slice(1)).join("-");;
                var level = split[2][1];

                tanksData.type = type;
                tanksData.deviceId = deviceId;
                tanksData.level = level;

                // console.log(level)
                // console.log(fcuData)

                tanksDataArr.push(tanksData);
            }
        }
    }


    let renderB01TanksCard = (tanksData) => (
        <Fragment>
            {tanksData.building === "1" 
                ?<BmsTanksCard 
                    id={tanksData.ID}
                    deviceId={tanksData.deviceId}
                    type={tanksData.type}
                    building={tanksData.building}
                    level={tanksData.level}
                    testCase={tanksData.testCase}
                    lowAlarm={tanksData["lo-lvl-alrm"]}
                    highAlarm={tanksData["hi-lvl-alrm"]}
                    overflowAlarm={tanksData["of-alrm"]}
                    testCaseArr={testCaseArr}
                />
                : null
            }
        </Fragment>
       
    );

    let renderB07TanksCard = (tanksData) => (
        <Fragment>
            {tanksData.building === "7" 
                ?<BmsTanksCard 
                    id={tanksData.ID}
                    deviceId={tanksData.deviceId}
                    type={tanksData.type}
                    building={tanksData.building}
                    level={tanksData.level}
                    testCase={tanksData.testCase}
                    lowAlarm={tanksData["lo-lvl-alrm"]}
                    highAlarm={tanksData["hi-lvl-alrm"]}
                    overflowAlarm={tanksData["of-alrm"]}
                    testCaseArr={testCaseArr}
                />
                : null
            }
        </Fragment>
    );


    return (
        <Fragment>
            <div className='bms-header'>
                <div style={{display:"flex",justifyContent:"center", alignItems:"center", fontSize:"24px"}}>WNC PNS-TANKS (BMS)</div>
               
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

                {tanksDataArr.map((tanksData) => (  
                    <Fragment>
                        {isBuildingOneSelected || isAllSelected
                            ? renderB01TanksCard(tanksData)
                            :null
                        }

                        {isBuildingSevenSelected || isAllSelected
                            ? renderB07TanksCard(tanksData)
                            :null
                        }
                        
                    </Fragment>
                ))}

            </div>
        </Fragment>
    )

}

export default BmsTanks;