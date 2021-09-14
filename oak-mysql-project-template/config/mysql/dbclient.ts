// deno run --allow-all dbclient.ts
import { Client } from "https://deno.land/x/mysql@v2.10.0/mod.ts";
import { configLogger } from "https://deno.land/x/mysql@v2.10.0/mod.ts";
await configLogger({ enable: false });

function getFromEnv(key: string, defaultValue: string): string {
  const value = Deno.env.get(key);
  if (value) {
    return value;
  } else {
    return defaultValue;
  }
}

//Deno.env.get
export async function getDb() {
  const client = await new Client().connect({
    hostname: getFromEnv("HOST", "127.0.0.1"),
    username: getFromEnv("DBUSER", "deno"),
    db: getFromEnv("DBNAME", "deno"),
    password: getFromEnv("DBPASSWORD", "deno"),
    poolSize: 3,
  });
  return client;
}

const client = await getDb();

export { client as db };
