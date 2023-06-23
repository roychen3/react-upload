export const mockHelloFile = new File(['hello'], 'hello.png', {
  type: 'image/png',
});

export const mockTherefile = new File(['there'], 'there.png', {
  type: 'image/png',
});

export const mockFileEntry = {
  isFile: true,
  fullPath: '',
  file: (callback: (file: File) => void) => {
    callback(mockHelloFile);
  },
};

export const mockDirectoryEntry = {
  isDirectory: true,
  createReader: () => {
    return {
      readEntries: (callback: (entries: any) => void) => {
        const mockEntries = [
          {
            isFile: true,
            fullPath: `/folder A/${mockHelloFile.name}`,
            file: (callback: (file: File) => void) => {
              callback(mockHelloFile);
            },
          },
          {
            isFile: true,
            fullPath: `/folder A/${mockTherefile.name}`,
            file: (callback: (file: File) => void) => {
              callback(mockTherefile);
            },
          },
        ];
        callback(mockEntries);
      },
    };
  },
};

export const mockDataTransfer = {
  items: [
    {
      webkitGetAsEntry: () => {
        return mockFileEntry;
      },
    },
    {
      webkitGetAsEntry: () => {
        return mockDirectoryEntry;
      },
    },
  ],
};
