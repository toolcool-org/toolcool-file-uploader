import './styles.css';
import { IPlugin, IUploadData } from '../../core/plugins/plugin-declarations';
import { ISettings } from '../../core/settings';
import { isNumber } from '../../core/domain/math-provider';

export interface ILoadedImage {
  $image: HTMLImageElement;
  width: number;
  height: number;
}

const loadImage = (file: File) => {
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
 * This plugin displays a group of standard image formats in the preview panel.
 */
const tcfuMultiImagePreviewPlugin = (_settings: ISettings) : IPlugin => {

  let uploadData: IUploadData | undefined = undefined;
  let $figures: HTMLElement[] = [];
  let $previewPanel: HTMLElement | undefined = undefined;
  let $cancelButton: HTMLElement | undefined = undefined;
  let $uploadBtn: HTMLElement | undefined = undefined;

  const cancel = () => {
    if(!uploadData) return;

    uploadData.$uploadPanel?.classList.remove('hidden');
    $previewPanel?.classList.add('hidden');

    for(const $figure of $figures){
      $figure.remove();
    }

    $figures = [];

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

  const removeImage = (evt: MouseEvent) => {
    const $btn = evt.currentTarget as HTMLButtonElement;
    const $figure = $btn.parentElement;
    if(!$figure) return;

    const foundIndex = $figures.findIndex(item => item === $figure);
    if(foundIndex === -1) return;

    $figures.splice(foundIndex, 1);
    $figure.remove();

    if($figures.length <= 0){
      cancel();
    }
  };

  return {
    id: 'MultiImagePreviewPlugin',
    title: 'Multi Image Preview Plugin',

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
      let img: ILoadedImage | null = null;
      try{
        img = await loadImage(file);
      }
      catch (ex){
        // error
      }

      if(!img){
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

      const $preview = $previewPanel.querySelector('[data-tc="preview"]') as HTMLElement;

      for(const file of uploadData.files){
        let img: ILoadedImage | null = null;

        try{
          img = await loadImage(file);
        }
        catch (ex){
          console.error('Image is not valid:', ex);
        }

        if(!img) continue;
        const $figure = document.createElement('figure') as HTMLElement;

        const $removeImageBtn = document.createElement('button') as HTMLButtonElement;
        $removeImageBtn.type = 'button';
        $removeImageBtn.classList.add('tcfu-remove-btn');
        $removeImageBtn.innerHTML = `
<svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="20"
  height="20"
  fill="none" 
  stroke="currentColor" 
  stroke-linecap="round" 
  stroke-linejoin="round" 
  stroke-width="1.5" 
  viewBox="0 0 24 24">
  <path stroke="none" d="M0 0h24v24H0z"/>
  <path d="M18 6 6 18M6 6l12 12"/>
</svg>`;
        $figure.append($removeImageBtn);
        $removeImageBtn.addEventListener('click', removeImage);

        $figure.append(img.$image);
        $figures.push($figure);
        $preview?.append($figure);
      }

      if(_settings.previewCallback && typeof _settings.previewCallback === 'function'){
        _settings.previewCallback({
          files: _uploadData.files,
        });
      }
    },

    destroy: () => {
      for(const $figure of $figures){
        $figure.remove();
      }

      $figures = [];

      $cancelButton?.removeEventListener('click', cancel);
      $uploadBtn?.removeEventListener('click', upload);

      uploadData = undefined;
      $previewPanel = undefined;
      $cancelButton = undefined;
      $uploadBtn = undefined;
    },
  };
};

declare global {
  interface Window {
    tcfuMultiImagePreviewPlugin: typeof tcfuMultiImagePreviewPlugin
  }
}

window.tcfuMultiImagePreviewPlugin = tcfuMultiImagePreviewPlugin;

export default tcfuMultiImagePreviewPlugin;