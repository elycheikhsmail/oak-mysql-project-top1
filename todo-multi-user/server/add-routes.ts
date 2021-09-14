import { app } from "./add-middlares-befor.ts";
//import route
import { routes as authRoutes } from "../app-auth/mod.ts";
app.use(authRoutes.prefix("/auth").routes());
app.use(authRoutes.allowedMethods());
//end import route 
//import route
import {  routes as todoRoutes } from "../app-todo/mod.ts";
app.use(todoRoutes.prefix("/task").routes())
app.use(todoRoutes.allowedMethods())
//end import route
export{app}
        