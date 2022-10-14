import './css/styles.css';
import Uploader, { IUploader } from './ui/uploader';

export interface IToolCoolFileUploader {
  destroy: () => void;
}

let uploaders : IUploader[] = [];

/**
 * Init all file uploader sections on the page.
 * Each section is defined by the following data attribute:
 * data-tc="file-uploader"
 */
const init = () => {
  const $uploaders = document.querySelectorAll('[data-tc="file-uploader"]');
  for(const $uploader of $uploaders){
    const api = Uploader($uploader as HTMLElement);
    uploaders.push(api);

    $uploader.tc = $uploader.tc || {
      fileUploader: api,
    };
  }
};

const destroy = () => {
  for(const uploader of uploaders){
    uploader.destroy();
  }
  uploaders = [];
};

const ToolCoolFileUploader = () : IToolCoolFileUploader => {
  init();

  return {
    destroy,
  };
};

export default ToolCoolFileUploader;

window.tcFileUploader = ToolCoolFileUploader;