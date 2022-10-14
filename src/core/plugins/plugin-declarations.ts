export interface IUploadData {
  file: File;
  $uploadPanel?: HTMLElement;
  $previewPanel?: HTMLElement;
}

export interface IPlugin {
  extensions: string[]; // The list of extensions that plugin can handle, without the dot.
  init?: () => void;
  upload?: (uploadData: IUploadData) => void;
  destroy?: () => void;
}