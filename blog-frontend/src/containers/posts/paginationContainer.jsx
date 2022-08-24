import React from 'react';
import qs from 'qs';
import { useSelector } from '../../../node_modules/react-redux/es/exports';
import {
  useLocation,
  useParams,
} from '../../../node_modules/react-router-dom/index';
import Pagination from '../../components/post/pagination';

const PaginationContainer = () => {
  const { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
    lastPage: posts.lastPage,
    posts: posts.posts,
    loading: loading['posts/LIST_POSTS'],
  }));
  const params = useParams();
  const location = useLocation();

  if (!posts || loading) return null;

  const { username } = params;

  const { tag, page = 1 } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  return (
    <Pagination
      tag={tag}
      username={username}
      page={parseInt(page, 10)}
      lastPage={lastPage}
    />
  );
};

export default PaginationContainer;
