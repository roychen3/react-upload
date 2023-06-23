import { v4 as uuidv4 } from 'uuid';

import type { DropFile } from '../types';

export function getFolderNameByPath(path: string): string {
  return path.split('/')[0];
}

export function traverseFileTree(entry: FileSystemEntry): Promise<DropFile[]> {
  return new Promise((resolve) => {
    if (entry.isFile) {
      const fileEntry = entry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        const formatPath = entry.fullPath.replace('/', '');
        const path = formatPath.split('/').length > 1 ? formatPath : '';
        resolve([
          { uid: uuidv4(), file, path, folderName: getFolderNameByPath(path) },
        ]);
      });
    } else if (entry.isDirectory) {
      const directoryEntry = entry as FileSystemDirectoryEntry;
      const dirReader = directoryEntry.createReader();
      dirReader.readEntries(async (entries) => {
        const resultPromises = entries.map((entry) => traverseFileTree(entry));
        const promiseAllResult = await Promise.all(resultPromises);
        const result = promiseAllResult.reduce<DropFile[]>(
          (prevValue, current) => {
            return [...prevValue, ...current];
          },
          []
        );
        resolve(result);
      });
    }
  });
}

export async function getDropFile(
  items: DataTransferItemList
): Promise<DropFile[]> {
  const traverseFileTreePromises = Array.from(items).map((item) => {
    const entry = item.webkitGetAsEntry();
    if (entry) {
      return traverseFileTree(entry);
    }
  });
  const promisesFile = traverseFileTreePromises.filter(
    (promise): promise is Promise<DropFile[]> => promise !== undefined
  );
  const promiseAllResult = await Promise.all(promisesFile);
  const result = promiseAllResult.reduce((prevValue, current) => {
    return [...prevValue, ...current];
  }, []);
  return result;
}
