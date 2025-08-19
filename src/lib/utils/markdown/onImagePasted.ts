import { ClipboardEvent, DragEvent } from 'react';
import { toast } from 'sonner';
import { uploadImageAction } from '@/actions/updatePresent';

/**
 * @function insertToTextArea
 * @description 지정된 문자열을 현재 텍스트 영역의 커서 위치에 삽입합니다.
 *
 * @param {string} insertString — 텍스트 영역에 삽입할 문자열입니다. 필수 입력값입니다.
 * @returns {string | null} — 삽입 후의 전체 텍스트를 반환합니다. 텍스트 영역 요소가 없을 경우 null을 반환합니다.
 * @throws {TypeError} — insertString이 문자열이 아닌 경우 발생합니다.
 *
 * @example
 * // 텍스트 영역이 아래와 같은 상태인 경우:
 * // "Hello |World"
 * // (|은 커서 위치를 나타냄)
 *
 * const updatedText = insertToTextArea('My ');
 * // 결과: "Hello My World"
 *
 * @example
 * // 텍스트 영역이 없는 경우
 * const result = insertToTextArea('test');
 * // 결과: null
 *
 * @see https://developer.mozilla.org/ko/docs/Web/API/HTMLTextAreaElement
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String
 */
const insertToTextArea = (insertString: string) => {
  const textarea = document.querySelector('textarea');
  if (!textarea) {
    return null;
  }

  let sentence = textarea.value;
  const len = sentence.length;
  const pos = textarea.selectionStart;
  const end = textarea.selectionEnd;

  const front = sentence.slice(0, pos);
  const back = sentence.slice(pos, len);

  sentence = front + insertString + back;

  textarea.value = sentence;
  textarea.selectionEnd = end + insertString.length;

  return sentence;
};

/**
 * @function onImagePasted
 * @description 사용자가 클립보드 붙여넣기 또는 드래그 앤 드롭을 통해 이미지를 업로드하고,
 * 업로드된 이미지를 기반으로 Markdown 포맷을 업데이트합니다.
 *
 * @param {ClipboardEvent<HTMLDivElement> | DragEvent<HTMLDivElement>} event
 * — 클립보드 붙여넣기 또는 드래그 앤 드롭 이벤트 객체입니다.
 * @param {DataTransfer} dataTransfer — 이벤트에서 전달된 DataTransfer 객체로,
 * 업로드할 파일의 데이터를 포함합니다.
 * @param {string} uri — 업로드 작업과 연관된 고유 URI입니다. 필수 값이며, 빈 문자열일 경우
 * 경고 메시지가 표시됩니다.
 * @param {(value: string) => void} setMarkdown — 업데이트된 Markdown 포맷의
 * 문자열을 처리하는 콜백 함수입니다.
 *
 * @returns {Promise<void>} — 함수는 비동기로 실행되며 반환값이 없습니다.
 *
 * @throws {Error} — 다음 경우에 예외를 발생시킬 수 있습니다:
 * 1. `uri`가 빈 문자열일 경우, 경고 알림이 표시되고 작업이 중단됩니다.
 * 2. 이미지 업로드 작업 중 문제가 발생하면 Error가 발생합니다.
 *
 * @example
 * // 클립보드 붙여넣기로 이미지를 업로드하고 Markdown을 업데이트하는 경우
 * const handleImagePaste = async (event) => {
 *   const dataTransfer = event.clipboardData || event.dataTransfer;
 *   const uri = 'unique-work-uri';
 *   await onImagePasted(event, dataTransfer, uri, (updatedMarkdown) => {
 *     console.log(updatedMarkdown);
 *   });
 * };
 *
 * @example
 * // 드래그 앤 드롭으로 이미지 업로드 처리
 * const handleImageDrop = async (event) => {
 *   event.preventDefault();
 *   const dataTransfer = event.dataTransfer;
 *   const uri = 'unique-work-uri';
 *   await onImagePasted(event, dataTransfer, uri, (updatedMarkdown) => {
 *     console.log(updatedMarkdown);
 *   });
 * };
 *
 * @see https://developer.mozilla.org/ko/docs/Web/API/DataTransfer
 * @see https://developer.mozilla.org/ko/docs/Web/API/ClipboardEvent
 */
export const onImagePasted = async (
  event: ClipboardEvent<HTMLDivElement> | DragEvent<HTMLDivElement>,
  dataTransfer: DataTransfer,
  uri: string,
  setMarkdown: (value: string) => void,
) => {
  const files: File[] = [];
  for (let index = 0; index < dataTransfer.items.length; index += 1) {
    const file = dataTransfer.files.item(index);

    if (file) {
      event.preventDefault();
      files.push(file);
      if (uri === '') {
        toast.error('작업을 먼저 시작해주세요!');
        return;
      }
    }
  }
  let result: string[] = [];
  await Promise.allSettled(
    files.map(async (file) => {
      result = await uploadImageAction({ file, num: files.length, uri });
    }),
  );
  result.forEach((route: string) => {
    const insertedMarkdown = insertToTextArea(`![](${process.env.NEXT_PUBLIC_IMAGE_URL}/${route})`);
    if (!insertedMarkdown) {
      return;
    }
    setMarkdown(insertedMarkdown);
  });
};
