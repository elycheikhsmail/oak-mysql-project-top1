import { IgController } from "./args.ts";
// dunjucks
import nunjucks from "https://deno.land/x/nunjucks@3.2.3/mod.js";

import { gController } from "./fn.ts";

export function gControllerDefault(c: IgController) { 
 
  try {
    // controller file 
    nunjucks.configure("cli/gControllerWithSql/views");
    const text = nunjucks.render("cHtml.j2", c);
     gController(c,text)

  } catch (error) {
    console.log(" task failed ");
    console.log(error);
    console.log("------------------------")
  }
}
