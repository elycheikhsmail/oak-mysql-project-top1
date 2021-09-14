// creer dossier template
//copier dedans les dossiers et les fichiers necessaire pour
//initialiser un nouveau projet
// on distingue -plus tard- plusieur type projet
// --supervisor=true --databasetype=mysql/sqlite/pg/null
import * as fs from "https://deno.land/std@0.106.0/fs/mod.ts";

// remplacer le contenue de add-route  par une referance
// on doit inclur app-exemple par defaut
export async function createProjectTempleFromCode() {
  try {
    //folders
    await fs.copy("./oak-mysql-project-template/.vscode", "./template/.vscode");
    await fs.copy("./oak-mysql-project-template/cli", "./template/cli");

    await fs.copy("./oak-mysql-project-template/app-auth", "./template/app-auth");

    await fs.copy("./oak-mysql-project-template/config", "./template/config");
    await fs.copy("./oak-mysql-project-template/libs", "./template/libs");
    await fs.copy(
      "./oak-mysql-project-template/middlwares",
      "template/middlwares",
    );
    await fs.copy("./oak-mysql-project-template/server", "template/server");
    await fs.copy("./oak-mysql-project-template/tests", "template/tests");
    // files
    await fs.copy(
      "./oak-mysql-project-template/.gitignore",
      "template/.gitignore",
    );
    await fs.copy("./oak-mysql-project-template/app.ts", "template/app.ts");
    await fs.copy(
      "./oak-mysql-project-template/appCli.ts",
      "template/appCli.ts",
    );
    await fs.copy(
      "./oak-mysql-project-template/appTest.ts",
      "template/appTest.ts",
    );
    await fs.copy(
      "./oak-mysql-project-template/README.md",
      "template/README.md",
    );
    //
    await Deno.remove("./template/server/add-routes.ts")
    await fs.copy(
      "./oak-mysql-project-template/server_/add-routes.txt",
      "./template/server/add-routes.ts",
    );
  } catch (error) {
    console.log(error);
  }
}

// creer un nouveau projet nommer <name> basannt le template => fs fs.copy past

export async function newProject(projectName: string) {
  try {
    await fs.copy("template", `${projectName}`);
  } catch (error) {
    console.log(error);
  }
}

// creer les app a tester
// leurs injecter mysql.test.sql
// creer toutes les tables mode test + lancer le server
// dans une nouvelle table je lance les test
