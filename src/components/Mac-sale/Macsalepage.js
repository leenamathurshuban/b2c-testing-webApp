import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function MacsalepageComp({ propValue, url }) {
  return (
    <Link
      href={`${
        propValue?.id == Number(process.env.NEXT_PUBLIC_MAC_SALE_BLOW_OUT_ID) ||
        propValue?.id === 237
          ? `${url}/blowout/${propValue?.slug}?id=${propValue?.id}`
          : `${url}/${propValue?.slug}?id=${propValue?.id}`
      }`}
    >
      <div className="new_shopmac_box">
        <div className="new_shopmac_img pdimg-next">
          <Image
            src={propValue?.image?.src || "/assets/no_image.jpg"}
            alt="Apple Fix Pro Mac Img"
            className="img-fluid"
            width={"100"}
            height={"50"}
            layout="responsive"
            objectFit="contain"
          />
        </div>
        <div className="new_shopmac_content">
          <h2>{(propValue?.name).replace(/&amp;/g, "&")}</h2>
        </div>
      </div>
    </Link>
  );
}
