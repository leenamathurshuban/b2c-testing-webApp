import { useGetCollectionsQuery, useGetColletionByIdMutation, useGetProductByIdMutation, useGetProductsByCollectionIdQuery } from '@/appRedux/apiSlice';
import React, { useEffect, useState } from 'react';
import MacSerialLookupComp from "../Mac-repair/lookupform";
import { DeviceIdentificationForm } from './device_identify_form';
import { Col, Row } from 'react-bootstrap';
import { Default } from 'react-awesome-spinners';


export const Findyourdevice = ({ data }) => {
    const [deviceId, setDeviceId] = useState('');
    const [seriesId, setSeriesId] = useState('');
    const [productId, setProductId] = useState('');
    const [hideStepUp, setHideStepUp] = useState(false);
    const [selectedProduct, setSelectProduct] = useState({});
    const [products, setProducts] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accessDevice, setAccessDevice] = useState({});
    const [accessCount,setAccessCount] = useState({})
    const [showSerialBox, setShowSerialBox] = useState(false)
    const [dataFromChild, setDataFromChild] = useState(null);
    const [type, setType] = useState(null);
    const handleDataFromChild = (e, data, serialNumber) => {
        setDataFromChild(data);
        setType(e);
        setAccessDevice({ ...accessDevice, ["serialNumber"]: serialNumber })
    };

    // const { data: collectionData, isLoading: collectionLoading } =   useGetCollectionsQuery(deviceId);   
    const [getColletionById, { isSuccess, isLoading: collectionLoading, data: collectionData }] = useGetColletionByIdMutation()

    // const { data: Products, isLoading: Loading } = useGetProductsByCollectionIdQuery(seriesId);
    // const [getProductById, { isSuccess: fetchSucess, isLoading: fetchLoading, }] = useGetProductByIdMutation()
    const [getProductById, product] = useGetProductByIdMutation()

    const handleDeviceType = (Val) => {
        getColletionById({ id: Val?.id })
        setDeviceId(Val?.id)
        setSeriesId('')
        // setStorage([])
        setProducts([])
        setAccessDevice({ ...accessDevice, ['device_type']: Val?.name })
        // setStorageId('')
    }

    useEffect(() => {
        if (isSuccess) {
            setSeries(collectionData || []);
            setLoading(collectionLoading);
        }
    }, [isSuccess, collectionLoading]);

    const handleSeries = (Val) => {
        getProductById({ id: Val?.id })
        setSeriesId(Val?.id)
        setProducts([])
        setAccessDevice({ ...accessDevice, ['series']: Val?.name })
    }
    useEffect(() => {
        if (product.isSuccess) {
            // const filterData = product?.data?.data?.map((Val) => ({ id: Val?.uid, storage_type: Val?.storage_type, storage_size: Val?.storage_size }))
            setProducts(product?.data?.data)
        }
    }, [product.isSuccess, product.isLoading])

    const handleDevice = (value) => {
        setHideStepUp(true)
        setProductId(value?.id)
        setSelectProduct(value)
        setAccessDevice({ ...accessDevice, ['device_name']: value?.name })
    }
    // console.log(products)
    const handleAccessQuestion = (name, value, index) => {
        setAccessDevice({
            ...accessDevice,
            [name]: value
        })
        setAccessCount({
            ...accessCount,
            [name]:value
        })
    }
    useEffect(() => {
        if (Object.keys(accessCount)?.length == 4) {
            setShowSerialBox(true)
        }
    }, [accessCount])
    console.log(accessDevice)
    return (
        <>
            <section className='find_your_divs'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='title_header'>
                                <h2>Find Your Device to Determine Its Value</h2>
                                <p>Select the make, model, and device specifications to determine your trade-in offer</p>
                            </div>
                        </div>

                        {!hideStepUp && (
                            <>
                                <div className='col-md-2'>
                                    <h4>Device Type</h4>
                                </div>
                                <div className='col-md-10'>
                                    <ul className='list_device'>
                                        {Array.isArray(data) && data?.map((device) => (
                                            <li className={`${device?.id == deviceId && 'active'}`} onClick={() => handleDeviceType(device)}>
                                                <div className='inner_box'>
                                                    <div className='icon'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                                                            <path d="M3.5 8C3.5 7.04306 3.50106 6.37565 3.56876 5.87208C3.63453 5.3829 3.75483 5.12385 3.93934 4.93934C4.12385 4.75483 4.3829 4.63453 4.87208 4.56876C5.37565 4.50106 6.04306 4.5 7 4.5H17C17.9569 4.5 18.6244 4.50106 19.1279 4.56876C19.6171 4.63453 19.8762 4.75483 20.0607 4.93934C20.2452 5.12385 20.3655 5.3829 20.4312 5.87208C20.4989 6.37565 20.5 7.04306 20.5 8V16.5H3.5V8Z" stroke="#000" />
                                                            <path d="M3.66667 16.5C3.02233 16.5 2.5 17.0223 2.5 17.6667C2.5 18.6792 3.32081 19.5 4.33333 19.5H19.6667C20.6792 19.5 21.5 18.6792 21.5 17.6667C21.5 17.0223 20.9777 16.5 20.3333 16.5H3.66667Z" stroke="#000" />
                                                        </svg>
                                                    </div>
                                                    <div className='cnt'>
                                                        <h4>{device?.name} </h4>
                                                        <p>Up To $1,575</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                        {/* <li>
                                    <div className='inner_box'>
                                        <div className='icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 25 25" fill="none">
                                                <path d="M4.5 14.5V16.5C4.5 17.0523 4.94772 17.5 5.5 17.5H12.5M4.5 14.5V6.5C4.5 5.94772 4.94772 5.5 5.5 5.5H19.5C20.0523 5.5 20.5 5.94772 20.5 6.5V14.5M4.5 14.5H20.5M20.5 14.5V16.5C20.5 17.0523 20.0523 17.5 19.5 17.5H12.5M12.5 17.5V20.5M12.5 20.5H8M12.5 20.5H17" stroke="#000" stroke-width="1" />
                                            </svg>
                                        </div>
                                        <div className='cnt'>
                                            <h4>Desktop</h4>
                                            <p>Up To $925</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='inner_box'>
                                        <div className='icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 25 25" fill="none">
                                                <path d="M4.5 14.5V16.5C4.5 17.0523 4.94772 17.5 5.5 17.5H12.5M4.5 14.5V6.5C4.5 5.94772 4.94772 5.5 5.5 5.5H19.5C20.0523 5.5 20.5 5.94772 20.5 6.5V14.5M4.5 14.5H20.5M20.5 14.5V16.5C20.5 17.0523 20.0523 17.5 19.5 17.5H12.5M12.5 17.5V20.5M12.5 20.5H8M12.5 20.5H17" stroke="#000" stroke-width="1" />
                                            </svg>
                                        </div>
                                        <div className='cnt'>
                                            <h4>Display </h4>
                                            <p>Up To $400</p>
                                        </div>
                                    </div>
                                </li> */}
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                    {series?.length > 0 && !hideStepUp && (
                        <div className='row'>
                            <div className='col-md-2'>
                                <h4>Series</h4>
                            </div>
                            <div className='col-md-10'>
                                <ul className='list_device series'>
                                    {series?.map((Val) => (
                                        <li className={`${Val?.id == seriesId && 'active'}`} onClick={() => handleSeries(Val)}>
                                            <div className='inner_box'>
                                                <div className='icon'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 25 25" fill="none">
                                                        <path d="M4.5 14.5V16.5C4.5 17.0523 4.94772 17.5 5.5 17.5H12.5M4.5 14.5V6.5C4.5 5.94772 4.94772 5.5 5.5 5.5H19.5C20.0523 5.5 20.5 5.94772 20.5 6.5V14.5M4.5 14.5H20.5M20.5 14.5V16.5C20.5 17.0523 20.0523 17.5 19.5 17.5H12.5M12.5 17.5V20.5M12.5 20.5H8M12.5 20.5H17" stroke="#000" stroke-width="1" />
                                                    </svg>
                                                </div>
                                                <div className='cnt'>
                                                    <h4>{Val?.name}</h4>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                    {/* <li>
                                    <div className='inner_box'>
                                        <div className='icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 25 25" fill="none">
                                                <path d="M4.5 14.5V16.5C4.5 17.0523 4.94772 17.5 5.5 17.5H12.5M4.5 14.5V6.5C4.5 5.94772 4.94772 5.5 5.5 5.5H19.5C20.0523 5.5 20.5 5.94772 20.5 6.5V14.5M4.5 14.5H20.5M20.5 14.5V16.5C20.5 17.0523 20.0523 17.5 19.5 17.5H12.5M12.5 17.5V20.5M12.5 20.5H8M12.5 20.5H17" stroke="#000" stroke-width="1" />
                                            </svg>
                                        </div>
                                        <div className='cnt'>
                                            <h4>MacBook Air M1 Series</h4>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='inner_box'>
                                        <div className='icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 25 25" fill="none">
                                                <path d="M4.5 14.5V16.5C4.5 17.0523 4.94772 17.5 5.5 17.5H12.5M4.5 14.5V6.5C4.5 5.94772 4.94772 5.5 5.5 5.5H19.5C20.0523 5.5 20.5 5.94772 20.5 6.5V14.5M4.5 14.5H20.5M20.5 14.5V16.5C20.5 17.0523 20.0523 17.5 19.5 17.5H12.5M12.5 17.5V20.5M12.5 20.5H8M12.5 20.5H17" stroke="#000" stroke-width="1" />
                                            </svg>
                                        </div>
                                        <div className='cnt'>
                                            <h4>MacBook Air M2 Series</h4>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='inner_box'>
                                        <div className='icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 25 25" fill="none">
                                                <path d="M4.5 14.5V16.5C4.5 17.0523 4.94772 17.5 5.5 17.5H12.5M4.5 14.5V6.5C4.5 5.94772 4.94772 5.5 5.5 5.5H19.5C20.0523 5.5 20.5 5.94772 20.5 6.5V14.5M4.5 14.5H20.5M20.5 14.5V16.5C20.5 17.0523 20.0523 17.5 19.5 17.5H12.5M12.5 17.5V20.5M12.5 20.5H8M12.5 20.5H17" stroke="#000" stroke-width="1" />
                                            </svg>
                                        </div>
                                        <div className='cnt'>
                                            <h4>MacBook Air M3 Series</h4>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='inner_box'>
                                        <div className='icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 25 25" fill="none">
                                                <path d="M4.5 14.5V16.5C4.5 17.0523 4.94772 17.5 5.5 17.5H12.5M4.5 14.5V6.5C4.5 5.94772 4.94772 5.5 5.5 5.5H19.5C20.0523 5.5 20.5 5.94772 20.5 6.5V14.5M4.5 14.5H20.5M20.5 14.5V16.5C20.5 17.0523 20.0523 17.5 19.5 17.5H12.5M12.5 17.5V20.5M12.5 20.5H8M12.5 20.5H17" stroke="#000" stroke-width="1" />
                                            </svg>
                                        </div>
                                        <div className='cnt'>
                                            <h4>MacBook Pro Intel Series</h4>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='inner_box'>
                                        <div className='icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 25 25" fill="none">
                                                <path d="M4.5 14.5V16.5C4.5 17.0523 4.94772 17.5 5.5 17.5H12.5M4.5 14.5V6.5C4.5 5.94772 4.94772 5.5 5.5 5.5H19.5C20.0523 5.5 20.5 5.94772 20.5 6.5V14.5M4.5 14.5H20.5M20.5 14.5V16.5C20.5 17.0523 20.0523 17.5 19.5 17.5H12.5M12.5 17.5V20.5M12.5 20.5H8M12.5 20.5H17" stroke="#000" stroke-width="1" />
                                            </svg>
                                        </div>
                                        <div className='cnt'>
                                            <h4>MacBook Pro M1 Series</h4>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='inner_box'>
                                        <div className='icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 25 25" fill="none">
                                                <path d="M4.5 14.5V16.5C4.5 17.0523 4.94772 17.5 5.5 17.5H12.5M4.5 14.5V6.5C4.5 5.94772 4.94772 5.5 5.5 5.5H19.5C20.0523 5.5 20.5 5.94772 20.5 6.5V14.5M4.5 14.5H20.5M20.5 14.5V16.5C20.5 17.0523 20.0523 17.5 19.5 17.5H12.5M12.5 17.5V20.5M12.5 20.5H8M12.5 20.5H17" stroke="#000" stroke-width="1" />
                                            </svg>
                                        </div>
                                        <div className='cnt'>
                                            <h4>MacBook Pro M2 Series</h4>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='inner_box'>
                                        <div className='icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 25 25" fill="none">
                                                <path d="M4.5 14.5V16.5C4.5 17.0523 4.94772 17.5 5.5 17.5H12.5M4.5 14.5V6.5C4.5 5.94772 4.94772 5.5 5.5 5.5H19.5C20.0523 5.5 20.5 5.94772 20.5 6.5V14.5M4.5 14.5H20.5M20.5 14.5V16.5C20.5 17.0523 20.0523 17.5 19.5 17.5H12.5M12.5 17.5V20.5M12.5 20.5H8M12.5 20.5H17" stroke="#000" stroke-width="1" />
                                            </svg>
                                        </div>
                                        <div className='cnt'>
                                            <h4>MacBook Pro M3 Series</h4>
                                        </div>
                                    </div>
                                </li> */}
                                </ul>
                            </div>
                        </div>
                    )}
                    {/* {storage?.length > 0 && !hideStepUp && (
                        <div className='row'>
                            <div className='col-md-2'>
                                <h4>Storage</h4>
                            </div>
                            <div className='col-md-10'>
                                <ul className='list_device storage'>
                                    {storage?.map((Val) => (
                                        <li className={`${Val?.uid === storageId && 'active'}`} onClick={() => handleProduct(Val)}>
                                            <div className='inner_box'>
                                                <div className='icon'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 0 100 100" data-name="Layer 1" id="Layer_1"><title /><path d="M42.76,59.24H57.24a2,2,0,0,0,2-2V42.76a2,2,0,0,0-2-2H42.76a2,2,0,0,0-2,2V57.24A2,2,0,0,0,42.76,59.24Zm2-14.48H55.24V55.24H44.76ZM80,52a2,2,0,0,0,0-4H72.84V37.83H80a2,2,0,0,0,0-4H72.84V29.16a2,2,0,0,0-2-2H66.17V20a2,2,0,0,0-4,0v7.16H52V20a2,2,0,0,0-4,0v7.16H37.83V20a2,2,0,0,0-4,0v7.16H29.16a2,2,0,0,0-2,2v4.67H20a2,2,0,0,0,0,4h7.16V48H20a2,2,0,0,0,0,4h7.16V62.17H20a2,2,0,0,0,0,4h7.16v4.67a2,2,0,0,0,2,2h4.67V80a2,2,0,0,0,4,0V72.84H48V80a2,2,0,0,0,4,0V72.84H62.17V80a2,2,0,0,0,4,0V72.84h4.67a2,2,0,0,0,2-2V66.17H80a2,2,0,0,0,0-4H72.84V52ZM68.84,68.84H31.16V31.16H68.84Z" /></svg>
                                                </div>
                                                <div className='cnt'>                                                    
                                                    <h4>{Val?.storage_size} {Val?.storage_type}</h4>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                    <li>
                                        <div className='inner_box'>
                                            <div className='icon'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 0 100 100" data-name="Layer 1" id="Layer_1"><title /><path d="M42.76,59.24H57.24a2,2,0,0,0,2-2V42.76a2,2,0,0,0-2-2H42.76a2,2,0,0,0-2,2V57.24A2,2,0,0,0,42.76,59.24Zm2-14.48H55.24V55.24H44.76ZM80,52a2,2,0,0,0,0-4H72.84V37.83H80a2,2,0,0,0,0-4H72.84V29.16a2,2,0,0,0-2-2H66.17V20a2,2,0,0,0-4,0v7.16H52V20a2,2,0,0,0-4,0v7.16H37.83V20a2,2,0,0,0-4,0v7.16H29.16a2,2,0,0,0-2,2v4.67H20a2,2,0,0,0,0,4h7.16V48H20a2,2,0,0,0,0,4h7.16V62.17H20a2,2,0,0,0,0,4h7.16v4.67a2,2,0,0,0,2,2h4.67V80a2,2,0,0,0,4,0V72.84H48V80a2,2,0,0,0,4,0V72.84H62.17V80a2,2,0,0,0,4,0V72.84h4.67a2,2,0,0,0,2-2V66.17H80a2,2,0,0,0,0-4H72.84V52ZM68.84,68.84H31.16V31.16H68.84Z" /></svg>
                                            </div>
                                            <div className='cnt'>
                                                <h4>256GB</h4>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='inner_box'>
                                            <div className='icon'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 0 100 100" data-name="Layer 1" id="Layer_1"><title /><path d="M42.76,59.24H57.24a2,2,0,0,0,2-2V42.76a2,2,0,0,0-2-2H42.76a2,2,0,0,0-2,2V57.24A2,2,0,0,0,42.76,59.24Zm2-14.48H55.24V55.24H44.76ZM80,52a2,2,0,0,0,0-4H72.84V37.83H80a2,2,0,0,0,0-4H72.84V29.16a2,2,0,0,0-2-2H66.17V20a2,2,0,0,0-4,0v7.16H52V20a2,2,0,0,0-4,0v7.16H37.83V20a2,2,0,0,0-4,0v7.16H29.16a2,2,0,0,0-2,2v4.67H20a2,2,0,0,0,0,4h7.16V48H20a2,2,0,0,0,0,4h7.16V62.17H20a2,2,0,0,0,0,4h7.16v4.67a2,2,0,0,0,2,2h4.67V80a2,2,0,0,0,4,0V72.84H48V80a2,2,0,0,0,4,0V72.84H62.17V80a2,2,0,0,0,4,0V72.84h4.67a2,2,0,0,0,2-2V66.17H80a2,2,0,0,0,0-4H72.84V52ZM68.84,68.84H31.16V31.16H68.84Z" /></svg>
                                            </div>
                                            <div className='cnt'>
                                                <h4>256GB SSD</h4>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='inner_box'>
                                            <div className='icon'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 0 100 100" data-name="Layer 1" id="Layer_1"><title /><path d="M42.76,59.24H57.24a2,2,0,0,0,2-2V42.76a2,2,0,0,0-2-2H42.76a2,2,0,0,0-2,2V57.24A2,2,0,0,0,42.76,59.24Zm2-14.48H55.24V55.24H44.76ZM80,52a2,2,0,0,0,0-4H72.84V37.83H80a2,2,0,0,0,0-4H72.84V29.16a2,2,0,0,0-2-2H66.17V20a2,2,0,0,0-4,0v7.16H52V20a2,2,0,0,0-4,0v7.16H37.83V20a2,2,0,0,0-4,0v7.16H29.16a2,2,0,0,0-2,2v4.67H20a2,2,0,0,0,0,4h7.16V48H20a2,2,0,0,0,0,4h7.16V62.17H20a2,2,0,0,0,0,4h7.16v4.67a2,2,0,0,0,2,2h4.67V80a2,2,0,0,0,4,0V72.84H48V80a2,2,0,0,0,4,0V72.84H62.17V80a2,2,0,0,0,4,0V72.84h4.67a2,2,0,0,0,2-2V66.17H80a2,2,0,0,0,0-4H72.84V52ZM68.84,68.84H31.16V31.16H68.84Z" /></svg>
                                            </div>
                                            <div className='cnt'>
                                                <h4>512GB SSD</h4>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='inner_box'>
                                            <div className='icon'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 0 100 100" data-name="Layer 1" id="Layer_1"><title /><path d="M42.76,59.24H57.24a2,2,0,0,0,2-2V42.76a2,2,0,0,0-2-2H42.76a2,2,0,0,0-2,2V57.24A2,2,0,0,0,42.76,59.24Zm2-14.48H55.24V55.24H44.76ZM80,52a2,2,0,0,0,0-4H72.84V37.83H80a2,2,0,0,0,0-4H72.84V29.16a2,2,0,0,0-2-2H66.17V20a2,2,0,0,0-4,0v7.16H52V20a2,2,0,0,0-4,0v7.16H37.83V20a2,2,0,0,0-4,0v7.16H29.16a2,2,0,0,0-2,2v4.67H20a2,2,0,0,0,0,4h7.16V48H20a2,2,0,0,0,0,4h7.16V62.17H20a2,2,0,0,0,0,4h7.16v4.67a2,2,0,0,0,2,2h4.67V80a2,2,0,0,0,4,0V72.84H48V80a2,2,0,0,0,4,0V72.84H62.17V80a2,2,0,0,0,4,0V72.84h4.67a2,2,0,0,0,2-2V66.17H80a2,2,0,0,0,0-4H72.84V52ZM68.84,68.84H31.16V31.16H68.84Z" /></svg>
                                            </div>
                                            <div className='cnt'>
                                                <h4>2TB SSD</h4>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='inner_box'>
                                            <div className='icon'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 0 100 100" data-name="Layer 1" id="Layer_1"><title /><path d="M42.76,59.24H57.24a2,2,0,0,0,2-2V42.76a2,2,0,0,0-2-2H42.76a2,2,0,0,0-2,2V57.24A2,2,0,0,0,42.76,59.24Zm2-14.48H55.24V55.24H44.76ZM80,52a2,2,0,0,0,0-4H72.84V37.83H80a2,2,0,0,0,0-4H72.84V29.16a2,2,0,0,0-2-2H66.17V20a2,2,0,0,0-4,0v7.16H52V20a2,2,0,0,0-4,0v7.16H37.83V20a2,2,0,0,0-4,0v7.16H29.16a2,2,0,0,0-2,2v4.67H20a2,2,0,0,0,0,4h7.16V48H20a2,2,0,0,0,0,4h7.16V62.17H20a2,2,0,0,0,0,4h7.16v4.67a2,2,0,0,0,2,2h4.67V80a2,2,0,0,0,4,0V72.84H48V80a2,2,0,0,0,4,0V72.84H62.17V80a2,2,0,0,0,4,0V72.84h4.67a2,2,0,0,0,2-2V66.17H80a2,2,0,0,0,0-4H72.84V52ZM68.84,68.84H31.16V31.16H68.84Z" /></svg>
                                            </div>
                                            <div className='cnt'>
                                                <h4>1TB</h4>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )} */}
                    {products?.length > 0 && !hideStepUp && (
                        <div className='row'>
                            <div className='col-md-2'>
                                <h4>Device</h4>
                            </div>
                            <div className='col-md-10'>
                                <ul className='list_device device'>
                                    {products?.map((Val) => (
                                        <li className={`${hideStepUp && 'active'}`} onClick={() => handleDevice(Val)}>
                                            <div className='inner_box'>
                                                <div className='icon'>
                                                    <img src=
                                                        {Val?.images?.[0]?.src || 'https://cdn.shopify.com/s/files/1/0265/9971/8971/files/mac_image.png?v=1732883311'} />
                                                    <h4>{Val?.name} </h4>
                                                </div>
                                                <div className='cnt'>
                                                    <p><span>Up To</span> <b>${Val?.price}</b></p>
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
                                <div className='col-md-2'>
                                    <h4>Your <b>Device</b></h4>
                                </div>
                                <div className='col-md-10'>
                                    <ul className='list_device device'>
                                        <li className={`${productId === selectedProduct?.id && 'active'}`}>
                                            <div className='inner_box'>
                                                <div className='icon'>
                                                    <img src=
                                                        {selectedProduct?.images?.[0]?.src || 'https://cdn.shopify.com/s/files/1/0265/9971/8971/files/mac_image.png?v=1732883311'} />
                                                    <h4>{selectedProduct?.name} </h4>
                                                </div>
                                                <div className='cnt'>
                                                    <p><span>Up To</span> <b>${selectedProduct?.price}</b></p>
                                                </div>
                                            </div>
                                        </li>
                                        {hideStepUp && (<p style={{ cursor: 'pointer' }} onClick={() => {
                                            setHideStepUp(false);
                                            setSeriesId('')
                                            setDeviceId('')
                                            setProductId('')
                                            setProducts([]);
                                            setSelectProduct({})
                                            setSeries([]);
                                            setShowSerialBox(false)
                                            setAccessDevice({})
                                        }}>X Wrong one? Find a different device</p>)}
                                    </ul>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='title_header'>
                                        <h1><b>Assess Device</b> Condition</h1>
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
                    {showSerialBox && accessDevice?.device_power === "Yes" && !dataFromChild && (
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='title_header'>
                                    <h1>Device <b>Identification</b></h1>
                                    <p>To ensure your trade-in is secure, please provide your device's serial number</p>
                                </div>
                            </div>
                            {/* <form className='serial_no_form'>
                                <div className='form-group'>
                                    <label>Device Serial Number</label>
                                    <input type='number' className='device_felid' />
                                </div>
                                <button className='btn device_button'>Save Device Identifier</button>
                            </form> */}
                            <MacSerialLookupComp sendDataToParent={handleDataFromChild} />
                        </div>
                    )}
                    {showSerialBox && accessDevice?.device_power === "No" && (
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='title_header'>
                                    <h2>Your Trade-In Offer</h2>
                                    <p>We're sorry, but we're unable to make a trade-in offer for your device.</p>
                                    <p>Please consider recycling your device responsibly.</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {dataFromChild && type == "sell" && accessDevice?.device_power === "Yes" && (
                        <>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='title_header'>
                                        <h1>Device <b>Identification</b></h1>
                                        <p>To ensure your trade-in is secure, please provide your device's serial number</p>
                                    </div>
                                </div>
                            </div>
                            <DeviceIdentificationForm dataFromChild={dataFromChild} ansOfQuestions={accessDevice} />
                        </>
                    )}
                </div>
                <Row>
                    <Col className="text-center">
                        {collectionLoading && !series.length && (
                            <Default color={"#ed6877"} className="loader" />
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        {product.isLoading && !products.length && (
                            <Default color={"#ed6877"} className="loader" />
                        )}
                    </Col>
                </Row>
            </section>
        </>
    )
}