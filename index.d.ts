declare module 'toolcool-file-uploader' {


  export interface ISettings {

  }

  export interface IPlugin {
    extensions: string[], // The list of extensions that plugin can handle, without the dot.
  }

  export interface IPluginsProvider {
    destroy: () => void;
  }

  export interface IUploader {
    destroy: () => void;
  }

  export interface IToolCoolFileUploader {

  }

  export const ToolCoolFileUploader: () => IToolCoolFileUploader;

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