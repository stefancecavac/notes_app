import ImageKit from "imagekit";

import dotenv from "dotenv";
dotenv.config();

export const imagekit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.URL_ENDPOINT as string,
});
