// Filename: todo/TodoStack.ts
import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda"
import * as cdk from 'aws-cdk-lib';
import { join } from 'path';

const ProductTableName = 'Products';
const StockTableName = 'Stock';

export class Task4ShopStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const ProductTable = dynamodb.Table.fromTableName(this, 'Products', ProductTableName);

    const StockTable = dynamodb.Table.fromTableName(this, "Stock", StockTableName);


    const getProductsLambda = new lambda.Function(this, 'get-products-function', {
      runtime: lambda.Runtime.NODEJS_20_X,
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      handler: 'handler.getProductsWithStock',
      code: lambda.Code.fromAsset(join(__dirname, './')),
      environment: {
        ProductTable: ProductTableName,
        StockTable: StockTableName
      }
    });

    ProductTable.grantReadData(getProductsLambda)
    StockTable.grantReadData(getProductsLambda)
  }
}
