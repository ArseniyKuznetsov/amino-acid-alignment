import { useForm } from 'react-hook-form';
import { Box, Button, TextField } from '@mui/material';
import { VALID_AMINO_ACIDS } from '../../../../entities/amino-acid/utils/constants';

type FormData = {
    sequence1: string;
    sequence2: string;
};

type AlignmentFormProps = {
    onSubmit: (data: FormData) => void;
};

export const AlignmentForm = ({ onSubmit }: AlignmentFormProps) => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>();

    const sequences = watch(['sequence1', 'sequence2']);
    const sequencesEqualLength = sequences[0]?.length === sequences[1]?.length;

    const validateAminoAcid = (value: string) => {
        const upperValue = value.toUpperCase();
        return [...upperValue].every(char => VALID_AMINO_ACIDS.includes(char)) ||
            'Допустимы только латинские буквы аминокислот (A, R, N, D, C, E, Q, G, H, I, L, K, M, F, P, S, T, W, Y, V) и символ -';
    };

    const handleInputChange = (fieldName: keyof FormData) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const upperValue = e.target.value.toUpperCase();
            setValue(fieldName, upperValue, { shouldValidate: true });
        };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 4 }}>
            <TextField
                fullWidth
                label="Первая аминокислотная последовательность"
                variant="outlined"
                margin="normal"
                {...register('sequence1', {
                    required: 'Обязательное поле',
                    validate: {
                        validChars: validateAminoAcid
                    }
                })}
                onChange={handleInputChange('sequence1')}
                value={sequences[0] || ''}
                error={!!errors.sequence1}
                helperText={errors.sequence1?.message}
                inputProps={{
                    pattern: `[${VALID_AMINO_ACIDS.join('')}]+`,
                    title: 'Только буквы аминокислот (A, R, N, D, C, E, Q, G, H, I, L, K, M, F, P, S, T, W, Y, V) и символ -'
                }}
            />

            <TextField
                fullWidth
                label="Вторая аминокислотная последовательность"
                variant="outlined"
                margin="normal"
                {...register('sequence2', {
                    required: 'Обязательное поле',
                    validate: {
                        validChars: validateAminoAcid,
                        equalLength: (v) => v.length === sequences[0]?.length || 'Последовательности должны быть одинаковой длины'
                    }
                })}
                onChange={handleInputChange('sequence2')}
                value={sequences[1] || ''}
                error={!!errors.sequence2}
                helperText={errors.sequence2?.message}
                inputProps={{
                    pattern: `[${VALID_AMINO_ACIDS.join('')}]+`,
                    title: 'Только буквы аминокислот (A, R, N, D, C, E, Q, G, H, I, L, K, M, F, P, S, T, W, Y, V) и символ -'
                }}
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!sequencesEqualLength || !sequences[0] || !sequences[1]}
                sx={{ mt: 2 }}
            >
                Выровнять последовательности
            </Button>
        </Box>
    );
};