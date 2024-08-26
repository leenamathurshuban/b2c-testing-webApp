import { HTTP_SERVICE_CALL } from "@/provider/ApiProvider";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { collectionId, limit, cursor } = req.query;
    const page = Number(cursor);
    try {
      const endPoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wc/v3/products?category=${collectionId}&page=${page}&per_page=${limit}`;
      const data = await HTTP_SERVICE_CALL(endPoint);

      if (data.length > 0) {
        for (let item of data) {
          const variationEndPoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wc/v3/products/${item.id}/variations`;
          const variationData = await HTTP_SERVICE_CALL(variationEndPoint);
          const itemVariation = variationData.filter(
            (val) => !val.sku?.startsWith("B2B-") || val.sku === ""
          );
          item.variations = itemVariation;
        }
      }

      const newData = data.filter((e) => {
        if (e.variations && e.variations.length > 0) {
          return e.variations.some(
            (variation) =>
              !variation.sku.startsWith("B2B-") || variation.sku === ""
          );
        } else {
          return !e.sku.startsWith("B2B-") || e.sku === "";
        }
      });

      res.status(200).json({
        data: newData,
        cursor: data.length == limit ? page + 1 : null,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  }
}
