import { ServerResponse, IncomingMessage } from 'http';
import { parse } from 'url';
import { getUser, addUser, deleteUser } from '../controller/userContoller.js';
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
        if (getResult.code === 200) {
          generateResponse({
            res,
            statusCode: 200,
            message: getResult.data,
          });
        } else if (getResult.code === 404) {
          generateResponse({ res, statusCode: 404, message: "User with this id doesn't found" });
        } else {
          generateResponse({ res, statusCode: 400, message: "Invalid user id" });
        }
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
        if (!userId) {
          generateResponse({ res, statusCode: 404, message: 'Page not found' });
        } else {
          const deleteResult = deleteUser(userId);
          if (deleteResult === 204) {
            generateResponse({ res, statusCode: 204, message: '' });
          } else if (deleteResult === 404) {
            generateResponse({ res, statusCode: 404, message: "User with this id doesn't found" });
          } else {
            generateResponse({ res, statusCode: 400, message: "Invalid user id" });
          }
        }
        break;
      case CrudOperations.PUT:
      default:
        generateResponse({ res, statusCode: 404, message: 'Page not found' });
    }
  } catch {
    generateResponse({ res, statusCode: 500, message: 'Internal server error' });
  }
};
