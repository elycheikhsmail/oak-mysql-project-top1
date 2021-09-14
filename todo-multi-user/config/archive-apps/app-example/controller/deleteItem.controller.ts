import { Context } from "../deps-managed.ts";
import { getSqliteDb } from "../../config/sqlite/dbclient.ts";
// nujucks template engine
import nunjucks from "https://deno.land/x/nunjucks@3.2.3/mod.js";
nunjucks.configure("app-example/controller/views");

// deno-lint-ignore require-await
export async function deleteItemController(ctx: Context) {
  // sqlite db clent 
  const db = getSqliteDb()
  // extract id 
  const pathname = ctx.request.url.pathname
  const urlData = pathname.split("/") 
  const id = urlData.at(-1) 
  // run sql query
  db.query("DELETE FROM tasks WHERE id = ? ",[id] ); 
  console.log("total changes")
  console.log(db.totalChanges)
  
 // db.close()
 ctx.response.body = {
   "dbChanges":db.totalChanges
 }
 
}
