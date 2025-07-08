'use client';

import type React from 'react';
import Image from 'next/image';
import { useGlobal } from '@/contexts/global.context';
import { useLockBody } from '@/hooks/useLockBody';
import { ErrorImage, SuccessImage } from '@/libs/constants/assets.const';
import Button from '../button/ButtonPrimary';
import XMarkIcon from '../../icons/XMark';
import Square2StackIcon from '../../icons/Square2Stack';

const preset = {
  success: {
    title: 'Success!',
    icon: SuccessImage,
  },
  error: {
    title: 'Oops!',
    icon: ErrorImage,
  },
};

const FeedbackModal: React.FC = () => {
  const { feedbackModal, onCloseFeedbackModal, onCopyClipboard } = useGlobal();

  useLockBody(!!feedbackModal.open);

  if (!feedbackModal.open) return null;

  const config = preset[feedbackModal.type] || preset.success;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* BACKDROP */}
      <div className="fixed inset-0 bg-ui-900/50 backdrop-blur-sm" onClick={onCloseFeedbackModal} />
      {/* MODAL */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-xs sm:max-w-sm px-6 py-8 rounded-2xl bg-ui-800"
      >
        {/* BODY */}
        <div className="flex flex-col items-center space-y-8">
          <Image src={config.icon} alt="Icon" />
          <div className="space-y-2">
            <h2 className={`text-2xl text-center font-semibold`}>{config.title}</h2>
            {feedbackModal.message && (
              <p className="text-sm text-center">{feedbackModal.message}</p>
            )}
            {feedbackModal.traceId && (
              <div className="flex item-center justify-center gap-2">
                <span
                  className="flex items-center gap-2 text-xs font-semibold cursor-pointer"
                  onClick={() => onCopyClipboard(feedbackModal.traceId as string)}
                >
                  <Square2StackIcon className="h-6 w-6" />
                  Report ID
                </span>
              </div>
            )}
          </div>
          <Button onClick={onCloseFeedbackModal}>Close</Button>
        </div>
        {/* CLOSE */}
        <button onClick={onCloseFeedbackModal} className="absolute top-3 right-3">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;
