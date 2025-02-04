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
    let count = 1;
    const mockFirst100Entries = [
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
      // rest other 98 file...
    ];
    const mockSecond100Entries = [
      {
        isFile: true,
        fullPath: `/folder B/${mockHelloFile.name}`,
        file: (callback: (file: File) => void) => {
          callback(mockHelloFile);
        },
      },
      {
        isFile: true,
        fullPath: `/folder B/${mockTherefile.name}`,
        file: (callback: (file: File) => void) => {
          callback(mockTherefile);
        },
      },
      // rest other 98 file...
    ];
    const getCurrentEntries = () => {
      switch (count) {
        case 1:
          return mockFirst100Entries;
        case 2:
          return mockSecond100Entries;

        default:
          return [];
      }
    };
    return {
      readEntries: (callback: (entries: any) => void) => {
        callback(getCurrentEntries());
        count += 1;
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
