export interface IUploadData {
  file: File;
  $uploader: HTMLElement;
  $uploadPanel?: HTMLElement;
}

export interface IPlugin {
  extensions: string[]; // The list of extensions that plugin can handle, without the dot.
  init?: () => void;
  upload?: (uploadData: IUploadData) => void;
  destroy?: () => void;
}