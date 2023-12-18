export class ProfileImageClo {
  private upload_preset = "ts4tmsay";
  private file: File | undefined;
  private folder = "chat_profiles";

  isFileExists(): boolean {
    if (this.file === undefined) {
      return false;
    } else {
      return true;
    }
  }
  constructor(file: File | undefined) {
    this.file = file;
  }
}
