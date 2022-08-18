import React from 'react';
import Responsive from '../components/common/responsive';
import TagBox from '../components/write/tagBox';
import WriteActionButtons from '../components/write/writeActionButtons';
import EditorContainer from '../containers/write/editorContainer';

const WritePage = () => {
  return (
    <Responsive>
      <EditorContainer />
      <TagBox />
      <WriteActionButtons />
    </Responsive>
  );
};

export default WritePage;
