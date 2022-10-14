import './css/styles.css';
import { ISettings } from './settings';
export interface IToolCoolFileUploader {
    destroy: () => void;
}
declare const ToolCoolFileUploader: (userSettings?: ISettings) => IToolCoolFileUploader;
export default ToolCoolFileUploader;
