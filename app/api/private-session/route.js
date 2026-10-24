import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { createSession, privateSiteConfigured, SESSION_COOKIE, SESSION_SECONDS } from '../../../lib/private-session';
export const dynamic='force-dynamic';
const attempts=new Map();
function sameOrigin(request){try{return new URL(request.headers.get('origin')).host===request.headers.get('host');}catch{return false;}}
export async function POST(request){
 const formRequest=!(request.headers.get('content-type')||'').includes('application/json');
 const reject=(error,status,code)=>formRequest?NextResponse.redirect(new URL('/unlock?status='+code,request.url),303):NextResponse.json({error},{status});
 if(!sameOrigin(request))return NextResponse.json({error:'Please open the form on this website.'},{status:403});
 if(!privateSiteConfigured())return reject('This little space is being prepared. Please try again later.',503,'preparing');
 const identity=(request.headers.get('x-forwarded-for')||'local').split(',')[0];const now=Date.now();
 for(const [key,value]of attempts)if(value.until<now)attempts.delete(key);
 const record=attempts.get(identity);if(record?.count>=10&&record.until>now)return reject('Please wait a few minutes before trying again.',429,'wait');
 let password;try{password=formRequest?(await request.formData()).get('password'):(await request.json()).password;}catch{return reject('Please enter the secret phrase.',400,'invalid');}
 if(typeof password!=='string'||password.length>256)return reject('Please enter the secret phrase.',400,'invalid');
 const digest=async text=>new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text)));
 const [given,expected]=await Promise.all([digest(password),digest(process.env.SITE_PASSWORD)]);const equal=timingSafeEqual(given,expected);
 if(!equal){attempts.set(identity,{count:(record?.count||0)+1,until:record?.until||now+15*60*1000});return reject('That phrase did not unlock the letter. Please try again.',401,'incorrect');}
 attempts.delete(identity);const response=formRequest?NextResponse.redirect(new URL('/',request.url),303):NextResponse.json({ok:true},{headers:{'Cache-Control':'no-store'}});
 response.cookies.set(SESSION_COOKIE,await createSession(process.env.SESSION_SECRET),{httpOnly:true,secure:request.nextUrl.protocol==='https:',sameSite:'strict',path:'/',maxAge:SESSION_SECONDS});return response;
}
export async function DELETE(request){if(!sameOrigin(request))return NextResponse.json({error:'Please use this website.'},{status:403});const response=NextResponse.json({ok:true});response.cookies.set(SESSION_COOKIE,'',{httpOnly:true,secure:request.nextUrl.protocol==='https:',sameSite:'strict',path:'/',maxAge:0});return response;}
