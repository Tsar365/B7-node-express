import type { ServerResponse } from "node:http";

export const sendresponse=(res: ServerResponse, statusCode:number,success: boolean, message: string, data: any)=>{



const response={
    success: success,
    message: message,
    data: data,
}


res.writeHead(200, { "Content-Type": "application/json" });
res.end(
  JSON.stringify(response),
);
}
;
