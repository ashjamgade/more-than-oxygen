import { NextResponse } from 'next/server';
import { SESSION_COOKIE, privateSiteConfigured, validSession } from './lib/private-session';
import { unlockMarkup } from './lib/unlock-markup';
export async function middleware(request) {
 const path=request.nextUrl.pathname;
 if(path==='/unlock')return new NextResponse(unlockMarkup(privateSiteConfigured(),request.nextUrl.searchParams.get('status')),{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
 if(path==='/api/private-session')return NextResponse.next();
 const authenticated=privateSiteConfigured()&&await validSession(request.cookies.get(SESSION_COOKIE)?.value,process.env.SESSION_SECRET);
 if(authenticated){const response=NextResponse.next();response.headers.set('Cache-Control','private, no-store, max-age=0');return response;}
 if(path.startsWith('/api/')||path.startsWith('/photos/')||path.startsWith('/_next/'))return NextResponse.json({error:'Please unlock this space first.'},{status:401,headers:{'Cache-Control':'no-store'}});
 return NextResponse.redirect(new URL('/unlock',request.url));
}
export const config={matcher:['/:path*']};
