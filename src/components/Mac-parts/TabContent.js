import React, { useEffect, useState } from "react";
import { Col, Row, Tab } from "react-bootstrap";
import ChildCategory from "./ChildCategory";
import AllProducts from "./AllProducts";

export default function TabContent({ active, showProducts, setShowProducts }) {
  const [childCategoryID, setChildCategoryID] = useState("");

  useEffect(() => {
    const DefaultActiveChild = window?.localStorage?.getItem(
      "mac-part-collection-child"
    );
    if (DefaultActiveChild) {
      setShowProducts(true)
      setChildCategoryID(DefaultActiveChild);
    }
  }, []);

  return (
    <>
      {showProducts && (
        <div className='part-back-box'>
          <button
            className='main_btn hvr-shutter-out-horizontal partsbk-btn'
            onClick={() => {
              setShowProducts(false);
            }}
          >
            <svg
              stroke='currentColor'
              fill='currentColor'
              strokeWidth='0'
              viewBox='0 0 448 512'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z'></path>
            </svg>
          </button>
        </div>
      )}

      <div className='tabslide-full animation-left '>
        <div className='tabslidebox'>
          {showProducts && childCategoryID ? (
            <AllProducts childCategoryID={childCategoryID} />
          ) : (
            <ChildCategory
              active={active}
              setShowProducts={setShowProducts}
              setChildCategoryID={setChildCategoryID}
            />
          )}
        </div>
      </div>
    </>
  );
}
