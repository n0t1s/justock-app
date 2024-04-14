import { ExpoRequest, ExpoResponse } from "expo-router/server";

const API_KEY = process.env.CRYPTO_API_KEY;

export async function GET(request: ExpoRequest) {
  const limit = request.expoUrl.searchParams.get("limit") || 5;

  const response = await fetch(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=${limit}&convert=EUR`,
    {
      headers: {
        "X-CMC_PRO_API_KEY": API_KEY!,
      },
    }
  );

  const res = await response.json();
  return ExpoResponse.json(res.data);
}
