import type { VercelRequest, VercelResponse } from '@vercel/node';
import { request as httpRequest  } from 'node:http'

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (!request.url) return response.status(400);
 
  const url = new URL(request.url, `http://120.24.177.95:8100`)

  const r = httpRequest(url, {
    headers: {
      ...request.headers,
      Host: url.hostname
    },
    method: request.method
  })
  r.pipe(response)
}