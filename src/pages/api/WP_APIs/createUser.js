import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import axios from "axios";
import { HTTP_SERVICE_CALL } from "@/provider/ApiProvider";

async function createUser(email, password) {
  const authHeader1 = {
    "Content-Type": "application/json",
  };

  const endPoint1 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wc/v3/customers`;

  try {
    const response = await HTTP_SERVICE_CALL(endPoint1, "POST", {
      email,
      password,
    });

    // console.log("user response ==>", response);
    if (response?.id) {
        return;
    }
    if (!response?.id) {
        // console.log("response?.data?.code",response,response?.data?.code);
        if (response?.data?.code === "registration-error-email-exists") {
            return; // Return if email already exists
          }
      throw new Error("User creation failed");
    }
  } catch (error) {
    console.error(
      "Error occurred during user creation:",
    //   error
    //   error.response,
    //   error.message
    );
    if (error?.data?.code === "registration-error-email-exists") {
        return; // Return if email already exists
      }
    throw new Error("User creation failed");
  }
}

async function loginFun(email, password) {
  const authHeader = {
    "Content-Type": "application/json",
    Authorization: "Basic " + btoa(email + ":" + password),
  };

  const endPoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/cocart/v2/login`;

  try {
    const response = await axios({
      method: "POST",
      url: endPoint,
      headers: authHeader,
    });

    // console.log("response.status ", response.status);

    if (response.status !== 200) {
      throw new Error("Authentication failed");
    }
  } catch (error) {
    // console.error("Error occurred during login:", error.response.data);
    if (error.response.data?.code) { // Check if user creation has already been attempted
      await createUser(email, password);
    } else {
      throw error; // If user is created and login fails, rethrow the error
    }
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    // const { email, password } = req.body;

    try {

        let email="";
        const password="AFP123456";

       await axios.get("https://api.ipify.org/?format=json")
        .then((res)=>{
          // console.log("res==>",res?.data?.ip);
          if(res?.data?.ip){
              email = `${res?.data?.ip}@gmail.com`; 
          }
        })

    if(email){
      await loginFun(email, password);

      const token = jwt.sign({ email, password }, process.env.JWT_SECRET_KEY, {
        expiresIn: "72h",
      });

      res.setHeader(
        "Set-Cookie",
        serialize("jwt", token, {
          httpOnly: true,
          maxAge: 259200, // Expires in 72 hours (adjust as needed)
        })
      );

      res.status(200).send("Success");
    }else{
        throw new Error("Error somthing in email or password")
    }
    } catch (error) {
      console.error("Error occurred:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed for non-POST requests
  }
}
