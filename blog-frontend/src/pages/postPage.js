import React from 'react';
import PostViewer from '../components/post/postViewer';
import HeaderContainer from '../containers/common/headerContainer';

const PostPage = () => {
  return (
    <>
      <HeaderContainer />
      <PostViewer />
    </>
  );
};

export default PostPage;
