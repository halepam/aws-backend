import {
  GetObjectCommand,
  HeadObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { Handler, S3Event } from "aws-lambda";
import csvParser from "csv-parser";

const s3 = new S3Client({ region: process.env.AWS_REGION });

const streamToString = (stream: any) => {
  const results: any[] = []
  return new Promise((resolve, reject) => {
    (stream as any)
      ?.pipe(csvParser())
      .on("data", (data: any) => results.push(data))
      .on('error', reject)
      .on("end", () => {
        console.log("CSV file processed successfully");
        console.log(results);

        resolve(results);
      });
  });
}

export const importFileParser: Handler = async (event: S3Event) => {
  try {
    console.log("S3 Object Created Event:", JSON.stringify(event, null, 2));
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(
      event.Records[0].s3.object.key.replace(/\+/g, " ")
    );
    const params = {
      Bucket: bucket,
      Key: key,
    };

    console.log(params);

    const { ContentType } = await s3.send(new HeadObjectCommand(params));
    console.log("CONTENT TYPE:", ContentType);

    const { Body } = await s3.send(
      new GetObjectCommand({
        ...params,
      })
    );

    if (!Body) {
      console.log("Stream not valid");
      return;
    }

    return {
      statusCode: 200,
      data: await streamToString(Body),
      success: true,
    };
  } catch (error) {
    return {
      statusCode: 500,
      success: false,
      data: null,
    };
  }
};
