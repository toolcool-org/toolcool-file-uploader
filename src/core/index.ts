import './css/styles.css';
import Uploader, { IUploader } from './ui/uploader';
import { settings, ISettings } from './settings';

export interface IToolCoolFileUploader {
  destroy: () => void;
}

const ToolCoolFileUploader = (userSettings?: ISettings) : IToolCoolFileUploader => {

  let uploader: IUploader | undefined = undefined;
  let $uploader: HTMLElement | undefined = undefined;

  const init = (userSettings?: ISettings) => {
    const combinedSettings = Object.assign(settings, userSettings);

    $uploader = document.querySelector(combinedSettings.path) as HTMLElement;
    if(!$uploader){
      console.error(`File uploader error: the path property is not defined.`);
      return;
    }

    uploader = Uploader($uploader, combinedSettings);
  };

  const destroy = () => {
    uploader?.destroy();

    uploader = undefined;
    $uploader = undefined;
  };

  init(userSettings);

  return {
    destroy,
  };
};

export default ToolCoolFileUploader;

window.tcFileUploader = ToolCoolFileUploader;