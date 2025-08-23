import { ensureValidTokenForAction } from '@/lib/dal/action';
import { redirect } from '@/i18n/navigation';
import { cookies } from 'next/headers';
import { Locale } from '@/i18n/routing';

/**
 * @function fileUpload
 * @description 파일 데이터를 서버에 업로드합니다.
 *
 * @param {File[]|File} payload — 업로드할 파일 또는 파일 배열입니다.
 *   단일 파일 객체 또는 다중 파일 객체 배열을 입력받습니다. (필수)
 * @param {string} [uri] — 업로드 경로에 추가할 선택적 URI 정보입니다.
 *   포함된 공백은 밑줄(_)로, 괄호는 '<', '>'로 대체됩니다. (선택)
 * @param {number} [num=1] — 업로드 요청의 수량 정보를 나타내는 선택적 숫자입니다.
 *   기본값은 1입니다. (선택)
 *
 * @returns {Promise<string[]>} — 서버로부터 응답받은 업로드 결과의 JSON 데이터를
 *   문자열 배열 형태로 반환합니다.
 *
 * @throws {Error} — 사용자의 인증 토큰이 유효하지 않을 경우 인증 페이지로 리다이렉트합니다.
 *
 * @see https://developer.mozilla.org/ko/docs/Web/API/FormData
 * @see https://developer.mozilla.org/ko/docs/Web/API/Fetch_API
 */
export const fileUpload = async (payload: File[] | File, uri?: string, num?: number): Promise<string[]> => {
  const locale: Locale = ((await cookies()).get('NEXT_LOCALE')?.value as Locale) ?? 'ko';
  const tokenResult = await ensureValidTokenForAction();
  if (!tokenResult.success) redirect({ href: '/sign/in?toast=loginRequired', locale });
  const formData = new FormData();

  if (payload instanceof Array) payload.forEach((file, index) => formData.append(`file-${index}`, file));
  else formData.append('file', payload);

  if (uri) formData.append('uri', `${uri.replaceAll(' ', '_').replaceAll('(', '<').replaceAll(')', '>')}/`);
  formData.append('num', num ? String(num) : '1');
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  const result = await fetch(`${process.env.API_SERVER_URL.split('/time')[0]}/upload/timeline`, {
    body: formData,
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (result.status === 401) redirect({ href: '/sign/in?toast=loginRequired', locale });
  return result.json();
};
