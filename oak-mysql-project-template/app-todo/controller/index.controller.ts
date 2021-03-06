import { Context, Status } from "../deps-managed.ts";
import { getDb } from "../../config/mysql/dbclient.ts";

export async function indexController(ctx: Context) {
  // Default variable for minimise if else in code
  let isReady = true;
  // Default variable  details in response when inspect behavur happed
  let details = "";
  // default tasks
  let tasks = [];
  // get data from db
  try {
    const sql = "SELECT  id , text FROM todo_tasks ";
    const db = await getDb();
    tasks = await db.query(sql);
    await db.close() 
  } catch (_error) {
    isReady = false;
    details = "some errors happen in db connect or sql execution";
    console.log(_error);
  }

  if (isReady) ctx.response.body = tasks;
  else {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = { details };
  }
}
