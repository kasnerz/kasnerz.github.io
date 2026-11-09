import data from "./local-ai-uses.json";

/** Why running models locally pays off: the keys of data.reasons in local-ai-uses.json. */
export type Reason = keyof typeof data.reasons;

/** The icon for each reason, shared by the criteria boxes and the institutions' badges. */
export const REASON_ICONS: Record<Reason, string> = {
  secrecy: "tabler:lock",
  volume: "tabler:coins",
  offline: "tabler:wifi-off",
  robust: "tabler:plug-connected-x",
};
