import { useDocumentOperation } from 'sanity';
import { TrashIcon } from '@sanity/icons';
import { useToast } from '@sanity/ui';

// This is a factory function that returns the action object
export function DeleteProduct(props) {
  const { id, type, onComplete } = props;
  const { delete: deleteOperation } = useDocumentOperation(id, type);
  const toast = useToast();

  const handleDelete = () => {
    // Show a confirmation dialog before deleting
    if (window.confirm('Are you sure you want to delete this document?')) {
      deleteOperation.execute();
      onComplete(); // Closes the action menu

      // Show a toast notification on success
      toast.show({
        title: 'Document deleted!',
        status: 'success',
        duration: 3000,
      });
    }
  };

  return {
    label: 'Delete',
    icon: TrashIcon,
    tone: 'critical',
    onHandle: handleDelete,
    disabled: deleteOperation.disabled,
  };
}