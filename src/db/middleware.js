import Global from './global/global.middleware';

const middlewares = {
  ...Global,
};

export default (store, next, action) => {
  let middleware = middlewares[action.type];
  if (middleware) middleware(store, next, action);
  
  next(action);
}