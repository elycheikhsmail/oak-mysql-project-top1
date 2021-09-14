import { Context, Status } from "../deps-managed.ts";
import { getDb } from "../../config/mysql/dbclient.ts";
import { getBearerTokenPayload } from "../../config/getBareerToken.ts";

export async function protectCtrCtr(ctx: Context) {
  // Default variable for minimise if else in code
  let isReady = true;
  // Default variable  details in response when inspect behavur happed
  let details = "";
  // default tasks
  let users = [];
  // get data from db
  const dataFromClient = await getBearerTokenPayload(ctx);
  console.log(dataFromClient)
  if (!dataFromClient.isValide) {
    isReady = false;
    details = dataFromClient.details;
  }

  if (dataFromClient.isValide) {
    try {
      const sql =
        "SELECT  id , username FROM app_auth_user WHERE username = ? LIMIT 1";
      const args = [dataFromClient.userId];
      const db = await getDb();
      users = await db.query(sql, args);
      await db.close();
    } catch (_error) {
      isReady = false;
      details = "some errors happen in db connect or sql execution";
      console.log(_error);
    }
  }

  if (isReady) ctx.response.body = users;
  else {
    ctx.response.status = Status.Unauthorized;
    ctx.response.body = { details };
  }
}
