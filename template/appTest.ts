// for start app run this code
// deno run --allow-all --unstable appTest.ts  
import { parse } from "https://deno.land/std@0.105.0/flags/mod.ts";
//local import
import { app } from "./server/add-middlwares-after.ts";  
import {  createAllTables } from "./config/mysql/helper.ts";
// for insure compatiblity
import { settings } from "./config/mod.ts";
settings.compareDenoVersion(settings.denoSupportedVersion);
// extract arg data
const { args } = Deno;
const DEFAULT_PORT = 3000;
const argPort = parse(args).port;
console.log({ argPort }); 
// changer certain vars d'environnement pour passer a la base de donnees test
Deno.env.set("DBUSER","denotest")
Deno.env.set("DBNAME","denotest")
Deno.env.set("DBPASSWORD","denotest")

 createAllTables(true)
//
const port = argPort ? Number(argPort) : DEFAULT_PORT;
console.log({ port });
console.log(
  "=====================================================================================",
);

await app.listen({ port });

// deno run --allow-all --unstable app.ts
