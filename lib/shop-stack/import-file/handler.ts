import { Handler } from "aws-lambda";
import {
  GetObjectCommand,
  NoSuchKey,
  S3Client,
  S3ServiceException,
} from "@aws-sdk/client-s3";

import csv from "csv-parser";

const BucketName = process.env.BucketName as string;
const FileName = process.env.FileName as string;
const Key = process.env.Key as string;

export const importFile: Handler = async (event: any, context: any) => {
  const client = new S3Client({});
  try {
    const response = await client.send(
      new GetObjectCommand({
        Bucket: BucketName,
        Key: `${Key}/${FileName}`,
      })
    );

    const dataByteArray = await response?.Body?.transformToString();
    const result: unknown[] = [];
    if (dataByteArray) {
      csv([dataByteArray])
        .on("data", (data) => {
          result.push(data);
        })
        .on("end", () => {
          console.log("got data", result);
        });
    }
  } catch (error) {
    if (error instanceof NoSuchKey) {
      console.error(
        `Error from S3 while getting object "${Key}" from "${BucketName}". No such key exists.`
      );
    } else if (error instanceof S3ServiceException) {
      console.error(
        `Error from S3 while getting object from ${BucketName}.  ${error?.name}: ${error?.message}`
      );
    } else {
      throw error;
    }
  }
};
