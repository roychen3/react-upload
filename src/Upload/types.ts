import React, { ReactNode } from 'react';

export type DropFile = {
  uid: string;
  file: File;
  path: string;
  folderName: string;
};

export interface FileInputProps
  extends Omit<
    React.HTMLAttributes<HTMLInputElement>,
    'onChange' | 'type' | 'ref' | 'style'
  > {
  multiple?: boolean;
  directory?: boolean;
  onChange?: (
    fileList: DropFile[],
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

type DraggerHTMLProps = Omit<
  React.HTMLProps<HTMLDivElement>,
  | 'multiple'
  | 'directory'
  | 'clickable'
  | 'disabled'
  | 'children'
  | 'onChange'
  | 'onDrop'
  | 'onDragEnter'
  | 'onDragLeave'
  | 'onDragEnd'
>;
export interface DraggerProps extends DraggerHTMLProps {
  multiple?: boolean;
  directory?: boolean;
  clickable?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onChange?: (
    fileList: DropFile[],
    event?: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onDrop?: (event: React.DragEvent) => void;
  onDragEnter?: (event: React.DragEvent) => void;
  onDragLeave?: (event: React.DragEvent) => void;
  onDragEnd?: (event: React.DragEvent) => void;
}

export interface UploadProps {
  multiple?: boolean;
  directory?: boolean;
  children: ReactNode;
  onChange?: (
    fileList: DropFile[],
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}
