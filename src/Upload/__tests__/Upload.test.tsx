import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Upload from '../index';
import { mockHelloFile, mockTherefile } from '../__mocks__/mockData';

describe('Component: Upload', () => {
  test('props: onChange', async () => {
    const onChange = jest.fn();
    render(
      <Upload onChange={onChange}>
        <button data-testid="upload-button">Upload</button>
      </Upload>
    );

    const uploadInput = screen.getByTestId('upload-input');
    fireEvent.change(uploadInput, { target: { files: null } });
    const testOneCallback = onChange.mock.calls[0][0];
    expect(testOneCallback).toStrictEqual([]);

    fireEvent.change(uploadInput, {
      target: {
        files: [mockHelloFile],
      },
    });
    const testTwoCallback = onChange.mock.calls[1][0];
    const expectTwoCallback = [
      {
        uid: testTwoCallback[0].uid,
        file: mockHelloFile,
        path: '',
        folderName: '',
      },
    ];
    expect(testTwoCallback).toStrictEqual(expectTwoCallback);
  });

  test('props: onChange with directory', async () => {
    Object.defineProperty(mockHelloFile, 'webkitRelativePath', {
      value: 'folder a/',
    });
    Object.defineProperty(mockHelloFile, 'size', { value: 1024 });
    Object.defineProperty(mockTherefile, 'webkitRelativePath', {
      value: 'folder b/',
    });
    Object.defineProperty(mockTherefile, 'size', { value: 1024 * 1024 * 10 });
    const files = [mockHelloFile, mockTherefile];
    const onChange = jest.fn();
    render(
      <Upload onChange={onChange} directory>
        <button data-testid="upload-button">Upload</button>
      </Upload>
    );

    const uploadInput = screen.getByTestId('upload-input');
    fireEvent.change(uploadInput, {
      target: {
        files: files,
      },
    });
    const testCallback = onChange.mock.calls[0][0];
    const expectCallback = [
      {
        uid: testCallback[0].uid,
        file: mockHelloFile,
        path: 'folder a/',
        folderName: 'folder a',
      },
      {
        uid: testCallback[1].uid,
        file: mockTherefile,
        path: 'folder b/',
        folderName: 'folder b',
      },
    ];
    expect(testCallback).toStrictEqual(expectCallback);
  });

  test('click button to open upload dialog', async () => {
    render(
      <Upload>
        <button data-testid="upload-button">Upload</button>
      </Upload>
    );

    const uploadInput = screen.getByTestId('upload-input');
    uploadInput.click = jest.fn();
    const uploadButton = screen.getByTestId('upload-button');
    await userEvent.click(uploadButton);
    expect(uploadInput.click).toHaveBeenCalledTimes(1);
  });
});
