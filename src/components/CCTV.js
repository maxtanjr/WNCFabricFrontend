import '../css/CCTV.css';
import React, { useEffect, useState, Fragment } from 'react' 
import SelectBuilding from './ui/SelectBuilding';
import CctvCard from './ui/CctvCard';

let CCTV = (props) => {
    const config = require("../config/config.json");
    const cctvConfig = require("../config/cctvConfig.json");

    const rtspUrlPrefix = config.backendHost + ":" + config.rtspWebPort + "/stream/wnc/channel/"; //0/hls/live/index.m3u8"

    const [error, setError] = useState("");

    const [isAllSelected, setAllSelected] = useState(true);
    const [isBuildingOneSelected, setBuildingOneSelected] = useState(false);
    const [isBuildingSevenSelected, setBuildingSevenSelected] = useState(false);

    let cctvDevicesArr = cctvConfig["cctv"]["devices"];

    let fetchAvailability = () => {

        // console.log(cctvDevicesConfig);
        // add fetch route here
    }

    useEffect(
        () => {
            let interval = setInterval(()=> fetchAvailability(), (1000 * 1));
            setError(null);

            // setCctv(cctvDevicesArr);

            return () => {
                clearInterval(interval);
            }
        }, 
        []
    );


    const buildDeviceArr = () => {
        var arr = [];

        for (var i in cctvDevicesArr) {
            var deviceData = cctvDevicesArr[i];
            // egs cctv-9
            var name = deviceData["device_id"].replace("_", "-");
            var id = parseInt(name.split("-")[1]);
            
            deviceData.id = id;
            deviceData.name = name;

            deviceData.videoUrl = rtspUrlPrefix + id + "/hls/live/index.m3u8";

            arr.push(deviceData);
        }

        return arr;
    }



    if (error != null) {
        return <div style={{color:"white", fontSize:"18px", display:"flex", justifyContent:"center", alignItems:"center"}} >Loading...</div>
    } else {
        cctvDevicesArr = buildDeviceArr();

        var b01Selected = isBuildingOneSelected;
        var b07Selected = isBuildingSevenSelected;
        var allSelected = isAllSelected;

        console.log(cctvDevicesArr)

    }

    let renderB01CctvCard = (data) => (
        <Fragment>
            {data.building === "1" 
                ?<CctvCard 
                    name={data.name}
                    cctvId={data.id}
                    building={data.building}
                    zone={data.zone_id}
                    level={data.level}
                    url={data.videoUrl}
                />
                : null
            }
        </Fragment>
       
    );

    let renderB07CctvCard = (data) => (
        <Fragment>
            {data.building === "7" 
                ?<CctvCard
                    name={data.name}
                    cctvId={data.id}
                    building={data.building}
                    zone={data.zone_id}
                    level={data.level}
                    url={data.videoUrl}
                />
                : null
            }
        </Fragment>
    );


    return (
        <Fragment>
            <div className='cctv-header'>
                <div style={{display:"flex",justifyContent:"center", alignItems:"center", fontSize:"24px"}}>WNC CCTV</div>

                <SelectBuilding
                    isAllSelected={allSelected}
                    isBuildingOneSelected={b01Selected}
                    isbuildingSevenSelected={b07Selected}

                    setAllSelected={setAllSelected}
                    setBuildingOneSelected={setBuildingOneSelected}
                    setBuildingSevenSelected={setBuildingSevenSelected}
                />
                

                <div className='ml-1'></div> 
            </div>

            <div className='cctv-card-container'>
                
                {cctvDevicesArr.map((data) => (
                    <Fragment>
                        {b01Selected || allSelected 
                            ? renderB01CctvCard(data)
                            :null
                        }

                        {b07Selected || allSelected 
                            ? renderB07CctvCard(data)
                            :null
                        }
                    </Fragment>

                ))}

            </div>

            
        </Fragment>
    )
}

export default CCTV;