/**
 * @function isJsonResponse
 * @description 주어진 Response 객체의 Content-Type 헤더가 'application/json'을 포함하는지 확인합니다.
 *
 * @param {Response} res — 확인할 Response 객체입니다. 반드시 유효한 Response 객체를 전달해야 합니다.
 * @returns {boolean} — Content-Type 헤더가 'application/json'을 포함하면 true를, 그렇지 않으면 false를 반환합니다.
 *
 * @example
 * // JSON 응답인 경우
 * const response = new Response('', { headers: { 'Content-Type': 'application/json' } });
 * console.log(isJsonResponse(response)); // true
 *
 * @example
 * // JSON 응답이 아닌 경우
 * const response = new Response('', { headers: { 'Content-Type': 'text/html' } });
 * console.log(isJsonResponse(response)); // false
 *
 * @see https://developer.mozilla.org/ko/docs/Web/API/Response
 * @see https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Content-Type
 */
export function isJsonResponse(res: Response): boolean {
  const ct = res.headers.get('Content-Type') || '';
  return ct.includes('application/json');
}

/**
 * @function safeParseJSON
 * @description 주어진 Response 객체를 JSON 형식으로 안전하게 파싱합니다. 적절한 Content-Type이
 * 설정되지 않았더라도 JSON 파싱을 시도하며, 실패 시 관련 오류를 발생시킵니다.
 *
 * @param {Response} res — JSON 데이터가 포함된 Response 객체입니다. 필수 입력값입니다.
 * @template T — 반환되는 JSON 객체의 타입을 제네릭으로 지정합니다.
 * @returns {Promise<T>} — 파싱된 JSON 객체를 반환합니다.
 * @throws {Error} — Response의 Content-Type이 예상과 다르거나, JSON 파싱에 실패한 경우 발생합니다.
 *                  에러 메시지에는 상태 코드가 포함됩니다.
 *
 * @example
 * // 성공적으로 JSON 응답을 파싱하는 예제
 * const response = await fetch('/api/data');
 * const data = await safeParseJSON<{ id: number; name: string }>(response);
 * console.log(data.id, data.name); // 출력: 123 'example'
 *
 * @example
 * // Content-Type이 JSON이 아닌 경우 에러를 발생시키는 예제
 * const response = await fetch('/api/text');
 * try {
 *   const data = await safeParseJSON<string>(response);
 * } catch (error) {
 *   console.error(error.message); // 출력: "Unexpected content-type. Expected JSON. Status=200"
 * }
 *
 * @see https://developer.mozilla.org/ko/docs/Web/API/Response/json
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON
 */
export async function safeParseJSON<T>(res: Response): Promise<T> {
  if (!isJsonResponse(res)) {
    const txt = await res.text();
    try {
      return JSON.parse(txt) as T;
    } catch {
      throw new Error(`Unexpected content-type. Expected JSON. Status=${res.status}`);
    }
  }
  return (await res.json()) as T;
}
