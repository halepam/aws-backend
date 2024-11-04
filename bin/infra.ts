#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { Task4ShopStack } from "../lib/shop-stack/Task4ShopStack";
import { Task5ImportServiceStack } from "../lib/shop-stack/Task5ImportServiceStack";

const app = new cdk.App();
new Task4ShopStack(app, 'Task4ShopStack');
new Task5ImportServiceStack(app, 'Task5ImportServiceStack')
