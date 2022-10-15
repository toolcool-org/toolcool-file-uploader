import ToolCoolFileUploader from './index';
declare global {
    interface Window {
        tcFileUploader: typeof ToolCoolFileUploader;
    }
}
