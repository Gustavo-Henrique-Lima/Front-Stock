import { httpClient } from './client';

type TokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;
};

export async function loginRequest(username: string, password: string): Promise<TokenResponse> {
  const body = new URLSearchParams({
    username,
    password,
    grant_type: 'password',
  });

  const clientId = import.meta.env.VITE_OAUTH_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('OAuth client credentials not configured');
  }

  const basicAuth = btoa(`${clientId}:${clientSecret}`);

  const response = await httpClient.post<TokenResponse>('/oauth2/token', body, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${basicAuth}`,
    },
  });

  return response.data;
}
