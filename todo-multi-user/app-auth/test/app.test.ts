// deno test --allow-all --location=http://localhost --unstable app.test.ts

import * as t from "https://deno.land/std@0.102.0/testing/asserts.ts";

import { fetchHepler } from "../../libs/fetch-as-class.ts";
 
fetchHepler.setBaseUrl("http://localhost:3000")

//accessToken 
Deno.test(
  "test register user",
  async () => { 
    fetchHepler.setPathname("/auth/register");
    const data = JSON.stringify({ username: "sidi" ,password:"1234"});
    const response = await fetchHepler.POST(data); 
    const dataJson = await response.json();
    const accessToken  = dataJson.accessToken 
    localStorage.setItem("accessToken",accessToken )
    t.assertEquals(response.status, 200); 
  },
);

Deno.test(
  "test register already exist user",
  async () => {  
    const data = JSON.stringify({ username: "sidi" ,password:"1234"});
    const response = await fetchHepler.POST(data);
    const bodyAsJson = await response.json();
    t.assertEquals(response.status, 404); 
    t.assertEquals(bodyAsJson.details, "user alredy exist"); 
    
  },
);


Deno.test(
  "test login valid user",
  async () => { 
    fetchHepler.setPathname("/auth/login");
    const data = JSON.stringify({ username: "sidi" ,password:"1234"});
    const response = await fetchHepler.POST(data);
    const bodyAsJson = await response.text();
    console.log(bodyAsJson)
    t.assertEquals(response.status, 200); 
  },
);

Deno.test(
  "test protected url with anonym user",
  async () => { 
    fetchHepler.setPathname("/auth/p"); 
    const response = await fetchHepler.GET()
    const bodyAsJson = await response.text();
    console.log(bodyAsJson)
    t.assertEquals(response.status, 401); 
  },
);


Deno.test(
  "test protected url with authentifate user",
  async () => { 
    fetchHepler.setPathname("/auth/p"); 
    const accessToken  = localStorage.getItem("accessToken") || "" 
    fetchHepler.setToken(accessToken)
    fetchHepler.setHeaders()
    const response = await fetchHepler.GET()
    const bodyAsJson = await response.text();
    console.log(bodyAsJson)
    t.assertEquals(response.status, 200); 
  },
);

