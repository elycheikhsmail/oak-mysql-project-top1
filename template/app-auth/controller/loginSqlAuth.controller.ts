import { Context, Status } from "../deps-managed.ts";
import { getDb } from "../../config/mysql/dbclient.ts";
//
import type { Payload } from "https://deno.land/x/djwt@v2.3/mod.ts";
import { create, getNumericDate } from "https://deno.land/x/djwt@v2.3/mod.ts";
import { header, key } from "../../config/key.ts";

export async function loginSqlAuthController(ctx: Context) {
  // Default variable for minimise if else in code
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
    if (!username || !password) isReady = false;
    else {
      usernameDefault = username;
      passwordDefault = password;
    }
  }
  // get users from db
  let users = [];
  if (isReady) {
    const args = [usernameDefault];
    try {
      const db = await getDb();
      const sql =
        "SELECT  id ,password FROM app_auth_user WHERE username = ? LIMIT 1";
      users = await db.query(sql, args);
      await db.close();
    } catch (_error) {
      isReady = false;
      console.log(_error);
    }
  }
  // verify user is already registred
  if (isReady && users.length == 0) {
    isReady = false;
    details = "user dos'nt exist";
  }
  // if user have wrong password we will skip
  if (isReady && users.length == 1 && users[0].password != passwordDefault) {
    isReady = false;
    details = "invalid password";
  }
  // verify user have valid password and create token
  if (isReady && users.length == 1 && users[0].password == passwordDefault) {
    try {
      const payload: Payload = {
        id: users[0].id,
        exp: getNumericDate(600),
      };
      accessToken = await create(header, payload, key);
    } catch (error) {
      isReady = false;
      console.log(error);
    }
  }
  // write response body
  if (isReady) {
    ctx.response.body = { accessToken };
  } else {
    ctx.response.status = Status.NotFound;
    ctx.response.body = { details };
  }
}
