import { IPlugin, IUploadData } from '../plugin-declarations';

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
 */
const ImagePreviewPlugin = () : IPlugin => {

  let img: ILoadedImage | undefined = undefined;

  return {
    extensions: ['jpg', 'jpeg', 'png', 'gif'],

    init: () => {

    },

    upload: async (uploadData: IUploadData) => {
      if(!uploadData.$previewPanel) return;

      uploadData.$uploadPanel?.classList.add('hidden');
      uploadData.$previewPanel.classList.remove('hidden');

      img = await loadImage(uploadData.file);
      uploadData.$previewPanel.append(img.$image);
    },

    destroy: () => {
      try{
        img?.$image?.remove();
      }
      catch(ex){}

      img = undefined;
    },
  };
};

export default ImagePreviewPlugin;