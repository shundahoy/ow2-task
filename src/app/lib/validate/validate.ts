import { z } from "zod";

const ow2Words = [
  // Roles
  "tank",
  "support",
  "healer",
  "dps",
  "damage",

  // Combat / Gameplay
  "pick",
  "counterpick",
  "ultimate",
  "ult",
  "kill",
  "death",
  "assist",
  "burst",
  "cc",
  "stun",
  "sleep",
  "shield",
  "barrier",
  "bubble",
  "heal",
  "healing",
  "buff",
  "debuff",
  "peel",

  // Map / Objective
  "payload",
  "point",
  "highground",
  "lowground",
  "choke",
  "spawn",
  "area",
  "zone",
  "push",
  "flank",
  "rotation",
  "corner",

  // Strategy & Communication
  "callout",
  "ping",
  "shotcall",
  "macro",
  "micro",
  "positioning",
  "aggressive",
  "passive",
  "engage",
  "disengage",
  "focus",
  "target focus",

  // Evaluation & Meta
  "carry",
  "int",
  "throw",
  "feeder",
  "report",
  "meta",
  "comp",
  "team comp",
  "synergy",
  "counter",
  "dive",
  "poke",
  "brawl",

  // Hero names (Tank)
  "reinhardt",
  "winston",
  "dva",
  "zarya",
  "sigma",
  "orisa",
  "roadhog",
  "ramattra",
  "junkerqueen",
  "mauga",
  "warlord",

  // Hero names (Support)
  "ana",
  "baptiste",
  "zenyatta",
  "lucio",
  "mercy",
  "brigitte",
  "kiriko",
  "lifeweaver",
  "illari",
  "venture",

  // Hero names (DPS)
  "genji",
  "hanzo",
  "soldier",
  "cassidy",
  "ashe",
  "echo",
  "pharah",
  "reaper",
  "tracer",
  "symmetra",
  "mei",
  "junkrat",
  "bastion",
  "torbjorn",
  "sombra",
  "widowmaker",
  "sojourn",
  "venture",
];

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
export const authValidate = z.object({
  email: z.string().email({ message: "Name is required" }),
  password: z
    .string()
    .regex(passwordRegex, {
      message:
        "パスワードは8文字以上で、英大文字・小文字・数字・記号をすべて含めてください",
    })
    .refine((val) => ow2Words.some((word) => val.includes(word)), {
      message: `パスワードには以下のOW2用語を含めてください`,
    }),
});
