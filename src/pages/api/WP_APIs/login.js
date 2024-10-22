import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    try {
      const authHeader = {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(email + ":" + password),
      };

      const endPoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/cocart/v2/login`;

      const response = await axios({
        method: "POST",
        url: endPoint,
        headers: authHeader,
      });

      // Check if login was successful
      if (response.status !== 200) {
        throw new Error("Authentication failed");
      }

      // Generate JWT token
      const token = jwt.sign({ email, password }, process.env.JWT_SECRET_KEY, {
        expiresIn: "72h",
      });

      // Set JWT token in a cookie
      res.setHeader(
        "Set-Cookie",
        serialize("jwt", token, {
          httpOnly: true,
          maxAge: 259200, // Expires in 72 hour (adjust as needed)
        })
      );

      // Send success response
      res.status(200).send("Success");
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed for non-POST requests
  }
}
