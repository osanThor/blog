import React from 'react';
import HeaderContainer from '../containers/common/headerContainer';
import PaginationContainer from '../containers/posts/paginationContainer';
import PostListContainer from '../containers/posts/postListContainer';

const PostListPage = () => {
  return (
    <>
      <HeaderContainer />
      <PostListContainer />
      <PaginationContainer />
    </>
  );
};

export default PostListPage;
