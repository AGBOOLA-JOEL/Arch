export async function login(
  username: string,
  password: string
): Promise<Response> {
  // Replace with your actual backend API endpoint
  return fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
}

export async function refresh(refreshToken: string): Promise<Response> {
  // Replace with your actual backend API endpoint
  return fetch(
    `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/auth/token/refresh`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    }
  );
}
