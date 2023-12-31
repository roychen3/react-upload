import React, { ReactNode } from 'react';

export type DropFile = {
  uid: string;
  file: File;
  path: string;
  folderName: string;
};

export interface FileInputProps
  extends Omit<
    React.HTMLProps<HTMLInputElement>,
    'value' | 'type' | 'ref' | 'style' | 'onChange'
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
  onChange?: (
    fileList: DropFile[],
    event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => void;
  onDrop?: (event: React.DragEvent) => void;
  onDragEnter?: (event: React.DragEvent) => void;
  onDragLeave?: (event: React.DragEvent) => void;
  onDragEnd?: (event: React.DragEvent) => void;
  children: ReactNode;
}

type UploadHTMLProps = Omit<
  React.HTMLProps<HTMLDivElement>,
  'multiple' | 'directory' | 'children' | 'onChange' | 'onClick' | 'disabled'
>;
export interface UploadProps extends UploadHTMLProps {
  multiple?: boolean;
  directory?: boolean;
  disabled?: boolean;
  onChange?: (
    fileList: DropFile[],
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  children: ReactNode;
}
