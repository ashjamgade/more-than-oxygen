// Run after npm run build. All credentials are ephemeral test values.
const http=require('node:http');
const root=require('node:path').resolve(__dirname,'..');
const assert=require('node:assert/strict');
const {randomBytes}=require('node:crypto');
process.env.NODE_ENV='production';
process.env.SITE_PASSWORD='oxygen';
process.env.SESSION_SECRET=randomBytes(32).toString('hex');
const next=require('next');
(async()=>{
 const app=next({dev:false,dir:root});await app.prepare();const handler=app.getRequestHandler();const server=http.createServer((req,res)=>handler(req,res));await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const base=`http://127.0.0.1:${server.address().port}`;
 try {
  let response=await fetch(base+'/',{redirect:'manual'});assert.equal(response.status,307);assert.ok(response.headers.get('location').endsWith('/unlock'));
  response=await fetch(base+'/photos/dolly-1.jpg',{redirect:'manual'});assert.equal(response.status,401);
  response=await fetch(base+'/',{headers:{'x-middleware-subrequest':'middleware:middleware:middleware:middleware:middleware'},redirect:'manual'});assert.equal(response.status,307);
  response=await fetch(base+'/api/postcard',{redirect:'manual'});assert.equal(response.status,401);
  response=await fetch(base+'/api/capsule',{redirect:'manual'});assert.equal(response.status,401);
  response=await fetch(base+'/api/private-session',{method:'POST',headers:{'Origin':'https://another.example','Content-Type':'application/json'},body:JSON.stringify({password:process.env.SITE_PASSWORD})});assert.equal(response.status,403);
  response=await fetch(base+'/api/private-session',{method:'POST',headers:{'Origin':base,'Content-Type':'application/json'},body:JSON.stringify({password:'wrong'})});assert.equal(response.status,401);
  response=await fetch(base+'/api/private-session',{method:'POST',headers:{'Origin':base,'Content-Type':'application/json'},body:JSON.stringify({password:process.env.SITE_PASSWORD})});assert.equal(response.status,200);const setCookie=response.headers.get('set-cookie');assert.match(setCookie,/HttpOnly/i);assert.match(setCookie,/SameSite=strict/i);const cookie=setCookie.split(';')[0];
  response=await fetch(base+'/',{headers:{Cookie:cookie},redirect:'manual'});assert.equal(response.status,200);const page=await response.text();assert.ok(page.includes('Where shall we go?'));assert.ok(page.includes('Save your postcard'));
  const scriptPath=page.match(/src="([^"]+\.js[^"]*)"/)[1].replaceAll('&amp;','&');
  response=await fetch(base+scriptPath,{redirect:'manual'});assert.equal(response.status,401);
  response=await fetch(base+scriptPath,{headers:{Cookie:cookie}});assert.equal(response.status,200);assert.match(response.headers.get('cache-control'),/no-store/);
  response=await fetch(base+'/unlock',{redirect:'manual'});assert.equal(response.status,200);const entry=await response.text();assert.ok(entry.includes('method="post"'));assert.ok(!entry.includes('/_next/static'));
  response=await fetch(base+'/api/private-session',{method:'POST',headers:{Origin:base,'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({password:process.env.SITE_PASSWORD}),redirect:'manual'});assert.equal(response.status,303);assert.ok(response.headers.get('set-cookie'));

  response=await fetch(base+'/photos/dolly-1.jpg',{headers:{Cookie:cookie},redirect:'manual'});assert.equal(response.status,200);assert.match(response.headers.get('cache-control'),/no-store/);
  response=await fetch(base+'/api/postcard',{headers:{Cookie:cookie}});assert.equal(response.status,200);assert.match(response.headers.get('content-disposition'),/attachment/);assert.ok((await response.text()).startsWith('<svg'));
  response=await fetch(base+'/api/capsule',{headers:{Cookie:cookie}});assert.equal(response.status,200);const capsule=await response.json();assert.equal(capsule.locked,false);assert.match(capsule.paragraphs[0],/new job as a researcher at IIT Bombay/);
  response=await fetch(base+'/api/private-session',{method:'DELETE',headers:{Origin:base,Cookie:cookie}});assert.equal(response.status,200);assert.match(response.headers.get('set-cookie'),/Max-Age=0/);
  console.log('PASS: private entry, protected media/API, cross-site rejection, wrong/correct password, signed HttpOnly session, authenticated page/media, new-job letter, and logout.');
 } finally {server.closeAllConnections();await new Promise(resolve=>server.close(resolve));await app.close();}
})().then(()=>process.exit(0)).catch(error=>{console.error(error.message);process.exit(1);});
