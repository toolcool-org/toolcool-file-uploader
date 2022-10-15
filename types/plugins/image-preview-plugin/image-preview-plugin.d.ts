import { IPlugin } from '../../core/plugins/plugin-declarations';
import './styles.css';
import { ISettings } from '../../core/settings';
export interface ILoadedImage {
    $image: HTMLImageElement;
    width: number;
    height: number;
}
/**
 * This plugin displays standard image formats in the preview panel.
 * This plugin is part of the core system.
 */
declare const ImagePreviewPlugin: (_settings: ISettings) => IPlugin;
export default ImagePreviewPlugin;
