import { Context } from "https://deno.land/x/oak@v9.0.0/mod.ts";

import { app } from "./add-routes.ts";
// add middlares after routes
app.use(
  async (ctx: Context, next) => {
    const s = ctx.response.status;

    const m = ctx.request.method;
    const p = ctx.request.url.pathname;
    console.log(`response :  ${m}    ${p}  ${s}`);
    await next();
  },
);

// end
export { app };
