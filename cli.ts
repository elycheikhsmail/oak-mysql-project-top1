import { createProjectTempleFromCode, newProject } from "./helper.ts";
import * as fs from "https://deno.land/std@0.106.0/fs/mod.ts";

let isDone = false;
// deno run --allow-all --unstable cli.ts newtemplate
if (!isDone && Deno.args.length == 1 && Deno.args[0] == "newtemplate") {
  isDone = true;
  await createProjectTempleFromCode();
}

// deno run --allow-all --unstable cli.ts removetemplate
if (!isDone && Deno.args.length == 1 && Deno.args[0] == "removetemplate") {
  isDone = true;
  const isTemplateExist = await fs.exists("./template");
  if (isTemplateExist) await Deno.remove("./template",{recursive:true});
}

// deno run --allow-all --unstable cli.ts newproject testProject
if (!isDone && Deno.args.length == 2 && Deno.args[0] == "newproject") {
  isDone = true;
  const projectName = Deno.args[1];
  const isProjectExist = await fs.exists(`./${projectName}`);
  if (isProjectExist) {
    await Deno.remove(`./${projectName}`,{recursive:true});
    await newProject(projectName);
  } else {
    await newProject(projectName);
  }
}

if (!isDone) {
  console.log("read appCli.ts file content");
  console.log(" appCli examples of possibles commands are in appCli.ts ");
}
