import { IgController } from "./args.ts";
// dunjucks
import nunjucks from "https://deno.land/x/nunjucks@3.2.3/mod.js";
//
import { gController } from "./fn.ts";

enum crudEndpointsTemplates {
  getList = "cList.j2",
  //cGetById
  getById = "cGetById.j2",
  add = "cAdd.j2",
  deleteItem = "cDelete.j2",
  update = "cUpdate.j2",
}

const crudEndpointsTemplatesKeys = [
  "getlist",
  "getbyid",
  "add",
  "delete",
  "update",
];

export function gControllerWithSql(
  c: IgController,
  templateName: string,
  tableName = "todo_tasks",
) {
  // templateName = "cList.j2" for example
  nunjucks.configure("cli/gControllerWithSql/views");
  try {
    // controller file
    const text = nunjucks.render(templateName, c);
    const text2 = String(text);
    const text3 = text2.replace("todo_tasks", tableName);
    gController(c, text3);
  } catch (error) {
    console.log(error);
  }
}
 


export { crudEndpointsTemplates, crudEndpointsTemplatesKeys };
