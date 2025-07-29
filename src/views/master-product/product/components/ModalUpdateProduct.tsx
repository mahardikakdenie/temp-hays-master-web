import Modal from '@/components/ui/modal/Modal';
import useUpdateProductHook from '../hooks/useUpdateProduct.hook';
import ActionModal from '@/components/ui/modal/ActionModal';
import Input from '@/components/ui/form/Input';
import QuillEditor from '@/components/ui/form/QuillEditor';

const ModalUpdateProduct: React.FC = () => {
  const { form, onCancel } = useUpdateProductHook();
  const {
    register,
    formState: { isSubmitting, errors },
  } = form;

  const FORM_ID = 'update-product-form';
  return (
    <Modal
      name="detail"
      title="Update Product"
      action={<ActionModal isSubmitting={isSubmitting} onCancel={onCancel} formId={FORM_ID} />}
    >
      <form action="">
        <div>
          <Input
            placeholder="Enter Product Name"
            className="my-3"
            label="Product Name"
            required
            {...register('name')}
            error={errors.name?.message}
          />
          <QuillEditor
            key={form.watch('desc')}
            value={form.watch('desc')}
            className="bg-[#1b1d20]"
            onChange={(content) => {
              form.setValue('desc', content);
            }}
          />

          <div className="grid grid-cols-12"></div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalUpdateProduct;
