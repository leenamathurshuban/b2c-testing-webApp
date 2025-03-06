import React, { useEffect, useState } from 'react';
import MacSerialLookupComp from "../Mac-repair/lookupform";
import { DeviceIdentificationForm } from './device_identify_form';
import { Form, OverlayTrigger, Popover } from 'react-bootstrap';
import { CategoryArray, Mac_type, Series } from '@/utils/staticData';
import { GetCollectionSvg } from '@/utils/svgFile';
import FourPointInspection from '../Custom-model/FourPointInspection';
import thIcon from '../../../public/images/sell47.png';

import macbook2015 from '../../../public/images/mac-repair/Macbook/macbook_12_early_2015.jpg';
import macbook2016 from '../../../public/images/mac-repair/Macbook/macbook_12_early_2016.jpg';
import macbook2017 from '../../../public/images/mac-repair/Macbook/macbook_12_2017.jpg';

import macmini1 from '../../../public/images/mac-repair/Mac-mini/mac_mini.jpg';
import macmini2 from '../../../public/images/mac-repair/Mac-mini/mac_mini.jpg';
import macmini3 from '../../../public/images/mac-repair/Mac-mini/mac_mini.jpg';
import macmini4 from '../../../public/images/mac-repair/Mac-mini/mac_mini_2018.jpg';
import macmini5 from '../../../public/images/mac-repair/Mac-mini/m124.jpg';
import macmini6 from '../../../public/images/mac-repair/Mac-mini/m124.jpg';
import macmini7 from '../../../public/images/mac-repair/Mac-mini/m124.jpg';

import imac21icon1 from '../../../public/images/mac-repair/Imac/imac_21_late_2012.jpg';
import imac21icon2 from '../../../public/images/mac-repair/Imac/imac_21_early_2013.jpg';
import imac21icon3 from '../../../public/images/mac-repair/Imac/imac_21_late_2013.jpg';
import imac21icon4 from '../../../public/images/mac-repair/Imac/imac_21_mid_2014.jpg';
import imac21icon5 from '../../../public/images/mac-repair/Imac/imac_21_late_2015.jpg';
import imac21icon6 from '../../../public/images/mac-repair/Imac/imac_21_4k_late_2015.jpg';
import imac21icon7 from '../../../public/images/mac-repair/Imac/imac_21_2017.jpg';
import imac21icon8 from '../../../public/images/mac-repair/Imac/imac_21_4k_2017.jpg';
import imac21icon9 from '../../../public/images/mac-repair/Imac/imac_21_4k_2019.jpg';

import imac24icon1 from '../../../public/images/mac-repair/Imac/imac_24_m1_1_2021.jpg';
import imac24icon2 from '../../../public/images/mac-repair/Imac/imac_m3.png';
import imac24icon3 from '../../../public/images/mac-repair/Imac/imac_4.png';

import imac27icon1 from '../../../public/images/mac-repair/Imac/imac_27_late_2012.jpg';
import imac27icon2 from '../../../public/images/mac-repair/Imac/imac_27_late_2013.jpg';
import imac27icon3 from '../../../public/images/mac-repair/Imac/imac_21_mid_2014.jpg';
import imac27icon4 from '../../../public/images/mac-repair/Imac/imac_27_5k_mid_2015.jpg';
import imac27icon5 from '../../../public/images/mac-repair/Imac/imac_27_5k_late_2015.jpg';
import imac27icon6 from '../../../public/images/mac-repair/Imac/imac_27_5k_2017.jpg';
import imac27icon7 from '../../../public/images/mac-repair/Imac/imac_27_5k_2019.jpg';
import imac27icon8 from '../../../public/images/mac-repair/Imac/imac_27_5k_2020.jpg';

import macbookpro1 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_13_mid_2012.jpg';
import macbookpro2 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_13_retina_late_2012.jpg';
import macbookpro3 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_13_retina_early_2013.jpg';
import macbookpro4 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_13_retina_late_2013.jpg';
import macbookpro5 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_13_retina_mid_2014.jpg';
import macbookpro6 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_13_retina_early_2015.jpg';
import macbookpro7 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_13_2tbt3_2016.jpg';
import macbookpro8 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_13_4tbt3_2016.jpg';
import macbookpro9 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_13_2tbt3_2017.jpg';
import macbookpro10 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_13_4tbt3_2017.jpg';
import macbookpro11 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_13_4tbt3_2018.jpg';
import macbookpro12 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_13_2tbt3_2019.jpg';
import macbookpro13 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_13_4tbt3_2019.jpg';
import macbookpro14 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_13_2tbt3_2020.jpg';
import macbookpro15 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_13_2tbt3_2020.jpg';
import macbookpro16 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_13_2tbt3_2020.jpg';
import macbookpro17 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_13_m2_2022.jpg';

import macbookpro18 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_14_2021.jpg';
import macbookpro19 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_14_2023.jpeg';
import macbookpro20 from '../../../public/images/mac-repair/macbook_pro/for all new macbooks mbp14-m3-max-pro-spaceblack-select-202310.jpeg';
import macbookpro21 from '../../../public/images/mac-repair/macbook_pro/for all new macbooks mbp14-m3-max-pro-spaceblack-select-202310.jpeg';
import macbookpro22 from '../../../public/images/mac-repair/macbook_pro/for all new macbooks mbp14-m3-max-pro-spaceblack-select-202310.jpeg';
import macbookpro23 from '../../../public/images/mac-repair/macbook_pro/for all new macbooks mbp14-m3-max-pro-spaceblack-select-202310.jpeg';

import macbookpro24 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_15_retina_mid_2012.jpg';
import macbookpro25 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_15_retina_mid_2012.jpg';
import macbookpro26 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_15_retina_mid_2012.jpg';
import macbookpro27 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_15_retina_early_2013.jpg';
import macbookpro28 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_13_retina_late_2013.jpg';
import macbookpro29 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_15_retina_mid_2014.jpg';
import macbookpro30 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_15_retina_mid_2015.jpg';
import macbookpro31 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_15_2016.jpg';
import macbookpro32 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_15_2017.jpg';
import macbookpro33 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_15_2018.jpg';
import macbookpro34 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_15_2019.jpg';

import macbookpro35 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_16_2019.jpg';
import macbookpro36 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_16_2021.jpg';
import macbookpro37 from '../../../public/images/mac-repair/macbook_pro/macbook_pro_16_2023.jpg';
import macbookpro38 from '../../../public/images/mac-repair/macbook_pro/mbpm3.jpg';
import macbookpro39 from '../../../public/images/mac-repair/macbook_pro/mbpm4.jpg';

import macbookair1 from '../../../public/images/mac-repair/Macbook_air/macbook_air_11_mid_2012.jpg';
import macbookair2 from '../../../public/images/mac-repair/Macbook_air/macbook_air_11_mid_2012.jpg';
import macbookair3 from '../../../public/images/mac-repair/Macbook_air/macbook_air_11_mid_2012.jpg';
import macbookair4 from '../../../public/images/mac-repair/Macbook_air/macbook_air_11_early_2014.jpg';
import macbookair5 from '../../../public/images/mac-repair/Macbook_air/macbook_air_11_early_2015.jpg';

import macbookair6 from '../../../public/images/mac-repair/Macbook_air/macbook_air_13_mid_2012.jpg';
import macbookair7 from '../../../public/images/mac-repair/Macbook_air/macbook_air_13_mid_2012.jpg';
import macbookair8 from '../../../public/images/mac-repair/Macbook_air/macbook_air_13_mid_2012.jpg';
import macbookair9 from '../../../public/images/mac-repair/Macbook_air/macbook_air_13_mid_2013.jpg';
import macbookair10 from '../../../public/images/mac-repair/Macbook_air/macbook_air_13_early_2014.jpg';
import macbookair11 from '../../../public/images/mac-repair/Macbook_air/macbook_air_13_early_2015.jpg';
import macbookair12 from '../../../public/images/mac-repair/Macbook_air/macbook_air_13_2017.jpg';
import macbookair13 from '../../../public/images/mac-repair/Macbook_air/macbook_air_13_retina_2018.jpg';
import macbookair14 from '../../../public/images/mac-repair/Macbook_air/macbook_air_13_retina_2019.jpg';
import macbookair15 from '../../../public/images/mac-repair/Macbook_air/macbook_air_13_retina_2019.jpg';
import macbookair16 from '../../../public/images/mac-repair/Macbook_air/macbook_air_13_m1_2020.jpg';
import macbookair17 from '../../../public/images/mac-repair/Macbook_air/macbook_air_13_m2_2022.png';
import macbookair18 from '../../../public/images/mac-repair/Macbook_air/macbook_air_13_m2_2022.png';

import macbookair15inch from '../../../public/images/mac-repair/Macbook_air/macbook_air_15_m2_2023.png';
import imacProicon from '../../../public/images/mac-repair/Imac-pro/imac_pro_27_2017.jpg';

import macpro1 from '../../../public/images/mac-repair/Mac-pro/mac_pro_black.jpg';
import macpro2 from '../../../public/images/mac-repair/Mac-pro/mac_pro_2019.jpg';
import macpro3 from '../../../public/images/mac-repair/Mac-pro/mac_pro_rack_2019.jpg';

import macstudio from '../../../public/images/mac-repair/studio/studio.jpg';

import Image from 'next/image';

const macbookproicon13 = [macbookpro1, macbookpro2, macbookpro3, macbookpro4, macbookpro5, macbookpro6, macbookpro7,
    macbookpro8, macbookpro9, macbookpro10, macbookpro11, macbookpro12, macbookpro13, macbookpro14, macbookpro15, macbookpro16, macbookpro17
];
const macbookproicon14 = [macbookpro18, macbookpro19, macbookpro20, macbookpro21, macbookpro22, macbookpro23];
const macbookproicon15 = [macbookpro24, macbookpro25, macbookpro26, macbookpro27, macbookpro28, macbookpro29, macbookpro30,
    macbookpro31, macbookpro32, macbookpro33, macbookpro34
];
const macbookproicon16 = [macbookpro35, macbookpro36, macbookpro37, macbookpro38, macbookpro39];
const macbookairincon11 = [macbookair1, macbookair2, macbookair3, macbookair4, macbookair5];
const macbookairincon13 = [macbookair6, macbookair7, macbookair8, macbookair9, macbookair10, macbookair11, macbookair12, macbookair13,
    macbookair14, macbookair15, macbookair16, macbookair17, macbookair18
];
const macminiIcon = [macmini1, macmini2, macmini3, macmini4, macmini5, macmini6, macmini7];
const imacIcon21 = [imac21icon1, imac21icon2, imac21icon3, imac21icon4, imac21icon5, imac21icon6, imac21icon7,
    imac21icon8, imac21icon9
];
const imacIcon24 = [imac24icon1, imac24icon2, imac24icon3];
const imacIcon27 = [imac27icon1, imac27icon2, imac27icon3, imac27icon4, imac27icon5, imac27icon6, imac27icon7, imac27icon8];
const macProIcon = [macpro1, macpro2, macpro3];

const macstudioIcon = [
    // 'https://shop.applefixpros.com/wp-content/uploads/2024/04/macstudio_2022-1.jpeg',
    // "https://shop.applefixpros.com/wp-content/uploads/2024/04/macstudio2023.jpeg"
    macstudio, macstudio
]

export const Findyourmac = ({ data }) => {
    const [hideStepUp, setHideStepUp] = useState(false);
    const [accessDevice, setAccessDevice] = useState({});
    const [accessCount, setAccessCount] = useState({})
    const [showSerialBox, setShowSerialBox] = useState(false)
    const [dataFromChild, setDataFromChild] = useState(null);
    const [type, setType] = useState(null);
    const [show, setShow] = useState(false);

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
        if (!match) {
            setPrices('$300-$1500')
        } else {
            if (2010 <= Number(match[0]) && 2017 >= Number(match[0])) {
                setPrices('$50-$250')
            } else if (2018 <= Number(match[0]) && 2020 >= Number(match[0])) {
                setPrices('$100-$350')
            } else if (2021 <= Number(match[0]) && 2024 >= Number(match[0])) {
                setPrices('$300-$1500')
            }
        }
    };
    useEffect(() => {
        if (!accessDevice?.notes) {
            setDataFromChild(null)
        }
    }, [accessDevice?.notes])
    // console.log(Mac_type)
    console.log(seriesData)
    console.log(finalData)
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
                                                {device === "Thunderbolt & Studio Display" && (
                                                    <Image src={thIcon} width={60} height={50} />
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
                                    {seriesData?.map((Val, index) => (
                                        <li className={`${Val.name == serialType && 'active'}`} onClick={() => handleSeriesStatic(Val)}>
                                            <div className='inner_box'>
                                                <div className='icon'>
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 25 25" fill="none">
                                                        <path d="M4.5 14.5V16.5C4.5 17.0523 4.94772 17.5 5.5 17.5H12.5M4.5 14.5V6.5C4.5 5.94772 4.94772 5.5 5.5 5.5H19.5C20.0523 5.5 20.5 5.94772 20.5 6.5V14.5M4.5 14.5H20.5M20.5 14.5V16.5C20.5 17.0523 20.0523 17.5 19.5 17.5H12.5M12.5 17.5V20.5M12.5 20.5H8M12.5 20.5H17" stroke="#000" stroke-width="1" />
                                                    </svg> */}
                                                    {/* {GetCollectionSvg.map((value) => {
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
                                                 */}
                                                    {GetCollectionSvg.map((value) => {
                                                        if (value.title === 'MacBook Air' && Val.type == 'MacBook Air') {
                                                            return (
                                                                <div
                                                                    className='new_shopmac_img pdimg-next'
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: value.svghtml,
                                                                    }}
                                                                ></div>
                                                            )
                                                        } else if (value.title === 'MacBook Pro' && Val.type == 'MacBook Pro') {
                                                            return (
                                                                <div
                                                                    className='new_shopmac_img pdimg-next'
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: value.svghtml,
                                                                    }}
                                                                ></div>
                                                            )
                                                        } else if (value.title === 'iMac' && Val.type == 'iMac') {
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
                                                    {Val.type === "Thunderbolt & Studio Display" && (
                                                        <Image src={thIcon} width={60} height={50} />
                                                    )}
                                                    {Val.name === 'MacBook (Retina, 12-inch, Early 2015)' && Val.type === 'MacBook' && (
                                                        <Image src={macbook2015} width={100} height={50} />
                                                    )}
                                                    {Val.name === 'MacBook (Retina, 12-inch, Early 2016)' && Val.type === 'MacBook' && (
                                                        <Image src={macbook2016} width={100} height={50} />
                                                    )}
                                                    {Val.name === 'MacBook (Retina, 12-inch, 2017)' && Val.type === 'MacBook' && (
                                                        <Image src={macbook2017} width={100} height={50} />
                                                    )}

                                                    {Val.type === 'Mac mini' && (
                                                        <Image src={macminiIcon[index]} width={100} height={50} />
                                                    )}
                                                    {Val.type === 'iMac Pro' && (
                                                        <Image src={imacProicon} width={100} height={50} />
                                                    )}
                                                    {Val.type === 'Mac Pro' && (
                                                        <Image src={macProIcon[index]} width={100} height={50} />
                                                    )}
                                                    {Val.type === 'Mac Studio' && (
                                                        <Image src={macstudioIcon[index]} width={100} height={50} />
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
                                    {finalData?.map((Val, index) => (
                                        <li className={`${Val.name == finalType && 'active'}`} onClick={() => handleSelectedItem(Val)}>
                                            <div className='inner_box'>
                                                <div className='icon'>
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 25 25" fill="none">
                                                        <path d="M4.5 14.5V16.5C4.5 17.0523 4.94772 17.5 5.5 17.5H12.5M4.5 14.5V6.5C4.5 5.94772 4.94772 5.5 5.5 5.5H19.5C20.0523 5.5 20.5 5.94772 20.5 6.5V14.5M4.5 14.5H20.5M20.5 14.5V16.5C20.5 17.0523 20.0523 17.5 19.5 17.5H12.5M12.5 17.5V20.5M12.5 20.5H8M12.5 20.5H17" stroke="#000" stroke-width="1" />
                                                    </svg> */}
                                                    {/* {GetCollectionSvg.map((value) => {
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
                                                    {Val.type === "Thunderbolt & Studio Display" && (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                                                            <path d="M3.5 8C3.5 7.04306 3.50106 6.37565 3.56876 5.87208C3.63453 5.3829 3.75483 5.12385 3.93934 4.93934C4.12385 4.75483 4.3829 4.63453 4.87208 4.56876C5.37565 4.50106 6.04306 4.5 7 4.5H17C17.9569 4.5 18.6244 4.50106 19.1279 4.56876C19.6171 4.63453 19.8762 4.75483 20.0607 4.93934C20.2452 5.12385 20.3655 5.3829 20.4312 5.87208C20.4989 6.37565 20.5 7.04306 20.5 8V16.5H3.5V8Z" stroke="#000" />
                                                            <path d="M3.66667 16.5C3.02233 16.5 2.5 17.0223 2.5 17.6667C2.5 18.6792 3.32081 19.5 4.33333 19.5H19.6667C20.6792 19.5 21.5 18.6792 21.5 17.6667C21.5 17.0223 20.9777 16.5 20.3333 16.5H3.66667Z" stroke="#000" />
                                                        </svg>
                                                    )} */}
                                                    {Val.type === 'MacBook Air' && Val.series === '11-inch' && (
                                                        <Image src={macbookairincon11[index]} width={100} height={50} />
                                                    )}
                                                    {Val.type === 'MacBook Air' && Val.series === '13-inch' && (
                                                        <Image src={macbookairincon13[index]} width={100} height={50} />
                                                    )}

                                                    {Val.type === 'MacBook Air' && Val.series === '15-inch' && (
                                                        <Image src={macbookair15inch} width={100} height={50} />
                                                    )}

                                                    {Val.type === 'MacBook Pro' && Val.series === '13-inch' && (
                                                        <Image src={macbookproicon13[index]} width={100} height={50} />
                                                    )}
                                                    {Val.type === 'MacBook Pro' && Val.series === '14-inch' && (
                                                        <Image src={macbookproicon14[index]} width={100} height={50} />
                                                    )}
                                                    {Val.type === 'MacBook Pro' && Val.series === '15-inch' && (
                                                        <Image src={macbookproicon15[index]} width={100} height={50} />
                                                    )}
                                                    {Val.type === 'MacBook Pro' && Val.series === '16-inch' && (
                                                        <Image src={macbookproicon16[index]} width={100} height={50} />
                                                    )}

                                                    {Val.type === 'iMac' && Val.series === '21-inch' && (
                                                        <Image src={imacIcon21[index]} width={100} height={50} />
                                                    )}
                                                    {Val.type === 'iMac' && Val.series === '24-inch' && (
                                                        <Image src={imacIcon24[index]} width={100} height={50} />
                                                    )}
                                                    {Val.type === 'iMac' && Val.series === '27-inch' && (
                                                        <Image src={imacIcon27[index]} width={100} height={50} />
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
                                        <span style={{ cursor: 'pointer' }} onClick={() => setShow(true)}>View Device Inspection Tips</span>
                                        {/* <a href='#' onClick={()=>setShow(true)}>View Device Inspection Tips</a> */}
                                    </div>
                                </div>
                                <div className='col-md-12'>
                                    <ul className='assess_list'>
                                        <li>
                                            <p className='p_info'>Does your device power on?
                                                <OverlayTrigger
                                                    trigger="click"
                                                    key='top'
                                                    placement='top'
                                                    rootClose
                                                    overlay={
                                                        <Popover id={`popover-positioned-top`}>
                                                            {/* <Popover.Header as="h3">{`Popover top`}</Popover.Header> */}
                                                            <Popover.Body>
                                                                <strong>Select "No"</strong>if the device has issues powering on and off.<br />
                                                                <strong>Select "No"</strong>if the device has Liquid Damage.<br />
                                                                <strong>Select "No"</strong>if the device has Bad Battery.<br />
                                                                <strong>Select "No"</strong>if the device has other Power Issues.<br />
                                                            </Popover.Body>
                                                        </Popover>
                                                    }
                                                >
                                                    <span href='#'>More Info</span>
                                                </OverlayTrigger>
                                            </p>
                                            <div className='assess_buttons'>
                                                <button className={`${accessDevice?.device_power == 'Yes' && 'active'} btn`} onClick={() => handleAccessQuestion('device_power', 'Yes')} >Yes</button>
                                                <button className={`${accessDevice?.device_power == 'No' && 'active'} btn`} onClick={() => handleAccessQuestion('device_power', 'No')}>No	</button>
                                            </div>
                                        </li>
                                        <li>
                                            <p className='p_info'>Does the device function properly?
                                                <OverlayTrigger
                                                    trigger="click"
                                                    key='top'
                                                    placement='top'
                                                    rootClose
                                                    overlay={
                                                        <Popover id={`popover-positioned-top`}>
                                                            {/* <Popover.Header as="h3">{`Popover top`}</Popover.Header> */}
                                                            <Popover.Body>
                                                                <strong>Select "No"</strong>if the device has Admin or iCloud or MDM<br />
                                                                <strong>Select "No"</strong>if the device has macOS Booting Issues<br />
                                                                <strong>Select "No"</strong>if the device has other Hardware issues<br />
                                                            </Popover.Body>
                                                        </Popover>
                                                    }
                                                >
                                                    <span href='#'>More Info</span>
                                                </OverlayTrigger>
                                            </p>
                                            <div className='assess_buttons'>
                                                <button className={`${accessDevice?.device_function == 'Yes' && 'active'} btn`} onClick={() => handleAccessQuestion('device_function', 'Yes')}>Yes</button>
                                                <button className={`${accessDevice?.device_function == 'No' && 'active'} btn`} onClick={() => handleAccessQuestion('device_function', 'No')}>No	</button>
                                            </div>
                                        </li>
                                        <li>
                                            <p className='p_info'>Is the device in good physical condition?
                                                <OverlayTrigger
                                                    trigger="click"
                                                    key='top'
                                                    placement='top'
                                                    rootClose
                                                    overlay={
                                                        <Popover id={`popover-positioned-top`}>
                                                            {/* <Popover.Header as="h3">{`Popover top`}</Popover.Header> */}
                                                            <Popover.Body>
                                                                <strong>Select "No"</strong>if the device has Cracked or malfunctioning LCD<br />
                                                                <strong>Select "No"</strong>if the device has Cracks, dents or severe scratches to the housing, sticker marks or fading <br />
                                                                <strong>Select "No"</strong>if the device has Liquid damaged<br />
                                                                <strong>Select "No"</strong>if the device has Keyboard or Trackpad or Speakers or other non-functional components
                                                            </Popover.Body>
                                                        </Popover>
                                                    }
                                                >
                                                    <span href='#'>More Info</span>
                                                </OverlayTrigger>
                                            </p>
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
            <FourPointInspection show={show} onHide={() => setShow(false)} />
        </>
    )
}