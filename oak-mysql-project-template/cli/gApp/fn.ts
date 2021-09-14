import { IgApp } from "./args.ts";
import { copy } from "https://deno.land/std@0.106.0/fs/mod.ts";

import nunjucks from "https://deno.land/x/nunjucks@3.2.3/mod.js";


export async function buildApp(a: IgApp) {
  // generate APP FUNCTION
  const appName1 = a.appName;

  a.appName = "app-" + a.appName;

  console.log(Deno.cwd());
  let appRouteText = "";

  try {
      nunjucks.configure("cli/gApp/views");
      appRouteText = nunjucks.render("addRoute.j2", {
      appName1,
      appName: a.appName,
      urlPrefix: a.appUrlPrefix,
    });
  } catch (error) {
    console.log(error);
    console.log("--------------------------")
  }
  try {
    await copy("./cli/gApp/views/appTemplate", a.appName);
    let text = "";
    // read server/add-middlwares-after.ts file content
    text = Deno.readTextFileSync(`server/add-routes.ts`);
    // update server/add-middlwares-after.ts file content,
    //  remove  ... export{app}
    text = text.replaceAll("export{app}", "");
    // append urlprefix
    //cli/gApp/views/add-route/add-route.j2
    text += appRouteText;
    // append ...
    text += `
export{app}
        `;
    // rewrite the file content
    Deno.writeTextFileSync(`server/add-routes.ts`, text);

    console.log("app is build succeffuly");
  } catch (error) {
    console.log(" task failed ");
    console.log(error);
    console.log("------------------------")
  }
}
