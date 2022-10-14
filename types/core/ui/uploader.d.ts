export interface IUploader {
    destroy: () => void;
}
declare const Uploader: ($uploader: HTMLElement) => IUploader;
export default Uploader;
