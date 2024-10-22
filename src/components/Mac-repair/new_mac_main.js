import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import {
    Container,
    Row,
    Col,
    Modal,
    Button,
    Form,
    Card,
} from "react-bootstrap";
import Image from "next/image";
import no_image from "../../../public/assets/images/no_image.png";
const { HTTP_SERVICE_CALL_NO_AUTH } = require("../../provider/ApiProvider");
import LoaderComp from "../Loader/loader_comp";
import LookupForm from "./lookupform";
import parse from "html-react-parser";

export default function Newmacmain() {
    const collectionFlag = useRef(true);
    const [isLoading, setIsLoading] = useState(true);
    const [allCollections, setAllCollections] = useState([]);

    useEffect(() => {
        if (collectionFlag.current) {
            collectionFlag.current = false;
            getAllCollectionsApi();
        }
    }, []);

    const getAllCollectionsApi = async () => {
        setIsLoading(true);

        const getCollections = [
            {
                // "id": 288803029146,
                handle: "imac",
                title: "iMac",
                svghtml: `<svg id="imac_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 11 48 40">
            <g id="Light">
              <g id="Mac">
                <path id="imac" d="M46.469,11H1.531C0.831,11,0,11.833,0,12.531l0.042,29.938C0.042,43.167,0.872,44,1.572,44
                  H21l-0.89,4.119c-0.302,1.37-1.563,2.273-2.927,2.188c-0.024,0.002-0.043,0.003-0.069,0.005c-0.191,0-0.346,0.154-0.346,0.345
                  c0,0.153,0.104,0.28,0.243,0.324c0.015,0.007,0.028,0.013,0.042,0.015V51H17.2h13.75v-0.005c0.015-0.002,0.029-0.008,0.042-0.015
                  c0.141-0.043,0.244-0.17,0.244-0.324c0-0.191-0.154-0.345-0.346-0.345c-0.026-0.001-0.044-0.003-0.069-0.005
                  c-1.363,0.085-2.626-0.817-2.928-2.188L27,44h19.469C47.169,44,48,43.167,48,42.469V12.531C48,11.833,47.169,11,46.469,11z
                   M24.946,41.829c-0.03,0.06-0.061,0.117-0.093,0.167c-0.034,0.051-0.066,0.097-0.096,0.136c-0.033,0.039-0.059,0.066-0.076,0.085
                  c-0.035,0.029-0.07,0.055-0.107,0.073c-0.035,0.019-0.072,0.026-0.111,0.026c-0.025,0-0.055-0.005-0.09-0.016
                  c-0.036-0.011-0.072-0.022-0.109-0.034c-0.038-0.012-0.075-0.023-0.112-0.035c-0.039-0.01-0.072-0.015-0.103-0.015
                  c-0.033,0-0.07,0.005-0.108,0.017c-0.04,0.011-0.079,0.023-0.118,0.036c-0.04,0.013-0.077,0.024-0.109,0.035
                  c-0.033,0.01-0.062,0.015-0.083,0.015c-0.032,0-0.061-0.005-0.088-0.015c-0.029-0.011-0.059-0.029-0.09-0.054
                  c-0.031-0.025-0.062-0.058-0.096-0.1c-0.036-0.042-0.074-0.092-0.116-0.155c-0.04-0.058-0.073-0.121-0.107-0.189
                  c-0.031-0.07-0.061-0.141-0.083-0.216c-0.022-0.073-0.041-0.147-0.052-0.223c-0.013-0.075-0.021-0.147-0.021-0.219
                  c0-0.109,0.016-0.211,0.048-0.304c0.032-0.092,0.078-0.174,0.134-0.242c0.057-0.069,0.123-0.121,0.198-0.159
                  c0.075-0.037,0.157-0.056,0.246-0.056c0.065,0,0.143,0.019,0.231,0.056c0.087,0.038,0.148,0.057,0.183,0.057
                  c0.012,0,0.034-0.005,0.064-0.017c0.032-0.011,0.079-0.027,0.138-0.05c0.059-0.02,0.104-0.034,0.138-0.042
                  c0.035-0.008,0.071-0.012,0.107-0.012c0.099,0,0.19,0.023,0.28,0.071c0.088,0.046,0.159,0.108,0.21,0.186
                  c-0.095,0.057-0.164,0.125-0.208,0.206c-0.042,0.079-0.063,0.173-0.063,0.28c0,0.112,0.029,0.214,0.089,0.307
                  c0.059,0.093,0.142,0.164,0.248,0.211C25.001,41.704,24.975,41.768,24.946,41.829z M23.995,40.306
                  c0-0.063,0.014-0.125,0.042-0.188c0.028-0.062,0.063-0.121,0.111-0.173c0.044-0.049,0.098-0.092,0.16-0.125
                  c0.061-0.033,0.125-0.049,0.191-0.053c0.003,0.009,0.004,0.018,0.004,0.025v0.027c0,0.064-0.014,0.13-0.041,0.195
                  c-0.027,0.065-0.061,0.123-0.106,0.174c-0.044,0.052-0.094,0.093-0.151,0.123c-0.056,0.031-0.113,0.045-0.171,0.045
                  c-0.024,0-0.036-0.003-0.038-0.014C23.995,40.336,23.995,40.324,23.995,40.306z M46,38H2V13h44V38z"></path>
              </g>
            </g>
          </svg>`,
            },
            {
                // "id": 288803029146,
                handle: "imac-pro",
                title: "iMac Pro",
                svghtml: `<svg id="imac_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 11 48 40">
            <g id="Light">
              <g id="Mac">
                <path id="imac" d="M46.469,11H1.531C0.831,11,0,11.833,0,12.531l0.042,29.938C0.042,43.167,0.872,44,1.572,44
                  H21l-0.89,4.119c-0.302,1.37-1.563,2.273-2.927,2.188c-0.024,0.002-0.043,0.003-0.069,0.005c-0.191,0-0.346,0.154-0.346,0.345
                  c0,0.153,0.104,0.28,0.243,0.324c0.015,0.007,0.028,0.013,0.042,0.015V51H17.2h13.75v-0.005c0.015-0.002,0.029-0.008,0.042-0.015
                  c0.141-0.043,0.244-0.17,0.244-0.324c0-0.191-0.154-0.345-0.346-0.345c-0.026-0.001-0.044-0.003-0.069-0.005
                  c-1.363,0.085-2.626-0.817-2.928-2.188L27,44h19.469C47.169,44,48,43.167,48,42.469V12.531C48,11.833,47.169,11,46.469,11z
                   M24.946,41.829c-0.03,0.06-0.061,0.117-0.093,0.167c-0.034,0.051-0.066,0.097-0.096,0.136c-0.033,0.039-0.059,0.066-0.076,0.085
                  c-0.035,0.029-0.07,0.055-0.107,0.073c-0.035,0.019-0.072,0.026-0.111,0.026c-0.025,0-0.055-0.005-0.09-0.016
                  c-0.036-0.011-0.072-0.022-0.109-0.034c-0.038-0.012-0.075-0.023-0.112-0.035c-0.039-0.01-0.072-0.015-0.103-0.015
                  c-0.033,0-0.07,0.005-0.108,0.017c-0.04,0.011-0.079,0.023-0.118,0.036c-0.04,0.013-0.077,0.024-0.109,0.035
                  c-0.033,0.01-0.062,0.015-0.083,0.015c-0.032,0-0.061-0.005-0.088-0.015c-0.029-0.011-0.059-0.029-0.09-0.054
                  c-0.031-0.025-0.062-0.058-0.096-0.1c-0.036-0.042-0.074-0.092-0.116-0.155c-0.04-0.058-0.073-0.121-0.107-0.189
                  c-0.031-0.07-0.061-0.141-0.083-0.216c-0.022-0.073-0.041-0.147-0.052-0.223c-0.013-0.075-0.021-0.147-0.021-0.219
                  c0-0.109,0.016-0.211,0.048-0.304c0.032-0.092,0.078-0.174,0.134-0.242c0.057-0.069,0.123-0.121,0.198-0.159
                  c0.075-0.037,0.157-0.056,0.246-0.056c0.065,0,0.143,0.019,0.231,0.056c0.087,0.038,0.148,0.057,0.183,0.057
                  c0.012,0,0.034-0.005,0.064-0.017c0.032-0.011,0.079-0.027,0.138-0.05c0.059-0.02,0.104-0.034,0.138-0.042
                  c0.035-0.008,0.071-0.012,0.107-0.012c0.099,0,0.19,0.023,0.28,0.071c0.088,0.046,0.159,0.108,0.21,0.186
                  c-0.095,0.057-0.164,0.125-0.208,0.206c-0.042,0.079-0.063,0.173-0.063,0.28c0,0.112,0.029,0.214,0.089,0.307
                  c0.059,0.093,0.142,0.164,0.248,0.211C25.001,41.704,24.975,41.768,24.946,41.829z M23.995,40.306
                  c0-0.063,0.014-0.125,0.042-0.188c0.028-0.062,0.063-0.121,0.111-0.173c0.044-0.049,0.098-0.092,0.16-0.125
                  c0.061-0.033,0.125-0.049,0.191-0.053c0.003,0.009,0.004,0.018,0.004,0.025v0.027c0,0.064-0.014,0.13-0.041,0.195
                  c-0.027,0.065-0.061,0.123-0.106,0.174c-0.044,0.052-0.094,0.093-0.151,0.123c-0.056,0.031-0.113,0.045-0.171,0.045
                  c-0.024,0-0.036-0.003-0.038-0.014C23.995,40.336,23.995,40.324,23.995,40.306z M46,38H2V13h44V38z"></path>
              </g>
            </g>
          </svg>`,
            },
            {
                // "id": 290302787738,
                handle: "mac-pro",
                title: "Mac Pro",
                svghtml: `<svg id="mac_pro_svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-2 9 40 42">
            <g id="Light">
              <g id="Mac_Pro_3_">
                <path d="M33.34,49.63v-0.18v-1.92h1.59V14.08h-1.71v0v-3.8c0-0.42-0.33-0.75-0.74-0.75
                  c-0.41,0-0.74,0.34-0.74,0.75v3.8v0H3.45v0v-3.8c0-0.42-0.33-0.75-0.74-0.75s-0.74,0.34-0.74,0.75v3.8v0H0v33.44h1.66v1.84v0.08
                  v0.19c0,0.01,0,0.03,0,0.04c0,0.03,0,0.05-0.01,0.08c0,0.03-0.01,0.05-0.03,0.08c-0.01,0.03-0.03,0.05-0.05,0.07
                  c-0.02,0.02-0.04,0.04-0.07,0.05c-0.02,0.01-0.05,0.02-0.08,0.03c-0.03,0-0.05,0.01-0.08,0.01H0.34v0H0.16v0.99h4.25v-0.99H4.25
                  H3.21c-0.03,0-0.05,0-0.08-0.01c-0.03-0.01-0.05-0.01-0.08-0.03c-0.02-0.01-0.05-0.03-0.07-0.05c-0.02-0.02-0.04-0.04-0.05-0.07
                  c-0.01-0.02-0.02-0.05-0.03-0.08c0-0.03-0.01-0.05-0.01-0.08c0-0.01,0-0.03,0-0.04v0v-0.18v-1.92h29.18v1.84v0.08v0.19
                  c0,0.01,0,0.03,0,0.04c0,0.03,0,0.05-0.01,0.08c0,0.03-0.01,0.05-0.03,0.08c-0.01,0.03-0.03,0.05-0.05,0.07
                  c-0.02,0.02-0.04,0.04-0.07,0.05c-0.02,0.01-0.05,0.02-0.08,0.03c-0.03,0-0.05,0.01-0.08,0.01h-1.01v0h-0.19v0.99h4.25v-0.99
                  h-0.16h-1.04c-0.03,0-0.05,0-0.08-0.01c-0.03-0.01-0.05-0.01-0.08-0.03c-0.02-0.01-0.05-0.03-0.07-0.05
                  c-0.02-0.02-0.04-0.04-0.05-0.07c-0.01-0.02-0.02-0.05-0.03-0.08c0-0.03-0.01-0.05-0.01-0.08C33.34,49.66,33.34,49.65,33.34,49.63
                  L33.34,49.63z M17.98,25.92c0.32-0.4,0.88-0.68,1.33-0.7c0.05,0.54-0.16,1.07-0.47,1.47c-0.32,0.38-0.83,0.69-1.34,0.65
                  C17.43,26.81,17.69,26.26,17.98,25.92z M20.57,33.25c-0.38,0.56-0.76,1.12-1.38,1.13c-0.6,0.01-0.8-0.36-1.48-0.36
                  c-0.69,0-0.91,0.35-1.47,0.37c-0.6,0.02-1.05-0.6-1.43-1.16c-0.77-1.14-1.36-3.21-0.57-4.61c0.39-0.7,1.1-1.14,1.86-1.15
                  c0.59-0.01,1.13,0.39,1.48,0.39c0.35,0,0.98-0.47,1.73-0.43c0.29,0.02,1.12,0.11,1.65,0.91c-0.04,0.03-0.99,0.59-0.97,1.75
                  c0.01,1.39,1.19,1.85,1.21,1.86C21.17,31.99,21,32.61,20.57,33.25z"></path>
              </g>
            </g>
            </svg>`,
            },
            {
                // "id": 288802898074,
                handle: "mac-mini",
                title: "Mac Mini",
                svghtml: `<svg id="mac_mini_svg" enable-background="new 0 0 128 128" viewBox="10 24 110 80" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
            <path d="M90,104H38c-7.7,0-14-6.3-14-14V38c0-7.7,6.3-14,14-14h52c7.7,0,14,6.3,14,14v52C104,97.7,97.7,104,90,104z"></path>
            <path class="inverse" d="M65.3,55.5c-0.4,0.1-0.9,0.2-1.5,0.2c0-1.4,0.4-2.7,1.1-3.7c0.7-1,1.9-1.8,3.6-2.2c0.1,0.6-0.1,1.9-0.3,2.6  c-0.3,0.7-0.7,1.4-1.4,2C66.4,55,65.8,55.3,65.3,55.5z M71.8,67.8c-0.7-1-1-2-1-3.2c0-1.1,0.3-2.1,0.9-3c0.3-0.5,0.9-1.1,1.7-1.7  c-0.5-0.6-1-1.1-1.5-1.5c-0.9-0.6-1.9-0.9-3.1-0.9c-0.7,0-1.5,0.2-2.5,0.5c-1,0.3-1.6,0.5-2.1,0.5c-0.3,0-1-0.1-2-0.4  c-1-0.3-1.9-0.4-2.6-0.4c-1.7,0-3,0.7-4.1,2.1c-1.1,1.4-1.6,3.2-1.6,5.4c0,2.4,0.7,4.8,2.1,7.3c1.4,2.5,2.9,3.8,4.4,3.8  c0.5,0,1.1-0.2,1.9-0.5c0.8-0.3,1.5-0.5,2.1-0.5c0.6,0,1.4,0.2,2.2,0.5c0.9,0.3,1.6,0.5,2,0.5c1.2,0,2.5-1,3.7-2.9  c0.8-1.2,1.4-2.4,1.8-3.6C73.3,69.4,72.5,68.8,71.8,67.8z"></path>
        </svg>`,
            },
            {
                // "id": 288802963610,
                handle: "macbook",
                title: "MacBook",
                svghtml: `<svg id="macbook_pro_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 19 58 32">
        <g id="Mac">
          <path id="macbook_pro" d="M52.987,48V20.503c0-0.832-0.643-1.49-1.491-1.49H6.503c-0.848,0-1.49,0.658-1.49,1.49
            V48H0v1.428C0.639,50.462,4.094,51,5.465,51h46.696c1.372,0,5.2-0.538,5.839-1.572V48H52.987z M7,21h44v27H7V21z"></path>
        </g>
      </svg>`,
            },
            {
                // "id": 288803061914,
                handle: "macbook-air",
                title: "MacBook Air",
                svghtml: `<svg id="macbook_air_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 52 27">
            <g id="Mac">
              <path id="macbook_air" d="M47,49V25.5c0-0.958-0.522-1.5-1.5-1.5h-39C5.522,24,5,24.504,5,25.5V49H0
                c0.053,0.092,0.127,0.323,0.211,0.323c0,0,2.071,1.248,4.639,1.422c2.566,0.174,7.59,0.264,7.596,0.252
                C12.448,50.994,25.366,51,25.366,51l12.969-0.003c0,0,6.023-0.081,8.59-0.252c2.568-0.171,4.639-1.422,4.639-1.422
                c0.084,0,0.383-0.231,0.436-0.323H47z M7,26h38v23H7V26z"></path>
            </g>
          </svg>`,
            },
            {
                // "id": 288802996378,
                handle: "macbook-pro",
                title: "MacBook Pro",
                svghtml: `<svg id="macbook_pro_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 19 58 32">
            <g id="Mac">
              <path id="macbook_pro" d="M52.987,48V20.503c0-0.832-0.643-1.49-1.491-1.49H6.503c-0.848,0-1.49,0.658-1.49,1.49
                V48H0v1.428C0.639,50.462,4.094,51,5.465,51h46.696c1.372,0,5.2-0.538,5.839-1.572V48H52.987z M7,21h44v27H7V21z"></path>
            </g>
          </svg>`,
            },
        ];
        setAllCollections(getCollections);
        // }
        setIsLoading(false);
    };

    const myLoader = ({ src, width, quality }) => {
        return `${src}&w=${width}&q=${quality || 75}`;
    };

    const [dataFromChild, setDataFromChild] = useState(null);
    const [type, setType] = useState(null);

    const handleDataFromChild = (e, data) => {
        setDataFromChild(data);
        setType(e);
    };

    return (
        <>
            {isLoading ? <LoaderComp /> : ""}

            {dataFromChild && type == "sell" ? (
                <section className='main_macsalecomp'>
                    <Container>
                        <div className='main_heading inner_gheading'>
                            <h6>
                                Looking to sell <span>Your Mac?</span>
                            </h6>
                            <p>
                                Apple Fix Pros will buy your MacBook Air,
                                MacBook Pro, iMac and Mac Mini products.
                            </p>
                            <div className='cardbox'>
                                <Row className='justify-content-center'>
                                    <Col md={12} lg={4}>
                                        <Card>
                                            <Card.Body>                                     
                                                <Card.Title className='d-flex item-center justify-content-center'>
                                                    Model configuration
                                                </Card.Title>
                                                <div className='mac-repair-new-sell'>
                                                    <ul className='mb-4'>
                                                        {Object.entries(
                                                            dataFromChild
                                                        ).map(
                                                            ([key, value]) => (
                                                                <li key={key}>
                                                                    {" "}
                                                                    <span className='response-title'>
                                                                        <b>
                                                                            {
                                                                                key
                                                                            }{" "}
                                                                            :{" "}
                                                                        </b>
                                                                    </span>
                                                                    <span className='response-value'>
                                                                        {value}
                                                                    </span>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Container>
                </section>
            ) : dataFromChild && type == "repair" ? (
                ""
            ) : (
                <section
                    className={
                        isLoading ? "main_shopmac new_mac_section d-none" : ""
                    }
                >
                    <div className='shopmac_desktop_new'>
                        <Container>
                            <div className='main_heading-gradiant-p'>
                                <h1>
                                    Mac <b>Repair</b>
                                </h1>
                                <p className="mb-2 haddingh_h2">
                                You have two ways to submit a repair request: 
                                </p>
                                <Row className="mcr_iconrow">
                                    <div className="mcr_iconbox"><p><strong>1</strong> Click on the device icon and follow the process</p></div>
                                    <div className="mcr_iconbox"><p><strong>2</strong> If you have the serial number just type it in the Mac Serial Lookup.</p></div>
                                </Row>
                            </div>

                            <div className='shopmac-full mrt50'>
                                <Row
                                    className={
                                        allCollections.length <= 0
                                            ? ""
                                            : "d-none"
                                    }
                                >
                                    <div className='no-data'>
                                        <h4 className='text-center'>
                                            No data Available!
                                        </h4>
                                    </div>
                                </Row>
                                <Row
                                    className={
                                        allCollections.length > 0
                                            ? "repair-row justify-content-center mac_repairicons"
                                            : "d-none"
                                    }
                                >
                                    {allCollections.map((val, key) => {
                                        return (
                                            <Col
                                                md={3}
                                                lg={3}
                                                key={key}
                                                data-aos='fade-down'
                                            >
                                                <Link
                                                    href={`/mac-repair/${encodeURIComponent(
                                                        val.handle
                                                    )}`}
                                                >
                                                    <div className='new_repairmac_box'>
                                                        <div
                                                            className='new_shopmac_img pdimg-next'
                                                            dangerouslySetInnerHTML={{
                                                                __html: val.svghtml,
                                                            }}
                                                        ></div>
                                                        <div className='new_shopmac_content'>
                                                            <h2>{val.title}</h2>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </div>
                            <div></div>
                        </Container>
                    </div>
                </section>
            )}

            <LookupForm sendDataToParent={handleDataFromChild} />

            {/* <TestiComp /> */}
            <main className={isLoading ? "" : "d-none"}>
                <Container>
                    <Row className='justify-content-center'>
                        <Col md={5} xs={12} className='sell-skl'>
                            <p className='card-intro skeleton'></p>
                            <h2 className='card-title skeleton'></h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3} xs={12} className='sell-skl'>
                            <div className='card'>
                                <div className='card-img skeleton'>
                                    {/* <!-- waiting for img to load from javascript --> */}
                                </div>
                                <div className='card-body'>
                                    <h2 className='card-title skeleton'>
                                        {/* <!-- wating for title to load from javascript --> */}
                                    </h2>
                                    {/* <p className="card-intro skeleton">
                    {/* <!-- waiting for intro to load from Javascript -->
                  </p> */}
                                </div>
                            </div>
                        </Col>
                        {/* =====column end=== */}
                        <Col md={3} xs={12} className='sell-skl'>
                            <div className='card'>
                                <div className='card-img skeleton'>
                                    {/* <!-- waiting for img to load from javascript --> */}
                                </div>
                                <div className='card-body'>
                                    <h2 className='card-title skeleton'>
                                        {/* <!-- wating for title to load from javascript --> */}
                                    </h2>
                                </div>
                            </div>
                        </Col>
                        {/* =====column end=== */}
                        <Col md={3} xs={12} className='sell-skl'>
                            <div className='card'>
                                <div className='card-img skeleton'>
                                    {/* <!-- waiting for img to load from javascript --> */}
                                </div>
                                <div className='card-body'>
                                    <h2 className='card-title skeleton'>
                                        {/* <!-- wating for title to load from javascript --> */}
                                    </h2>
                                </div>
                            </div>
                        </Col>
                        {/* =====column end=== */}
                        <Col md={3} xs={12} className='sell-skl'>
                            <div className='card'>
                                <div className='card-img skeleton'>
                                    {/* <!-- waiting for img to load from javascript --> */}
                                </div>
                                <div className='card-body'>
                                    <h2 className='card-title skeleton'>
                                        {/* <!-- wating for title to load from javascript --> */}
                                    </h2>
                                </div>
                            </div>
                        </Col>
                        {/* =====column end=== */}
                        <Col md={3} xs={12} className='sell-skl'>
                            <div className='card'>
                                <div className='card-img skeleton'>
                                    {/* <!-- waiting for img to load from javascript --> */}
                                </div>
                                <div className='card-body'>
                                    <h2 className='card-title skeleton'>
                                        {/* <!-- wating for title to load from javascript --> */}
                                    </h2>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    );
}
// ====SHOP OUR MAC SECTION END=====
