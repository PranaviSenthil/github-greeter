import handler from "../../dist/server/server.js";

export const config = {
  path: "/*",
};

export default async (request, context) => {
  return handler.fetch(request, {}, context);
};
