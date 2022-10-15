import PluginsProvider, { IPluginsProvider } from '../plugins/plugins-provider';
import { ISettings } from '../settings';
import { validate } from '../domain/validation-provider';

export interface IUploader {
  destroy: () => void;
}

const DRAG_CLASS = 'is-dragover';

const Uploader = ($uploader: HTMLElement, settings: ISettings) : IUploader => {
  let pluginsProvider: IPluginsProvider | null = null;

  const $uploadPanel = $uploader.querySelector('[data-tc="upload-panel"]') as HTMLElement;
  const $fileInput = $uploadPanel?.querySelector('input[type="file"]') as HTMLInputElement;

  const prevent = (evt: MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();
  };

  const removeDragClass = (evt: DragEvent) => {
    evt.preventDefault();
    evt.stopPropagation();
    $uploadPanel?.classList.remove(DRAG_CLASS);
  };

  const addDragClass = (evt: DragEvent) => {
    evt.preventDefault();
    evt.stopPropagation();
    $uploadPanel?.classList.add(DRAG_CLASS);
  };

  const handleDrop = async (evt: DragEvent) => {
    removeDragClass(evt);

    if(!evt || !evt.dataTransfer || !evt.dataTransfer.files || evt.dataTransfer.files.length < 0) return;
    await upload(Array.from(evt.dataTransfer.files));
  };

  const upload = async (files: File[]) => {

    // perform validations ----------------
    const validationResult = await validate(settings, files, pluginsProvider?.getPlugins() ?? []);
    if(!validationResult.isValid){
      alert(validationResult.message);
      return;
    }

    pluginsProvider?.upload({
      files,
      $uploader,
      $uploadPanel,
      $fileInput,
    });

    /*
    if (!file.type.match('image.*')) {
      // https://fkhadra.github.io/react-toastify/introduction/
      toast('⚠️ Only image files are supported.');
      return;
    }

    const img = await loadImage(file);
    */
  };

  const onFileInputChange = async (evt: MouseEvent) => {
    const $target = evt.target as HTMLInputElement;
    if(!$target.files || $target.files.length <= 0) return;
    await upload(Array.from($target.files));
  };

  (() => {
    pluginsProvider = PluginsProvider(settings);
    pluginsProvider.init();

    $fileInput?.addEventListener('change', onFileInputChange);
    $uploadPanel?.addEventListener('drag', prevent);
    $uploadPanel?.addEventListener('dragstart', prevent);
    $uploadPanel?.addEventListener('dragend', removeDragClass);
    $uploadPanel?.addEventListener('dragleave', removeDragClass);
    $uploadPanel?.addEventListener('dragover', addDragClass);
    $uploadPanel?.addEventListener('dragenter', addDragClass);
    $uploadPanel?.addEventListener('drop', handleDrop);
  })();

  const destroy = () => {
    $fileInput?.removeEventListener('change', onFileInputChange);
    $uploadPanel?.removeEventListener('drag', prevent);
    $uploadPanel?.removeEventListener('dragstart', prevent);
    $uploadPanel?.removeEventListener('dragend', removeDragClass);
    $uploadPanel?.removeEventListener('dragleave', removeDragClass);
    $uploadPanel?.removeEventListener('dragover', addDragClass);
    $uploadPanel?.removeEventListener('dragenter', addDragClass);
    $uploadPanel?.removeEventListener('drop', handleDrop);

    pluginsProvider?.destroy();
  };

  return {
    destroy,
  };
};

export default Uploader;