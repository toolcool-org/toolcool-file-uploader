import { IPlugin } from './plugins/plugin-declarations';
import ImagePreviewPlugin from '../plugins/image-preview-plugin';

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

export const settings : ISettings = {
  path: '',
  plugins: [ImagePreviewPlugin],
  validationEnabled: true,
};