// cloudinaryConfig.js
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";


// Cloudinary config
cloudinary.config({
  cloud_name: "dixgmin0m",
  api_key: "628568343593728",
  api_secret: "4nnj44vbP1jYHU8-aK6qQn1rsIU",
});

// Cloudinary storage generator
export const createUploader = (folderName) => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folderName, // Dynamic folder name
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      transformation: [{ width: 800, height: 800, crop: "limit" }],
    },
  });

  return multer({ storage });
};

export const upload = createUploader("healthcrm"); // Default export

