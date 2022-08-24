import React, { useEffect } from 'react';
import qs from 'qs';
import {
  useDispatch,
  useSelector,
} from '../../../node_modules/react-redux/es/exports';
import {
  useLocation,
  useParams,
} from '../../../node_modules/react-router-dom/index';
import { listPosts } from '../../modules/posts';
import PostList from '../../components/post/postList';

const PostListContainer = () => {
  const dispatch = useDispatch();
  const { posts, error, loading, user } = useSelector(
    ({ posts, loading, user }) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading['posts/LIST_POSTS'],
      user: user.user,
    }),
  );

  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    const { username } = params;
    const { tag, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listPosts({ tag, username, page }));
  }, [dispatch, location.search, params]);

  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user}
    />
  );
};

export default PostListContainer;
