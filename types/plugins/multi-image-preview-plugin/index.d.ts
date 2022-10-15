import './styles.css';
import { IPlugin } from '../../core/plugins/plugin-declarations';
import { ISettings } from '../../core/settings';
export interface ILoadedImage {
    $image: HTMLImageElement;
    width: number;
    height: number;
}
/**
 * This plugin displays a group of standard image formats in the preview panel.
 */
declare const tcfuMultiImagePreviewPlugin: (_settings: ISettings) => IPlugin;
declare global {
    interface Window {
        tcfuMultiImagePreviewPlugin: typeof tcfuMultiImagePreviewPlugin;
    }
}
export default tcfuMultiImagePreviewPlugin;
