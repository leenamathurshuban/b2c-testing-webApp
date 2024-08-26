import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import Slider from "react-slick";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import QuteImage from "../../../public/assets/images/testimonial/quate.svg";
import QuteactiveImage from "../../../public/assets/images/testimonial/qactive.svg";
import T1user from "../../../public/assets/images/testimonial/t1.png";
import T2user from "../../../public/assets/images/testimonial/t2.png";
import T3user from "../../../public/assets/images/testimonial/t3.png";

export default function TestiComp() {
  const [curruntCenterslider, setcurruntCenterslider] = useState(0);
  const sliderSetting = {
    dots: false,
    infinite: true,
    speed: 500,
    cssEase: "linear",
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    centerMode: true,
    arrows: true,
    centerPadding: "0%",
    beforeChange: (current, next) => {
      setcurruntCenterslider(next);
    },
    afterChange: (current) => {
      setcurruntCenterslider(current);
    },

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  const testimonialData = [
    {
      name: "Cecilia Cobb",
      comment: `This shop is very good both for buying computers and related accessories, and getting any repairs done - they even repair
      The prices here are generally pretty competitive and you will be likely to struggle to find somewhere else that can match both its range of products and prices - I certainly haven't come across such a place.  In addition you get very good customer service and the staff know what they are talking about.  It's well worth a visit especially if you have any repairs that need doing.  I'm no expert on computers, but this does seem to be a good shop.`,
      rating: 5,
      image: (
        <Image
          src={T1user}
          alt="Apple Fix Pro Testimonial Img"
          className="img-fluid"
        />
      ),
      no_image: (
        <span style={{ background: "#e26878" }} className="no_image_span">
          C
        </span>
      ),
    },
    {
      name: "Mark J.",
      comment: `Super Fast, i am impressed honestly.
      Speed : 2 hours to fix my Mac Book 16 inch
      Quality: Genuine part
      Price: little expensive but worth it.
      Staff: experts and friendly
      Store: well organized and not a typical repair shop haha`,
      rating: 5,
      // image:T2user,
      image: (
        <Image
          src={T2user}
          alt="Apple Fix Pro Testimonial Img"
          className="img-fluid"
        />
      ),
      no_image: (
        <span style={{ background: "#a9e2f3" }} className="no_image_span">
          M
        </span>
      ),
    },
    {
      name: "Corazon Intel",
      comment: `Trustworthy , Punctual and Speedy Service I am very Happy with my MAC Pro M1, The computer was repaired & now is fully functional! They even were nice enough to add on some expensive software to my laptop , AppleFixPros are awesome!!! So happy I chose their service.`,
      rating: 5,
      image: (
        <Image
          src={T3user}
          alt="Apple Fix Pro Testimonial Img"
          className="img-fluid"
        />
      ),
      no_image: <span className="no_image_span">C</span>,
    },
    {
      name: "Gregory Mason",
      comment: `The guys don’t offer BS solutions. Straight forward and fast turnaround and professional.
      I brought in my iMac 2017 for upgrade and data recovery.
      They added SSD and recovered my files from the old drive.
      There is a reason why these guys have all these 5 stars on Google and Yelp.
      And they have funny posters and banners ha`,
      rating: 5,
      image: (
        <Image
          src={T2user}
          alt="Apple Fix Pro Testimonial Img"
          className="img-fluid"
        />
      ),
      no_image: (
        <span style={{ background: "#e26878" }} className="no_image_span">
          G
        </span>
      ),
    },
    {
      name: "Mae Nishimoto",
      comment: `Fast and friendly.  I went in about a week ago because my laptop took a dive on me overnight and I couldn't figure out why.  Unfortunately 99% of my job requires my MacBook  so I was literally dead in the water without it.  I called these guys up and brought my laptop in.  They fixed everything for $95.00 and did so within a 2 hour timeframe.  And they even backed up my all my files without me asking them to.  Saved my day!  Thanks again and all future business I am bringing their way.`,
      rating: 5,
      image: (
        <Image
          src={T1user}
          alt="Apple Fix Pro Testimonial Img"
          className="img-fluid"
        />
      ),
      no_image: (
        <span style={{ background: "#288436" }} className="no_image_span">
          M
        </span>
      ),
    },
  ];
  return (
    <section className="main_testimonial mrt50 pdt100" data-aos="fade-down">
      <Container fluid>
        <div className="main_heading-gradiant">
          <h2>
            <b>What Our Clients Say</b>
          </h2>
        </div>

        <Slider {...sliderSetting} className="">
          {testimonialData.map((val, key) => {
            return (
              <div key={key}>
                <div className="testimonial_slide">
                  <Row className="">
                    <Col md={12}>
                      <div className="testimonial_box">
                        <div className="quate_img">
                          <Image
                            src={
                              curruntCenterslider == 0
                                ? QuteactiveImage
                                : QuteImage
                            }
                            alt="Apple Fix Pro Testimonial Img"
                            className="img-fluid"
                          />
                        </div>
                        <p>{val.comment}</p>
                        <div className="t_pos_main">
                          <div className="t_user_img">{val.no_image}</div>

                          <h3>{val.name}</h3>

                          <div className="t_rating">
                            <ul>
                              <li>
                                <FaStar />
                              </li>
                              <li>
                                <FaStar />
                              </li>
                              <li>
                                <FaStar />
                              </li>
                              <li>
                                <FaStar />
                              </li>
                              <li>
                                <FaStar />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            );
          })}
          {/* =====SLIDE END===== */}
        </Slider>
      </Container>
    </section>
  );
}
