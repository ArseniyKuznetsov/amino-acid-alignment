import { Container, Typography } from "@mui/material";
import { useState } from "react";
import { AlignmentForm } from "../../features/alignment/ui/AlignmentForm";
import { Notification } from '../../shared/ui/Notification';
import { AminoAcidAlignment } from "../../features/alignment/ui/AminoAcidAlignment";

export const HomePage = () => {
    const [alignment, setAlignment] = useState<[string, string] | null>(null);
    const [notification, setNotification] = useState({
        open: false,
        message: ''
    });

    const handleSubmit = (data: { sequence1: string; sequence2: string }) => {
        setAlignment([data.sequence1, data.sequence2]);
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h5" gutterBottom>
                Выравниватель аминокислотной последовательности
            </Typography>

            <AlignmentForm onSubmit={handleSubmit} />

            {alignment && (
                <AminoAcidAlignment
                    alignment={alignment}
                    onCopy={() => setNotification({
                        open: true,
                        message: 'Последовательность скопирована'
                    })}
                />
            )}

            <Notification
                open={notification.open}
                message={notification.message}
                onClose={() => setNotification(prev => ({ ...prev, open: false }))}
            />
        </Container>
    )
}