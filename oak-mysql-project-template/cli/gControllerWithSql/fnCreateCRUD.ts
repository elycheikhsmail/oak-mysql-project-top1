import {
  crudEndpointsTemplates,
  crudEndpointsTemplatesKeys,
  gControllerWithSql,
} from "./fnWithSql.ts";

export function gCrudCtrs(
  appName: string,
  ctrPrefix: string,
  tableName :string
  //= "app_tasks",
) {
  // fuction body
  console.log({ tableName });
  // add
  const ctrOptionsPost = {
    appName,
    controllerName: `${ctrPrefix}Add`,
    controllerUrlPrefix: "/",
    contollerMethod: "post",
  };
  gControllerWithSql(ctrOptionsPost, crudEndpointsTemplates.add , tableName);
  // get list
  const ctrOptionsGetList = {
    appName,
    controllerName: `${ctrPrefix}List`,
    controllerUrlPrefix: "/",
    contollerMethod: "get",
  };
  gControllerWithSql(ctrOptionsGetList, crudEndpointsTemplates.getList, tableName);
  // get by id
  const ctrOptionsGetById = {
    appName,
    controllerName: `${ctrPrefix}ById`,
    controllerUrlPrefix: "/:id",
    contollerMethod: "get",
  };
  gControllerWithSql(ctrOptionsGetById, crudEndpointsTemplates.getById, tableName);
  // delete by id
  const ctrOptionsDelete = {
    appName,
    controllerName: `${ctrPrefix}Delete`,
    controllerUrlPrefix: "/:id",
    contollerMethod: "delete",
  };
  gControllerWithSql(ctrOptionsDelete, crudEndpointsTemplates.deleteItem, tableName);
  // upate item
  const ctrOptionsUpdate = {
    appName,
    controllerName: `${ctrPrefix}Update`,
    controllerUrlPrefix: "/:id",
    contollerMethod: "put",
  };
  gControllerWithSql(ctrOptionsUpdate, crudEndpointsTemplates.update, tableName);
}

export { crudEndpointsTemplates, crudEndpointsTemplatesKeys };
