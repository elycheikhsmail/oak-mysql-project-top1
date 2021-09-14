import { Context, Router } from "https://deno.land/x/oak@v9.0.0/mod.ts";
const routes = new Router(); 

//  
import { indexController } from "./controller/index.controller.ts";
routes.get("/", async (ctx: Context) => await indexController(ctx));

//  
import { addController } from "./controller/add.controller.ts";
routes.post("/", async (ctx: Context) => await addController(ctx));

//  
import { deleteItemController } from "./controller/deleteItem.controller.ts";
routes.delete("/:id", async (ctx: Context) => await deleteItemController(ctx));

//  
import { updateController } from "./controller/update.controller.ts";
routes.put("/:id", async (ctx: Context) => await updateController(ctx));

//  add in app routes
import { getTaskByIdController } from "./controller/getTaskById.controller.ts";
routes.get("/:id", async (ctx: Context) => await getTaskByIdController(ctx));
export { routes };