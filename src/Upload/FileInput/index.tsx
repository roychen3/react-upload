import { forwardRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import type { FileInputProps, DropFile } from '../types';
import { getFolderNameByPath } from '../utils';

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ directory, onChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;
      if (!files) {
        const fileList: DropFile[] = [];
        if (onChange) {
          onChange(fileList, event);
        }
        return;
      }

      const fileList: DropFile[] = Array.from(files).map((file) => {
        const path = file.webkitRelativePath ?? '';
        return {
          uid: uuidv4(),
          file,
          path,
          folderName: getFolderNameByPath(path),
        };
      });
      if (onChange) {
        onChange(fileList, event);
      }
    };

    return (
      <input
        data-testid="upload-input"
        value=""
        type="file"
        ref={ref}
        style={{ display: 'none' }}
        onChange={handleChange}
        {...{ webkitdirectory: directory ? 'true' : undefined }}
        {...props}
      />
    );
  }
);
FileInput.displayName = 'FileInput';

export default FileInput;
