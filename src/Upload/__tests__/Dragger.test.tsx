import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Upload from '../index';
import {
  mockHelloFile,
  mockTherefile,
  mockDataTransfer,
} from '../__mocks__/mockData';

const { Dragger } = Upload;

describe('Component: Dragger', () => {
  test('props: onDragEnter, onDragLeave', async () => {
    const onDragEnter = jest.fn();
    const onDragLeave = jest.fn();
    render(
      <Dragger onDragEnter={onDragEnter} onDragLeave={onDragLeave}>
        <div data-testid="drag-area">Drop Files Area</div>
      </Dragger>
    );

    const dragger = screen.getByTestId('dragger');
    fireEvent.dragEnter(dragger);
    fireEvent.dragOver(dragger);
    fireEvent.dragLeave(dragger);

    const dragArea = screen.getByTestId('drag-area');
    fireEvent.dragEnter(dragArea);
    fireEvent.dragOver(dragArea);
    fireEvent.dragLeave(dragArea);

    expect(onDragEnter).toHaveBeenCalledTimes(2);
    expect(onDragLeave).toHaveBeenCalledTimes(2);
  });

  test('props: onDrop (it should be trigger `onChange` props)', async () => {
    const onDrop = jest.fn();
    const onChange = jest.fn();
    render(
      <Dragger onDrop={onDrop} onChange={onChange}>
        <div data-testid="drag-area">Drop Files Area</div>
      </Dragger>
    );

    const dragger = screen.getByTestId('dragger');
    fireEvent.drop(dragger, {
      dataTransfer: mockDataTransfer,
    });

    const dragArea = screen.getByTestId('drag-area');
    fireEvent.drop(dragArea, {
      dataTransfer: mockDataTransfer,
    });
    expect(onDrop).toHaveBeenCalledTimes(2);
    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(2));
  });

  test('props: onChange', async () => {
    const onChange = jest.fn();
    render(
      <Dragger onChange={onChange}>
        <div data-testid="drag-area">Drop Files Area</div>
      </Dragger>
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

    const dragger = screen.getByTestId('dragger');
    fireEvent.drop(dragger, {
      dataTransfer: mockDataTransfer,
    });
    const testThreeCallback = await waitFor(() => onChange.mock.calls[2][0]);
    const expectThreeCallback = [
      {
        uid: testThreeCallback[0].uid,
        file: mockHelloFile,
        path: '',
        folderName: '',
      },
      {
        uid: testThreeCallback[1].uid,
        file: mockHelloFile,
        path: `folder A/${mockHelloFile.name}`,
        folderName: 'folder A',
      },
      {
        uid: testThreeCallback[2].uid,
        file: mockTherefile,
        path: `folder A/${mockTherefile.name}`,
        folderName: 'folder A',
      },
    ];
    expect(testThreeCallback).toStrictEqual(expectThreeCallback);
  });

  test('click area to open upload dialog', async () => {
    render(
      <Dragger>
        <div data-testid="drag-area">Drop Files Area</div>
      </Dragger>
    );

    const uploadInput = screen.getByTestId('upload-input');
    uploadInput.click = jest.fn();
    const dragArea = screen.getByTestId('drag-area');
    await userEvent.click(dragArea);
    expect(uploadInput.click).toHaveBeenCalledTimes(1);
  });
});
