import Server from "./common/server";
import routes from './common/routes';
import "reflect-metadata"
/**
 * Start Express server.
 */
const server = new Server()
  .router(routes)
  .listen(8080, () => {
    console.log("server ready");
  });

export default server;