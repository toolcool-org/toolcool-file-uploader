declare module 'toolcool-file-uploader' {

  export interface IPreviewCallbackData {
    files: File[];
  }

  export interface IUploadCallbackData {
    files: File[];
  }

  export interface ISettings {
    path: string;
    maxSizeInBytes?: number;
    plugins?: ((settings: ISettings) => IPlugin)[];

    uploadCallback?: (data: IUploadCallbackData) => void;
    previewCallback?: (data: IPreviewCallbackData) => void;

    validationEnabled?: boolean;

    // images ---------------
    maxWidth?: number;
    maxHeight?: number;
  }

  export interface IUploadData {
    files: File[];
    $uploader: HTMLElement;
    $uploadPanel?: HTMLElement;
  }

  export interface IPlugin {
    id: string;
    title: string;
    extensions: string[]; // The list of extensions that plugin can handle, without the dot.
    mimeTypes: string[]; // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
    init?: () => void;
    upload?: (uploadData: IUploadData) => void;
    validate?: (settings: ISettings, file: File) => Promise<IValidationResult>;
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