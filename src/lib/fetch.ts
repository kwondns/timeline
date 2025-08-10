// 204 응답인 경우 R=void
export function callFetch<T extends Record<string, any>>(
  url: string,
  payload: T,
  options?: RequestInit & { expectNoContent: true },
): Promise<void>;

// 콘텐츠 있는 경우
export function callFetch<T extends Record<string, any>, R>(url: string, payload: T, options?: RequestInit): Promise<R>;

export async function callFetch<T extends Record<string, string | boolean | number>, R>(
  url: string,
  payload: T,
  options: RequestInit & { expectNoContent?: boolean } = {},
): Promise<R | void> {
  const response = await fetch(`${process.env.API_SERVER_URL}${url}`, {
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || '알 수 없는 오류가 발생했습니다.');
  }
  if (response.status === 204 || options.expectNoContent) {
    return;
  }

  return (await response.json()) as R;
}

export const fileUpload = async (payload: File[] | File, uri?: string, num?: number) => {
  const formData = new FormData();

  if (payload instanceof Array) payload.forEach((file, index) => formData.append(`file-${index}`, file));
  else formData.append('file', payload);

  if (uri) formData.append('uri', `${uri.replaceAll(' ', '_').replaceAll('(', '<').replaceAll(')', '>')}/`);
  formData.append('num', num ? String(num) : '1');

  const result = await fetch(`${process.env.API_SERVER_URL.split('/time')[0]}/upload/timeline`, {
    body: formData,
    method: 'POST',
  });
  return result.json();
};
