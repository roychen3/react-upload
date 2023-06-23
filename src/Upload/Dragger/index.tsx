import React, { useRef } from 'react';

import type { DraggerProps } from '../types';
import { getDropFile } from '../utils';
import FileInput from '../FileInput';

const Dragger = ({
  multiple,
  directory,
  clickable = true,
  disabled = false,
  children,
  onChange,
  onDrop,
  onDragEnter,
  onDragLeave,
  onDragEnd,
  ...props
}: DraggerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isDragEnter = useRef(false);

  const handleDrop = async (event: React.DragEvent) => {
    if (!disabled) {
      event.preventDefault();
      isDragEnter.current = false;
      if (onDrop) {
        onDrop(event);
      }
      if (onChange) {
        const fileList = await getDropFile(event.dataTransfer.items);
        onChange(fileList);
      }
    }
  };
  const handleDragEnter = (event: React.DragEvent) => {
    if (!disabled) {
      event.preventDefault();

      if (onDragEnter && !isDragEnter.current) {
        isDragEnter.current = true;
        onDragEnter(event);
      }
    }
  };
  const handleDragLeave = (event: React.DragEvent) => {
    if (!disabled) {
      event.preventDefault();
      const toNode = event.relatedTarget as Node;
      const isLeave = !event.currentTarget.contains(toNode);

      if (onDragLeave && isLeave) {
        isDragEnter.current = false;
        onDragLeave(event);
      }
    }
  };
  const handleDragOver = (event: React.DragEvent) => {
    if (!disabled) {
      event.preventDefault();
    }
  };
  const handleDragClick = () => {
    if (!disabled && clickable) {
      inputRef.current?.click();
    }
  };

  return (
    <div
      onClick={handleDragClick}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragEnd={onDragEnd}
      data-testid="dragger"
      {...props}
    >
      <FileInput
        ref={inputRef}
        multiple={multiple}
        directory={directory}
        onChange={onChange}
        disabled={disabled}
      />
      {children}
    </div>
  );
};

export default Dragger;
