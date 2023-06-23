import { getFolderNameByPath, getDropFile, traverseFileTree } from '../utils';
import {
  mockHelloFile,
  mockTherefile,
  mockFileEntry,
  mockDirectoryEntry,
  mockDataTransfer,
} from '../__mocks__/mockData';

describe('Component: Upload utils', () => {
  test('getFolderNameByPath', async () => {
    expect(getFolderNameByPath('')).toBe('');
    expect(getFolderNameByPath('folder A/index.html')).toBe('folder A');
    expect(getFolderNameByPath('/folder A/index.html')).toBe('');
  });

  test('traverseFileTree: file entry case', async () => {
    const entry: any = mockFileEntry;
    const result = await traverseFileTree(entry);
    const expectValue = [
      {
        uid: result[0].uid,
        file: mockHelloFile,
        path: '',
        folderName: '',
      },
    ];
    expect(result).toStrictEqual(expectValue);
  });

  test('traverseFileTree: directory entry case', async () => {
    const entry: any = mockDirectoryEntry;
    const result = await traverseFileTree(entry);
    const expectValue = [
      {
        uid: result[0].uid,
        file: mockHelloFile,
        path: `folder A/${mockHelloFile.name}`,
        folderName: 'folder A',
      },
      {
        uid: result[1].uid,
        file: mockTherefile,
        path: `folder A/${mockTherefile.name}`,
        folderName: 'folder A',
      },
    ];
    expect(result).toStrictEqual(expectValue);
  });

  test('getDropFile', async () => {
    const items: any = mockDataTransfer.items;
    const result = await getDropFile(items);
    const expectValue = [
      {
        uid: result[0].uid,
        file: mockHelloFile,
        path: '',
        folderName: '',
      },
      {
        uid: result[1].uid,
        file: mockHelloFile,
        path: `folder A/${mockHelloFile.name}`,
        folderName: 'folder A',
      },
      {
        uid: result[2].uid,
        file: mockTherefile,
        path: `folder A/${mockTherefile.name}`,
        folderName: 'folder A',
      },
    ];
    expect(result).toStrictEqual(expectValue);
  });
});
