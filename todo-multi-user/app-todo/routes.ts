import { Context, Router } from "https://deno.land/x/oak@v9.0.0/mod.ts";
const routes = new Router(); 
  

//  add in app routes
import { rcCtr } from "./controller/rc.Ctr.ts";
routes.get("/rc", async (ctx: Context) => await rcCtr(ctx));
//  add in app routes
import { indexCtr } from "./controller/index.Ctr.ts";
routes.get("/i", async (ctx: Context) => await indexCtr(ctx));
//  add in app routes
import { taskAddCtr } from "./controller/taskAdd.Ctr.ts";
routes.post("/", async (ctx: Context) => await taskAddCtr(ctx));

//  add in app routes
import { taskListCtr } from "./controller/taskList.Ctr.ts";
routes.get("/", async (ctx: Context) => await taskListCtr(ctx));

//  add in app routes
import { taskByIdCtr } from "./controller/taskById.Ctr.ts";
routes.get("/:id", async (ctx: Context) => await taskByIdCtr(ctx));

//  add in app routes
import { taskDeleteCtr } from "./controller/taskDelete.Ctr.ts";
routes.delete("/:id", async (ctx: Context) => await taskDeleteCtr(ctx));

//  add in app routes
import { taskUpdateCtr } from "./controller/taskUpdate.Ctr.ts";
routes.put("/:id", async (ctx: Context) => await taskUpdateCtr(ctx));


export { routes };