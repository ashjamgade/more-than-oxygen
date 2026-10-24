import { NextResponse } from 'next/server';
import { POSTCARD_SVG } from '../../../lib/postcard';
import { SESSION_COOKIE, privateSiteConfigured, validSession } from '../../../lib/private-session';
export const dynamic='force-dynamic';
export async function GET(request){
 if(!privateSiteConfigured()||!await validSession(request.cookies.get(SESSION_COOKIE)?.value,process.env.SESSION_SECRET))return NextResponse.json({error:'Please unlock this space.'},{status:401});
 return new Response(POSTCARD_SVG,{headers:{'Content-Type':'image/svg+xml; charset=utf-8','Content-Disposition':'attachment; filename="a-little-sunshine-for-dolly.svg"','Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
}
