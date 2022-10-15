import { ISettings } from '../settings';
import { getExtensionWithoutDot } from './io-provider';
import { IPlugin } from '../plugins/plugin-declarations';
import { isNumber } from './math-provider';

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

const validaFile = async (settings: ISettings, file: File, plugins: IPlugin[]) : Promise<IValidationResult> => {

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

  // validate the file size -----------------
  if(isNumber(settings.maxSizeInBytes) && file.size > (settings.maxSizeInBytes as number)){
    return {
      isValid: false,
      message: `The maximum file size must not exceed ${ settings.maxSizeInBytes } bytes.`,
    };
  }

  // call plugins validations if available ------------------
  for(const plugin of plugins){
    if(!plugin.validate || typeof plugin.validate !== 'function') continue;
    const res = await plugin.validate(settings, file);
    if(!res.isValid) return res;
  }

  return {
    isValid: true,
    message: '',
  };
};

export const validate = async (settings: ISettings, files: File[], plugins: IPlugin[]) : Promise<IValidationResult> => {
  if(!settings.validationEnabled) return {
    isValid: true,
    message: '',
  };

  for(const file of files){
    const res = await validaFile(settings, file, plugins);
    if(!res.isValid) return res;
  }

  return {
    isValid: true,
    message: '',
  };
};