export const callFetch = async <T extends Record<string, string | boolean | number>>(
  url: string,
  payload: T,
  options: RequestInit,
) => {
  const response = await fetch(`${process.env.API_SERVER_URL}${url}`, {
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!response.ok) throw new Error(response.statusText);
};

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
