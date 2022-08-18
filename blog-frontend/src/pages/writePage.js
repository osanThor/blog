import React from 'react';
import Responsive from '../components/common/responsive';
import Editor from '../components/write/editor';
import TagBox from '../components/write/tagBox';
import WriteActionButtons from '../components/write/writeActionButtons';

const WritePage = () => {
  return (
    <Responsive>
      <Editor />
      <TagBox />
      <WriteActionButtons />
    </Responsive>
  );
};

export default WritePage;
