declare module 'toolcool-file-uploader' {

  export interface IPreviewCallbackData {
    file: File;
    ext: string;
  }

  export interface IUploadCallbackData {
    file: File;
    ext: string;
  }

  export interface ISettings {
    path: string,
    plugins?: ((settings: ISettings) => IPlugin)[];
    uploadCallback?: (data: IUploadCallbackData) => void;
    previewCallback?: (data: IPreviewCallbackData) => void;
    validationEnabled?: boolean;
  }

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

  export interface IPluginsProvider {
    init: () => void;
    upload?: (uploadData: IUploadData) => void;
    destroy: () => void;
    getPlugins: () => IPlugin[];
  }

  export interface IUploader {
    destroy: () => void;
  }

  export interface IValidationResult {
    isValid: boolean;
    message: string;
  }

  export interface IToolCoolFileUploader {
    destroy: () => void;
  }

  export const ToolCoolFileUploader: (settings?: ISettings) => IToolCoolFileUploader;

  global {
    interface Window {
      tcFileUploader: typeof ToolCoolFileUploader;
    }
  }
}