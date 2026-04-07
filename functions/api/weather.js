export async function onRequest(context) {
  const url = new URL(context.request.url);
  const params = url.searchParams;

  const apiUrl = 'https://api.open-meteo.com/v1/forecast?' + params.toString();

  const response = await fetch(apiUrl);
  const data = await response.text();

  return new Response(data, {
    status: response.status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
