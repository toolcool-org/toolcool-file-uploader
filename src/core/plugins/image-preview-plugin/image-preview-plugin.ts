import { IPlugin } from '../declarations';

/**
 * This plugin displays standard image formats in the preview panel.
 */
const ImagePreviewPlugin = () : IPlugin => {
  return {
    extensions: ['jpg', 'jpeg', 'png', 'gif'],

    init: () => {
      console.log('init');
    },

    destroy: () => {
      console.log('destroy');
    },
  };
};

export default ImagePreviewPlugin;