import { useRef } from 'react';
import type { UploadProps } from './types';
import FileInput from './FileInput';
import Dragger from './Dragger';

const Upload = ({ multiple, directory, onChange, children }: UploadProps) => {
  const uploadRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    uploadRef.current?.click();
  };

  return (
    <div onClick={onClick} data-testid="upload">
      <FileInput
        ref={uploadRef}
        multiple={multiple}
        directory={directory}
        onChange={onChange}
      />
      {children}
    </div>
  );
};

Upload.Dragger = Dragger;
export default Upload;
