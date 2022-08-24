import React, { useEffect } from 'react';
import {
  useDispatch,
  useSelector,
} from '../../../node_modules/react-redux/es/exports';
import { useParams } from '../../../node_modules/react-router-dom/index';
import PostViewer from '../../components/post/postViewer';
import { readPost, unloadPost } from '../../modules/post';

const PostViewerContainer = () => {
  const params = useParams();
  const postId = params.postId;
  const dispatch = useDispatch();
  const { post, error, loading } = useSelector(({ post, loading }) => ({
    post: post.post,
    error: post.error,
    loading: loading['post/READ_POST'],
  }));
  useEffect(() => {
    dispatch(readPost(postId));
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);
  return <PostViewer post={post} loading={loading} error={error} />;
};

export default PostViewerContainer;
