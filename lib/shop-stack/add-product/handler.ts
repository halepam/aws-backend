import { Handler } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const ProductTable = process.env.ProductTable as string;
const StockTable = process.env.StockTable as string;

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
});

export const addProduct: Handler = async (event: any, context: any) => {
  try {

    console.log('event.body', event.body);
    
    const title = event.title;
    const description = event.description;
    const price = event.price;
    const count = event.count;
    const createdAt = String(Date.now());
    const productId = randomUUID();

    const productCreated = await client.send(
      new PutCommand({
        TableName: ProductTable,
        Item: {
          id: productId,
          title,
          description,
          price: parseFloat(price),
          createdAt,
        },
      })
    );
    const productStockCreated = client.send(
      new PutCommand({
        TableName: StockTable,
        Item: {
          product_id: productId,
          count,
          createdAt,
        },
      })
    );

    console.log("productCreated", productCreated);
    console.log("productStockCreated", productStockCreated);

    return {
      product: {
        id: productId,
        title,
        description,
        price,
        count,
        createdAt,        
      },
      message: "Successfully Created Product",
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
