// copier les fichier mysql.sql et mysql.test depuis src vers app-todo et app-auth

import { copySync } from "https://deno.land/std@0.106.0/fs/mod.ts";

import * as fs from "https://deno.land/std@0.106.0/fs/mod.ts";

interface IFileExchane {
  destination: string;
  src: string;
}
function setIfileExchange(
  app: string,
  destinationExt = "config/db/mysql.sql",
  srcExt = "config/db/mysql.sql",
): IFileExchane {
  const destination = `./cli/gApp/src/${app}/${destinationExt}`;
  const src = `./${app}/${srcExt}`;
  return {
    destination,
    src,
  };
}
function copyHelper(fe: IFileExchane) { 
  const { destination, src } = fe;
  try {
    if (fs.existsSync(destination)) {
      Deno.removeSync(destination);
    }
    copySync(src, destination);
  } catch (_error) {
    console.log(_error);
    Deno.exit()
  }
}

export function prepareCopySqlAndTest(app: string) {
  const directory = `./cli/gApp/src/${app}`
  if(fs.existsSync(directory)){
    Deno.removeSync(directory,{recursive:true})
  }
  fs.copySync(`./cli/gApp/src/appModel`,`./cli/gApp/src/${app}`)
  let fe = setIfileExchange(
    app,
    "config/db/mysql.sql",
    "config/db/mysql.sql",
  );
  copyHelper(fe);

  fe = setIfileExchange(
    app,
    "config/db/mysql.test.sql",
    "config/db/mysql.test.sql",
  );
  copyHelper(fe);

  fe = setIfileExchange(
    app,
    "test/app.test.txt",
    "test/app.test.ts",
  );
  copyHelper(fe);
}
