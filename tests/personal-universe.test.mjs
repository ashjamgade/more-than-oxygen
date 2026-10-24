import { readFile } from 'node:fs/promises';
import { webcrypto } from 'node:crypto';
import assert from 'node:assert/strict';
import test from 'node:test';
if(!globalThis.crypto)globalThis.crypto=webcrypto;
async function moduleAt(path){return import('data:text/javascript;base64,'+Buffer.from(await readFile(new URL(path,import.meta.url),'utf8')).toString('base64'));}
const {createSession,validSession,SESSION_SECONDS}=await moduleAt('../lib/private-session.js');
const {capsuleAvailable,CAPSULE_UNLOCK_AT}=await moduleAt('../lib/capsule.js');
const {cityTime}=await moduleAt('../lib/city-time.js');
const {POSTCARD_SVG}=await moduleAt('../lib/postcard.js');
test('signed sessions reject tampering, a different key, missing credentials and expiry',async()=>{
 const key='a-test-only-signing-key-with-more-than-32-characters';const now=Date.parse('2026-10-24T00:00:00Z');const token=await createSession(key,now);
 assert.equal(await validSession(token,key,now),true);
 assert.equal(await validSession(token,key,now+1000),true);
 assert.equal(await validSession(token,key+'different',now),false);
 assert.equal(await validSession(token+'changed',key,now),false);
 assert.equal(await validSession(token,key,now+SESSION_SECONDS*1000),false);
 assert.equal(await validSession('',key,now),false);
 assert.equal(await validSession(token,'short',now),false);
 const [payload,signature]=token.split('.');const changed=Buffer.from(JSON.stringify({expires:now+999999999999})).toString('base64url');
 assert.equal(await validSession(`${changed}.${signature}`,key,now),false);
});
test('new-job letter opens at midnight India time, not the visitor local date',()=>{
 assert.equal(CAPSULE_UNLOCK_AT,'2026-10-19T00:00:00+05:30');
 assert.equal(capsuleAvailable(Date.parse('2026-10-18T18:29:59Z')),false);
 assert.equal(capsuleAvailable(Date.parse('2026-10-18T18:30:00Z')),true);
});
test('city skies reflect each city clock and Sydney daylight saving',()=>{
 const now=new Date('2026-10-24T11:00:00Z');
 assert.equal(cityTime('Australia/Sydney',now).period,'night');
 assert.equal(cityTime('Asia/Kolkata',now).period,'day');
 assert.equal(cityTime('Asia/Kolkata',new Date('2026-10-24T01:00:00Z')).period,'dawn');
 assert.equal(cityTime('Asia/Kolkata',new Date('2026-10-24T13:00:00Z')).period,'dusk');
});
test('postcard is self-contained, without external resources or scripts',()=>{
 assert.ok(POSTCARD_SVG.startsWith('<svg'));
 assert.ok(POSTCARD_SVG.includes('For Dolly.'));
 assert.ok(POSTCARD_SVG.includes('With love, Ashwin'));
 assert.doesNotMatch(POSTCARD_SVG,/<script|<foreignObject|href=|onload=/i);
});
const {unlockMarkup}=await moduleAt('../lib/unlock-markup.js');
test('private entry needs no application bundles and never echoes unknown status input',()=>{
 const ready=unlockMarkup(true,'incorrect');assert.ok(ready.includes('method="post"'));assert.ok(ready.includes('That phrase did not unlock'));
 assert.doesNotMatch(ready,/_next\/static/);
 assert.ok(!unlockMarkup(false).includes('name="password"'));
 assert.ok(!unlockMarkup(true,'<script>attack</script>').includes('attack'));
});
