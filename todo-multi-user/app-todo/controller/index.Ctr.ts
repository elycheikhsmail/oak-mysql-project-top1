import { Context } from "../deps-managed.ts";

// deno-lint-ignore require-await
export async function indexCtr(ctx: Context) {

  ctx.cookies.set("userId","5" )

  ctx.response.body = "<!DOCTYPE html> <html> <body> <h1> hi from <br>|-- todo <br> |---- indexControler </h1> </body> </html>"; 

  ctx.response.headers.append(
    "content-type",
    "text/html",
  );


}
