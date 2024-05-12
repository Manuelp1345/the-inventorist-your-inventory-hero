import { API_URL } from "@/app/utils/contans";
import axios from "axios";

export async function POST(req: Request) {
  const { email } = await req.json();
  let response;

  try {
    response = await axios.post(
      `${API_URL}/auth/reset-password`,
      JSON.stringify({
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

export async function PATCH(req: Request) {
  const { id, password, token } = await req.json();

  let response;

  try {
    response = await axios.post(
      `${API_URL}/auth/change-password`,
      JSON.stringify({
        id,
        password,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
