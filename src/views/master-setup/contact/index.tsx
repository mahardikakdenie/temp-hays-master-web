'use client';

import type React from 'react';
import ContactHeader from './components/ContactHeader';
import ContactTable from './components/ContactTable';

const ContactViews: React.FC = () => {
  return (
    <div className="grid grid-cols-12 space-y-6">
      <div className="col-span-12">
        <ContactHeader />
      </div>
      <div className="col-span-12">
        <ContactTable />
      </div>
    </div>
  );
};

export default ContactViews;
