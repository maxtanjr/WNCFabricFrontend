import React from 'react';
import '../../css/SelectSystem.css';

const SelectBuilding = (props) => {
    const selectAll = () => {
        props.setAllSelected(true);
        props.setBuildingOneSelected(false);
        props.setBuildingSevenSelected(false);
    }

    const selectBuildingOne = () => {
        props.setAllSelected(false);
        props.setBuildingOneSelected(true);
        props.setBuildingSevenSelected(false);
    }

    const selectBuildingSeven = () => {
        props.setAllSelected(false);
        props.setBuildingOneSelected(false);
        props.setBuildingSevenSelected(true);
    }

    return (
        <div className='systems-select-container-short' role='radio-group'>
            {props.isAllSelected 
            ? <div className='radio-container' role='radio' onClick={selectAll}>
                <div className='radio-content'>
                    All
                </div>
            </div>
            : <div className='radio-container' role='radio' onClick={selectAll}>
                <div className='radio-content-off'>
                    All
                </div>
            </div>
            }

            {props.isBuildingOneSelected 
            ? <div className='radio-container' role='radio' onClick={selectBuildingOne}>
                <div className='radio-content'>
                    Building 1
                </div>
            </div>
            : <div className='radio-container' role='radio' onClick={selectBuildingOne}>
                <div className='radio-content-off'>
                    Building 1
                </div>
            </div>
            }

            {props.isbuildingSevenSelected 
            ? <div className='radio-container' role='radio' onClick={selectBuildingSeven}>
                <div className='radio-content'>
                    Building 7
                </div>
            </div>
            : <div className='radio-container' role='radio' onClick={selectBuildingSeven}>
                <div className='radio-content-off'>
                    Building 7
                </div>
            </div>
            }
        </div>
    )
}

export default SelectBuilding;