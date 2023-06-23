# react-upload

Upload file

[DEMO](https://roychen3.github.io/react-upload/)

## Getting Started

```bash
npm run start
```

## Installation

node v16.15.0

```bash
npm install
```

## Usage

### Upload

```javascript
import Upload from './Upload';

function Component() {
  return (
        <Upload
          multiple  // boolean | undefined;
          directory // boolean | undefined;
          disabled  // boolean | undefined;
          onChange  // (fileList: DropFile[], event: React.ChangeEvent<HTMLInputElement>) => void | undefined;
          children  // ReactNode;
        >
          <button>Upload File</button>
        </Upload>
  );
}
```

### Dragger

```javascript
import Upload from './Upload';
const { Dragger } = Upload;

function Component() {
  return (
      <Dragger
        multiple // boolean | undefined ;
        directory // boolean | undefined ;
        clickable // boolean | undefined ;
        disabled // boolean | undefined ;
        onChange // (fileList: DropFile[], event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => void | undefined ;
        onDrop // (event: React.DragEvent) => void | undefined ;
        onDragEnter // (event: React.DragEvent) => void | undefined ;
        onDragLeave // (event: React.DragEvent) => void | undefined ;
        onDragEnd // (event: React.DragEvent) => void | undefined ;
        children // ReactNode;
      >
        <div>
          <h3>Click or drag file to this area to upload</h3>
        </div>
      </Dragger>
  );
}
```

## License

[LICENSE](LICENSE)
