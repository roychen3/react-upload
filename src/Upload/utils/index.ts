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
      const readEntries = (): Promise<DropFile[]> => {
        return new Promise((readEntriesResolve) => {
          dirReader.readEntries(async (entries) => {
            if (entries.length > 0) {
              const resultPromises = entries.map((entry) =>
                traverseFileTree(entry)
              );
              const promiseAllResult = await Promise.all(resultPromises);
              const result = promiseAllResult.reduce<DropFile[]>(
                (prevValue, current) => {
                  return [...prevValue, ...current];
                },
                []
              );

              // Recursively call readEntries() again.
              //
              // On Chrome 77, readEntries() will only return the first 100 FileSystemEntry instances.
              // In order to obtain all of the instances, readEntries() must be called multiple times.
              // See: https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryReader/readEntries#browser_compatibility
              const nestedResult = await readEntries();
              readEntriesResolve([...result, ...nestedResult]);
            } else {
              readEntriesResolve([]);
            }
          });
        });
      };
      readEntries().then(resolve);
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
