import { HTTP_SERVICE_CALL } from "@/provider/ApiProvider";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { collectionId } = req.query;
    try {
      const endPoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wc/v3/products/categories?parent=${collectionId}&per_page=100`;
      const data = await HTTP_SERVICE_CALL(endPoint);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  }
}
