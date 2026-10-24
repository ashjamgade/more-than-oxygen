export function cityTime(zone, now = new Date()) {
 const hour=Number(new Intl.DateTimeFormat('en-GB',{timeZone:zone,hour:'2-digit',hourCycle:'h23'}).format(now));
 const period=hour>=6&&hour<9?'dawn':hour>=9&&hour<17?'day':hour>=17&&hour<20?'dusk':'night';
 return {time:new Intl.DateTimeFormat('en-AU',{timeZone:zone,hour:'2-digit',minute:'2-digit',hour12:true}).format(now),period,label:{dawn:'A new morning',day:'A little daylight',dusk:'The evening settles',night:'Under a night sky'}[period]};
}
