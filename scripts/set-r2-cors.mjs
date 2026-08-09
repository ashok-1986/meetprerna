import { S3Client, PutBucketCorsCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

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

async function main() {
  const corsParams = {
    Bucket: R2_BUCKET_NAME,
    CORSConfiguration: {
      CORSRules: [
        {
          AllowedHeaders: ["*"],
          AllowedMethods: ["GET", "HEAD"],
          AllowedOrigins: ["*"],
          ExposeHeaders: [],
          MaxAgeSeconds: 3600,
        },
      ],
    },
  };

  try {
    const data = await s3Client.send(new PutBucketCorsCommand(corsParams));
    console.log("Success: Configured CORS for R2 bucket.", data);
  } catch (err) {
    console.error("Error setting CORS:", err);
  }
}

main();
