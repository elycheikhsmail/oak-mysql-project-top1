export function createMysqlConfigDbForCRUD(app: string, tableName: string) {
  console.log(Deno.cwd())
  try {
    const src = `./cli/gApp/src/app-todo/config/db/mysql.sql`;
    const textTest = Deno.readTextFileSync(src);
    const textTest2 = String(textTest);
    const textTest3 = textTest2.replaceAll("todo_tasks", tableName);
    //oak-mysql-project-template/app-todo/test/app.test.ts
    const destination = `./${app}/config/db/mysql.sql`;
    Deno.writeTextFileSync(destination, textTest3);
  } catch (error) {
    console.log(error);
    Deno.exit()
  }

  try {
    const src = `./cli/gApp/src/app-todo/config/db/mysql.test.sql`;
    const textTest = Deno.readTextFileSync(src);
    const textTest2 = String(textTest);
    const textTest3 = textTest2.replaceAll("todo_tasks", tableName);
    //oak-mysql-project-template/app-todo/test/app.test.ts
    const destination = `./${app}/config/db/mysql.test.sql`;
    Deno.writeTextFileSync(destination, textTest3);
  } catch (error) {
    console.log(error);
  }

}
