import '../css/Bms.css';
import React, {useEffect, useState, Fragment} from 'react'
import SelectBuilding from './ui/SelectBuilding';
import BmsBtuCard from './ui/BmsBtuCard';
import Loading from './ui/Loading';

let BmsBtu = (props) => {
    const config = require("../config/config.json");
    const btuDataRoute = config.backendHost + ":" + config.backendPort + config.getBtuDataRoute;

    // state variables
    const [btu, setBtu] = useState([]);
    const [error, setError] = useState("");

    const [isAllSelected, setAllSelected] = useState(true);
    const [isBuildingOneSelected, setBuildingOneSelected] = useState(false);
    const [isBuildingSevenSelected, setBuildingSevenSelected] = useState(false);

    const [testCaseArr, setTestCaseArr] = useState([]);
    
    const testCaseConfig = require('../config/testcases.json');
    const btuTestCasesConfigJson = testCaseConfig["BMS"]["BTU"];

    const convertTestCaseTitleToId = (title) => {
        var titleId = title.toLowerCase().replace("'", "").replace("-", "").replace(" ", "-");
        return titleId;
    }

    const buildTestCaseArrays = () => {
        var arr= [];

        for (var testCase in btuTestCasesConfigJson) {

            var testCaseJson = btuTestCasesConfigJson[testCase];
            testCaseJson.id = convertTestCaseTitleToId(testCase);
            testCaseJson.title = testCase;

            arr.push(testCaseJson)
        }

        return arr;
    }

    // fetch btu data
    let fetchBtuData = () => {
        fetch(btuDataRoute)
        .then((response) => {
            if (response.status !== 200) {
                setError("Invalid response code:", response.status);
            } else {
                setError(null);
            }
            return response.json();
        })
        .then((json) => {
            setBtu(json.btuData);    // btuData is the key to access the nested json data of all the lifts (set in routeHandler.go in fabric backend)
        })
    }

    useEffect(
        () => {
            let interval = setInterval(() => fetchBtuData(), (500 * 1)) //update every second

            var arr = buildTestCaseArrays();
            setTestCaseArr(arr);
            
            return () => {
                clearInterval(interval);
            }
        },
        [btu]     //will mount the component only when there is a change in the value of "btu"
    );


    // begin processing of incoming lift data
    if (error !== null) {
        return (
            <Loading />
        ) 
    } else {
        // console.log(btu)
        var btuDataArr = []
        if (btu.length !== 0) {

            for (var id in btu) {
                var btuData = btu[id];

                var testCase = btuData["test-case"];
                testCase = testCase.toLowerCase().replace("_", " ");
                testCase = testCase.charAt(0).toUpperCase() + testCase.substring(1);
                btuData.testCase = testCase;

                // type
                var split = id.split("_");
                var type = split[1];
                var deviceId = parseInt(split[3]);
                var level = parseInt(split[2]);

                btuData.type = type;
                btuData.deviceId = deviceId;
                btuData.level = level;

                // console.log(btuData["building"])
                console.log(btuData)

                btuDataArr.push(btuData);
            }
        }
    }


    let renderB01BtuCard = (btuData) => (
        <Fragment>
            {btuData.building === "1" 
                ?<BmsBtuCard 
                    id={btuData.ID}
                    deviceId={btuData.deviceId}
                    type={btuData.type}
                    building={btuData.building}
                    level={btuData.level}
                    testCase={btuData.testCase}
                    chwf={btuData.chwf}
                    chwst={btuData.chwst}
                    chwrt={btuData.chwrt}
                    kw={btuData.kw}
                    kwh={btuData.kwh}
                    testCaseArr={testCaseArr}
                />
                : null
            }
        </Fragment>
       
    );

    let renderB07BtuCard = (btuData) => (
        <Fragment>
            {btuData.building === "7" 
                ?<BmsBtuCard 
                    id={btuData.ID}
                    deviceId={btuData.deviceId}
                    type={btuData.type}
                    building={btuData.building}
                    level={btuData.level}
                    testCase={btuData.testCase}
                    chwf={btuData.chwf}
                    chwst={btuData.chwst}
                    chwrt={btuData.chwrt}
                    kw={btuData.kw}
                    kwh={btuData.kwh}
                    testCaseArr={testCaseArr}
                />
                : null
            }
        </Fragment>
    );


    return (
        <Fragment>
            <div className='bms-header'>
                <div style={{display:"flex",justifyContent:"center", alignItems:"center", fontSize:"24px"}}>WNC ACMV-BTU (BMS)</div>
               
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

                {btuDataArr.map((btuData) => (  
                    <Fragment>
                        {isBuildingOneSelected || isAllSelected
                            ? renderB01BtuCard(btuData)
                            :null
                        }

                        {isBuildingSevenSelected || isAllSelected
                            ? renderB07BtuCard(btuData)
                            :null
                        }
                        
                    </Fragment>
                ))}

            </div>
        </Fragment>
    )

}

export default BmsBtu;