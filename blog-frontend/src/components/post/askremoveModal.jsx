import React from 'react';
import AskModal from '../common/askModal';

const AskremoveModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <AskModal
      visible={visible}
      title="포스트 삭제"
      description="포스트를 정말 삭제하시겠습니까?"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default AskremoveModal;
