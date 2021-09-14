deno run --allow-all --unstable appCli.ts  preparegApp
cd ..
deno run --allow-all --unstable cli.ts removetemplate
deno run --allow-all --unstable cli.ts newtemplate 
deno run --allow-all --unstable cli.ts newproject todo-multi-user
cd todo-multi-user

deno run --allow-all --unstable appCli.ts  gAppCrudComplete todo task  task /todo
deno run --allow-all --unstable appCli.ts  gAppCrudComplete post post  post /post
deno run --allow-all --unstable appTest.ts  


 in new tab
deno test --allow-all --unstable ./app-todo/test/app.test.ts
deno test --allow-all --unstable ./app-post/test/app.test.ts




//ref



deno run --allow-all --unstable appCli.ts  gAppEmpty todo /todo
deno run --allow-all --unstable appCli.ts  gAppCrud todo todo task
 

deno run --allow-all --unstable appCli.ts  copyTest app-todo /todo 
deno run --allow-all --unstable appCli.ts  copySql app-todo task

// gControllerSqlAdd  gControllerSqlList gControllerSqlDelete gControllerSqlUpdate

 deno run --allow-all --unstable appCli.ts  gControllerSqlList todo getTaskById /

 must copy test auto



 //deno run --allow-all --unstable appCli.ts  copyfortest

deno run --allow-all --unstable appCli.ts  gControllerSql todo addTask  / add
deno run --allow-all --unstable appCli.ts  gControllerSql todo indexTasks / getlist
deno run --allow-all --unstable appCli.ts  gControllerSql todo taskById /:id getbyid
deno run --allow-all --unstable appCli.ts  gControllerSql todo deleteTask /:id delete
deno run --allow-all --unstable appCli.ts  gControllerSql todo updateTask /:id update

processus permenant => daemon
processus rapid
processus test => in separate thread

tester le worker


