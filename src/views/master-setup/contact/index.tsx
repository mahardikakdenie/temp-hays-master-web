'use client';

import type React from 'react';
import ContactHeader from './components/ContactHeader';
import ContactTable from './components/ContactTable';
import ModalAddContact from './components/ModalAddContact';
import ModalUpdateContact from './components/ModalUpdateContact';

const ContactViews: React.FC = () => {
  return (
    <div className="grid grid-cols-12 space-y-6">
      <div className="col-span-12">
        <ContactHeader />
      </div>
      <div className="col-span-12">
        <ContactTable />
      </div>
      <ModalAddContact />
      <ModalUpdateContact />
    </div>
  );
};

export default ContactViews;
