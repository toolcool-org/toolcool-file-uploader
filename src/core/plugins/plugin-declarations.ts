import { IValidationResult } from '../domain/validation-provider';
import { ISettings } from '../settings';

export interface IUploadData {
  files: File[];
  $uploader: HTMLElement;
  $uploadPanel?: HTMLElement;
  $fileInput: HTMLInputElement | null;
}

export interface IPlugin {
  id: string;
  title: string;
  extensions: string[]; // The list of extensions that plugin can handle, without the dot.
  mimeTypes: string[]; // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
  init?: () => void;
  upload?: (uploadData: IUploadData) => void;
  validate?: (settings: ISettings, file: File) => Promise<IValidationResult>;
  destroy?: () => void;
}