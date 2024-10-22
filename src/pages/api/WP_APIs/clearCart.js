import { HTTP_SERVICE_CALL } from "@/provider/ApiProvider";
import axios from "axios";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const jwtToken = extractJwtToken(req.headers.cookie);
      if (!jwtToken) {
        return res
          .status(401)
          .json({ status: false, message: "User not authenticated" });
      }

      const decoded = jwt.decode(jwtToken, process.env.JWT_SECRET_KEY);
      // console.log(decoded);
      if (!decoded?.email && !decoded?.passsword) {
        return res
          .status(401)
          .json.json({ status: false, error: "Authentication failed" });
      }

      const authHeader = {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(decoded.email + ":" + decoded.password),
      };

      // Retrieve cart data
      const cartEndPoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/cocart/v2/cart`;
      const cartResponse = await axios.get(cartEndPoint, {
        headers: authHeader,
      });
      const cartKey = cartResponse.data.cart_key;

      if (!cartKey) {
        throw new Error("Cart key not found");
      }

      // for (const item of cartResponse.data.items) {
      //   console.log(item);
      //   const removeEndPoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/cocart/v2/cart/item/${item.item_key}`;
      //   const removeResponse = await axios.delete(removeEndPoint, {
      //     headers: authHeader,
      //   });

      //   // const removeEndPoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/cocart/v2/cart/item/${item.item_key}`;
      //   // const removeResponse = await axios.put(
      //   //   removeEndPoint,
      //   //   { quantity: 0 },
      //   //   {
      //   //     headers: authHeader,
      //   //   }
      //   // );
      //   console.log(removeResponse.data.data);
      // }

      // Clear cart
      // const clearEndPoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/cocart/v2/cart/clear?cart_key=${cartKey}`;
      // const clearResponse = await HTTP_SERVICE_CALL(clearEndPoint, "POST");

      // Handle response
      // console.log("Clear cart response:", clearResponse);


      // const cartEndPoint1 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/cocart/v2/cart`;
      // const cartResponse1 = await axios.get(cartEndPoint1, {
      //   headers: authHeader,
      // });

      return res.status(200).json({
        status: true,
        message: "Cart cleared successfully",
        // dd: cartResponse1.data,
      });
    } catch (error) {
      console.error("Error:", error.response.data);
      res
        .status(error.response?.status || 500)
        .json({ status: false, error: error?.response?.data });
    }
  } else {
    res.status(405).end(); // Method Not Allowed for non-POST requests
  }
}

function extractJwtToken(cookieHeader) {
  if (!cookieHeader) return null;

  const jwtCookie = cookieHeader
    .split(";")
    .find((cookie) => cookie.trim().startsWith("jwt="));
  return jwtCookie ? jwtCookie.split("=")[1] : null;
}
