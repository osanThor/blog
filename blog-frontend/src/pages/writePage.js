import React from 'react';
import Responsive from '../components/common/responsive';
import Editor from '../components/write/editor';
import TagBox from '../components/write/tagBox';

const WritePage = () => {
  return (
    <Responsive>
      <Editor />
      <TagBox />
    </Responsive>
  );
};

export default WritePage;
