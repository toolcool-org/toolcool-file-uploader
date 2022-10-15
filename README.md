# Tool Cool File Uploader

## Features
- drag and drop and file input callback
- plugins system
- image preview plugin
- customizable layout and css
- typescript based
- file (and image) client side validations: allowed extension validation,  mime-type validations, file size validation, image width / height validation
- supports multiple uploaders per page
- customizable HTML layout
- can be used with any CSS framework or without it

## Usage
- Upload panel is defined by `data-tc="upload-panel"`.
- Preview panel is defined by `data-tc="preview-panel"`.

```js
window.tcFileUploader({
    path: '#uploader-1',
});
```

## Upload with Image Preview

```html
<div class="tc-file-uploader" id="uploader-1">

    <!-- upload panel -->
    <div data-tc="upload-panel">
        <div class="tc-upload-panel__inputs">
            <label>
                <input type="file" class="hidden" />
                <span class="tcfu__btn">Choose File</span>
            </label>

            <span>or drag it here.</span>
        </div>
    </div>

    <!-- preview panel -->
    <div data-tc="preview-panel" class="hidden">
        <div data-tc="preview"></div>
        <div data-tc="buttons">
            <button type="button" class="tcfu__btn" data-tc="upload-btn">Save</button>
            <button type="button" class="tcfu__btn" data-tc="cancel-preview-btn">Cancel</button>
        </div>
    </div>
</div>

<script src="toolcool-file-uploader.min.js"></script>
<script>
    window.tcFileUploader({
        path: '#uploader-1',
        uploadCallback: (data) => {
          alert(`The user clicked 'save' button: ${ data.file.name }`);
        },
    });
</script>
```

## API

### Destroy
```js
// destroy the uploader
const api = window.tcFileUploader();
api.destroy();
```