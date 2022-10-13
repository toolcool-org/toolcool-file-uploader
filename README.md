# Tool Cool File Uploader

## Features
- supports multiple uploaders per page

## Usage
- Uploader section is defined by the following data attribute: `data-tc="file-uploader"`.
- Upload panel is defined by `data-tc="upload-panel"`.
- Preview panel is defined by `data-tc="preview-panel"`.
- Init the uploaders: `window.tcFileUploader()`

## API

### Destroy
```js
const $uploader1 = document.getElementById('uploader-1');
const uploader = $uploader1.tc.fileUploader;
uploader.destroy();
```