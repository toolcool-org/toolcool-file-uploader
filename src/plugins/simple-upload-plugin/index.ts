import './styles.css';
import { IPlugin, IUploadData } from '../../core/plugins/plugin-declarations';
import { ISettings } from '../../core/settings';

interface IGridItems {
  $box: HTMLElement;
  file: File;
}

const removeBtnSVG = `<svg 
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

/**
 * This plugin allows to upload one or more files of any MIME type.
 */
const tcfuSimpleUploadPlugin = (_settings: ISettings) : IPlugin => {

  let uploadData: IUploadData | undefined = undefined;
  let gridItems: IGridItems[] = [];
  let $previewPanel: HTMLElement | undefined = undefined;
  let $cancelButton: HTMLElement | undefined = undefined;
  let $uploadBtn: HTMLElement | undefined = undefined;

  const cancel = () => {
    if(!uploadData) return;

    uploadData.$uploadPanel?.classList.remove('hidden');
    $previewPanel?.classList.add('hidden');

    for(const gridItem of gridItems){
      gridItem.$box.remove();
    }

    gridItems = [];

    if(uploadData.$fileInput){
      uploadData.$fileInput.value = '';
    }
  };

  const upload = () => {
    if(!uploadData) return;

    if(_settings.uploadCallback && typeof _settings.uploadCallback === 'function'){
      _settings.uploadCallback({
        files: gridItems.map(item => item.file),
      });
    }
  };

  const removeFile = (evt: MouseEvent) => {
    const $btn = evt.currentTarget as HTMLButtonElement;
    const $box = $btn.parentElement;
    if(!$box) return;

    const foundIndex = gridItems.findIndex(gridItem => gridItem.$box === $box);
    if(foundIndex === -1) return;

    gridItems.splice(foundIndex, 1);
    $box.remove();

    if(gridItems.length <= 0){
      cancel();
    }
  };

  return {
    id: 'SimpleUploadPlugin',
    title: 'Simple Upload Plugin',

    extensions: ['*'],
    mimeTypes: ['*'],

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

        const $box = document.createElement('div') as HTMLElement;
        $box.classList.add('tcfu-file-box');

        // create 'remove file' button --------------
        const $removeFileBtn = document.createElement('button') as HTMLButtonElement;
        $removeFileBtn.type = 'button';
        $removeFileBtn.classList.add('tcfu-remove-btn');
        $removeFileBtn.innerHTML = removeBtnSVG;
        $removeFileBtn.addEventListener('click', removeFile);
        $box.append($removeFileBtn);

        // create 'file name' span -------------
        const $span = document.createElement('span') as HTMLSpanElement;
        $span.textContent = file.name;
        $box.append($span);

        gridItems.push({
          $box,
          file,
        });
        $preview?.append($box);
      }

      if(_settings.previewCallback && typeof _settings.previewCallback === 'function'){
        _settings.previewCallback({
          files: _uploadData.files,
        });
      }
    },

    destroy: () => {
      for(const gridItem of gridItems){
        gridItem.$box.remove();
      }

      gridItems = [];

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
    tcfuSimpleUploadPlugin: typeof tcfuSimpleUploadPlugin
  }
}

window.tcfuSimpleUploadPlugin = tcfuSimpleUploadPlugin;

export default tcfuSimpleUploadPlugin;