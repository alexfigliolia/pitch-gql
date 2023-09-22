import { Environment } from "Environment";
import { v2 as Cloud } from "cloudinary";

export class ImageStorage {
  public static readonly config = Cloud.config({
    cloud_name: Environment.IMAGE_UPLOAD_NAME,
    api_key: Environment.IMAGE_UPLOAD_API_KEY,
    api_secret: Environment.IMAGE_UPLOAD_API_SECRET,
  });

  public static sign() {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = Cloud.utils.api_sign_request(
      {
        timestamp: timestamp,
        source: "uw",
        folder: "pitch/profile-photos",
      },
      Environment.IMAGE_UPLOAD_API_SECRET
    );
    return { timestamp, signature };
  }
}
