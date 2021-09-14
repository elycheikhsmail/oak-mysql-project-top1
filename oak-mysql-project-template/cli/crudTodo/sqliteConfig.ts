export function getSqlieFileName() {
  let dbFileName = "db.sqlite3";
  const n = Deno.env.get("OAK_SQLITE_FILE");
  if (n) dbFileName = n;
  //console.log({ dbFileName });
  return dbFileName;
}

const dbFileName = getSqlieFileName();

export { dbFileName };


export interface DbConfig{
  sqlitePath:string
}
 