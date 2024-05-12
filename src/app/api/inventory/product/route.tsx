import { API_URL } from "@/app/utils/contans";
import axios from "axios";

export async function GET(req: Request) {
  const getCookies = req.headers.get("cookie");
  const token = getCookies?.split("token=")[1];

  let response;
  try {
    response = await axios.get(`${API_URL}/product`, {
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

export async function POST(req: Request) {
  const getCookies = req.headers.get("cookie");
  const token = getCookies?.split("token=")[1];
  const body = await req.json();
  if (body.id === null) {
    delete body.id;
  }

  let response;
  try {
    response = await axios.post(`${API_URL}/product`, body, {
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

export async function PATCH(req: Request) {
  const getCookies = req.headers.get("cookie");
  const token = getCookies?.split("token=")[1];
  const body = await req.json();
  const productId = body.id;
  delete body.id;

  let response;
  try {
    response = await axios.patch(`${API_URL}/product/${productId}`, body, {
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

export async function DELETE(req: Request) {
  const getCookies = req.headers.get("cookie");
  const token = getCookies?.split("token=")[1];
  const body = await req.json();
  const productId = body.id;

  let response;
  try {
    response = await axios.delete(`${API_URL}/product/${productId}`, {
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
