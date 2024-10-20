#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { TodoStack } from "../lib/todo/TodoStack";

const app = new cdk.App();
new TodoStack(app, 'TodoStack');
