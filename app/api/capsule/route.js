import { NextResponse } from 'next/server';
import { CAPSULE_UNLOCK_AT, capsuleAvailable } from '../../../lib/capsule';
import { SESSION_COOKIE, privateSiteConfigured, validSession } from '../../../lib/private-session';
export const dynamic='force-dynamic';
export async function GET(request){
 if(!privateSiteConfigured()||!await validSession(request.cookies.get(SESSION_COOKIE)?.value,process.env.SESSION_SECRET))return NextResponse.json({error:'Please unlock this space.'},{status:401});
 const headers={'Cache-Control':'private, no-store'};
 if(!capsuleAvailable())return NextResponse.json({locked:true,unlockAt:CAPSULE_UNLOCK_AT},{headers});
 return NextResponse.json({locked:false,unlockAt:CAPSULE_UNLOCK_AT,title:'To your new beginning',paragraphs:[
 'Dolly, on 19 October 2026 you started your new job as a researcher at IIT Bombay. I am so proud of you. I hope this new chapter brings you exciting ideas, encouraging people, and discoveries that make you smile.',
 'Wherever this letter finds you, I hope you pause for a moment and give yourself credit for everything you have learned. Progress is not always loud. Sometimes it is simply showing up with curiosity, again and again.',
 'Here is to the questions still ahead of you. With love, Ashwin.'
 ]},{headers});
}
