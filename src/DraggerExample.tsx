import { useState } from 'react';
import Upload from './Upload';
import type { DropFile } from './Upload/types';

const { Dragger } = Upload;

const DraggerExample = () => {
  const [dragIn, setDragIn] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<DropFile[]>([]);

  return (
    <div>
      <Dragger
        onChange={(fileList) => {
          setUploadFiles(fileList);
          setUploadLoading(false);
        }}
        onDragEnter={() => {
          setDragIn(true);
        }}
        onDragLeave={() => {
          setDragIn(false);
        }}
        onDrop={() => {
          setDragIn(false);
          setUploadLoading(true);
        }}
        multiple
        disabled={uploadLoading}
      >
        <div
          style={{
            borderWidth: '3px',
            borderStyle: dragIn ? 'solid' : 'dashed',
            borderColor: dragIn ? '#1677ff' : 'black',
            borderRadius: '8px',
            backgroundColor: '#eee',
          }}
        >
          <h3
            style={{
              padding: '3rem',
            }}
          >
            {dragIn ? 'Drop file' : 'Click or drag file to this area to upload'}
          </h3>
        </div>
      </Dragger>
      {uploadLoading ? (
        'loading...'
      ) : (
        <div>
          files:
          {uploadFiles.map((uploadFile) => (
            <p key={uploadFile.uid}>{uploadFile.file.name}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default DraggerExample;
