import { Context } from "./deps-managed.ts";
import { verify } from "https://deno.land/x/djwt@v2.3/mod.ts";
import { key } from "../config/key.ts";

export async function getBearerTokenPayload(ctx: Context) {
  let output = {
    isValide: false,
    details: "not auth headers",
    userId: -1,
  };  
  // ctx.cookies.set("iduser",String(id) )
  const userId  = await ctx.cookies.get("iduser")
  console.log({userId})
  if(userId){
    const n = parseInt(userId)
    output = {
      isValide: true,
      details: "not auth headers",
      userId: n,
    };  
  }

  const b = ctx.request.headers.has("authorization"); 
  if ( !userId && b) {
    const authHeader = ctx.request.headers.get("authorization"); 
    let jwtToken = "";
    if (authHeader) {
      const jwtTokenArray = authHeader.split("bearer "); 
      if (jwtTokenArray.length > 1) jwtToken = jwtTokenArray[1];
    } 
    if (jwtToken.length == 0) {
      output = {
        isValide: false,
        details: "empty token",
        userId: -1,
      };
    } else {
      console.log("just befor try ")
      try {
        const value = await verify(jwtToken, key); 
        const idStr = String(value.id);
        output = {
          isValide: true,
          details: "valide token",
          userId: parseInt(idStr),
        };
      } catch (_error) {
        output = {
          isValide: false,
          details: "empty token in catch bloc",
          userId: -1,
        };
      }
    }
  }
  console.log({output})
  return output;
}
