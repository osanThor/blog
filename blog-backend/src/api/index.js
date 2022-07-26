import Router from 'koa-router';
import posts from './posts';

const api = new Router();

api.use('/posts', posts.routes());

//router을 내보냅니다.
export default api;
