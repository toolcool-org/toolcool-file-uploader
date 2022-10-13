import ToolCoolFileUploader from './index';
import { IUploader } from './ui/uploader';

declare global {
  interface Window {
    tcFileUploader: typeof ToolCoolFileUploader
  }

  interface Element {
    tc: {
      fileUploader: IUploader
    }
  }
}