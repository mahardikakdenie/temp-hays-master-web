'use client';

import type React from 'react';
import type { Device, Nullable } from '@/types/commons.types';
import { useCallback, useEffect, useState } from 'react';
import { UAParser } from 'ua-parser-js';
import { createSafeContext } from '@/libs/utils/createSafeContext';
import Notification from '@/components/ui/notification/Notification';

export type ModalKey = 'add' | 'filter' | 'detail' | null;

export type FeedbackModal = {
  open: boolean;
  type: 'success' | 'error';
  message: string;
  traceId?: string;
};

type GlobalContextProps = Nullable<{
  modal: ModalKey;
  feedbackModal: FeedbackModal;
  device: Device;
  onOpenModal: (key: ModalKey) => void;
  onCloseModal: () => void;
  onOpenFeedbackModal: (data: Omit<FeedbackModal, 'open'>) => void;
  onCloseFeedbackModal: () => void;
  onCopyClipboard: (data: string) => void;
}>;

const [GlobalContext, useGlobal] = createSafeContext<GlobalContextProps>('Global');

const GlobalProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [modal, setModal] = useState<ModalKey>(null);

  const [feedbackModal, setFeedbackModal] = useState<FeedbackModal>({
    open: false,
    type: 'success',
    message: '',
    traceId: '',
  });

  const [device, setDevice] = useState<Device>({
    browserName: '',
    browserVersion: '',
    osName: '',
    osVersion: '',
    deviceType: '',
    deviceVendor: '',
    deviceModel: '',
    userAgent: '',
  });

  const onOpenModal = useCallback((key: ModalKey) => {
    setModal(key);
  }, []);

  const onCloseModal = useCallback(() => {
    setModal(null);
  }, []);

  const onOpenFeedbackModal = useCallback((data: Omit<FeedbackModal, 'open'>) => {
    setFeedbackModal({ ...data, open: true });
  }, []);

  const onCloseFeedbackModal = useCallback(() => {
    setFeedbackModal((prev) => ({ ...prev, open: false }));
  }, []);

  const onCopyClipboard = useCallback((data: string) => {
    navigator.clipboard.writeText(data);
    Notification({
      message: 'Copied to clipboard',
    });
  }, []);

  useEffect(() => {
    const parser = new UAParser();
    const result = parser.getResult();

    setDevice({
      browserName: result.browser.name || 'Unknown Browser',
      browserVersion: result.browser.version || '',
      osName: result.os.name || 'Unknown OS',
      osVersion: result.os.version || '',
      deviceType: result.device.type || 'desktop',
      deviceVendor: result.device.vendor || '',
      deviceModel: result.device.model || '',
      userAgent: result.ua,
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        modal,
        feedbackModal,
        device,
        onOpenModal,
        onCloseModal,
        onOpenFeedbackModal,
        onCloseFeedbackModal,
        onCopyClipboard,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { useGlobal, GlobalProvider };
