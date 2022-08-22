import React from 'react';
import Responsive from '../components/common/responsive';
import EditorContainer from '../containers/write/editorContainer';
import TagBoxContainer from '../containers/write/tagBoxContainer';
import WriteActionButtonContainer from '../containers/write/writeActionButtonContainer';

const WritePage = () => {
  return (
    <Responsive>
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonContainer />
    </Responsive>
  );
};

export default WritePage;
