import ContactHeader from './components/ContactHeader';

const ContactViews: React.FC = () => {
  return (
    <div className="grid grid-cols-12 space-y-6">
      <div className="col-span-12">
        <ContactHeader />
      </div>
      <div className="col-span-12"></div>
    </div>
  );
};

export default ContactViews;
