// deno test --allow-all --unstable app.test.ts
// deno test --allow-all --unstable --location http://localhost ./app-todo/test/app.test.ts
//app-todo/test/app.test.ts

import * as t from "https://deno.land/std@0.102.0/testing/asserts.ts";

import { fetchHepler } from "../../libs/fetch-as-class.ts";

// register user

Deno.test(
  "test register user",
  async () => {
    fetchHepler.setPathname("/auth/register");
    const data = JSON.stringify({ username: "sidi", password: "1234" });
    const response = await fetchHepler.POST(data);
    const dataJson = await response.json();
    const accessToken = dataJson.accessToken;
    localStorage.setItem("accessToken", accessToken);
    t.assertEquals(response.status, 200);
  },
);

Deno.test(
  "test add task",
  async () => {
    fetchHepler.setBaseUrl("http://localhost:3000");
    fetchHepler.setPathname("/task");
    const accessToken = localStorage.getItem("accessToken") || "";
    fetchHepler.setToken(accessToken);
    fetchHepler.setHeaders();
    const data = JSON.stringify({ text: "test1" });
    const response = await fetchHepler.POST(data);
    const bodyAsJson = await response.json();
    t.assertEquals(bodyAsJson.id, 1);
  },
);

// // // test invalide data
// Deno.test(
//   "test add invalid task via invalid json",
//   async () => {
//     fetchHepler.setContentType(false);
//     fetchHepler.setHeaders();
//     const response = await fetchHepler.POST("data");
//     await response.text();
//     t.assertEquals(response.status, 404);
//   },
// );

// Deno.test(
//   "test add valid json but invalid data",
//   async () => {
//     fetchHepler.setContentType(true);
//     fetchHepler.setHeaders();

//     const data = JSON.stringify({ text2: "test1" });
//     const response = await fetchHepler.POST(data);
//     await response.text();
//     t.assertEquals(response.status, 404);
//   },
// );
Deno.test(
  "test list tasks",
  async () => { 
    const response = await fetchHepler.GET();
    const bodyAsJson = await response.json();
    console.log(bodyAsJson);
    t.assertEquals(bodyAsJson.length, 1);
  },
);

Deno.test(
  "test get task by  id",
  async () => {
    fetchHepler.setPathname("/task/1");
    const response = await fetchHepler.GET();
    const bodyAsJson = await response.json();
    console.log(bodyAsJson);
    t.assertEquals(bodyAsJson.task.id, 1);
  },
);

// Deno.test(
//   "test try get by  id not existnig task",
//   async () => {
//     fetchHepler.setPathname("/task/13");
//     const response = await fetchHepler.GET();
//     const bodyAsJson = await response.text();
//     console.log(bodyAsJson);
//     t.assertEquals(response.status, 404);
//   },
// );

Deno.test(
  "test update existing task",
  async () => {
    fetchHepler.setPathname("/task/1");
    const data = JSON.stringify({ text: "test updated" });
    const response = await fetchHepler.PUT(data);
    const bodyAsJson = await response.json();
    t.assertEquals(bodyAsJson.id, 1);
    t.assertEquals(bodyAsJson.text, "test updated");
  },
);

// Deno.test(
//   "test update task does'nt exist",
//   async () => {
//     fetchHepler.setPathname("/task/5");
//     const data = JSON.stringify({ text: "test updated ok" });
//     const response = await fetchHepler.PUT(data);
//     const _d = await response.json();
//     t.assertEquals(response.status, 404);
//   },
// );

// Deno.test(
//   "test delete task does'nt exist",
//   async () => {
//     fetchHepler.setPathname("/task/5");
//     const response = await fetchHepler.DELETE();
//     const _d = await response.text();
//     t.assertEquals(response.status, 404);
//     // t.assertEquals(bodyAsJson.text, "test updated" );
//   },
// );

Deno.test(
  "test delete existing delete",
  async () => {
    fetchHepler.setPathname("/task/1");
    const response = await fetchHepler.DELETE();
    const _d = await response.text();
    t.assertEquals(response.status, 204);
    // t.assertEquals(bodyAsJson.text, "test updated" );
  },
);