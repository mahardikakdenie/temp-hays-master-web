import Input from '@/components/ui/form/Input';
import Textarea from '@/components/ui/form/Textarea';
import Modal from '@/components/ui/modal/Modal';
import useCreateOrder from '../hooks/useCreateOrder.hook';
import PlusIcon from '@/components/icons/Plus';
import ActionModal from '@/components/ui/modal/ActionModal';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import TrashIcon from '@/components/icons/Trash';
import Select from '@/components/ui/form/Select';

const ModalCreateOrder: React.FC = () => {
  const { form, fields, append, remove, onSubmit, onCancel, prodOptions, Controller } =
    useCreateOrder();
  const { register, handleSubmit, formState } = form;
  const FORMID = 'create-order';

  return (
    <Modal
      name="add"
      title="Create New Order"
      action={
        <ActionModal isSubmitting={formState.isSubmitting} onCancel={onCancel} formId={FORMID} />
      }
    >
      <form id={FORMID} className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        {/* Customer Info */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <Input
              label="Customer Name"
              placeholder="Enter customer's full name"
              required
              error={formState.errors.name?.message}
              {...register('name')}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="customer@example.com"
              required
              error={formState.errors.email?.message}
              {...register('email')}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <Input
              label="Phone Number"
              placeholder="(021) 123-4567"
              required
              error={formState.errors.phone?.message}
              {...register('phone')}
            />
          </div>
          <div className="col-span-12">
            <Textarea
              label="Message (Optional)"
              placeholder="Add a note or special request..."
              rows={3}
              error={formState.errors.message?.message}
              {...register('message')}
            />
          </div>
        </div>

        {/* Product Items */}
        <div className="pt-6 border-t border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            🛒 Product Items
          </h3>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="bg-gray-800/50 rounded-xl p-5 space-y-4 border border-gray-600 mb-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Controller
                  name={`items.${index}.product_id`}
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      label="Product ID"
                      placeholder="Select a product"
                      options={prodOptions}
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                      className="bg-[#1b1d20]"
                      error={formState.errors.items?.[index]?.product_id?.message}
                      required
                    />
                  )}
                />
                <Input
                  label="Quantity"
                  inputMode="numeric"
                  min="1"
                  placeholder="1"
                  required
                  error={formState.errors.items?.[index]?.quantity?.message}
                  {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                />
              </div>

              <Textarea
                label="Product Notes"
                placeholder="Color, size, or other details..."
                rows={2}
                required
                error={formState.errors.items?.[index]?.notes?.message}
                {...register(`items.${index}.notes`)}
              />

              <div className="flex justify-end">
                <ButtonSecondary
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 border border-red-300 bg-red-300 hover:bg-red-200 text-sm px-3 py-1"
                >
                  <TrashIcon className="w-4 h-4 inline mr-1" />
                  Delete
                </ButtonSecondary>
              </div>
            </div>
          ))}

          {/* Add More Items Button */}
          <ButtonPrimary
            type="button"
            onClick={() =>
              append({
                product_id: 0,
                quantity: 1,
                notes: '',
              })
            }
            className="flex items-center gap-2 text-sm"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Product</span>
          </ButtonPrimary>

          {/* Tampilkan error array jika ada */}
          {formState.errors.items?.message && (
            <p className="text-red-500 text-sm mt-2">{formState.errors.items.message}</p>
          )}
        </div>

        {/* Submit dihandle oleh ActionModal */}
      </form>
    </Modal>
  );
};

export default ModalCreateOrder;
