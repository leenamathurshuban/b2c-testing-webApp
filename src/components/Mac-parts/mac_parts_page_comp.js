import { useEffect, useState } from "react";
import {
  Accordion,
  Card,
  Col,
  Container,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import { useGetCollectionsQuery } from "@/appRedux/apiSlice";
import WholesalepartsComp from "./wholesale_section";
import EbayComp from "./ebay";
import TabContent from "./TabContent";
import MacSerialLookupComp from "../Mac-repair/lookupform";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActive, setActiveTab, setCategoryName } from "@/appRedux/counterReducer";
import { useRouter } from "next/router";

export default function MacrpartpageComp({ }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const categoryName = useSelector((state) => state?.counter?.categoryName);
  const [ShowData, setShowData] = useState({})
  useEffect(() => {
    if (router.query) {
      if (router.query.categoryid) {
        setShowProducts(true)
        setChildCategoryID(router.query.categoryid)
        dispatch(setActive(router.query.categoryid))
      } else {
        setShowData(router.query)
      }
    }
  }, [router.isReady])

  const { data: collectionData, isLoading: collectionLoading } =
    useGetCollectionsQuery(process.env.NEXT_PUBLIC_MAC_PARTS_ID);

  const [collections, setCollections] = useState([]);
  const active = useSelector((state) => state.counter.active);
  const [loading, setLoading] = useState(true);
  const [showProducts, setShowProducts] = useState(false);
  const [dataFromChild, setDataFromChild] = useState(null);
  const [type, setType] = useState(null);
  const [childCategoryID, setChildCategoryID] = useState("");

  const handleDataFromChild = (e, data) => {
    setDataFromChild(data);
    setType(e);
  };

  useEffect(() => {
    const DefaultCollectionID = window?.localStorage?.getItem(
      "mac-part-collection"
    );
    // console.log("DefaultCollectionID", DefaultCollectionID)
    if (DefaultCollectionID) {
      dispatch(setActive(DefaultCollectionID))
    } else {
      const initialID = active;
      // console.log("initialID", initialID)
      window.localStorage.setItem("mac-part-collection", initialID);
      dispatch(setActive(initialID)); // Update Redux state
    }

    setCollections(collectionData || []);
    setLoading(collectionLoading);
  }, [collectionData, collectionLoading]);

  useEffect(() => {
    if (!categoryName) {
      setShowProducts(false)
      const DefaultCollectionID = window?.localStorage?.getItem(
        "mac-part-collection"
      );
      if (DefaultCollectionID) {
        dispatch(setActive(DefaultCollectionID))
      }
      sessionStorage.removeItem('scrollPosition')
    }
  }, [categoryName])

  return (
    <>
      {dataFromChild && type == "sell" && (
        <section className="main_macsalecomp">
          <Container>
            <div className="main_heading inner_gheading">
              <h6>
                Looking to sell <span>Your Mac?</span>
              </h6>
              <p>
                Apple Fix Pros will buy your MacBook Air, MacBook Pro, iMac and
                Mac Mini products.
              </p>
              <div className="cardbox">
                <Row className="justify-content-center">
                  <Col md={12} lg={4}>
                    <Card>
                      <Card.Body>
                        {/* mac-parts */}
                        <Card.Title className="d-flex item-center justify-content-center">
                          Model configuration
                        </Card.Title>
                        <div className="mac-repair-new-sell">
                          <ul className="mb-4">
                            {Object.entries(dataFromChild).map(
                              ([key, value]) => (
                                <li key={key}>
                                  <span className="response-title">
                                    <b>{key} : </b>
                                  </span>
                                  <span className="response-value">
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
      )}

      {dataFromChild === null && (
        <section className="macparts-page">
          <Container>
            <div className="main_heading-gradiant-p">
              <h1>
                <b>Mac parts</b>
              </h1>
            </div>

            <div className="banner_macg">
              <div className="main_heading-gradiant">
                <h2>
                  <b>Apple® Genuine Parts</b>
                </h2>
              </div>
            </div>
          </Container>
        </section>
      )}

      <MacSerialLookupComp sendDataToParent={handleDataFromChild} oldDataSerial={ShowData} setShowProducts={setShowProducts} setChildCategoryID={setChildCategoryID} />

      {dataFromChild === null && (
        <>
          <div className="main-macpart-section">
            {/* =======desktop tab start======= */}
            <section className="macparts_tab_section mrb100 tabdesktop">
              <Container>
                <div className="tabmacfull tabskl">
                  <Row className="">
                    <Col md={12}>
                      <Tab.Container
                        id="left-tabs-example"
                        defaultActiveKey="first"
                        activeKey={active}
                      >
                        <Row>
                          {loading ? (
                            <Col
                              sm={3}
                              className="flex-column left-nav nav nav-pills"
                            >
                              <div className="avatar"></div>
                              <div className="avatar"></div>
                              <div className="avatar"></div>
                              <div className="avatar"></div>
                              <div className="avatar"></div>
                            </Col>
                          ) : (
                            <Col sm={3}>
                              <Nav
                                variant="pills"
                                className="flex-column left-nav"
                              >
                                {collections.map((val, index) => (
                                  <Nav.Item key={`navkey${index}`}>
                                    <Nav.Link
                                      className="tab-ancor"
                                      eventKey={val.id}
                                      onClick={() => {
                                        window.localStorage.setItem(
                                          "mac-part-collection",
                                          val.id
                                        );
                                        window.localStorage.removeItem(
                                          "mac-part-collection-child"
                                        );
                                        dispatch(setActive(val.id)); // Update Redux state
                                        dispatch(setActiveTab(val.name))
                                        setShowProducts(false);
                                        dispatch(setCategoryName(''))
                                        sessionStorage.removeItem('scrollPosition')
                                      }}
                                    >
                                      {val.name}
                                    </Nav.Link>
                                  </Nav.Item>
                                ))}
                              </Nav>
                            </Col>
                          )}
                          <Col sm={9}>
                            <Tab.Content>
                              <Tab.Pane eventKey={active}>
                                <TabContent
                                  active={active}
                                  showProducts={showProducts}
                                  setShowProducts={setShowProducts}
                                  childCategoryID={childCategoryID}
                                  setChildCategoryID={setChildCategoryID}
                                />
                              </Tab.Pane>
                            </Tab.Content>
                          </Col>
                        </Row>
                      </Tab.Container>
                    </Col>
                  </Row>
                </div>
              </Container>
            </section>

            <section className="mobile-tabsection">
              <Container>
                <div className="tabaccordian-main">
                  {loading ? (
                    <Row className="tabskl">
                      <Col
                        md={12}
                        className="flex-column left-nav nav nav-pills"
                      >
                        <div className="avatar"></div>
                        <div className="avatar"></div>
                        <div className="avatar"></div>
                        <div className="avatar"></div>
                        <div className="avatar"></div>
                      </Col>
                    </Row>
                  ) : (
                    <Accordion defaultActiveKey={active}>
                      {collections.map((collection) => (
                        <Accordion.Item
                          key={`coll${collection.id}`}
                          eventKey={collection.id}
                        >
                          <Accordion.Header
                            onClick={() => {
                              window.localStorage.setItem(
                                "mac-part-collection",
                                collection.id
                              );
                              window.localStorage.removeItem(
                                "mac-part-collection-child"
                              );
                              dispatch(setActive(collection.id)); // Update Redux state
                              dispatch(setActiveTab(collection.name))
                              setShowProducts(false);
                            }}
                          >
                            {collection.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <div className="tabacc-mob-body">
                              <TabContent
                                active={active}
                                showProducts={showProducts}
                                setShowProducts={setShowProducts}
                                childCategoryID={childCategoryID}
                                setChildCategoryID={setChildCategoryID}
                              />
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  )}
                </div>
              </Container>
            </section>
          </div>
          <WholesalepartsComp />
          <EbayComp />
        </>
      )}
    </>
  );
}
