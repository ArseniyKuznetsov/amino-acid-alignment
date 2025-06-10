import { AMINO_ACID_COLORS } from "../../../entities/amino-acid/lib/colors";

const isValidAminoAcid = (char: string): boolean => {
    return char in AMINO_ACID_COLORS || char === '-';
};

export const useAlignmentValidation = () => {
    const validateSequence = (value: string) => {
        return [...value.toUpperCase()].every(c => isValidAminoAcid(c))
            || 'Допустимы только буквы аминокислот (A, R, N, D, C, E, Q, G, H, I, L, K, M, F, P, S, T, W, Y, V) и "-"';
    };

    const validateEqualLength = (value: string, compareWith?: string) => {
        return !compareWith || value.length === compareWith.length
            || 'Последовательности должны быть одинаковой длины';
    };

    return { validateSequence, validateEqualLength };
};