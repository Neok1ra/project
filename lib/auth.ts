export interface User {
  id: number
  name: string
  email: string
  grade: string
  school: string
  district: string
}

export function verifyToken(token: string): { userId: number; email: string } | null {
  try {
    if (!token || token.length < 10) {
      return null
    }

    // For demo purposes, decode a simple base64 token
    const decoded = JSON.parse(atob(token))
    if (decoded.userId && decoded.email) {
      return decoded
    }
    return null
  } catch (error) {
    return null
  }
}

export function createToken(userId: number, email: string): string {
  const payload = { userId, email, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }
  return btoa(JSON.stringify(payload))
}

export function getTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get("authorization")
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7)
  }
  return null
}
