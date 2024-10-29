import { Handler } from "aws-lambda";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const ProductTable = process.env.ProductTable as string;
const StockTable = process.env.StockTable as string;

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
});

export const getProductByIdWithStock: Handler = async (
  event: any,
  context: any
) => {
  try {
    const productIdParam = event.productId;

    console.log("got productId", productIdParam);

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

    // product model
    // {
    //   createdAt: { S: '1729485152' },
    //   id: { S: '2' },
    //   description: { S: 'some desc' },
    //   price: { N: '22.99' },
    //   title: { S: 'DAYCO 5060495DR Drive Rite' }
    // }
    let result = {};

    const productStock = productStockList?.Items;
    const productItems = productList?.Items;
    console.log("stock list", productStock);
    if (productStock && productItems) {
      const productItem = productItems.find(
        (item) => item.id.S === productIdParam
      );

      if (productItem) {
        console.log("found item", productItem);
        const productId = productItem.id.S;
        const stockItem = productStock.find(
          (stockRecord) => stockRecord.product_id.S === productId
        );

        console.log("found stock item", stockItem);

        const count = stockItem?.count?.N || stockItem?.count?.S;

        result = {
          id: productId,
          count,
          price: productItem.price.N || productItem.price.S,
          title: productItem.title.S,
          description: productItem.description.S,
        };

        console.log("result", result);
      }
    }

    return {
      data: result,
      message: (!result || Object.keys(result).length === 0)
        ? `Could not find product with id: ${productIdParam}`
        : `Successfully fetched product with id: ${productIdParam} `,
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
