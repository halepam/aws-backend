#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { HelloS3Stack } from "../lib/hello-s3-stack";

const app = new cdk.App();
new HelloS3Stack(app, 'HelloS3Stack', {});