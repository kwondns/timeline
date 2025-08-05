export const callFetch = async <T extends Record<string, string | boolean | number>>(
  url: string,
  payload: T,
  options: RequestInit,
) => {
  await fetch(`${process.env.API_SERVER_URL}${url}`, {
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
};
