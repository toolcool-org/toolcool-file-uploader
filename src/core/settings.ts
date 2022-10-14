import { IPlugin } from './plugins/plugin-declarations';
import ImagePreviewPlugin from './plugins/image-preview-plugin/image-preview-plugin';

export interface ISettings {
  path: string,
  plugins?: (() => IPlugin)[];
}

export const settings : ISettings = {
  path: '',
  plugins: [ImagePreviewPlugin],
};