import { Reward } from "./reward";

export interface Choice {
  heading: string;
  text: string;
  reward: Array<Reward>;
}
