import { IPlugin, IUploadData } from '../../core/plugins/plugin-declarations';
import './styles.css';
import { ISettings } from '../../core/settings';
import { getExtensionWithoutDot } from '../../core/domain/io-provider';

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
 * This plugin displays standard image formats in the preview panel.
 * This plugin is part of the core system.
 */
const ImagePreviewPlugin = (_settings: ISettings) : IPlugin => {

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
  };

  const upload = () => {
    if(!uploadData) return;

    if(_settings.uploadCallback && typeof _settings.uploadCallback === 'function'){
      _settings.uploadCallback({
        file: uploadData.file,
        ext: getExtensionWithoutDot(uploadData.file?.name ?? ''),
      });
    }
  };

  return {
    extensions: ['jpg', 'jpeg', 'png', 'gif'],

    upload: async (_uploadData: IUploadData) => {
      uploadData = _uploadData;
      $previewPanel = uploadData.$uploader.querySelector('[data-tc="preview-panel"]') as HTMLElement;
      if(!$previewPanel) return;

      uploadData.$uploadPanel?.classList.add('hidden');
      $previewPanel?.classList.remove('hidden');

      img = await loadImage(uploadData.file);

      const $preview = $previewPanel.querySelector('[data-tc="preview"]') as HTMLElement;
      $preview?.append(img.$image);

      if(_settings.previewCallback && typeof _settings.previewCallback === 'function'){
        _settings.previewCallback({
          file: _uploadData.file,
          ext: getExtensionWithoutDot(_uploadData.file?.name ?? ''),
        });
      }

      $cancelButton = $previewPanel.querySelector('[data-tc="cancel-preview-btn"]') as HTMLElement;
      $cancelButton?.addEventListener('click', cancel);

      $uploadBtn = $previewPanel.querySelector('[data-tc="upload-btn"]') as HTMLElement;
      $uploadBtn?.addEventListener('click', upload);
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

export default ImagePreviewPlugin;