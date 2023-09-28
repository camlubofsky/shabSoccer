import React from 'react';
import clipboardCopy from 'clipboard-copy';
import { Button } from '@mui/material';

export const Copy = ({ players }: { players: any }) => {
  const convertToPlainText = (data: any) => {
    let plainText = '';

    const headers = Object.keys(data);
    headers.forEach((header, index) => {
      const properHeader = header.charAt(0).toUpperCase() + header.slice(1);
      plainText += `*${properHeader}*:\n${data[header].join(', ')}`;

      if (index !== headers.length - 1) {
        plainText += '\n\n';
      }
    });

    return plainText;
  };

  const copyToClipboard = () => {
    const plainText = convertToPlainText(players);
    console.log(plainText);
    clipboardCopy(plainText);
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      <Button variant="contained" color="primary" onClick={copyToClipboard}>
        Copy to Clipboard
      </Button>
    </div>
  );
};
