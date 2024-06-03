import { TARGET } from "./constants";

export const letterStatusColor = (letter: string, index: number) => {
  const splitted = TARGET.split("");
  if (splitted[index] === letter) return "green";
  if (splitted.includes(letter)) return "yellow";
  return "red";
};
