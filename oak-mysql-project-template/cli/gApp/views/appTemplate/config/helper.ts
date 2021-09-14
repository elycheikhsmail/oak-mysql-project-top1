import { getSqliteDb } from "../../config.ts"; 

export function executeSqlReadenFromFile(text: string) {
  
  const db  = getSqliteDb()
  const sqlStatements = text.split(";");
  for (const sql of sqlStatements) {
    if (sql){
      try {
        db.query(sql)
      } catch (error) {
        console.log("failed to execute sql")
        console.log("------------------------")
        console.log(sql)
        console.log("------------------------")
        console.log(error)
      }
    }
      
     
  }
  db.close();
}

export function createTable(){
    const sql = Deno.readTextFileSync("app-todo/config/db.sql")  
    executeSqlReadenFromFile(sql)
    console.log("init db success")
}

 