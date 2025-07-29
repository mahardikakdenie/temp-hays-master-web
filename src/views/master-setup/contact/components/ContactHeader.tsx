import type React from 'react';
import { useGlobal } from '@/contexts/global.context';
import PageHeader from '@/components/ui/page/Header';

const ContactHeader: React.FC = () => {
  const { onOpenModal } = useGlobal();
  return (
    <PageHeader
      items={[
        { title: 'Master Setup', href: '#' },
        { title: 'Contact', href: '/master-setup/contact' },
      ]}
      isShowBtn
      title="Contact"
      titleButton="Create new Contact"
      onClick={() => onOpenModal('add')}
    />
  );
};

export default ContactHeader;
