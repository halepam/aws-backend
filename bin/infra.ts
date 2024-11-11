#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { Task4ShopStack } from "../lib/shop-stack/Task4ShopStack";
import { Task5ImportServiceStack } from "../lib/shop-stack/Task5ImportServiceStack";

const app = new cdk.App();
const task4ShopStack = new Task4ShopStack(app, 'Task4ShopStack');
const task5ImportServiceStack = new Task5ImportServiceStack(app, 'Task5ImportServiceStack')

task4ShopStack.addDependency(task5ImportServiceStack);