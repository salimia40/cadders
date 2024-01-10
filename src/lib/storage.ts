'use server';

import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
  region: 'default',
  endpoint: process.env.STORAGE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.STORAGE_ACCESSKEY!,
    secretAccessKey: process.env.STORAGE_SECRETKEY!,
  },
});

export const uploadFile = async (
  fileName: string,
  file: Buffer,
  contentType: string,
  metaData: Record<string, string> = {}
) => {
  const params = {
    Bucket: process.env.STORAGE_BUCKETNAME,
    Key: fileName,
    Body: file,
    ContentType: contentType,
    Metadata: metaData,
  };
  try {
    await s3.send(new PutObjectCommand(params));
  } catch (error) {
    throw new Error('storage:Error in upload file');
  }
};

export const getFileLink = async (fileName: string, expiry: number = 600) => {
  const params = {
    Bucket: process.env.STORAGE_BUCKETNAME,
    Key: fileName,
    Expires: expiry,
  };
  try {
    const command = new GetObjectCommand(params);
    return await getSignedUrl(s3, command, {
      expiresIn: expiry,
    });
  } catch (error) {
    throw new Error('storage:Error in get file link');
  }
  return null; // Add a return statement at the end of the function
};

export const deleteFile = async (fileName: string) => {
  const params = {
    Bucket: process.env.STORAGE_BUCKETNAME,
    Key: fileName,
  };
  try {
    await s3.send(new DeleteObjectCommand(params));
  } catch (error) {
    throw new Error('storage:Error in delete file');
  }
};
