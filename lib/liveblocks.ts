import { Liveblocks } from "@liveblocks/node";

/* non sense error */
export const liveblocks = new Liveblocks({
  secret: process.env.LIVE_BLOCKS_SECRET_KEY!,
});
