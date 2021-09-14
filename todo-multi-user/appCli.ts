// be in project root and  run the folowing command to see all available commandes
// deno run --allow-all  --watch --unstable appCli.ts 

import { helpMessage } from "./cli/helpers/help-message.ts";
//
import { createAllTables } from "./config/mysql/helper.ts";
//
import { run as rungDefaultAddRoutes } from "./cli/gDefaultAddRoute/run.ts";
// g app functions
import { buildApp } from "./cli/gApp/fn.ts"; 
import {
  createMysqlConfigDbForCRUD,
  createTestForCRUD,
  prepareCopySqlAndTest,
} from "./cli/gApp/mod.ts";
//import { gController as buildController } from "./gController/fn.ts";
import { methodsArrays } from "./cli/gControllerWithSql/args.ts";
//
import { gControllerDefault } from "./cli/gControllerWithSql/mod.ts";
import {
  crudEndpointsTemplates,
  crudEndpointsTemplatesKeys,
  gControllerWithSql,
  gCrudCtrs,
} from "./cli/gControllerWithSql/mod.ts";

let isDone = false;

if (!isDone && Deno.args.length == 1 && Deno.args[0] == "-h") {
  isDone = true;
  helpMessage();
}

// deno run --allow-all --unstable appCli.ts  copyTest app-todo /todo
if (!isDone && Deno.args.length == 3 && Deno.args[0] == "copyTest") {
  isDone = true;
  const app = Deno.args[1];
  const testUrl = Deno.args[2];
  createTestForCRUD(app, testUrl);
}

// deno run --allow-all --unstable appCli.ts  copySql app-todo task
if (!isDone && Deno.args.length == 3 && Deno.args[0] == "copySql") {
  isDone = true;
  const app = Deno.args[1];
  const tableName = Deno.args[2];
  createMysqlConfigDbForCRUD(app, tableName);
}

// deno run --allow-all --unstable appCli.ts  preparegApp
if (!isDone && Deno.args.length == 1 && Deno.args[0] == "preparegApp") {
  isDone = true;
  prepareCopySqlAndTest("app-todo");
}

// deno run --allow-all --unstable appCli.ts  initDb
if (!isDone && Deno.args.length == 1 && Deno.args[0] == "initDb") {
  isDone = true;
  await createAllTables(false);
}


// deno run --allow-all --unstable appCli.ts  initTestDb
if (!isDone && Deno.args.length == 1 && Deno.args[0] == "initTestDb") {
  isDone = true;
  await createAllTables(true);
}


// deno run --allow-all --unstable appCli.ts  gAppEmpty todo /todo
if (!isDone && Deno.args.length == 3 && Deno.args[0] == "gAppEmpty") {
  isDone = true;
  await buildApp({
    appName: Deno.args[1],
    appUrlPrefix: Deno.args[2],
  });
}

// deno run --allow-all --unstable appCli.ts  gApp foo /foo
if (!isDone && Deno.args.length == 3 && Deno.args[0] == "gApp") {
  isDone = true;
  await buildApp({
    appName: Deno.args[1],
    appUrlPrefix: Deno.args[2],
  });
  gControllerDefault({
    appName: Deno.args[1],
    controllerName: "index",
    contollerMethod: "get",
    controllerUrlPrefix: "/",
  });
}

// deno run --allow-all --unstable appCli.ts  gController foo index  get  /
if (!isDone && Deno.args.length == 5 && Deno.args[0] == "gController") {
  isDone = true;
  console.log(Deno.args[3]);
  const a = methodsArrays.filter(
    (v) => v == Deno.args[3],
  );
  if (a.length == 1) {
    gControllerDefault({
      appName: Deno.args[1],
      controllerName: Deno.args[2],
      contollerMethod: Deno.args[3],
      controllerUrlPrefix: Deno.args[4],
    });
  } else {
    console.log("invalide http method");
  }
}

// deno run --allow-all --unstable appCli.ts  gControllerSql auth protectCtr  /protected getlist
// 0 => gControllerSql
// 1 => app name example auth
// 2 => controller name example loginCt
// 3 => url in the app example /login
// 4 => controller type one of the string : add getlist getbyid delete update
if (!isDone && Deno.args.length == 5 && Deno.args[0] == "gControllerSql") {
  let isCorrectTarget = true;
  const controllerType = Deno.args[4];
  const lst = crudEndpointsTemplatesKeys.filter((v) => v == controllerType);
  if (lst.length == 0) isCorrectTarget = false;

  const ctrOptions1 = {
    appName: Deno.args[1],
    controllerName: Deno.args[2],
    //contollerMethod: "post",
    controllerUrlPrefix: Deno.args[3],
  };

  if (isCorrectTarget && controllerType == "add") {
    const ctrOptions = { ...ctrOptions1, contollerMethod: "post" };
    gControllerWithSql(ctrOptions, crudEndpointsTemplates.add);
    isDone = true;
  }

  if (isCorrectTarget && controllerType == "getlist") {
    const ctrOptions = { ...ctrOptions1, contollerMethod: "get" };
    gControllerWithSql(ctrOptions, crudEndpointsTemplates.getList);
    isDone = true;
  }

  if (isCorrectTarget && controllerType == "getbyid") {
    const ctrOptions = { ...ctrOptions1, contollerMethod: "get" };
    gControllerWithSql(ctrOptions, crudEndpointsTemplates.getById);
    isDone = true;
  }

  if (isCorrectTarget && controllerType == "delete") {
    const ctrOptions = { ...ctrOptions1, contollerMethod: "delete" };
    gControllerWithSql(ctrOptions, crudEndpointsTemplates.deleteItem);
    isDone = true;
  }

  if (isCorrectTarget && controllerType == "update") {
    const ctrOptions = { ...ctrOptions1, contollerMethod: "put" };
    gControllerWithSql(ctrOptions, crudEndpointsTemplates.update);
    isDone = true;
  }

  if (!isCorrectTarget) {
    console.log("suported controllers ares : ", crudEndpointsTemplatesKeys);
  }
}

// deno run --allow-all --unstable appCli.ts  gAppCrud todo task
// if (!isDone && Deno.args[0] == "gAppCrud" && Deno.args.length == 4) {
//   const appName = Deno.args[1];
//   const ctrPrefix = Deno.args[2];
//   const tableName = Deno.args[3];
//   gCrudCtrs(appName, ctrPrefix, tableName);
//   isDone = true;
// }

// deno run --allow-all --unstable appCli.ts  gAppCrudComplete todo task  task /todo
if (!isDone && Deno.args[0] == "gAppCrudComplete" && Deno.args.length == 5) {
  const appName = Deno.args[1];
  const ctrPrefix = Deno.args[2];
  const tableName = Deno.args[3];
  const appUrlPrefix = Deno.args[4];
  await buildApp({
    appName,
    appUrlPrefix,
  });
  gCrudCtrs(appName, ctrPrefix, tableName);
  createTestForCRUD("app-" + appName, appUrlPrefix);
  createMysqlConfigDbForCRUD("app-" + appName, tableName);
  isDone = true;
}

// deno run --allow-all --unstable appCli.ts  gexample
if (!isDone && Deno.args.length == 1 && Deno.args[0] == "gexample") {
  isDone = true;
  Deno.removeSync("./app-example", { recursive: true });
  Deno.removeSync("./server/add-routes.ts");
  rungDefaultAddRoutes();
  buildApp({
    appName: "example",
    appUrlPrefix: "/",
  });
  gControllerDefault({
    appName: "example",
    controllerName: "index",
    contollerMethod: "get",
    controllerUrlPrefix: "/",
  });
}

if (!isDone) {
  console.log("read appCli.ts file content");
  console.log(" appCli examples of possibles commands are in appCli.ts ");
}
// deno run --allow-all  --unstable appCli.ts
