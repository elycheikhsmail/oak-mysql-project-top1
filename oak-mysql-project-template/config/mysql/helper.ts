// deno run --allow-all --unstable helper.ts
import * as fs from "https://deno.land/std@0.106.0/fs/mod.ts";
import { getDb } from "./dbclient.ts";

// export async function dropTables() {
//   const db = await getDb();
//   await db.execute(`DROP TABLE IF EXISTS todo_tasks`);
// }

async function executeSqlReadenFromFile(text: string) {
  const sqlStatements = text.split(";");
  for (const sql of sqlStatements) {
    let sqlTrimed = ""
    if(sql){
      sqlTrimed = sql.trim()
    }
    if (sqlTrimed) { 
      try {
        const db = await getDb();
        await db.query(sql);
        await db.close();
      } catch (_error) {
        console.log("---sql text----------------")
        console.error(sql);
        console.log("----end sql text -------------------");
        console.error(_error);
      }
    }
  }
  //db.close();
}

function createTable(sqlFileToExecute: string) {
  const sql = Deno.readTextFileSync(sqlFileToExecute);
  executeSqlReadenFromFile(sql);
  console.log("init db success");
}

export async function createAllTables(isTestMode:boolean) {
  let sqlFileName = "mysql.sql"
  if(isTestMode) sqlFileName = "mysql.test.sql"
  for await (const f of fs.walk("./", { maxDepth: 1, includeFiles: false })) {
    if (f.name.startsWith("app-")) {
      console.log(f.name);
      const p = `./${f.name}/config/db/${sqlFileName}`;
      const b = await fs.exists(p);
      if (b) {
        console.log("we will execute sql in ", p);
        createTable(`${f.name}/config/db/${sqlFileName}`);
        console.log("");
      } else {
        console.log("no sqlite.sql for : ", f.name);
        console.log("");
      }
    }
  }
}
