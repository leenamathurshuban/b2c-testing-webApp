import jwt from "jsonwebtoken";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { lineItems } = req.body;

      //   const jwtToken = extractJwtToken(req.headers.cookie);

      //   if (!jwtToken) {
      //     return res
      //       .status(401)
      //       .json({ status: false, error: "User not authenticated" });
      //   }

      //   const decoded = jwt.decode(jwtToken, process.env.JWT_SECRET_KEY);

      //   if (!decoded?.email && !decoded?.passsword) {
      //     return res
      //       .status(401)
      //       .json.json({ status: false, error: "Authentication failed" });
      //   }

      //   const authHeader = {
      //     "Content-Type": "application/json",
      //     Authorization:
      //       "Basic " + btoa(decoded?.email + ":" + decoded?.password),
      //   };

      // const getEndPoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/cocart/v2/cart`;
      // const cartData = await axios.get(getEndPoint, { headers: authHeader });

      // console.log(cartData.data.items)
      // for (const item of cartData.data.items) {
      //   const removeEndPoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/cocart/v2/cart/item/${item.item_key}`;
      //   await axios.delete(removeEndPoint, { headers: authHeader });
      // }
      // return res.status(500).json({
      //   status: false,
      //   error: "Internal Server Error",
      // });

      //   const clearEndPoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/cocart/v2/cart/clear`;
      //   await axios.post(clearEndPoint, {}, { headers: authHeader });

      //   const addToCartRequests = [];

      //   for (const item of lineItems) {
      //     const {
      //       attributeName,
      //       id,
      //       productID,
      //       quantity,
      //       productName,
      //       name,
      //       proVariant,
      //     } = item;
      //     try {
      //       const data = proVariant
      //         ? {
      //             id: productID.toString(),
      //             quantity: quantity.toString(),
      //             variation: {
      //               id: id.toString(),
      //               [`attribute_${attributeName}`]: name,
      //             },
      //           }
      //         : {
      //             id: productID.toString(),
      //             quantity: quantity.toString(),
      //           };

      //       const endPoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/cocart/v2/cart/add-item`;

      //       const response = await axios.post(endPoint, data, {
      //         headers: authHeader,
      //       });

      //       console.log(`${productID} ===> Success`);
      //       addToCartRequests.push(response.data);
      //     } catch (error) {
      //       if (error.response) {
      //         const status = error.response.status || 500;
      //         let errorMessage = "";

      //         if (status === 405) {
      //           errorMessage = `${productName} is ${error.response.data.message}`;
      //         } else if (status === 403) {
      //           errorMessage = error.response.data.message;
      //         } else {
      //           console.error(
      //             "Failed to add item to the cart:",
      //             error.response.data
      //           );
      //           errorMessage = error.response.data || "Unknown error occurred";
      //         }

      //         console.log(error.response.data);
      //         return res.status(status).json({
      //           status: false,
      //           error: errorMessage,
      //         });
      //       } else {
      //         console.error("Failed to add item to the cart:", error);
      //         return res.status(500).json({
      //           status: false,
      //           error: "Internal Server Error",
      //         });
      //       }
      //     }
      //   }

      //   const cartKeys = Array.from(
      //     new Set(addToCartRequests?.map((response) => response.cart_key))
      //   );

      const addToCartRequests = [];
      for (const item of lineItems) {
        const { id, quantity } = item;
        for (let i = 0; i < quantity; i++) {
          addToCartRequests.push(id);
        }
      }

      return res.status(200).json({
        status: true,
        message: "Items added to the cart successfully",
        data: addToCartRequests.join(","),
      });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(error.response?.status || 500)
        .json({ status: false, error: error.message });
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
