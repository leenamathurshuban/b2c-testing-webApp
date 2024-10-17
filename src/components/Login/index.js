import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import LoaderComp from "../Loader/loader_comp";
import { useDispatch, useSelector } from "react-redux";
import { cartBlank } from "@/appRedux/counterReducer";

function Login() {
  const dispatch = useDispatch();

  const router = useRouter();
  const queryPara = router.query;

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { cart: cartItems } = useSelector((state) => state.counter);

  const createCheckout = async () => {
    try {
      setLoading(true);
      if (cartItems.length) {
        const response = await axios.post("/api/WP_APIs/AddToCart", {
          lineItems: cartItems,
        });

        if (response?.data) {
          router.push(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/checkout?cart_key=${response.data?.data}`
          );
          dispatch(cartBlank());
        }
      } else {
        router.push("/");
      }
    } catch (error) {
      if (!error?.response?.data?.status) {
        console.error("Error creating checkout:", error?.response?.data?.error);
        toast.error(error?.response?.data?.error);
      } else {
        console.error("Error creating checkout:", error);
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/WP_APIs/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        if (queryPara?.r) {
          createCheckout();
        } else {
          toast.success("Login Successfully!");
          router.back();
        }
      }
    } catch (error) {
      toast.error("Login Failed!");
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      {loading ? <LoaderComp /> : ""}
      <div className='repair-form-multi  d-flex flex-column justify-content-center align-items-center'>
        <div
          className='repair-form'
          style={{
            border: "1px solid gray",
            padding: "22px",
            borderRadius: "26px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "35px",
              fontWeight: "500",
              padding: "10px",
            }}
          >
            Login
          </div>
          <Form onSubmit={handleLogin} className='mb-3'>
            <Row className='mb-3'>
              <Col md={12}>
                <Form.Group as={Col}>
                  <Form.Control
                    type='email'
                    name='email'
                    onChange={handleChange}
                    placeholder='Email Address'
                    value={formData?.email}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col md={12}>
                <Form.Group as={Col}>
                  <Form.Control
                    type='password'
                    name='password'
                    onChange={handleChange}
                    placeholder='Password'
                    value={formData?.password}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className='mb-3'>
              <Col md={12}>
                <div className='repair-btn'>
                  <Button
                    type='submit'
                    className='main_btn hvr-shutter-out-horizontal'
                  >
                    Login
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default Login;
