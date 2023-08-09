import { toast } from 'react-toastify';
import DeleteOrderAPI from '../apicalls/DeleteOrderAPI';

const handleDelete = (token, orderId, leadId) => {
    const input = window.confirm('Are you sure , You want to delete the order');
    if (input) {
        try {
            DeleteOrderAPI(token, orderId, leadId)
                .then((res) => {
                    if (res) {
                        toast.success('Order Deleted Successfully');
                        window.history.back();
                    }
                })
                .catch((error) => {});
        } catch (error) {}
    }
};
export { handleDelete };
