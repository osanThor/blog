import React from 'react';
import PostList from '../components/post/postList';
import HeaderContainer from '../containers/common/headerContainer';

const PostListPage = () => {
  return (
    <>
      <HeaderContainer />
      <PostList />
    </>
  );
};

export default PostListPage;
