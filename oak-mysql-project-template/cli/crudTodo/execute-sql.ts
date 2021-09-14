import { DB } from "https://deno.land/x/sqlite@v3.1.1/mod.ts";
export function executeSqlString(text: string) {
  let sqlieFileName = Deno.env.get("OAK_SQLITE_FILE")
    ? Deno.env.get("OAK_SQLITE_FILE")
    : "db.sqlite3";
  sqlieFileName = String(sqlieFileName);

  const dbClient = new DB(sqlieFileName);
  const sqlStatements = text.split(";");
  for (const sql of sqlStatements) {
    if (sql) dbClient.query(sql);
  }
  dbClient.close();
}
