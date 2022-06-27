import React from 'react';
import '../../css/SelectSystem.css';

const SelectSystem = (props) => {
    const selectAll = () => {
        props.setAllSelected(true);
        props.setLiftsSelected(false);
        props.setAcmvSelected(false);
        props.setPnsSelected(false);
        props.setCctvSelected(false);
    }

    const selectLifts = () => {
        props.setAllSelected(false);
        props.setLiftsSelected(true);
        props.setAcmvSelected(false);
        props.setPnsSelected(false);
        props.setCctvSelected(false);
    }

    const selectAcmv = () => {
        props.setAllSelected(false);
        props.setLiftsSelected(false);
        props.setAcmvSelected(true);
        props.setPnsSelected(false);
        props.setCctvSelected(false);
    }

    const selectPns = () => {
        props.setAllSelected(false);
        props.setLiftsSelected(false);
        props.setAcmvSelected(false);
        props.setPnsSelected(true);
        props.setCctvSelected(false);
    }

    const selectCctv = () => {
        props.setAllSelected(false);
        props.setLiftsSelected(false);
        props.setAcmvSelected(false);
        props.setPnsSelected(false);
        props.setCctvSelected(true);
    }

    return (
        <div className='systems-select-container' role="radiogroup">
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

            {props.isLiftsSelected

                ? <div className='radio-container' role='radio' onClick={selectLifts}>
                    <div className='radio-content'>
                        Lifts
                    </div>
                </div>

                : <div className='radio-container' role='radio' onClick={selectLifts}>
                    <div className='radio-content-off'>
                        Lifts
                    </div>
                </div>
            }

            
            {props.isAcmvSelected

            ? <div className='radio-container' role='radio' onClick={selectAcmv}>
                <div className='radio-content'>
                    ACMV
                </div>
            </div>

            : <div className='radio-container' role='radio' onClick={selectAcmv}>
                <div className='radio-content-off'>
                    ACMV
                </div>
            </div>
            }


            {props.isPnsSelected

                ? <div className='radio-container' role='radio' onClick={selectPns}>
                    <div className='radio-content'>
                        PNS
                    </div>
                </div>

                : <div className='radio-container' role='radio' onClick={selectPns}>
                    <div className='radio-content-off'>
                        PNS
                    </div>
                </div>
            }


            {props.isCctvSelected

            ? <div className='radio-container' role='radio' onClick={selectCctv}>
                <div className='radio-content'>
                    CCTV
                </div>
            </div>

            : <div className='radio-container' role='radio' onClick={selectCctv}>
                <div className='radio-content-off'>
                    CCTV
                </div>
            </div>
            }


        </div>
    )
}

export default SelectSystem;