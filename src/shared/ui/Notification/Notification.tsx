import { Alert, Snackbar } from '@mui/material';

type NotificationProps = {
    message: string;
    open: boolean;
    onClose: () => void;
    severity?: 'success' | 'error' | 'info';
};

export const Notification = ({
    message,
    open,
    onClose,
    severity = 'success',
}: NotificationProps) => (
    <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
        <Alert onClose={onClose} severity={severity}>
            {message}
        </Alert>
    </Snackbar>
);