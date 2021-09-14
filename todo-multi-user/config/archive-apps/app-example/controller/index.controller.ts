import { Context } from "../deps-managed.ts";
import { getSqliteDb } from "../../config/sqlite/dbclient.ts";
// nujucks template engine
import nunjucks from "https://deno.land/x/nunjucks@3.2.3/mod.js";
nunjucks.configure("app-example/controller/views");

export async function indexController(ctx: Context) { 
  //db client
  const db =  getSqliteDb()

  console.log(ctx.request.method);
  if (ctx.request.method == "POST" && ctx.request.hasBody) { 
    const body = ctx.request.body({ type: "form" }); 
    const values = await body.value;
    const task = values.get("task"); 
    db.query("INSERT INTO tasks (task) VALUES (?)", [task]); 
  }


  const tasks = [];
  for (const [id, task] of db.query("SELECT  id , task FROM tasks ")) {
    tasks.push(
      {
        id,
        task,
      },
    );
  }
  db.close();
  const html = nunjucks.render("todolist.html", {
    data: tasks,
    title: "tasks lists 2",
  });

  ctx.response.body = html;

  ctx.response.headers.append(
    "content-type",
    "text/html",
  );
}
