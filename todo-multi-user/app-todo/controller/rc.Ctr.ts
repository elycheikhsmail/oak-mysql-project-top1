import { Context } from "../deps-managed.ts";
 
export async function rcCtr(ctx: Context) {

  //ctx.cookies.set("userId","5")
  const userId = await ctx.cookies.get("userId") 
    
  ctx.response.body = `<!DOCTYPE html> <html> <body> <h1>user id: ${userId} </h1> </body> </html>`; 

  ctx.response.headers.append(
    "content-type",
    "text/html",
  );


}
