import crypto from 'crypto';
import { cookies } from 'next/headers';

const SESSION_SECRET = process.env.SESSION_SECRET || 'consilio-super-secure-zebra-key-2026-v1';
const COOKIE_NAME = 'consilio_admin_session';

export interface AdminSessionUser {
  username: string;
  email: string;
  role: string;
  name: string;
}

// Server-side retrieval of configured admin credentials from environment variables
export function getAdminCredentials() {
  const username = (process.env.ADMIN_USERNAME || 'admin').trim();
  const password = process.env.ADMIN_PASSWORD || 'consilio2026!';
  const email = (process.env.ADMIN_EMAIL || `${username}@consilio.com`).trim();
  return { username, password, email };
}

// Timing-safe verification of entered credentials against configured environment variables
export function verifyAdminCredentials(inputIdentifier: string, inputPassword: string): boolean {
  if (!inputIdentifier || !inputPassword) return false;

  const { username, password, email } = getAdminCredentials();

  // Identifier match: check against configured username or email (case-insensitive)
  const cleanInput = inputIdentifier.trim().toLowerCase();
  const validUsername = username.toLowerCase();
  const validEmail = email.toLowerCase();

  const isUserMatch = cleanInput === validUsername || cleanInput === validEmail;
  if (!isUserMatch) {
    return false;
  }

  // Password match verification:
  // 1. Check if ADMIN_PASSWORD_HASH is configured
  const configuredHash = process.env.ADMIN_PASSWORD_HASH;
  if (configuredHash && configuredHash.includes(':')) {
    return verifyPassword(inputPassword, configuredHash);
  }

  // 2. Check if ADMIN_PASSWORD is a pbkdf2 hash formatted as "salt:hash"
  if (password.includes(':') && password.split(':').length === 2 && password.split(':')[0].length === 32) {
    return verifyPassword(inputPassword, password);
  }

  // 3. Timing-safe constant-time comparison against configured password string
  const inputBuffer = Buffer.from(inputPassword);
  const expectedBuffer = Buffer.from(password);

  if (inputBuffer.length !== expectedBuffer.length) {
    return false;
  }

  try {
    return crypto.timingSafeEqual(inputBuffer, expectedBuffer);
  } catch {
    return false;
  }
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, originalHash] = storedHash.split(':');
    if (!salt || !originalHash) return false;
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(originalHash, 'hex'));
  } catch {
    return false;
  }
}

export function generateSessionToken(payload: { email: string; username?: string; role: string; name: string }): string {
  const data = JSON.stringify({
    email: payload.email,
    username: payload.username || payload.email.split('@')[0] || 'admin',
    role: payload.role || 'superadmin',
    name: payload.name || 'Administrator',
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  });
  const encoded = Buffer.from(data).toString('base64url');
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(encoded).digest('base64url');
  return `${encoded}.${signature}`;
}

export function verifySessionToken(token: string): AdminSessionUser | null {
  try {
    const [encoded, signature] = token.split('.');
    if (!encoded || !signature) return null;
    const expectedSignature = crypto.createHmac('sha256', SESSION_SECRET).update(encoded).digest('base64url');
    if (signature !== expectedSignature) return null;

    const decoded = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'));
    if (decoded.exp && Date.now() > decoded.exp) {
      return null;
    }
    return {
      username: decoded.username || decoded.email?.split('@')[0] || 'admin',
      email: decoded.email,
      role: decoded.role || 'superadmin',
      name: decoded.name || 'Administrator',
    };
  } catch {
    return null;
  }
}

export async function getCurrentAdmin(): Promise<AdminSessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export { COOKIE_NAME };
