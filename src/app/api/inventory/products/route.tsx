import { API_URL } from "@/app/utils/contans";
import axios from "axios";

export async function POST(req: Request) {
  const getCookies = req.headers.get("cookie");
  const token = getCookies?.split("token=")[1];
  const body = await req.json();
  let response;
  try {
    response = await axios.post(`${API_URL}/product/bulk`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return new Response((error as any)?.response?.data, { status: 401 });
  }

  return Response.json(response.data, {
    status: 200,
  });
}
