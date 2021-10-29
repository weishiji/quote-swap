async function init(args) {
  const app = require('next').default(args);
  await app.prepare();
  return app.getRequestHandler();
}

exports.default = init;
