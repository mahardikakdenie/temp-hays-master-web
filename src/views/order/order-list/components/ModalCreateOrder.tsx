import Input from '@/components/ui/form/Input';
import Textarea from '@/components/ui/form/Textarea';
import Modal from '@/components/ui/modal/Modal';
import useCreateOrder from '../hooks/useCreateOrder.hook';
import PlusIcon from '@/components/icons/Plus';
import ActionModal from '@/components/ui/modal/ActionModal';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import TrashIcon from '@/components/icons/Trash';

const ModalCreateOrder: React.FC = () => {
  const { form, onSubmit, onCancel } = useCreateOrder();
  const { register, handleSubmit } = form;
  const FORMID = 'create-order';

  return (
    <Modal
      name="add"
      title="Create New Order"
      action={
        <ActionModal
          isSubmitting={form.formState.isSubmitting}
          onCancel={onCancel}
          formId={FORMID}
        />
      }
    >
      <form id={FORMID} className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        {/* Customer Info Section */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <Input
              label="Customer Name"
              placeholder="Enter customer's full name"
              required
              error={form.formState.errors.name?.message?.toString()}
              {...register('name')}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="customer@example.com"
              required
              error={form.formState.errors.email?.message?.toString()}
              {...register('email')}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <Input
              label="Phone Number"
              placeholder="(021) 123-4567"
              required
              error={form.formState.errors.phone?.message?.toString()}
              {...register('phone')}
            />
          </div>
          <div className="col-span-12">
            <Textarea
              label="Message (Optional)"
              placeholder="Add a note or special request..."
              rows={3}
              {...register('message')}
            />
          </div>
        </div>

        {/* Product Items Section */}
        <div className="pt-6 border-t border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            🛒 Product Items
          </h3>

          <div className="bg-gray-800/50 rounded-xl p-5 space-y-4">
            {/* Product Form Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Product Name"
                placeholder="e.g., Wireless Headphones"
                required
                {...register('items')}
              />
              <Input
                label="Quantity"
                type="number"
                min="1"
                placeholder="1"
                required
                {...register('items')}
              />
            </div>

            <Textarea
              label="Product Notes (Optional)"
              placeholder="Color, size, or other details..."
              rows={2}
              {...register('items')}
            />

            {/* Add Item Button */}
            <div className="grid grid-cols-2 gap-3">
              <ButtonPrimary>
                <PlusIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>Add Product</span>
              </ButtonPrimary>
              <ButtonSecondary className="text-red-600 border border-red-300 bg-red-300 hover:bg-red-200">
                <TrashIcon className="w-5 h-5 text-red-600" /> Delete
              </ButtonSecondary>
            </div>
          </div>

          {/* List of Added Products (Placeholder for future implementation) */}
          <p className="text-sm text-gray-400 mt-4">
            Added items will appear below (to be implemented with <code>useFieldArray</code>).
          </p>
        </div>
      </form>
    </Modal>
  );
};

export default ModalCreateOrder;
