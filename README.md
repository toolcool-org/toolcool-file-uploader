# Tool Cool File Uploader

## Features
- upload one or more files with possibility to validate / remove them.
- drag and drop and file input callback
- plugins system
- image preview plugin
- customizable layout and css
- typescript based
- file (and image) client side validations: allowed extension validation,  mime-type validations, file size validation, image width / height validation
- supports multiple uploaders per page
- customizable HTML layout
- can be used with any CSS framework or without it
- image preview plugin
- multi image preview plugin with possibility to remove images
- * means any extension is supported
- multi pdf viewer

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