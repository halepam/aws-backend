import { Handler } from "aws-lambda";
import {
  GetObjectCommand,
  NoSuchKey,
  S3Client,
  S3ServiceException,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const BucketName = process.env.BucketName as string;
const Key = process.env.Key as string;

export const importFile: Handler = async (event: any, context: any) => {
  const client = new S3Client({});
  try {
    const filename = event.filename
    const command = new GetObjectCommand({
      Bucket: BucketName,
      Key: `${Key}/${filename}`,
    });
    const url = await getSignedUrl(client, command, { expiresIn: 3600 });
    return {
      signedFileUrl: url,
    };

  } catch (error) {
    if (error instanceof NoSuchKey) {
      console.error(
        `Error from S3 while getting object "${Key}" from "${BucketName}". No such key exists.`
      );
    } else if (error instanceof S3ServiceException) {
      console.error(
        `Error from S3 while getting object from ${BucketName}.  ${error?.name}: ${error?.message}`
      );
    }

    return {
      success: false
    }
  }
};
