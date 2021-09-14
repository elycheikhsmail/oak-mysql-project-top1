import { Context, Router } from "https://deno.land/x/oak@v9.0.0/mod.ts";
const routes = new Router(); 

//  
import { indexController } from "./controller/index.controller.ts";
routes.get("/", async (ctx: Context) => await indexController(ctx));
routes.post("/", async (ctx: Context) => await indexController(ctx));


//  
import { deleteItemController } from "./controller/deleteItem.controller.ts";
routes.get("/delete/:id", async (ctx: Context) => await deleteItemController(ctx));
export { routes };