import React from 'react';
import { Box } from '@mui/material';
import { AMINO_ACID_COLORS } from '../../../../entities/amino-acid/lib/colors';

export type AlignmentPair = [string, string];

export interface AminoAcidAlignmentProps {
    alignment: AlignmentPair;
    onCopy?: () => void;
    highlightMismatches?: boolean;
    colors?: typeof AMINO_ACID_COLORS;
}

export const AminoAcidAlignment: React.FC<AminoAcidAlignmentProps> = ({
    alignment: [sequence1, sequence2],
    onCopy,
    highlightMismatches = true,
    colors = AMINO_ACID_COLORS
}) => {
    const handleMouseUp = () => {
        if (!onCopy) return;

        const selection = window.getSelection();
        if (selection?.toString().trim().length) {
            navigator.clipboard.writeText(selection.toString());
            onCopy();
        }
    };

    const pairedSymbols = [];
    const maxLength = Math.max(sequence1.length, sequence2.length);

    for (let i = 0; i < maxLength; i++) {
        pairedSymbols.push([
            sequence1[i] || ' ',
            sequence2[i] || ' '
        ]);
    }

    return (
        <Box
            sx={{
                fontSize: '1.2rem',
                lineHeight: 1.5,
                userSelect: 'text',
                cursor: onCopy ? 'copy' : 'default',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all'
            }}
            onMouseUp={onCopy ? handleMouseUp : undefined}
        >
            {pairedSymbols.map(([top, bottom], index) => (
                <Box
                    key={index}
                    component="span"
                    sx={{
                        display: 'inline-block',
                        textAlign: 'center',
                        minWidth: '1.2em',
                        margin: '0 1px'
                    }}
                >
                    <Box
                        component="span"
                        sx={{
                            display: 'block',
                            backgroundColor: colors[top],
                            color: '#000',
                            padding: '0 2px',
                            borderRadius: '2px',
                        }}
                    >
                        {top}
                    </Box>

                    <Box
                        component="span"
                        sx={{
                            display: 'block',
                            backgroundColor: highlightMismatches && top !== bottom
                                ? 'red'
                                : 'transparent',
                            color: '#000',
                            padding: '0 2px',
                            borderRadius: '2px',
                        }}
                    >
                        {bottom}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};