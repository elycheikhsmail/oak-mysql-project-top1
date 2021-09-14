export function createTestForCRUD(app: string, appPrefix: string) {
  console.log(Deno.cwd())
  try {
    const src = `./cli/gApp/src/app-todo/test/app.test.txt`;
    console.log({src})

    const textTest = Deno.readTextFileSync(src);
    const textTest2 = String(textTest);
    const textTest3 = textTest2.replaceAll("/todo", appPrefix) 
    
    const destination = `./${app}/test/app.test.ts`;
    console.log({destination})
    Deno.writeTextFileSync(destination, textTest3);
  } catch (error) {
    console.log(error);
    Deno.exit()
  }
}
