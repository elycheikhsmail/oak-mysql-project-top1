import { Context, Status } from "../deps-managed.ts";
import { getDb } from "../../config/mysql/dbclient.ts";
//

import { create, getNumericDate } from "https://deno.land/x/djwt@v2.3/mod.ts";
//
import type { Payload } from "https://deno.land/x/djwt@v2.3/mod.ts";
import { header, key } from "../../config/key.ts";

export async function registerSqlAuthController(ctx: Context) {
  // Default variable for minimise if else in code
  let id = -1
  let isReady = true;
  // Default variable for response
  let details = "";
  let accessToken = "";
  //Default variable for db
  let usernameDefault = "";
  let passwordDefault = "";
  // extract data from request body and verify needed data not empty
  if (ctx.request.body().type == "json" && ctx.request.hasBody) {
    // extract data from body request
    const body = ctx.request.body({ type: "json" });
    const values = await body.value;
    const { username, password } = values;
    if (!username || !password) {
      isReady = false;
      details = "empty username or password";
    } else {
      usernameDefault = username;
      passwordDefault = password;
    }
  }
  // insert user in db
  if (isReady) {
    // inset data in db
    try {
      const args = [usernameDefault, passwordDefault];
      const db = await getDb();
      const sql = "INSERT INTO app_auth_user (username, password) VALUES (?,?)";
      const result = await db.query(sql, args);
       id = result.lastInsertId;
      await db.close();
      const payload: Payload = {
        id,
        exp: getNumericDate(60),
      };
      accessToken = await create(header, payload, key);
      //console.log(accessToken);
      ctx.response.body = { accessToken ,id};
      ctx.cookies.set("iduser",String(id) )
    } catch (_error) {
      //console.log(_error);
      isReady = false;
      details = "user alredy exist";
    }
  }

  if (!isReady) {
    ctx.cookies.set("iduser", null)
    ctx.response.status = Status.NotFound;
    ctx.response.body = { details };
  }
}
