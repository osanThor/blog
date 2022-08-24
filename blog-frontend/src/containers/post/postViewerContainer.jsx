import React, { useEffect } from 'react';
import {
  useDispatch,
  useSelector,
} from '../../../node_modules/react-redux/es/exports';
import PostViewer from '../../components/post/postViewer';
import { readPost, unloadPost } from '../../modules/posts';

const PostViewerContainer = ({ match }) => {
  const { postId } = '630102c118ff4c0126a37174';
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
