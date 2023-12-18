import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

const uploadImageAndGetUri = (file: any, folder: any) => {
  const imageBuffer = file.buffer;

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: folder,
        },
        (error: any, result: any) => {
          if (error) {
            reject(error);
            return;
          }
          let image = {
            uri: result.secure_url,
            public_id: result.public_id,
          };
          resolve(image);
        }
      )
      .end(imageBuffer);
  });
};

const deleteImageByUri = async (public_id: string) => {
  try {
    const data = await cloudinary.uploader.destroy(public_id);
    return data;
  } catch (error) {
    throw error;
  }
};

export default { uploadImageAndGetUri, deleteImageByUri };
