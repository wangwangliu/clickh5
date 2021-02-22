module.exports = (app) => {
  const { router, controller } = app;
  router.get('/*', controller.index.main);
  // router.get(['/:id?', /\/([\w|\d]+)\/.*/], controller.index.main);
};
