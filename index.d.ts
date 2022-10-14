declare module 'toolcool-file-uploader' {


  export interface ISettings {

  }

  export interface IPlugin {
    extensions: string[], // The list of extensions that plugin can handle, without the dot.
  }

  export interface IPluginsProvider {

  }

  export interface IUploader {
    destroy: () => void;
  }

  export interface IToolCoolFileUploader {

  }

  global {
    interface Window {
      tcFileUploader: IToolCoolFileUploader;
    }
    interface Element {
      tc: {
        fileUploader: IUploader;
      };
    }
  }
}