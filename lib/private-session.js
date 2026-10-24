export const SESSION_COOKIE = 'oxygen_session';
export const SESSION_SECONDS = 60 * 60 * 24 * 7;
function encode(bytes) { return btoa(String.fromCharCode(...bytes)).replaceAll('+','-').replaceAll('/','_').replaceAll('=',''); }
function decode(text) { return Uint8Array.from(atob(text.replaceAll('-','+').replaceAll('_','/')),char=>char.charCodeAt(0)); }
async function keyFor(secret, usage) { return crypto.subtle.importKey('raw',new TextEncoder().encode(secret),{name:'HMAC',hash:'SHA-256'},false,[usage]); }
export async function createSession(secret, now = Date.now()) {
 const payload=encode(new TextEncoder().encode(JSON.stringify({expires:now+SESSION_SECONDS*1000,nonce:crypto.randomUUID()})));
 const signature=await crypto.subtle.sign('HMAC',await keyFor(secret,'sign'),new TextEncoder().encode(payload));
 return `${payload}.${encode(new Uint8Array(signature))}`;
}
export async function validSession(token, secret, now = Date.now()) {
 if(!secret || secret.length<32 || !token || token.length>1000)return false;
 try {const [payload,signature,...extra]=token.split('.');if(!payload||!signature||extra.length)return false;
  if(!await crypto.subtle.verify('HMAC',await keyFor(secret,'verify'),decode(signature),new TextEncoder().encode(payload)))return false;
  const {expires}=JSON.parse(new TextDecoder().decode(decode(payload)));
  return Number.isFinite(expires)&&expires>now&&expires<=now+SESSION_SECONDS*1000;
 } catch {return false;}
}
export function privateSiteConfigured() { return (process.env.SITE_PASSWORD?.length||0)>=6 && (process.env.SESSION_SECRET?.length||0)>=32; }
