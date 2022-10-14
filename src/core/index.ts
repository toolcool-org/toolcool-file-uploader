import './css/styles.css';
import Uploader from './ui/uploader';

export interface IToolCoolFileUploader {

}

/**
 * Init all file uploader sections on the page.
 * Each section is defined by the following data attribute:
 * data-tc="file-uploader"
 */
const init = () => {
  const $uploaders = document.querySelectorAll('[data-tc="file-uploader"]');
  for(const $uploader of $uploaders){
    const api = Uploader($uploader as HTMLElement);
    $uploader.tc = $uploader.tc || {
      fileUploader: api,
    };
  }
};

const ToolCoolFileUploader = () : IToolCoolFileUploader => {
  init();

  return {

  };
};

export default ToolCoolFileUploader;

window.tcFileUploader = ToolCoolFileUploader;