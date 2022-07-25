let postId = 1;

const posts = [
  {
    id: 1,
    title: '제목',
    body: '내용',
  },
];

/* 포스트 작성 */
exports.write = (ctx) => {
  //REST API Request Body는 ctx.request.body에서 조회할 수 있습니다.
  const { title, body } = ctx.request.body;
  postId += 1; //기존 postId 값에 1을 더합니다
  const post = { id: postId, title, body };
  posts.push(post);
  ctx.body = post;

  /* 포스트  목록 조회 */
  exports.list = (ctx) => {
    ctx.body = posts;
  };

  /* 특정 포스트 조회 */
  exports.read = (ctx) => {
    const { id } = ctx.params;
    //주어진 id 값으로 포스트를 찾습니다.
    //파라미터롤 받아온 값을 문자열 형식이므로 파라미터를 숫자로 반환하거나
    // 비교할 p.id 값을 문자열로 변경해야합니다.
    const post = posts.find((p) => p.id.toString() === id);

    // 포스트가 없으면 오류를 반환합니다.
    if (!post) {
      ctx.status = 404;
      ctx.body = {
        message: '포스트가 존재하지 않습니다.',
      };
      return;
    }
    ctx.body = post;
  };

  /* 특정 포스트 제거 */
  exports.remove = (ctx) => {
    const { id } = ctx.params;
    //해당 id를 가진 post가 몇 번째인지 확인
    const index = posts.findIndex((p) => p.id.toString() === id);
    //post가 없으면 오류
    if (index === -1) {
      ctx.status = 404;
      ctx.body = {
        message: '포스트가 존재하지 않습니다.',
      };
      return;
    }
    //index번째 item 제거
    posts.splice(index, 1);
    ctx.status = 204;
  };

  /* post 수정 */
  exports.replace = (ctx) => {
    const { id } = ctx.params;
    const index = posts.findIndex((p) => p.id.toString() === id);
    if (index === -1) {
      ctx.status = 404;
      ctx.body = {
        message: '포스트가 존재하지 않습니다.',
      };
      return;
    }
    posts[index] = {
      id,
      ...ctx.request.body,
    };
    ctx.body = posts[index];
  };

  /* 포스트 수정(특정 필드 변경) */
  exports.update = (ctx) => {
    const { id } = ctx.params;
    const index = posts.findIndex((p) => p.id.toString() === id);
    if (index === -1) {
      ctx.status = 404;
      ctx.body = {
        message: '포스트가 존재하지 않습니다',
      };
      return;
    }
    posts[index] = {
      ...posts[index],
      ...ctx.request.body,
    };
    ctx.body = posts[index];
  };
};
