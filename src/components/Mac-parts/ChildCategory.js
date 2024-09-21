import { useGetCollectionsQuery } from "@/appRedux/apiSlice";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "@/appRedux/counterReducer";

export default function ChildCategory({
  active,
  setShowProducts,
  setChildCategoryID,
}) {
  const {
    data: collectionData,
    isLoading: collectionLoading,
    isFetching,
  } = useGetCollectionsQuery(active);
  
  const dispatch = useDispatch()
   
 // Data retrieve from store LC function 
  // const collectionData = useSelector(
  //   (state) => state.counter.childCollectionData
  // );

  const [childCategory, setChildCategory] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setChildCategory(collectionData);
    setLoading(isFetching);
  }, [collectionData, collectionLoading, isFetching]);

  if (loading) {
    return (
      <div className='tabskl'>
          <Row>
            <Col  md={6} lg={4}>
              <div className='line'></div>
            </Col>
            <Col  md={6} lg={4}>
              <div className='line'></div>
            </Col>
            <Col  md={6} lg={4}>
              <div className='line'></div>
            </Col>
            <Col  md={6} lg={4}>
              <div className='line'></div>
            </Col>
            <Col  md={6} lg={4}>
              <div className='line'></div>
            </Col>
          </Row>
      </div>
    );
  }

  return (
    <Row className="tabslide-full animation-left">
      {childCategory?.length ? (
        childCategory?.map((val) => (
          <Col md={6} lg={4} key={`chil${val.id}`}>
            <div
              className='tabslide_box'
              onClick={() => {
                window?.localStorage?.setItem(
                  "mac-part-collection-child",
                  val.id
                );
                setShowProducts(true);
                setChildCategoryID(val.id);
                dispatch(setActive(val.id));
              }}
            >
              <div className='tabslide_box_content macPartsTitle'>
                <h2 className='mt-2'>{val.name}</h2>
              </div>
            </div>
          </Col>
        ))
      ) : (
        <div className='noproduct'>There are no products </div>
      )}
    </Row>
  );
}
