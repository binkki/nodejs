import { ServerResponse, IncomingMessage } from 'http';
import { parse } from 'url';
import { getUser, addUser } from '../controller/userContoller.js';
import { CrudOperations, ResponseInfo } from '../types/types.js';

const generateResponse = (data: ResponseInfo) => {
  data.res.writeHead(data.statusCode, { 'Content-Type': 'application/json' });
  data.res.end(JSON.stringify(data.message));
};

export const handleServerResponse = (req: IncomingMessage, res: ServerResponse) => {
  try {
    const endpoint = '/api/users';
    let { method, url } = req;
    const parsedUrl = parse(url!, true);
    const pathname = parsedUrl.pathname || '';
    if (
      !pathname.startsWith(endpoint) ||
      pathname.split('/')?.length > 4 ||
      (pathname.split('/')?.length === 3 && pathname !== endpoint)
    ) {
      method = 'WRONG METHOD';
    }
    const userId = pathname?.split('/')?.at(3) || undefined;
    switch (method) {
      case CrudOperations.GET:
        const getResult = getUser(userId);
        getResult.length
          ? generateResponse({
              res,
              statusCode: 200,
              message: getResult,
            })
          : generateResponse({ res, statusCode: 404, message: 'Page not found' });
        break;
      case CrudOperations.POST:
        if (pathname !== endpoint) {
          generateResponse({ res, statusCode: 404, message: 'Page not found' });
        } else {
          let requestBody = "";
          req.on("data", (chunk) => requestBody += chunk.toString());
          req.on('end', () => {
            if (requestBody.trim() !== "") {
              const postResult = addUser(requestBody);
              postResult.id === ""
              ? generateResponse({ res, statusCode: 404, message: "Body doesn't contain required fields" })
              : generateResponse({ res, statusCode: 201, message: [postResult] });
            } else {
              generateResponse({ res, statusCode: 404, message: "Body doesn't contain required fields" });
            }          
          });  
        }
        break;
      case CrudOperations.DELETE:
      case CrudOperations.PUT:
        break;
      default:
        generateResponse({ res, statusCode: 404, message: 'Page not found' });
    }
  } catch {
    generateResponse({ res, statusCode: 500, message: 'Internal server error' });
  }
};
