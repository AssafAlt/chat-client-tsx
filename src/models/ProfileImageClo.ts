export class ProfileImageClo {
  private upload_preset: string;
  private file: File | undefined;
  private folder: string; //= "chat_profiles";

  isFileExists(): boolean {
    return this.file !== undefined;
  }
  constructor(
    file: File | undefined,
    folder: string = "chat_profiles",
    upload_preset: string = "ts4tmsay"
  ) {
    this.file = file;
    this.folder = folder;
    this.upload_preset = upload_preset;
  }
}
