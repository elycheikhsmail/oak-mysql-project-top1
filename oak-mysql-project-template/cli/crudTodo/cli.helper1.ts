// be in project root
// deno run --allow-all ./cli/crudTodo/cli.ts 
import { executeSqlString } from "./execute-sql.ts";
import { DB } from "https://deno.land/x/sqlite@v3.1.1/mod.ts";

export function createTable(){
    const sql = Deno.readTextFileSync("cli/crudTodo/db.sql")
    let sqlieFileName =  Deno.env.get("OAK_SQLITE_FILE") ? Deno.env.get("OAK_SQLITE_FILE") : "db.sqlite3";
    sqlieFileName = String(sqlieFileName)
    executeSqlString(sql)
    console.log("init db success")
}

export function addTodo(task:string){ 

    let sqlieFileName =  Deno.env.get("OAK_SQLITE_FILE") ? Deno.env.get("OAK_SQLITE_FILE") : "db.sqlite3";
    sqlieFileName = String(sqlieFileName)
    const db = new DB(sqlieFileName)
    
    db.query("INSERT INTO tasks (task) VALUES (?)", [task]); 
    db.close()
    console.log("add todo item in db success")
}


export function listTodos( ){ 
    
    let sqlieFileName =  Deno.env.get("OAK_SQLITE_FILE") ? Deno.env.get("OAK_SQLITE_FILE") : "db.sqlite3";
    sqlieFileName = String(sqlieFileName)

    const db = new DB(sqlieFileName) 
    console.log("id    task")
    for (const [id,task] of db.query("SELECT  id , task FROM tasks ")) {
        console.log(`${id}    ${task}`);
      }
    db.close() 
}

export function deleteTask(id:number){
    
    let sqlieFileName =  Deno.env.get("OAK_SQLITE_FILE") ? Deno.env.get("OAK_SQLITE_FILE") : "db.sqlite3";
    sqlieFileName = String(sqlieFileName)

    const db = new DB(sqlieFileName)
    db.query("DELETE FROM tasks WHERE id = ? ",[id] ); 
    console.log("total changes")
    console.log(db.totalChanges)
    db.close()
    console.log("succefully deleted task")
}

export function updateTask(id:number,task:string){
    
    let sqlieFileName =  Deno.env.get("OAK_SQLITE_FILE") ? Deno.env.get("OAK_SQLITE_FILE") : "db.sqlite3";
    sqlieFileName = String(sqlieFileName)

    const db = new DB(sqlieFileName)
    db.query("UPDATE tasks SET task=? WHERE id = ? ",[task,id] ); 
    console.log("total changes")
    console.log(db.totalChanges)
    db.close()
    console.log("succefully deleted task")
}


