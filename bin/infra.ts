#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { Task4ShopStack } from "../lib/todo/Task4ShopStack";

const app = new cdk.App();
new Task4ShopStack(app, 'Task4ShopStack');
