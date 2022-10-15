import { ISettings } from '../settings';
import { getExtensionWithoutDot } from './io-provider';
import { IPlugin } from '../plugins/plugin-declarations';

export interface IValidationResult {
  isValid: boolean;
  message: string;
}

/**
 * Check if the specified file extension
 * is included in at least one plugin.
 */
const extensionIncluded = (ext: string, plugins: IPlugin[]) => {

  for(const plugin of plugins){
    if(plugin.extensions.includes(ext)) return true;
  }

  return false;
};

/**
 * Check if the specified mime type
 * is included in at least one plugin.
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
 */
const mimeTypeIncluded = (mimeType: string, plugins: IPlugin[]) => {

  for(const plugin of plugins){
    if(plugin.mimeTypes.includes(mimeType)) return true;
  }

  return false;
};

export const validate = (settings: ISettings, file: File, plugins: IPlugin[]) : IValidationResult => {
  if(!settings.validationEnabled) return {
    isValid: true,
    message: '',
  };

  // validate file extension ---------------
  const ext = getExtensionWithoutDot(file.name);
  if(!extensionIncluded(ext, plugins)){
    return {
      isValid: false,
      message: `The '.${ ext }' file extension is not supported.`,
    };
  }

  // validate file mime type ----------------
  if(!mimeTypeIncluded(file.type, plugins)){
    return {
      isValid: false,
      message: `The '${ file.type }' file MIME type is not supported.`,
    };
  }

  return {
    isValid: true,
    message: '',
  };
};