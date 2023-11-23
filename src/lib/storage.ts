"use server"

import { z } from 'zod'
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const config = z.object({
    STORAGE_ENDPOINT: z.string(),
    // STORAGE_PORT: z.string().regex(/[0-9]+/),
    // STORAGE_USESSL: z.enum([
    //     'true',
    //     'false',
    // ]).transform(
    //     (val) => val === 'true'
    // ),
    STORAGE_ACCESSKEY: z.string(),
    STORAGE_SECRETKEY: z.string(),
    STORAGE_BUCKETNAME: z.string()
}).parse(process.env)



const s3 = new S3Client({
    region: "default",
    endpoint: config.STORAGE_ENDPOINT,
    credentials: {
        accessKeyId: config.STORAGE_ACCESSKEY,
        secretAccessKey: config.STORAGE_SECRETKEY,
    },
})

export const uploadFile = async (
    fileName: string,
    file: Buffer,
    contentType: string,
    metaData: Record<string, string> = {}
) => {
    const params = {
        Bucket: config.STORAGE_BUCKETNAME,
        Key: fileName,
        Body: file,
        ContentType: contentType,
        Metadata: metaData,
    }
    try {
        await s3.send(new PutObjectCommand(params))
    } catch (error) {
        console.log(error)
    }
}


export const getFileLink = async (
    fileName: string,
    expiry: number = 600
) => {
    const params = {
        Bucket: config.STORAGE_BUCKETNAME,
        Key: fileName,
        Expires: expiry,
    }
    try {
        const command = new GetObjectCommand(params)
        return await getSignedUrl(s3, command, {
            expiresIn: expiry
        })
    } catch (error) {
        console.log(error)
    }
}