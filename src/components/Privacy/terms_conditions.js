import Link from "next/link";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaCircle } from "react-icons/fa";
import TestiComp from "../Testimonial";

export default function MactermsComp() {
  return (
    <section className="main_macterms mrt50">
      <Container>
        <div className="privacy-box">
          <Row className="justify-content-center">
            <Col md={10} lg={10}>
              <div className="main_heading-gradiant">
                <h2>
                  <b>Term Of Use </b>
                </h2>
              </div>
              <div className="privacy-box-ul mrt50">
                <h2>Overview </h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make
                  a type specimen book.
                </p>
                <h3>Lorem Ipsum is simply dummy text </h3>
                <p>
                  when an unknown printer took a galley of type and scrambled it
                  to make a type specimen book. Lorem Ipsum is simply dummy text
                  of the printing
                </p>
                <ul>
                  <li>
                    <span>1.</span>ever since the 1500s, when an unknown printer
                    took a galley of type and scrambled it to make a type
                    specimen book.
                  </li>
                  <li>
                    <span>2.</span> has been the industry's standard dummy text
                    ever since the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book.
                  </li>
                  <li>
                    <span>3.</span>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </li>
                  <li>
                    <span>4.</span>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </li>
                </ul>
              </div>
              <div className="privacy-box-ul">
                <h3>Lorem Ipsum is simply dummy text </h3>
                <ul>
                  <li>
                    <FaCircle />
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a <b>galley of type and scrambled</b> it to
                    make a type specimen book.
                  </li>
                  <li>
                    <FaCircle />
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </li>
                  <li>
                    <FaCircle />
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </li>
                  <li>
                    <FaCircle />
                    Lorem Ipsum is simply dummy text of the{" "}
                    <b>printing and typesetting</b> industry.
                  </li>
                </ul>
              </div>

              <div className="privacy-box-ul">
                <h2> is simply dummy text </h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
              <div className="privacy-box-ul">
                <h2>Linking To This Site </h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
              <div className="privacy-box-ul">
                <h2> simply dummy text </h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <ul>
                  <li>
                    <span>1.</span>ever since the 1500s, when an unknown printer
                    took a galley of type and scrambled it to make a type
                    specimen book.
                  </li>
                  <li>
                    <span>2.</span> has been the industry's standard dummy text
                    ever since the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book.
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      {/* <TestiComp /> */}
    </section>
  );
}
