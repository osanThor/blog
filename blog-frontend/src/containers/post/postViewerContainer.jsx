import React, { useEffect } from 'react';
import {
  useDispatch,
  useSelector,
} from '../../../node_modules/react-redux/es/exports';
import {
  useNavigate,
  useParams,
} from '../../../node_modules/react-router-dom/index';
import PostActionButtons from '../../components/post/postActionButtons';
import PostViewer from '../../components/post/postViewer';
import { removePost } from '../../lib/api/posts';
import { readPost, unloadPost } from '../../modules/post';
import { setOriginalPost } from '../../modules/write';

const PostViewerContainer = () => {
  const params = useParams();
  const postId = params.postId;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, error, loading, user } = useSelector(
    ({ post, loading, user }) => ({
      post: post.post,
      error: post.error,
      loading: loading['post/READ_POST'],
      user: user.user,
    }),
  );
  useEffect(() => {
    dispatch(readPost(postId));
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  const onEdit = () => {
    dispatch(setOriginalPost(post));
    navigate('/write');
  };

  const onRemove = async () => {
    try {
      await removePost(postId);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const ownPost = (user && user._id) === (post && post.user._id);

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={
        ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove} />
      }
    />
  );
};

export default PostViewerContainer;
