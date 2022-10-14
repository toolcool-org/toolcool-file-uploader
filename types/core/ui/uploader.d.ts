import { ISettings } from '../settings';
export interface IUploader {
    destroy: () => void;
}
declare const Uploader: ($uploader: HTMLElement, settings: ISettings) => IUploader;
export default Uploader;
