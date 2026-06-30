// Design tokens mirrored from the real app (frontend/src/styles/globals.css)
// + the Google fonts the app uses, loaded the Remotion-recommended way.
import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

const fontOpts = { subsets: ["latin"] as "latin"[], ignoreTooManyRequestsWarning: true };
export const serif = loadFraunces("normal", { weights: ["500", "600", "700"], ...fontOpts }).fontFamily; // display headings
export const display = loadJakarta("normal", { weights: ["600", "700", "800"], ...fontOpts }).fontFamily; // wordmark / UI
export const mono = loadMono("normal", { weights: ["400", "500"], ...fontOpts }).fontFamily; // code / captions

export type Theme = {
  bg: string;
  panel: string;
  panel2: string;
  line: string;
  ivory: string;
  muted: string;
  dim: string;
  gold: string;
  goldLight: string;
  jade: string;
  paper: string;
  paperInk: string;
};

export const DARK: Theme = {
  bg: "#08080A",
  panel: "#0E0E12",
  panel2: "#16161C",
  line: "#23232E",
  ivory: "#F5F0E8",
  muted: "#C8C2B4",
  dim: "#8A8578",
  gold: "#C9A84C",
  goldLight: "#DFC070",
  jade: "#3AAFA9",
  paper: "#FFFFFF",
  paperInk: "#15130F",
};

export const LIGHT: Theme = {
  bg: "#F4EFE7",
  panel: "#FFFFFF",
  panel2: "#F0EBE3",
  line: "#E2D9CC",
  ivory: "#1A1714",
  muted: "#3D3830",
  dim: "#6B6358",
  gold: "#A77D22",
  goldLight: "#C9A84C",
  jade: "#0F766E",
  paper: "#FFFFFF",
  paperInk: "#15130F",
};
