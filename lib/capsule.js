export const CAPSULE_UNLOCK_AT='2027-10-19T00:00:00+05:30';
export function capsuleAvailable(now=Date.now()){return now>=Date.parse(CAPSULE_UNLOCK_AT);}
