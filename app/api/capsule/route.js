import { NextResponse } from 'next/server';
import { CAPSULE_UNLOCK_AT, capsuleAvailable } from '../../../lib/capsule';
import { SESSION_COOKIE, privateSiteConfigured, validSession } from '../../../lib/private-session';
export const dynamic='force-dynamic';
export async function GET(request){
 if(!privateSiteConfigured()||!await validSession(request.cookies.get(SESSION_COOKIE)?.value,process.env.SESSION_SECRET))return NextResponse.json({error:'Please unlock this space.'},{status:401});
 const headers={'Cache-Control':'private, no-store'};
 if(!capsuleAvailable())return NextResponse.json({locked:true,unlockAt:CAPSULE_UNLOCK_AT},{headers});
 return NextResponse.json({locked:false,unlockAt:CAPSULE_UNLOCK_AT,title:'A year of new questions',paragraphs:[
 'Dolly, a year ago you began a new chapter at IIT Bombay. I hope it has brought you ideas that excited you, people who encouraged you, and moments you are proud of.',
 'Wherever this letter finds you, I hope you pause for a moment and give yourself credit for everything you have learned. Progress is not always loud. Sometimes it is simply showing up with curiosity, again and again.',
 'Here is to the questions still ahead of you. With love, Ashwin.'
 ]},{headers});
}
