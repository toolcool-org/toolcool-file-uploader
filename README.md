# Tool Cool File Uploader

## Features
- supports multiple uploaders per page

## Usage
- Upload panel is defined by `data-tc="upload-panel"`.
- Preview panel is defined by `data-tc="preview-panel"`.

```js
window.tcFileUploader({
    path: '#uploader-1',
});
```

## API

### Destroy
```js
// destroy the uploader
const api = window.tcFileUploader();
api.destroy();
```