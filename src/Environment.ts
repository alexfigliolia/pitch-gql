export class Environment {
  static PORT = process.env.PORT || 4000;

  public static get TOKEN() {
    return this.returnOrThrow("TOKEN");
  }

  public static get IMAGE_UPLOAD_NAME() {
    return this.returnOrThrow("IMAGE_UPLOAD_NAME");
  }

  public static get IMAGE_UPLOAD_API_KEY() {
    return this.returnOrThrow("IMAGE_UPLOAD_API_KEY");
  }

  public static get IMAGE_UPLOAD_API_SECRET() {
    return this.returnOrThrow("IMAGE_UPLOAD_API_SECRET");
  }

  private static returnOrThrow(key: string) {
    if (!process.env[key]) {
      console.log(`The key "${key}" does not exist on the process object`);
      process.exit(1);
    }
    return process.env[key] || "";
  }
}
