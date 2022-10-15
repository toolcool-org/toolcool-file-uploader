export interface IUploadData {
    file: File;
    $uploader: HTMLElement;
    $uploadPanel?: HTMLElement;
}
export interface IPlugin {
    extensions: string[];
    init?: () => void;
    upload?: (uploadData: IUploadData) => void;
    destroy?: () => void;
}
