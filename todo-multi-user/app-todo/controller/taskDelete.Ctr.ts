import { Context, Status } from "../deps-managed.ts";
import { getDb } from "../../config/mysql/dbclient.ts";
//---------------------------------------------
import { getBearerTokenPayload } from "../../config/getBareerToken.ts";
//------------------------------------------------


export async function taskDeleteCtr(ctx: Context) {
  // Default variable for minimise if else in code
  let isReady = true;
  // Default variable  details in response when inspect behavur happed
  let details = "";
  let dbTotalChanges = 0;

  // extract id
  const pathname = ctx.request.url.pathname;
  const urlData = pathname.split("/");
  const idStr = String(urlData.at(-1));
  const id = parseInt(idStr);
  //--------------------------------------------------------------------
  const dataFromClient = await getBearerTokenPayload(ctx);
  if (!dataFromClient.isValide) {
    isReady = false;
    details = dataFromClient.details;
  }
  //--------------------------------------------------------------


  // run sql
  try {
    const sql = "DELETE FROM task WHERE id = ? AND ownerId = ? ";
    const args = [id, dataFromClient.userId];
    const db = await getDb();
    const result = await db.query(sql, args); 
    dbTotalChanges = result.affectedRows;
    await db.close(); 
  } catch (_error) {
    console.log(_error);
    isReady = false;
    details = "db connexion or sql execution failed";
  }

  if (dbTotalChanges == 0) {
    isReady = false;
    details = " o(zero) deleted item, item does't exist";
  }

  if (isReady) {
    ctx.response.status = Status.NoContent;
  } 
  // else {
  //   ctx.response.status = Status.NotFound;
  //   ctx.response.body = { details };
  // }
    //----------------------------------
  else {
    if (dataFromClient.isValide) {
      ctx.response.status = Status.Unauthorized;
      ctx.response.body = { details };
    } else {
      ctx.response.status = Status.NotFound;
      ctx.response.body = { details };
    }
  }
  //----------------------------------
}
