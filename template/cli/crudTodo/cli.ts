// be in project root
// deno run --allow-all ./cli/crudTodo/cli.ts  
import { createTable,addTodo,listTodos,deleteTask, updateTask } from "./cli.helper1.ts";


let isDone = false

// deno run --allow-all ./cli/crudTodo/cli.ts initdb
if(!isDone && Deno.args.length == 1 && Deno.args[0] == "initdb"){
    isDone = true
    createTable()
}

// deno run --allow-all ./cli/crudTodo/cli.ts add task1
if(!isDone && Deno.args.length == 2 && Deno.args[0] == "add"){
    isDone = true
    addTodo(Deno.args[1])
}

// deno run --allow-all ./cli/crudTodo/cli.ts tasks
if(!isDone && Deno.args.length == 1 && Deno.args[0] == "tasks"){
    isDone = true
    listTodos()
}

// deno run --allow-all ./cli/crudTodo/cli.ts delete 8
if(!isDone && Deno.args.length == 2 && Deno.args[0] == "delete"){
    isDone = true 
    deleteTask(parseInt( Deno.args[1]))
}

// deno run --allow-all ./cli/crudTodo/cli.ts update 1 sidi
if(!isDone && Deno.args.length == 3 && Deno.args[0] == "update"){
    isDone = true  
    updateTask(
        parseInt( Deno.args[1]),
        Deno.args[2]
    )
}



if(!isDone){
    console.log("read cli/crudTodo/cli.ts content to know available commands")
}