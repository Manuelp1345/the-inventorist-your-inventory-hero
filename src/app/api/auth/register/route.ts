import { API_URL } from "@/app/utils/contans";
import axios from "axios";

export async function POST(req: Request) {
  const { username, password, email } = await req.json();
  let response;

  try {
    response = await axios.post(
      `${API_URL}/auth/register`,
      JSON.stringify({
        username,
        password,
        email,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response((error as any)?.response?.data, { status: 401 });
  }

  return Response.json(response.data, {
    status: 200,
  });
}
