// cli for 
// create this app tables
// init this app tables with some data when needed

import { createTable } from "./helper.ts";

// deno --alow-all run app-todo/config/cli.ts

let isDone=false 

// deno run --allow-all app-todo/config/cli.ts initdb
if(!isDone && Deno.args.length == 1 && Deno.args[0] == "initdb"){
    isDone = true
    createTable()
}



if(!isDone){
    console.log("read app-todo/config/cli.ts content to know available commands")
}