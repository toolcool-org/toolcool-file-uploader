import { IPlugin } from '../declarations';

/**
 * This plugin displays standard image formats in the preview panel.
 */
const ImagePreviewPlugin = () : IPlugin => {
  return {
    extensions: ['jpg', 'jpeg', 'png', 'gif'],
  };
};

export default ImagePreviewPlugin;