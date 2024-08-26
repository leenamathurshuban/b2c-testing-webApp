import Link from "next/link";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import n1 from "../../../public/assets/images/new-mac/n1.png";
import n2 from "../../../public/assets/images/new-mac/n2.png";



export default function Macsalepccard({products}) {
  return (
<>
    <Link href="/single-mac-products">
        <div className="new_shopmac_pc_box">
      <div className="new_shopmac_pc_img">
        <Image
          src={"/assets/no_image.jpg"}
          alt="Apple Fix Pro Mac Img"
          className="img-fluid"
        />
      </div>
      <div className="new_shopmacpc_content">
        <h2>MacBook Pro 13”</h2>
        <p>Up to 16GB unified memory</p>
        <p>2 TB Maximum configurable storage2 </p>
        <h5>From $999</h5>
      <Link className="main_btn hvr-shutter-out-horizontal" href="/single-mac-products">View Product</Link></div>
      </div>
    </Link>
  
</>
	);
}

// ====SHOP OUR MAC SECTION END=====
