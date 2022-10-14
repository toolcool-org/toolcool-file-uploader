declare module 'toolcool-file-uploader' {

  export interface IUploader {
    destroy: () => void;
  }

  const ToolCoolFileUploader: () => void;

  global {
    interface Window {
      tcFileUploader: typeof ToolCoolFileUploader;
    }
    interface Element {
      tc: {
        fileUploader: IUploader;
      };
    }
  }
}