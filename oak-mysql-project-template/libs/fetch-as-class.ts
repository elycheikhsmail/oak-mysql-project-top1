export interface userInterface {
  username: string;
  password: string;
}

class FetchHelper {
  #contentTypeIsJson: boolean;
  #baseUrl: string;
  #pathname: string;
  #url: string;
  #token: string;
  #headers: {
    "Content-Type": string;
    "Access-Control-Allow-Origin": string;
    authorization?: string;
  };

  constructor() {
    this.#contentTypeIsJson = true;
    this.#baseUrl = "http://localhost:3000";
    this.#pathname = "";
    this.#url = "";
    this.#token = "";
    this.#headers = this.getHeaders();
  }

  POST(body: string) {
    return fetch(this.#url, { method: "POST", body, headers: this.#headers });
  }
  GET() {
    return fetch(this.#url, { method: "GET", headers: this.#headers });
  }
  PUT(body: string) {
    return fetch(this.#url, { method: "PUT", body, headers: this.#headers });
  }
  DELETE() {
    return fetch(this.#url, { method: "DELETE", headers: this.#headers });
  }

  setBaseUrl(baseUrl: string) {
    this.#baseUrl = baseUrl;
  }
  /**
   *  
   * this function will update pathname ande url too
   */
  setPathname(pathname: string) {
    this.#pathname = pathname;
    this.setUrl(this.#baseUrl + this.#pathname);
  }

  setUrl(url: string) {
    this.#url = url;
  }
  getUrl() {
    return this.#url;
  }
  setToken(token: string) {
    this.#token = token;
  }
  setContentType(isJson: boolean) {
    this.#contentTypeIsJson = isJson;
  }

  getHeaders(token?: string): {
    "Content-Type": string;
    "Access-Control-Allow-Origin": string;
    authorization?: string;
  } {
    const headers1 = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    const headers2 = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "authorization": `bearer ${token}`,
    };
    if (token) return headers2;
    else return headers1;
  }
 
  setHeaders(): void { 
    this.#headers = this.getHeaders(this.#token)
  }

 


}

const fetchHepler = new FetchHelper();
export { fetchHepler };

// export function getBaseUrl() {
//   let todoUrl = "http://localhost:8080";
//   if (Deno) {
//     const u = Deno.env.get("OAK_SQLITE_BASE_URL");
//     if (u) todoUrl = u;
//   }
//   return todoUrl;
// }
