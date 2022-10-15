import { IPlugin } from './plugins/plugin-declarations';
import ImagePreviewPlugin from '../plugins/image-preview-plugin/image-preview-plugin';

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

export const settings : ISettings = {
  path: '',
  plugins: [ImagePreviewPlugin],
  validationEnabled: true,
};