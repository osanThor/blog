import React from 'react';
import { Helmet } from 'react-helmet-async';
import Responsive from '../components/common/responsive';
import EditorContainer from '../containers/write/editorContainer';
import TagBoxContainer from '../containers/write/tagBoxContainer';
import WriteActionButtonContainer from '../containers/write/writeActionButtonContainer';

const WritePage = () => {
  return (
    <Responsive>
      <Helmet>
        <title>글 작성 - REACTERS</title>
      </Helmet>
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonContainer />
    </Responsive>
  );
};

export default WritePage;
