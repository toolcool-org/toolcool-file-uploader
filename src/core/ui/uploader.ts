export interface IUploader {
  destroy: () => void;
}

const DRAG_CLASS = 'is-dragover';

const Uploader = ($uploader: HTMLElement) : IUploader => {
  const $uploadPanel = $uploader.querySelector('[data-tc="upload-panel"]');
  const $fileInput = $uploadPanel?.querySelector('input[type="file"]');

  // const $previewPanel = $uploader.querySelector('[data-tc="preview-panel"]');

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

    const file: File = evt.dataTransfer.files[0];
    await upload(file);
  };

  const upload = async (file: File) => {
    console.log('file', file);
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

    const file: File = $target.files[0];
    await upload(file);
  };

  (() => {
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
  };

  return {
    destroy,
  };
};

export default Uploader;