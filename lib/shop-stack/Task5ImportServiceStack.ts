import * as s3 from "aws-cdk-lib/aws-s3";
import * as cdk from "aws-cdk-lib";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import path = require("path");

const S3_FOLDER_NAME = "uploaded";

export class Task5ImportServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, "ImportBucket", {
      bucketName: "task5-import-bucket",
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    new s3deploy.BucketDeployment(this, 'ImportServiceBucketDeployment', {
        destinationBucket: bucket,
        destinationKeyPrefix: S3_FOLDER_NAME,
        sources: [s3deploy.Source.asset(path.join(__dirname, './uploaded'))]
    })
  }
}
