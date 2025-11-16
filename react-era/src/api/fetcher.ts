import axios from "axios";

export async function getJsonLd<T = any>(url: string): Promise<T> {
  const res = await axios.get(url, {
    headers: {
      Accept: "application/ld+json, application/json",
    },
  });
  return res.data as T;
}