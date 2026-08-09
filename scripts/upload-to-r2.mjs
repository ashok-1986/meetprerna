import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import mime from "mime-types";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const {
  R2_ACCOUNT_ID,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET_NAME,
} = process.env;

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
  console.error("Missing required R2 environment variables in .env.local.");
  process.exit(1);
}

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

const IMAGES_DIR = path.join(process.cwd(), "public", "images");

async function uploadFile(filePath, fileName) {
  const fileStream = fs.createReadStream(filePath);
  const contentType = mime.lookup(filePath) || "application/octet-stream";

  const uploadParams = {
    Bucket: R2_BUCKET_NAME,
    Key: fileName,
    Body: fileStream,
    ContentType: contentType,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log(`Success: Uploaded ${fileName}`);
    return data;
  } catch (err) {
    console.error(`Error uploading ${fileName}:`, err);
  }
}

async function main() {
  console.log(`Starting upload to R2 Bucket: ${R2_BUCKET_NAME}...`);
  const files = fs.readdirSync(IMAGES_DIR);

  const images = files.filter(f => f.match(/\.(jpg|jpeg|png|webp|avif)$/i));
  
  if (images.length === 0) {
    console.log("No images found in public/images/");
    return;
  }

  for (const file of images) {
    const filePath = path.join(IMAGES_DIR, file);
    await uploadFile(filePath, file);
  }

  console.log("All uploads complete!");
}

main();
