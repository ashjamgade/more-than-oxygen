import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import test from 'node:test';
async function sourceModule(path) { return import('data:text/javascript;base64,' + Buffer.from(await readFile(new URL(path, import.meta.url), 'utf8')).toString('base64')); }
const { STORY, elapsedSince } = await sourceModule('../lib/story.js');
const { geoPoint, CITIES, LAND, inPolygon } = await sourceModule('../lib/globe.js');
test('counter begins at midnight IST on 25 July, independently of viewer timezone', () => {
 assert.equal(new Date(STORY.counterStart).toISOString(), '2025-07-24T18:30:00.000Z');
 assert.deepEqual(elapsedSince(STORY.counterStart, Date.parse('2025-07-25T18:30:00Z')), {days:1,hours:0,minutes:0,seconds:0});
 assert.deepEqual(elapsedSince(STORY.counterStart, Date.parse('2025-07-24T18:29:59Z')), {days:0,hours:0,minutes:0,seconds:0});
 assert.deepEqual(elapsedSince(STORY.counterStart, Date.parse('2025-07-26T19:32:03Z')), {days:2,hours:1,minutes:2,seconds:3});
 assert.equal(STORY.acceptedDate, '2025-07-05');
});
test('Mumbai and Sydney clocks use explicit zones across Sydney daylight saving', () => {
 const hour = (date, zone) => Number(new Intl.DateTimeFormat('en-GB', {timeZone:zone,hour:'2-digit',hourCycle:'h23'}).format(new Date(date)));
 assert.equal(hour('2026-07-01T00:00Z', STORY.sydneyZone), 10);
 assert.equal(hour('2026-10-24T00:00Z', STORY.sydneyZone), 11);
 assert.equal(hour('2026-10-24T00:00Z', STORY.indiaZone), 5);
});
test('city markers are on a unit sphere in the correct hemispheres', () => {
 const mumbai=geoPoint(CITIES.mumbai.lat,CITIES.mumbai.lon), sydney=geoPoint(CITIES.sydney.lat,CITIES.sydney.lon);
 for(const city of [mumbai,sydney]) assert.ok(Math.abs(Math.hypot(...city)-1)<1e-12);
 assert.ok(mumbai[1]>0);assert.ok(sydney[1]<0);
 assert.deepEqual(geoPoint(0,0),[0,0,1]);
});
test('illustrative land polygons include the two city locations', () => {
 for(const c of Object.values(CITIES)) assert.ok(LAND.some(p=>inPolygon(c.lon,c.lat,p)));
});
