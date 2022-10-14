import { IPlugin, IUploadData } from '../../core/plugins/plugin-declarations';
import './styles.css';

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
const ImagePreviewPlugin = () : IPlugin => {

  let uploadData: IUploadData | undefined = undefined;
  let img: ILoadedImage | undefined = undefined;
  let $previewPanel: HTMLElement | undefined = undefined;
  let $cancelButton: HTMLElement | undefined = undefined;

  const cancel = () => {
    if(!uploadData) return;

    uploadData.$uploadPanel?.classList.remove('hidden');
    $previewPanel?.classList.add('hidden');

    img?.$image.remove();
    img = undefined;
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

      $cancelButton = $previewPanel.querySelector('[data-tc="cancel-preview"]') as HTMLElement;
      $cancelButton?.addEventListener('click', cancel);
    },

    destroy: () => {
      try{
        img?.$image?.remove();
      }
      catch(ex){
        // error
      }

      $cancelButton?.removeEventListener('click', cancel);

      uploadData = undefined;
      img = undefined;
      $previewPanel = undefined;
      $cancelButton = undefined;
    },
  };
};

export default ImagePreviewPlugin;