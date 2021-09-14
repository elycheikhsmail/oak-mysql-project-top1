import { Context, Router } from "https://deno.land/x/oak@v9.0.0/mod.ts";
const routes = new Router(); 

//  
import { indexController } from "./controller/index.controller.ts";
routes.get("/", async (ctx: Context) => await indexController(ctx));
 
 
//  
import { registerSqlAuthController } from "./controller/registerSqlAuth.controller.ts";
routes.post("/register", async (ctx: Context) => await registerSqlAuthController(ctx));

//  
import { loginSqlAuthController } from "./controller/loginSqlAuth.controller.ts";
routes.post("/login", async (ctx: Context) => await loginSqlAuthController(ctx));

//  add in app routes
import { protectCtrCtr } from "./controller/protectCtr.Ctr.ts";
routes.get("/p", async (ctx: Context) => await protectCtrCtr(ctx));
export { routes };