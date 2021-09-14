import { IgController } from "./args.ts";
// dunjucks
import nunjucks from "https://deno.land/x/nunjucks@3.2.3/mod.js";
//
export function gController(c: IgController,controllerText:string) {
  nunjucks.configure("cli/gControllerWithSql/views");
  // passer les params au template
  let appNameCapital = c.appName;
  const f = appNameCapital.charAt(0).toUpperCase();
  appNameCapital = f + appNameCapital.slice(1);
  c.appName = "app-" + c.appName;
 
  try {
    // controller file 
    let text = controllerText
    // nunjucks.render("cAdd.j2", c);
    const p = `${c.appName}/controller/${c.controllerName}.Ctr.ts`;
    Deno.writeTextFileSync(p, text);
    // routes.ts fil
    const exportTextStatament = "export { routes };";
    text = Deno.readTextFileSync(`${c.appName}/routes.ts`);
    text = text.replaceAll(exportTextStatament, "");
    const addControlerText = nunjucks.render("add-controller.j2", c);
    text += addControlerText;
    text += exportTextStatament;
    Deno.writeTextFileSync(`${c.appName}/routes.ts`, text);
    console.log("controller is build succeffuly");

  } catch (error) {
    console.log(error);
  }
}
