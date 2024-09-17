import React, { useState } from "react";
import { Button, Container, Nav, Navbar, Modal } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { Cross as Hamburger } from "hamburger-react";
import CartIcon from "../../../public/assets/images/header/cart.webp";
import { useSelector } from "react-redux";
import afpLogo from "../../../public/AfpLogo.png";
import { BiSearchAlt2 } from "react-icons/bi";
import { useLazySearchProductsQuery } from '@/appRedux/apiSlice';

export default function HeaderComp() {
  const count = useSelector((state) => state.counter.count);
  const router = useRouter();

  const [isOpen, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [triggerSearch] = useLazySearchProductsQuery(); 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Handle search button click
  const handleSearch = async () => {
    if (searchTerm.trim() !== "") {
      await triggerSearch({ query: searchTerm, page: 1 });
      router.push(`/searchProduct?query=${searchTerm}`); 
      handleClose(); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="my_nav">
      <Container>
        <Navbar.Brand className="logo-text">
          <Link href="/" className="">
            <p>Apple Fix Pros</p>
          </Link>
        </Navbar.Brand>
        <Button className="serachicon md-hide" onClick={handleShow}>
          <BiSearchAlt2 />
        </Button>
        <Link href="/cart" className="cart_mob">
          <div className="cart">
            <Image src={CartIcon} alt="Apple Fix Pro" className="img-fluid" />
            {count !== 0 && <span className="cart_num">{count}</span>}
          </div>
        </Link>
        <div className="mob-ham">
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            className={"navbar-toggler"}
          />
        </div>
        <Navbar.Collapse
          className={isOpen ? "show" : ""}
          id="responsive-navbar-nav"
        >
           <Nav className="ms-auto my_navbar ms-5">
            <Link
              href="/"
              className={
                router.pathname === "/" || router.pathname == "/[product_name]"
                  ? "active"
                  : ""
              }
              onClick={() => setOpen(!isOpen)}
            >
              Home
            </Link>
            <Link
              href="/mac-sale"
              className={
                router.pathname == "/mac-sale" ||
                router.pathname == "/mac-sale/[tags]" ||
                router.pathname == "/mac-sale/[tags]/[allPro]" ||
                router.pathname == "/mac-sale/[tags]/[allPro]/[product_name]"
                  ? "active"
                  : ""
              }
              onClick={() => setOpen(!isOpen)}
            >
              Mac sale
            </Link>
            <Link
              href="/mac-parts"
              className={
                router.pathname == "/mac-parts" ||
                router.pathname == "/mac-parts/[product_name]"
                  ? "active"
                  : ""
              }
              onClick={() => {
                setOpen(!isOpen);
                window.localStorage.setItem(
                  "mac-part-collection",
                  process.env.NEXT_PUBLIC_MAC_PART_INITIAL_ID
                );
                window.localStorage.removeItem("mac-part-collection-child");
              }}
            >
              Mac Parts
            </Link>
            <Link
              href="/mac-repair"
              className={
                router.pathname == "/mac-repair" ||
                router.pathname == "/mac-repair/[tags]" ||
                router.pathname == "/mac-repair/[tags]/[product_name]"
                  ? "active"
                  : ""
              }
              onClick={() => setOpen(!isOpen)}
            >
              Mac Repair
            </Link>
            <Link
              href="/sell-your-mac"
              className={router.pathname === "/sell-your-mac" ? "active" : ""}
              onClick={() => setOpen(!isOpen)}
            >
              Sell Your Mac
            </Link>

            <Link
              href="https://business.applefixpros.com/"
              onClick={() => setOpen(!isOpen)}
            >
              Wholesale
            </Link>

            <Link
              href="/support"
              className={router.pathname === "/support" ? "active" : ""}
              onClick={() => setOpen(!isOpen)}
            >
              Support
            </Link>
            {/* <Link
              href='/login'
              className={router.pathname === "/login" ? "active" : ""}
              onClick={() => setOpen(!isOpen)}
            >
              Login
            </Link> */}
          </Nav>
          <Nav className="hm_cart-mob">
            <Button className="serachicon xs-hide" onClick={handleShow}>
              <BiSearchAlt2 />
            </Button>
            <Modal show={show} dialogClassName="modal-90w" onHide={handleClose} className="srch-boxmodel">
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                <div className="serachinner">
                  <input
                    type="text"
                    placeholder="Search Keywords....."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button className="btn btn-info" onClick={handleSearch}>
                    Search
                  </Button>
                </div>
              </Modal.Body>
            </Modal>
            <Link href="/cart" className="cart_desktop">
              <div className="cart">
                <Image src={CartIcon} alt="Cart Img" className="img-fluid" />
                {count !== 0 && <span className="cart_num">{count}</span>}
              </div>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
