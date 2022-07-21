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
    const post = posts.find;
  };
};
