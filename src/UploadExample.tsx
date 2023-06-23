import { useState } from 'react';
import Upload from './Upload';
import type { DropFile } from './Upload/types';

const UploadExample = () => {
  const [uploadFile, setUploadFile] = useState<DropFile>();
  const [uploadFiles, setUploadFiles] = useState<DropFile[]>([]);
  const [uploadDirectory, setUploadDirectory] = useState<DropFile[]>([]);

  return (
    <div>
      <div>
        <Upload
          onChange={(fileList) => {
            console.log(fileList);
            setUploadFile(fileList[0]);
          }}
        >
          <button>Upload File</button>
        </Upload>
        <p>file: {uploadFile?.file.name}</p>
      </div>

      <br />
      <br />
      <hr />
      <br />

      <div>
        <Upload
          onChange={(fileList) => {
            setUploadFiles(fileList);
          }}
          multiple
        >
          <button>Upload Files</button>
        </Upload>
        <div>
          files:
          {uploadFiles.map((uploadFile) => (
            <p key={uploadFile.uid}>{uploadFile.file.name}</p>
          ))}
        </div>
      </div>

      <br />
      <br />
      <hr />
      <br />

      <div>
        <Upload
          directory
          onChange={(fileList) => {
            setUploadDirectory(fileList);
          }}
        >
          <button>Upload Directory</button>
        </Upload>
        <div>
          files:
          {uploadDirectory.map((uploadFile) => (
            <p key={uploadFile.uid}>{uploadFile.file.name}</p>
          ))}
        </div>
      </div>

    </div>
  );
};

export default UploadExample;
