import leverPullWav from "../sounds/lever_pull.wav";
import reelsSpinWav from "../sounds/reels_spin.wav";
import reelStopWav from "../sounds/reel_stop.wav";
import winSimpleWav from "../sounds/win_simple.wav";
import loseWav from "../sounds/lose.wav";
import uiClickWav from "../sounds/ui_click.wav";
import error from "../sounds/error.wav";
import main from "../sounds/main.mp3";

type SoundName =
  | "lever_pull"
  | "reels_spin"
  | "reel_stop"
  | "win_simple"
  | "lose"
  | "ui_click"
  | "main"
  | "error";

let isMuted: boolean = false;

const sounds: Record<SoundName, HTMLAudioElement> = {
  lever_pull: new Audio(leverPullWav),
  reels_spin: new Audio(reelsSpinWav),
  reel_stop: new Audio(reelStopWav),
  win_simple: new Audio(winSimpleWav),
  lose: new Audio(loseWav),
  ui_click: new Audio(uiClickWav),
  main: new Audio(main),
  error: new Audio(error),
};

sounds.lever_pull.volume = 0.6;
sounds.reels_spin.volume = 0.4;
sounds.main.loop = true;
sounds.reel_stop.volume = 0.9;
sounds.win_simple.volume = 0.7;
sounds.lose.volume = 0.4;
sounds.ui_click.volume = 0.3;
sounds.main.volume = 0.2;
sounds.error.volume = 0.2;

export const setMuteState = (muted: boolean) => {
  isMuted = muted;
  if (isMuted) {
    sounds.main.pause();
  } else {
    playBgMusic();
  }
};

export const playSound = (name: keyof typeof sounds) => {
  if (isMuted) return;

  if (name === "main") {
    return;
  }

  const sound = sounds[name];
  if (!sound) return;

  const clone = sound.cloneNode() as HTMLAudioElement;
  clone.volume = sound.volume;

  clone.play().catch((err) => {
    console.warn(`${name} sound blocked, need to click somewhere`, err);
  });
};

export const playBgMusic = () => {
  if (isMuted) return;

  const bgMusic = sounds.main;

  if (bgMusic.paused) {
    bgMusic.play().catch((err) => {
      console.warn(`music blocked, need to click somewhere`, err);
    });
  }
};

export const stopBgMusic = () => {
  sounds.main.pause();
};
