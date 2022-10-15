import './styles.css';
import { IPlugin } from '../../core/plugins/plugin-declarations';
import { ISettings } from '../../core/settings';
export interface ILoadedImage {
    $image: HTMLImageElement;
    width: number;
    height: number;
}
export declare const loadImage: (file: File) => Promise<ILoadedImage>;
/**
 * This plugin displays standard image formats in the preview panel.
 * This plugin is part of the core system.
 */
declare const tcfuImagePreviewPlugin: (_settings: ISettings) => IPlugin;
declare global {
    interface Window {
        tcfuImagePreviewPlugin: typeof tcfuImagePreviewPlugin;
    }
}
export default tcfuImagePreviewPlugin;
