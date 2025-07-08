import type React from 'react';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';

const ContactHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-end">
      <div>
        <span className="text-xl font-semibold block mb-2">Contact</span>
        <Breadcrumbs
          items={[
            { title: 'Master Setup', href: '#' },
            { title: 'Contact', href: '/master-setup/contact' },
          ]}
        />
      </div>

      <div>
        <ButtonPrimary className="w-full">Add New Contact</ButtonPrimary>
      </div>
    </div>
  );
};

export default ContactHeader;
