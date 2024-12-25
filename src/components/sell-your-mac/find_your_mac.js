import React, { useEffect, useState } from 'react';
import MacSerialLookupComp from "../Mac-repair/lookupform";
import { DeviceIdentificationForm } from './device_identify_form';
import { Form } from 'react-bootstrap';
import { CategoryArray, Mac_type, Series } from '@/utils/staticData';
import { GetCollectionSvg } from '@/utils/svgFile';


export const Findyourmac = ({ data }) => {
    const [hideStepUp, setHideStepUp] = useState(false);
    const [accessDevice, setAccessDevice] = useState({});
    const [accessCount, setAccessCount] = useState({})
    const [showSerialBox, setShowSerialBox] = useState(false)
    const [dataFromChild, setDataFromChild] = useState(null);
    const [type, setType] = useState(null);

    const handleDataFromChild = (e, data, serialNumber) => {
        setDataFromChild(data);
        setType(e);
        setAccessDevice({ ...accessDevice, ["serialNumber"]: serialNumber })
    };

    const handleAccessQuestion = (name, value, index) => {
        setAccessDevice({
            ...accessDevice,
            [name]: value
        })
        setAccessCount({
            ...accessCount,
            [name]: value
        })
    }
    useEffect(() => {
        if (Object.keys(accessCount)?.length == 4) {
            setShowSerialBox(true)
        }
    }, [accessCount])
    console.log(accessDevice)

    //<--------------------------------------changes work---------------------------------------->
    const [macType, setMacType] = useState('');
    const [serialType, setSerialType] = useState('');
    const [finalType, setFinalType] = useState('')
    const [seriesData, setSeriesData] = useState([]);
    const [finalData, setFinalData] = useState([]);
    const [selectedItem, setSelectedItem] = useState({})
    const [prices, setPrices] = useState('')
    const handleMacType = (type) => {
        const newArray = Series.filter((Val) => Val.type === type);
        setSeriesData(newArray)
        setMacType(type)
        setFinalData([])
        setFinalType('')
        setSerialType('')
        setAccessDevice({ ...accessDevice, ['device_type']: type })

        setHideStepUp(false)
        setAccessDevice({
            ...accessDevice,
            ['notes']: '',
            ['device_power']: '',
            ['device_function']: '',
            ['physical_condition']: '',
            ['power_adapter']: ''
        })
        setAccessCount({})
        setShowSerialBox(false)
    }
    const handleSeriesStatic = (serial) => {
        const newArray = CategoryArray?.filter((CVal) => CVal.series === serial.name && CVal.type === serial.type);
        if (!newArray?.length) {
            setSelectedItem(serial)
            setSerialType(serial?.name)
            setHideStepUp(true)
            setAccessDevice({ ...accessDevice, ['device_name']: serial?.name })
            extractYear(serial?.name)
        } else {
            setFinalData(newArray)
            setSerialType(serial?.name)
            setSelectedItem({})
            setAccessDevice({ ...accessDevice, ['series']: serial?.name })

            setHideStepUp(false)
            setAccessDevice({
                ...accessDevice,
                ['notes']: '',
                ['device_power']: '',
                ['device_function']: '',
                ['physical_condition']: '',
                ['power_adapter']: ''
            })
            setAccessCount({})
            setShowSerialBox(false)
        }
    }
    const handleSelectedItem = (value) => {
        setSelectedItem(value)
        setFinalType(value?.name)
        setHideStepUp(true)
        setAccessDevice({ ...accessDevice, ['device_name']: value?.name })
        extractYear(value?.name)
    }
    const handleTextArea = (e) => {
        setAccessDevice({ ...accessDevice, ['notes']: e.target.value })
    }
    const extractYear = (str) => {
        const match = str.match(/\b(19|20)\d{2}\b/);
        if (2010 <= Number(match[0]) && 2017 >= Number(match[0])) {
            setPrices('$50-$250')
        } else if (2018 <= Number(match[0]) && 2020 >= Number(match[0])) {
            setPrices('$100-$350')
        } else if (2021 <= Number(match[0]) && 2024 >= Number(match[0])) {
            setPrices('$300-$1500')
        }
    };
    useEffect(() => {
        if (!accessDevice?.notes) {
            setDataFromChild(null)
        }
    }, [accessDevice?.notes])

    return (
        <>
            <section className='find_your_divs'>
                <div className='container'>
                    <div className='row'>
                        {/* {!hideStepUp && ( */}
                        <div className='col-md-12'>
                            <div className='title_header'>
                                <p>Get up to $1,575 for Your Used Device</p>
                                <h2>Trade In Your Device</h2>
                                <p>Trade in your device, unlock value, and help create a more sustainable future by giving it a new life!</p>
                            </div>
                        </div>
                        {/* )} */}

                        {/* {!hideStepUp && (
                            <> */}
                        <div className='col-md-2'>
                            <h4>Mac <b>Type</b></h4>
                        </div>
                        <div className='col-md-10'>
                            <ul className='list_device'>
                                {Array.isArray(Mac_type) && Mac_type?.map((device) => (
                                    <li className={`${device == macType && 'active'}`} onClick={() => handleMacType(device)}>
                                        <div className='inner_box'>
                                            <div className='icon'>
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                                                            <path d="M3.5 8C3.5 7.04306 3.50106 6.37565 3.56876 5.87208C3.63453 5.3829 3.75483 5.12385 3.93934 4.93934C4.12385 4.75483 4.3829 4.63453 4.87208 4.56876C5.37565 4.50106 6.04306 4.5 7 4.5H17C17.9569 4.5 18.6244 4.50106 19.1279 4.56876C19.6171 4.63453 19.8762 4.75483 20.0607 4.93934C20.2452 5.12385 20.3655 5.3829 20.4312 5.87208C20.4989 6.37565 20.5 7.04306 20.5 8V16.5H3.5V8Z" stroke="#000" />
                                                            <path d="M3.66667 16.5C3.02233 16.5 2.5 17.0223 2.5 17.6667C2.5 18.6792 3.32081 19.5 4.33333 19.5H19.6667C20.6792 19.5 21.5 18.6792 21.5 17.6667C21.5 17.0223 20.9777 16.5 20.3333 16.5H3.66667Z" stroke="#000" />
                                                        </svg> */}
                                                {GetCollectionSvg.map((val) => {
                                                    if (val.title === device) {
                                                        return (
                                                            <div
                                                                className='new_shopmac_img pdimg-next'
                                                                dangerouslySetInnerHTML={{
                                                                    __html: val.svghtml,
                                                                }}
                                                            ></div>
                                                        )
                                                    } else if (val.title === 'Mac Mini' && device === 'Mac mini') {
                                                        return (
                                                            <div
                                                                className='new_shopmac_img pdimg-next'
                                                                dangerouslySetInnerHTML={{
                                                                    __html: val.svghtml,
                                                                }}
                                                            ></div>
                                                        )
                                                    }
                                                })}
                                                {device === "Mac Studio" && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                                                        <path d="M3.5 8C3.5 7.04306 3.50106 6.37565 3.56876 5.87208C3.63453 5.3829 3.75483 5.12385 3.93934 4.93934C4.12385 4.75483 4.3829 4.63453 4.87208 4.56876C5.37565 4.50106 6.04306 4.5 7 4.5H17C17.9569 4.5 18.6244 4.50106 19.1279 4.56876C19.6171 4.63453 19.8762 4.75483 20.0607 4.93934C20.2452 5.12385 20.3655 5.3829 20.4312 5.87208C20.4989 6.37565 20.5 7.04306 20.5 8V16.5H3.5V8Z" stroke="#000" />
                                                        <path d="M3.66667 16.5C3.02233 16.5 2.5 17.0223 2.5 17.6667C2.5 18.6792 3.32081 19.5 4.33333 19.5H19.6667C20.6792 19.5 21.5 18.6792 21.5 17.6667C21.5 17.0223 20.9777 16.5 20.3333 16.5H3.66667Z" stroke="#000" />
                                                    </svg>
                                                )}
                                                {device === "Thunderbolt & Studio Display" && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                                                        <path d="M3.5 8C3.5 7.04306 3.50106 6.37565 3.56876 5.87208C3.63453 5.3829 3.75483 5.12385 3.93934 4.93934C4.12385 4.75483 4.3829 4.63453 4.87208 4.56876C5.37565 4.50106 6.04306 4.5 7 4.5H17C17.9569 4.5 18.6244 4.50106 19.1279 4.56876C19.6171 4.63453 19.8762 4.75483 20.0607 4.93934C20.2452 5.12385 20.3655 5.3829 20.4312 5.87208C20.4989 6.37565 20.5 7.04306 20.5 8V16.5H3.5V8Z" stroke="#000" />
                                                        <path d="M3.66667 16.5C3.02233 16.5 2.5 17.0223 2.5 17.6667C2.5 18.6792 3.32081 19.5 4.33333 19.5H19.6667C20.6792 19.5 21.5 18.6792 21.5 17.6667C21.5 17.0223 20.9777 16.5 20.3333 16.5H3.66667Z" stroke="#000" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div className='cnt'>
                                                <h4>{device} </h4>
                                                {/* <p>Up To $1,575</p> */}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* </>
                        )} */}
                    </div>
                    {seriesData?.length > 0 && (
                        <div className='row'>
                            <div className='col-md-2'>
                                <h4>{macType}</h4>
                            </div>
                            <div className='col-md-10'>
                                <ul className='list_device series'>
                                    {seriesData?.map((Val) => (
                                        <li className={`${Val.name == serialType && 'active'}`} onClick={() => handleSeriesStatic(Val)}>
                                            <div className='inner_box'>
                                                <div className='icon'>
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 25 25" fill="none">
                                                        <path d="M4.5 14.5V16.5C4.5 17.0523 4.94772 17.5 5.5 17.5H12.5M4.5 14.5V6.5C4.5 5.94772 4.94772 5.5 5.5 5.5H19.5C20.0523 5.5 20.5 5.94772 20.5 6.5V14.5M4.5 14.5H20.5M20.5 14.5V16.5C20.5 17.0523 20.0523 17.5 19.5 17.5H12.5M12.5 17.5V20.5M12.5 20.5H8M12.5 20.5H17" stroke="#000" stroke-width="1" />
                                                    </svg> */}
                                                    {GetCollectionSvg.map((value) => {
                                                        if (value.title === Val.type) {
                                                            return (
                                                                <div
                                                                    className='new_shopmac_img pdimg-next'
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: value.svghtml,
                                                                    }}
                                                                ></div>
                                                            )
                                                        } else if (value.title === 'Mac Mini' && Val.type === 'Mac mini') {
                                                            return (
                                                                <div
                                                                    className='new_shopmac_img pdimg-next'
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: value.svghtml,
                                                                    }}
                                                                ></div>
                                                            )
                                                        }
                                                    })}
                                                    {Val.type === "Mac Studio" && (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                                                            <path d="M3.5 8C3.5 7.04306 3.50106 6.37565 3.56876 5.87208C3.63453 5.3829 3.75483 5.12385 3.93934 4.93934C4.12385 4.75483 4.3829 4.63453 4.87208 4.56876C5.37565 4.50106 6.04306 4.5 7 4.5H17C17.9569 4.5 18.6244 4.50106 19.1279 4.56876C19.6171 4.63453 19.8762 4.75483 20.0607 4.93934C20.2452 5.12385 20.3655 5.3829 20.4312 5.87208C20.4989 6.37565 20.5 7.04306 20.5 8V16.5H3.5V8Z" stroke="#000" />
                                                            <path d="M3.66667 16.5C3.02233 16.5 2.5 17.0223 2.5 17.6667C2.5 18.6792 3.32081 19.5 4.33333 19.5H19.6667C20.6792 19.5 21.5 18.6792 21.5 17.6667C21.5 17.0223 20.9777 16.5 20.3333 16.5H3.66667Z" stroke="#000" />
                                                        </svg>
                                                    )}
                                                    {Val.type === "Thunderbolt & Studio Display" && (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                                                            <path d="M3.5 8C3.5 7.04306 3.50106 6.37565 3.56876 5.87208C3.63453 5.3829 3.75483 5.12385 3.93934 4.93934C4.12385 4.75483 4.3829 4.63453 4.87208 4.56876C5.37565 4.50106 6.04306 4.5 7 4.5H17C17.9569 4.5 18.6244 4.50106 19.1279 4.56876C19.6171 4.63453 19.8762 4.75483 20.0607 4.93934C20.2452 5.12385 20.3655 5.3829 20.4312 5.87208C20.4989 6.37565 20.5 7.04306 20.5 8V16.5H3.5V8Z" stroke="#000" />
                                                            <path d="M3.66667 16.5C3.02233 16.5 2.5 17.0223 2.5 17.6667C2.5 18.6792 3.32081 19.5 4.33333 19.5H19.6667C20.6792 19.5 21.5 18.6792 21.5 17.6667C21.5 17.0223 20.9777 16.5 20.3333 16.5H3.66667Z" stroke="#000" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <div className='cnt'>
                                                    <h4>{Val?.name}</h4>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                    {finalData?.length > 0 && (
                        <div className='row'>
                            <div className='col-md-2'>
                                <h4>{serialType}</h4>
                            </div>
                            <div className='col-md-10'>
                                <ul className='list_device series'>
                                    {finalData?.map((Val) => (
                                        <li className={`${Val.name == finalType && 'active'}`} onClick={() => handleSelectedItem(Val)}>
                                            <div className='inner_box'>
                                                <div className='icon'>
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 25 25" fill="none">
                                                        <path d="M4.5 14.5V16.5C4.5 17.0523 4.94772 17.5 5.5 17.5H12.5M4.5 14.5V6.5C4.5 5.94772 4.94772 5.5 5.5 5.5H19.5C20.0523 5.5 20.5 5.94772 20.5 6.5V14.5M4.5 14.5H20.5M20.5 14.5V16.5C20.5 17.0523 20.0523 17.5 19.5 17.5H12.5M12.5 17.5V20.5M12.5 20.5H8M12.5 20.5H17" stroke="#000" stroke-width="1" />
                                                    </svg> */}
                                                    {GetCollectionSvg.map((value) => {
                                                        if (value.title === Val.type) {
                                                            return (
                                                                <div
                                                                    className='new_shopmac_img pdimg-next'
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: value.svghtml,
                                                                    }}
                                                                ></div>
                                                            )
                                                        } else if (value.title === 'Mac Mini' && Val.type === 'Mac mini') {
                                                            return (
                                                                <div
                                                                    className='new_shopmac_img pdimg-next'
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: value.svghtml,
                                                                    }}
                                                                ></div>
                                                            )
                                                        }
                                                    })}
                                                    {Val.type === "Mac Studio" && (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                                                            <path d="M3.5 8C3.5 7.04306 3.50106 6.37565 3.56876 5.87208C3.63453 5.3829 3.75483 5.12385 3.93934 4.93934C4.12385 4.75483 4.3829 4.63453 4.87208 4.56876C5.37565 4.50106 6.04306 4.5 7 4.5H17C17.9569 4.5 18.6244 4.50106 19.1279 4.56876C19.6171 4.63453 19.8762 4.75483 20.0607 4.93934C20.2452 5.12385 20.3655 5.3829 20.4312 5.87208C20.4989 6.37565 20.5 7.04306 20.5 8V16.5H3.5V8Z" stroke="#000" />
                                                            <path d="M3.66667 16.5C3.02233 16.5 2.5 17.0223 2.5 17.6667C2.5 18.6792 3.32081 19.5 4.33333 19.5H19.6667C20.6792 19.5 21.5 18.6792 21.5 17.6667C21.5 17.0223 20.9777 16.5 20.3333 16.5H3.66667Z" stroke="#000" />
                                                        </svg>
                                                    )}
                                                    {Val.type === "Thunderbolt & Studio Display" && (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                                                            <path d="M3.5 8C3.5 7.04306 3.50106 6.37565 3.56876 5.87208C3.63453 5.3829 3.75483 5.12385 3.93934 4.93934C4.12385 4.75483 4.3829 4.63453 4.87208 4.56876C5.37565 4.50106 6.04306 4.5 7 4.5H17C17.9569 4.5 18.6244 4.50106 19.1279 4.56876C19.6171 4.63453 19.8762 4.75483 20.0607 4.93934C20.2452 5.12385 20.3655 5.3829 20.4312 5.87208C20.4989 6.37565 20.5 7.04306 20.5 8V16.5H3.5V8Z" stroke="#000" />
                                                            <path d="M3.66667 16.5C3.02233 16.5 2.5 17.0223 2.5 17.6667C2.5 18.6792 3.32081 19.5 4.33333 19.5H19.6667C20.6792 19.5 21.5 18.6792 21.5 17.6667C21.5 17.0223 20.9777 16.5 20.3333 16.5H3.66667Z" stroke="#000" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <div className='cnt'>
                                                    <h4>{Val?.name}</h4>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                    {hideStepUp && (
                        <>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='title_header'>
                                        <h2>Assess Device Condition</h2>
                                        <p>Your quoted value is based on the information provided and confirmed upon final inspection.</p>
                                        <a href='#'>View Device Inspection Tips</a>
                                    </div>
                                </div>
                                <div className='col-md-12'>
                                    <ul className='assess_list'>
                                        <li>
                                            <p>Does your device power on? <a href='#'>More Info</a></p>
                                            <div className='assess_buttons'>
                                                <button className={`${accessDevice?.device_power == 'Yes' && 'active'} btn`} onClick={() => handleAccessQuestion('device_power', 'Yes')} >Yes</button>
                                                <button className={`${accessDevice?.device_power == 'No' && 'active'} btn`} onClick={() => handleAccessQuestion('device_power', 'No')}>No	</button>
                                            </div>
                                        </li>
                                        <li>
                                            <p>Does the device function properly? <a href='#'>More Info</a></p>
                                            <div className='assess_buttons'>
                                                <button className={`${accessDevice?.device_function == 'Yes' && 'active'} btn`} onClick={() => handleAccessQuestion('device_function', 'Yes')}>Yes</button>
                                                <button className={`${accessDevice?.device_function == 'No' && 'active'} btn`} onClick={() => handleAccessQuestion('device_function', 'No')}>No	</button>
                                            </div>
                                        </li>
                                        <li>
                                            <p>Is the device in good physical condition? <a href='#'>More Info</a></p>
                                            <div className='assess_buttons'>
                                                <button className={`${accessDevice?.physical_condition == 'Yes' && 'active'} btn`} onClick={() => handleAccessQuestion('physical_condition', 'Yes')}>Yes</button>
                                                <button className={`${accessDevice?.physical_condition == 'No' && 'active'} btn`} onClick={() => handleAccessQuestion('physical_condition', 'No')}>No	</button>
                                            </div>
                                        </li>
                                        <li>
                                            <p>Will the working power adapter be included?</p>
                                            <div className='assess_buttons'>
                                                <button className={`${accessDevice?.power_adapter == 'Yes' && 'active'} btn`} onClick={() => handleAccessQuestion('power_adapter', 'Yes')}>Yes</button>
                                                <button className={`${accessDevice?.power_adapter == 'No' && 'active'} btn`} onClick={() => handleAccessQuestion('power_adapter', 'No')}>No	</button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </>
                    )}
                    {showSerialBox && (
                        <div className='row'>
                            <Form.Group
                                className="mb-2"
                                controlId="exampleForm.ControlTextarea2"
                            >
                                {/* <Form.Label>Other Details</Form.Label> */}
                                <Form.Control
                                    className="h-auto"
                                    as="textarea"
                                    rows={5}
                                    value={accessDevice?.notes}
                                    onChange={handleTextArea}
                                    placeholder='Here you can type specs, memory, processor, storage size, and other notes.'
                                />
                            </Form.Group>
                            {accessDevice?.notes && !dataFromChild && (
                                <>
                                    <div className='col-md-12'>
                                        <div className='title_header mt-4 p-0'>
                                            <h2>Device Identification</h2>
                                            <p>To ensure your trade-in is secure, please provide your device's serial number</p>
                                        </div>
                                    </div>
                                    <MacSerialLookupComp sendDataToParent={handleDataFromChild} />
                                </>
                            )}
                        </div>
                    )}
                    {/* {showSerialBox && accessDevice?.device_power === "No" && (
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='title_header'>
                                    <h2>Your Trade-In Offer</h2>
                                    <p>We're sorry, but we're unable to make a trade-in offer for your device.</p>
                                    <p>Please consider recycling your device responsibly.</p>
                                </div>
                            </div>
                        </div>
                    )} */}
                    {dataFromChild && type == "sell" && accessDevice?.notes && (
                        <>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='title_header mt-4 p-0'>
                                        <h2>Device Identification</h2>
                                        <p>To ensure your trade-in is secure, please provide your device's serial number</p>
                                    </div>
                                </div>
                            </div>
                            <DeviceIdentificationForm dataFromChild={dataFromChild} ansOfQuestions={accessDevice} prices={prices} />
                        </>
                    )}
                </div>
            </section>
        </>
    )
}