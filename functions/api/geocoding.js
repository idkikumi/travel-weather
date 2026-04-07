export async function onRequest(context) {
  const url = new URL(context.request.url);
  const params = url.searchParams;

  const apiUrl = 'https://geocoding-api.open-meteo.com/v1/search?' + params.toString();

  try {
    const response = await fetch(new Request(apiUrl, {
      headers: { 'User-Agent': 'travel-weather-app' },
    }));
    const data = await response.text();

    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: true, reason: e.message }), {
      status: 502,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
