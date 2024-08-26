import { HTTP_SERVICE_CALL } from "@/provider/ApiProvider";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { productId } = req.query;
    try {
      const endPoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wc/v3/products/${productId}`;
      let data = await HTTP_SERVICE_CALL(endPoint);

      if (data.variations.length > 0) {
        const variationEndPoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wc/v3/products/${productId}/variations`;
        const variationData = await HTTP_SERVICE_CALL(variationEndPoint);
        const itemVariation = variationData.filter(
          (val) => !val.sku?.startsWith("B2B-") || val.sku === ""
        );
        data.variations = itemVariation;
      }

      res.status(200).json(data);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  }
}
