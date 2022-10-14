declare module 'toolcool-file-uploader' {

  export interface ISettings {
    path: string,
    plugins?: (() => IPlugin)[];
  }

  export interface IPlugin {
    extensions: string[]; // The list of extensions that plugin can handle, without the dot.
    init?: () => void;
    destroy?: () => void;
  }

  export interface IPluginsProvider {
    init: () => void;
    destroy: () => void;
  }

  export interface IUploader {
    destroy: () => void;
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