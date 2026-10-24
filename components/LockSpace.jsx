"use client";
export default function LockSpace(){async function lock(){const response=await fetch('/api/private-session',{method:'DELETE'});if(response.ok)window.location.assign('/unlock');}return <button className="lock-space" onClick={lock}>Lock this space</button>;}
