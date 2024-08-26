import Link from "next/link";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Sellmfrom from "./sellmfrom";
import MacSerialLookupComp from "../Mac-repair/lookupform";

export default function MacsaleyourComp() {
  const [dataFromChild, setDataFromChild] = useState(null);
  const [type, setType] = useState(null);

  const handleDataFromChild = (e, data) => {
    setDataFromChild(data);
    setType(e);
  };

  return (
    <section className="main_macsalecomp pdt100">
      <Container>
        <div className="main_heading-gradiant-p">
          <h1>
            Looking to sell <b>Your Mac?</b>
          </h1>
          {/* <p>
            Apple Fix Pros will buy your MacBook Air, MacBook Pro, iMac and Mac
            Mini products.
          </p> */}

          <MacSerialLookupComp sendDataToParent={handleDataFromChild} />
          {/* <Sellmfrom /> */}

          <div className="more-repair sellmaccomp">
            <h4>Do you have more than one MacBook to sell?</h4>
            <p>
              Please contact our sales department <br></br>
              <Link href="tel:+12795990139" className="">
                +1(279) 599-0139
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
