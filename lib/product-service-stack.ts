// Filename: hello-lambda-stack.ts
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as cdk from "aws-cdk-lib";
import * as path from "path";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

function getLambdaConfig({
  handler,
  pathToResource,
}: {
  handler: string;
  pathToResource: string;
}) {
  return {
    runtime: lambda.Runtime.NODEJS_20_X,
    memorySize: 1024,
    timeout: cdk.Duration.seconds(5),
    handler: handler,
    code: lambda.Code.fromAsset(path.join(__dirname, pathToResource)),
  };
}

export class ProductServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // const productListLambda = {
    //   runtime: lambda.Runtime.NODEJS_20_X,
    //   memorySize: 1024,
    //   timeout: cdk.Duration.seconds(5),
    //   handler: "handler.main",
    //   code: lambda.Code.fromAsset(path.join(__dirname, "../lambda/handler.ts")),
    //   // environment: which region this Lambda will be deployed, default region from ~/.aws/config
    // }
    const lambdaProductListFunction = new lambda.Function(
      this,
      "lambda-product-list",
      getLambdaConfig({
        handler: "handler.main",
        pathToResource: "./lambda/product-list/",
      })
    );

    const api = new apigateway.RestApi(this, "products-api", {
      restApiName: "Products API Gateway",
      description: "This API serves the Lambda functions for products.",
    });

    const productListLambdaIntegration = new apigateway.LambdaIntegration(
      lambdaProductListFunction,
      {
        integrationResponses: [
          {
            statusCode: "200",
          },
        ],
        proxy: false,
      }
    );

    // Create a resource /products and GET request under it
    const productsResource = api.root.addResource("products");
    // On this resource attach a GET method which pass reuest to our Lambda function
    productsResource.addMethod("GET", productListLambdaIntegration, {
      methodResponses: [{ statusCode: "200" }],
    });

    productsResource.addCorsPreflight({
      allowOrigins: ["https://d1izgcw2dq3ahs.cloudfront.net"],
      allowMethods: ["GET"],
    });
  }
}
