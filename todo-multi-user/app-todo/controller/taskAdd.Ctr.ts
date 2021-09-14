import { Context, Status } from "../deps-managed.ts";
import { getDb } from "../../config/mysql/dbclient.ts";
//---------------------------------------------
import { getBearerTokenPayload } from "../../config/getBareerToken.ts";
//------------------------------------------------

export async function taskAddCtr(ctx: Context) {
  // Default variable for minimise if else in code
  let isReady = true;
  // Default variable  details in response when inspect behavur happed
  let details = "";
  //Default variable for db
  let textDefault = "";
  let id = -1;
  // extract data from body
   const userId = await ctx.cookies.get("userId") 
  console.log({userId })
  if (ctx.request.body().type == "json" && ctx.request.hasBody) {
    // extract data from body request
    const body = ctx.request.body({ type: "json" });
    const values = await body.value;
    const { text } = values;
    if (!text) {
      isReady = false;
      details = "invalide text";
    } else textDefault = text;
  } else {
    isReady = false;
    details = "invalide request body type not json or empty";
  }
//--------------------------------------------------------------------
  const dataFromClient = await getBearerTokenPayload(ctx);
  if (!dataFromClient.isValide) {
    isReady = false;
    details = dataFromClient.details;
  }
  //--------------------------------------------------------------

  // execute sql
  if (isReady) {
    try {
      // const db = getSqliteDb();
      const sql = "INSERT INTO task (text , ownerId ) VALUES (? , ?)";
      const args = [textDefault,dataFromClient.userId];
      const db = await getDb();
      const result = await db.query(sql, args); 
      id = result.lastInsertId; // lastInsertId, affectedRows
      await db.close(); 
    } catch (_error) {
      console.log(_error);
      isReady = false;
      details = "db connexion or sql execution failed";
    }
  }
  // write response
  if (isReady) {
    ctx.response.status = Status.Created;
    ctx.response.body = {
      id,
      text: textDefault,
    };
  }
  //  else {
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
