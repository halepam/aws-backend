import { Handler } from "aws-lambda";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const ProductTable = process.env.ProductTable as string;
const StockTable = process.env.StockTable as string;

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
});

export const getProductsWithStock: Handler = async (
  event: any,
  context: any
) => {
  try {
    const productStockList = await client.send(
      new ScanCommand({
        TableName: StockTable,
      })
    );
    const productList = await client.send(
      new ScanCommand({
        TableName: ProductTable,
      })
    );

    const result = [];

    const productStock = productStockList?.Items;
    const productItems = productList?.Items;
    if (productStock && productItems) {
      for (const productItem of productItems) {
        const productId = productItem.id.S;

        const stockItem = productStock.find(
          (stockRecord) => stockRecord.product_id.S === productId
        );

        const count = stockItem?.count?.N || stockItem?.count?.S;

        result.push({
          id: productId,
          count,
          price: productItem.price.N,
          title: productItem.title.S,
          description: productItem.description.S,
        });
      }
    }

    return {
      data: result,
      message:
        !result || result.length === 0
          ? "No products available"
          : "Successfully Fetched Products",
      success: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      return;
    }

    throw new Error("Something went wrong");
  }
};
