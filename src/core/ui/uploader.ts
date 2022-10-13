export interface IUploader {
  destroy: () => void;
}

const Uploader = ($uploader: HTMLElement) : IUploader => {
  const $uploadPanel = $uploader.querySelector('[data-tc="upload-panel"]');
  const $fileInput = $uploadPanel?.querySelector('input[type="file"]');

  const $previewPanel = $uploader.querySelector('[data-tc="preview-panel"]');

  console.log($uploadPanel, $fileInput, $previewPanel);

  const destroy = () => {
    console.log('destroy');
  };

  return {
    destroy,
  };
};

export default Uploader;