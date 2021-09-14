
import type { Header  } from "https://deno.land/x/djwt@v2.3/mod.ts"

const key = await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
  );
  
  const header: Header = {
    alg: "HS512",
    typ: "JWT",
  };

  export {
      key,
      header
  }