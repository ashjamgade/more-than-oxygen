"use client";
import { useEffect, useRef, useState } from "react";

// An original ambient score synthesized locally. Nothing plays until requested.
export default function MusicPlayer() {
  const audio = useRef(null);
  const request = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(.2);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState("");
  const settings = useRef({ volume: .2, muted: false });

  useEffect(() => {
    settings.current = { volume, muted };
    if (audio.current) {
      const { context, gain } = audio.current;
      gain.gain.setTargetAtTime(muted ? 0 : volume * .32, context.currentTime, .15);
    }
  }, [volume, muted]);

  useEffect(() => {
    const pauseForVideo = () => {
      request.current++;
      setPlaying(false);
      if (audio.current && audio.current.context.state !== "closed") {
        audio.current.context.suspend().catch(() => setError("Please pause the soundtrack using its controls."));
      }
    };
    window.addEventListener("oxygen:video-start", pauseForVideo);
    return () => {
      window.removeEventListener("oxygen:video-start", pauseForVideo);
      if (audio.current) {
        clearInterval(audio.current.timer);
        audio.current.context.close();
      }
    };
  }, []);

  function createAudio() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) throw Error("Audio is unavailable");
    const context = new AudioContext();
    const gain = context.createGain();
    gain.gain.value = settings.current.muted ? 0 : settings.current.volume * .32;
    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1800;
    filter.connect(gain);
    gain.connect(context.destination);
    const delay = context.createDelay(2);
    delay.delayTime.value = .62;
    const feedback = context.createGain();
    feedback.gain.value = .25;
    filter.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    feedback.connect(gain);
    let step = 0;
    const chords = [[130.81, 164.81, 196], [110, 130.81, 164.81], [87.31, 130.81, 174.61], [98, 146.83, 196]];
    const melody = [523.25, 659.25, 587.33, 783.99, 659.25, 523.25, 440, 392];
    function note(frequency, duration, level, type = "sine") {
      const oscillator = context.createOscillator();
      const envelope = context.createGain();
      oscillator.type = type;
      oscillator.frequency.value = frequency;
      const now = context.currentTime;
      envelope.gain.setValueAtTime(0, now);
      envelope.gain.linearRampToValueAtTime(level, now + .5);
      envelope.gain.exponentialRampToValueAtTime(.0001, now + duration);
      oscillator.connect(envelope);
      envelope.connect(filter);
      oscillator.start(now);
      oscillator.stop(now + duration + .1);
      oscillator.onended = () => { oscillator.disconnect(); envelope.disconnect(); };
    }
    const phrase = () => {
      if (context.state !== "running") return;
      chords[step % 4].forEach(frequency => note(frequency, 7, .11, "triangle"));
      note(melody[step % melody.length], 4, .07);
      step++;
    };
    return { context, gain, phrase, timer: setInterval(phrase, 4500) };
  }

  async function toggle() {
    const token = ++request.current;
    try {
      const firstStart = !audio.current;
      if (firstStart) audio.current = createAudio();
      const { context, phrase } = audio.current;
      if (!firstStart && context.state === "running") {
        await context.suspend();
        setPlaying(false);
      } else {
        // A visitor deliberately choosing the soundtrack pauses any videos.
        window.dispatchEvent(new Event("oxygen:soundtrack-start"));
        await context.resume();
        // A video may have claimed audio while resume() was pending.
        if (token !== request.current) { await context.suspend(); return; }
        if (firstStart) phrase();
        setPlaying(true);
      }
      setError("");
    } catch {
      setError("Audio could not start on this device. Please try again.");
      setPlaying(false);
    }
  }

  return <div className="soundscape">
    <button className="soundscape-toggle" onClick={() => setExpanded(value => !value)} aria-expanded={expanded} aria-controls="soundscape-panel" aria-label={expanded ? "Close music controls" : "Open optional music controls"}>
      <span className={`sound-bars ${playing && !muted ? "sound-active" : ""}`} aria-hidden="true"><i/><i/><i/><i/></span><span>Sound</span>
    </button>
    <div id="soundscape-panel" className="soundscape-panel" hidden={!expanded}>
      <p className="eyebrow">An optional soundtrack</p><strong>A little atmosphere</strong>
      <p>An original ambient soundscape.<br/>Pauses when a video starts.</p>
      <div className="soundscape-actions">
        <button onClick={toggle} aria-pressed={playing}>{playing ? "Pause" : "Play soundtrack"}</button>
        <button onClick={() => setMuted(value => !value)} aria-pressed={muted}>{muted ? "Unmute" : "Mute"}</button>
      </div>
      <label htmlFor="music-volume">Volume <span>{Math.round(volume * 100)}%</span></label>
      <input id="music-volume" type="range" min="0" max="1" step="0.05" value={volume} onChange={event => setVolume(Number(event.target.value))}/>
      {error && <p role="alert">{error}</p>}
    </div>
  </div>;
}
