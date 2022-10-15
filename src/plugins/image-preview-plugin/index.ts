import './styles.css';
import { IPlugin, IUploadData } from '../../core/plugins/plugin-declarations';
import { ISettings } from '../../core/settings';
import { isNumber } from '../../core/domain/math-provider';

export interface ILoadedImage {
  $image: HTMLImageElement;
  width: number;
  height: number;
}

export const loadImage = (file: File) => {
  return new Promise<ILoadedImage>((resolve, reject) => {
    const $image = new Image();

    $image.crossOrigin = 'Anonymous';
    $image.onerror = (err) => reject(err);

    $image.onload = (evt) => {
      const { width, height } = evt.target as HTMLImageElement;
      resolve({
        $image,
        width,
        height,
      });
    };

    const reader = new FileReader();
    reader.onerror = (err) => reject(err);
    reader.onload = () => {
      $image.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
};

/**
 * This plugin displays standard image formats in the preview panel.
 * This plugin is part of the core system.
 */
const tcfuImagePreviewPlugin = (_settings: ISettings) : IPlugin => {

  let uploadData: IUploadData | undefined = undefined;
  let img: ILoadedImage | undefined = undefined;
  let $previewPanel: HTMLElement | undefined = undefined;
  let $cancelButton: HTMLElement | undefined = undefined;
  let $uploadBtn: HTMLElement | undefined = undefined;

  const cancel = () => {
    if(!uploadData) return;

    uploadData.$uploadPanel?.classList.remove('hidden');
    $previewPanel?.classList.add('hidden');

    img?.$image.remove();
    img = undefined;

    if(uploadData.$fileInput){
      uploadData.$fileInput.value = '';
    }
  };

  const upload = () => {
    if(!uploadData) return;

    if(_settings.uploadCallback && typeof _settings.uploadCallback === 'function'){
      _settings.uploadCallback({
        files: uploadData.files,
      });
    }
  };

  return {
    id: 'ImagePreviewPlugin',
    title: 'Image Preview Plugin',

    extensions: ['jpg', 'jpeg', 'png', 'apng', 'gif', 'avif', 'svg', 'webp'],
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/apng',
      'image/avif',
      'image/svg+xml',
      'image/webp',
    ],

    /**
     * Check if the image is valid.
     */
    validate: async (_settings: ISettings, file: File) => {
      try{
        img = await loadImage(file);
      }
      catch (ex){
        return {
          isValid: false,
          message: 'Invalid image.'
        };
      }

      if(isNumber(_settings.maxWidth) && img.width > (_settings.maxWidth as number)){
        return {
          isValid: false,
          message: `The image width should not be more than ${ _settings.maxWidth } pixels.`,
        };
      }

      if(isNumber(_settings.maxHeight) && img.height > (_settings.maxHeight as number)){
        return {
          isValid: false,
          message: `The image height should not be more than ${ _settings.maxHeight } pixels.`,
        };
      }

      return {
        isValid: true,
        message: '',
      };
    },

    upload: async (_uploadData: IUploadData) => {
      uploadData = _uploadData;
      $previewPanel = uploadData.$uploader.querySelector('[data-tc="preview-panel"]') as HTMLElement;
      if(!$previewPanel) return;

      uploadData.$uploadPanel?.classList.add('hidden');
      $previewPanel?.classList.remove('hidden');

      $cancelButton = $previewPanel.querySelector('[data-tc="cancel-preview-btn"]') as HTMLElement;
      $cancelButton?.addEventListener('click', cancel);

      $uploadBtn = $previewPanel.querySelector('[data-tc="upload-btn"]') as HTMLElement;
      $uploadBtn?.addEventListener('click', upload);

      if(uploadData.files.length <= 0) return;

      try{
        img = await loadImage(uploadData.files[0]);
      }
      catch (ex){
        console.error('Image is not valid:', ex);
      }

      if(!img) return;

      const $preview = $previewPanel.querySelector('[data-tc="preview"]') as HTMLElement;
      $preview?.append(img.$image);

      if(_settings.previewCallback && typeof _settings.previewCallback === 'function'){
        _settings.previewCallback({
          files: _uploadData.files,
        });
      }
    },

    destroy: () => {
      try{
        img?.$image?.remove();
      }
      catch(ex){
        // error
      }

      $cancelButton?.removeEventListener('click', cancel);
      $uploadBtn?.removeEventListener('click', upload);

      uploadData = undefined;
      img = undefined;
      $previewPanel = undefined;
      $cancelButton = undefined;
      $uploadBtn = undefined;
    },
  };
};

declare global {
  interface Window {
    tcfuImagePreviewPlugin: typeof tcfuImagePreviewPlugin
  }
}

window.tcfuImagePreviewPlugin = tcfuImagePreviewPlugin;

export default tcfuImagePreviewPlugin;