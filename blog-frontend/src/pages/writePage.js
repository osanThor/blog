import React from 'react';
import Responsive from '../components/common/responsive';
import WriteActionButtons from '../components/write/writeActionButtons';
import EditorContainer from '../containers/write/editorContainer';
import TagBoxContainer from '../containers/write/tagBoxContainer';

const WritePage = () => {
  return (
    <Responsive>
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtons />
    </Responsive>
  );
};

export default WritePage;
