import axios from "axios";

export default async function get_modal_detail(req, res) {
  const reqImei = req.query.imei;
  try {
    const response = await axios.get(
      `https://api-client.imei.org/api/submit?apikey=sLjcZC27ist6BKLmcUxTLqvfitRtbR5ncRqm9qrKGQNTGFVRXCd2hTdajiN5&service_id=164&input=${reqImei}`
    );

    if (response.data && response.data.status === 1 && response.data.response) {
      return res.status(200).json(response.data.response);
    } else if (response.data && response.data.error) {
      console.error("API Error:", response.data.error);
      return res.status(400).json({ message: response.data.error });
    } else {
      console.error("Invalid response from API:", response.data);
      return res.status(400).json({ message: "Invalid response from API" });
    }
  } catch (err) {
    console.error("Error occurred:", err);
    return res.status(500).json({ message: "An error occurred while processing your request" });
  }
}
