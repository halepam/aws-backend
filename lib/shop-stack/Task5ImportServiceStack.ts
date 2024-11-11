import * as s3 from "aws-cdk-lib/aws-s3";
import * as cdk from "aws-cdk-lib";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

const s3BucketExp = cdk.Expiration.after(cdk.Duration.seconds(1));

import path = require("path");
import { S3EventSource } from "aws-cdk-lib/aws-lambda-event-sources";
const { join } = path;

const S3_FOLDER_NAME = "uploaded";

export class Task5ImportServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, "ImportBucket", {
      bucketName: "task5-import-bucket",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const lambdaS3ReadObjectCreatedEvent = new S3EventSource(bucket, {
      events: [s3.EventType.OBJECT_CREATED],
      filters: [{ prefix: "uploaded/" }, { suffix: ".csv" }],
    });

    new s3deploy.BucketDeployment(this, "ImportServiceBucketDeployment", {
      destinationBucket: bucket,
      destinationKeyPrefix: S3_FOLDER_NAME,
      sources: [s3deploy.Source.asset(path.join(__dirname, "./uploaded"))],
      expires: s3BucketExp
    });

    const lambdaS3Role = new iam.Role(this, "LambdaS3Role", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
    });

    lambdaS3Role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonS3ReadOnlyAccess")
    );

    const lambdaLogRole = new iam.Role(this, "CloudWatchLogsRole", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
    });

    lambdaLogRole.addManagedPolicy(
      iam.ManagedPolicy.fromManagedPolicyArn(
        this,
        "LambdaCloudWatchLogsPermission",
        "arn:aws:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs"
      )
    );

    const importFileLambda = new lambda.Function(this, "import-file-function", {
      runtime: lambda.Runtime.NODEJS_20_X,
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      handler: "handler.importFile",
      code: lambda.Code.fromAsset(join(__dirname, "./import-file")),
      role: lambdaS3Role,
      environment: {
        BucketName: bucket.bucketName,
        Key: S3_FOLDER_NAME,
      },
    });

    const importFileParserLambda = new lambda.Function(
      this,
      "import-file-parser-function",
      {
        runtime: lambda.Runtime.NODEJS_20_X,
        memorySize: 1024,
        timeout: cdk.Duration.seconds(5),
        handler: "handler.importFileParser",
        code: lambda.Code.fromAsset(join(__dirname, "./import-file-parser")),
        role: lambdaLogRole,
        environment: {
          BucketName: bucket.bucketName,
          Key: S3_FOLDER_NAME,
        },
      }
    );

    bucket.grantReadWrite(importFileParserLambda);

    importFileParserLambda.addEventSource(lambdaS3ReadObjectCreatedEvent);

    const api = apigateway.RestApi.fromRestApiAttributes(
      this,
      "task5-products-api",
      {
        restApiId: "b5ej4pymjl",
        restApiName: "products-api",
        rootResourceId: "jd9lhc2j94",
      }
    );

    const importResource = api.root.addResource("import");
    const importResourceName = importResource.addResource("{filename}");

    const importFileLambdaIntegration = new apigateway.LambdaIntegration(
      importFileLambda,
      {
        requestTemplates: {
          "application/json": `{ "filename": "$input.params('filename')" } `,
        },

        integrationResponses: [
          {
            statusCode: "200",
          },
        ],
        proxy: false,
      }
    );

    importResourceName.addMethod("GET", importFileLambdaIntegration, {
      methodResponses: [{ statusCode: "200" }],
    });

    importResource.addCorsPreflight({
      allowOrigins: ["*"],
      allowMethods: ["GET", "OPTIONS"],
    });

    importResourceName.addCorsPreflight({
      allowOrigins: ["*"],
      allowMethods: ["GET", "OPTIONS"],
    });
  }
}
