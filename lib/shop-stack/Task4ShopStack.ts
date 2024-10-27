// Filename: todo/TodoStack.ts
import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { join } from "path";

const ProductTableName = "Products";
const StockTableName = "Stock";

export class Task4ShopStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const ProductTable = dynamodb.Table.fromTableName(
      this,
      "Products",
      ProductTableName
    );

    const StockTable = dynamodb.Table.fromTableName(
      this,
      "Stock",
      StockTableName
    );

    const api = new apigateway.RestApi(this, "products-api", {
      restApiName: "Products API Gateway",
      description: "This API serves the Lambda functions for products.",
    });

    const getProductsLambda = new lambda.Function(
      this,
      "get-products-function",
      {
        runtime: lambda.Runtime.NODEJS_20_X,
        memorySize: 1024,
        timeout: cdk.Duration.seconds(5),
        handler: "handler.getProductsWithStock",
        code: lambda.Code.fromAsset(join(__dirname, "./get-products")),
        environment: {
          ProductTable: ProductTableName,
          StockTable: StockTableName,
        },
      }
    );

    const getProductByIdLambda = new lambda.Function(
      this,
      "get-product-by-id-function",
      {
        runtime: lambda.Runtime.NODEJS_20_X,
        memorySize: 1024,
        timeout: cdk.Duration.seconds(5),
        handler: "handler.getProductByIdWithStock",
        code: lambda.Code.fromAsset(join(__dirname, "./get-product-by-id")),
        environment: {
          ProductTable: ProductTableName,
          StockTable: StockTableName,
        },
      }
    );

    const productsLambdaIntegration = new apigateway.LambdaIntegration(
      getProductsLambda,
      {
        integrationResponses: [
          {
            statusCode: "200",
          },
        ],
        proxy: false,
      }
    );
    const productByIdLambdaIntegration = new apigateway.LambdaIntegration(
      getProductByIdLambda,
      {
        requestTemplates: {
          "application/json": `{ "productId": "$input.params('productId')" }`,
        },
        integrationResponses: [
          {
            statusCode: "200",
          },
        ],
        proxy: false,
      }
    );

    const productsResource = api.root.addResource("products");
    const productByIdResource = productsResource.addResource("{productId}");

    productsResource.addMethod("GET", productsLambdaIntegration, {
      methodResponses: [{ statusCode: "200" }],
    });

    productByIdResource.addMethod("GET", productByIdLambdaIntegration, {
      methodResponses: [{ statusCode: "200" }],
    });

    productsResource.addCorsPreflight({
      allowOrigins: ["*"],
      allowMethods: ["GET", "OPTIONS"],
    });

    productByIdResource.addCorsPreflight({
      allowOrigins: ["*"],
      allowMethods: ["GET", "OPTIONS"],
    });

    ProductTable.grantReadData(getProductsLambda);
    StockTable.grantReadData(getProductsLambda);

    ProductTable.grantReadData(getProductByIdLambda);
    StockTable.grantReadData(getProductByIdLambda);
  }
}
