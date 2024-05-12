import { API_URL } from "@/app/utils/contans";
import axios from "axios";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  let response;

  try {
    response = await axios.post(
      `${API_URL}/auth/login`,
      JSON.stringify({
        username,
        password,
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
  //create a cookie session
  const { token, expiresIn } = response.data;

  const cookie = `token=${token}; Max-Age=${expiresIn}; Path=/; HttpOnly; SameSite=Lax; Secure`;

  return Response.json(response.data, {
    status: 200,
    headers: { "Set-Cookie": cookie },
  });
}
