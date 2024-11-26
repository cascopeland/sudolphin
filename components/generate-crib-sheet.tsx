// generateCribSheets.ts
import axios from 'axios';
import { toast } from 'sonner';
import { arrayBufferToBase64 } from './array-buffer-util';

export async function generateCribSheet(fileUrl: string, fileName: string) {
  try {
    const response = await fetch(fileUrl);
    const arrayBuffer = await response.arrayBuffer();

    const base64FileContent = arrayBufferToBase64(arrayBuffer);

    const requestBodySize = (base64FileContent.length * 3) / 4; // Approximate size in bytes
    console.log('Request body size:', requestBodySize / (1024 * 1024), 'MB');

    const res = await axios.post('/api/generate-crib-sheet', {
      fileContent: base64FileContent,
    });

    if (res.status === 200) {
      toast.success('Crib sheet generated successfully');
      return {
        fileName,
        content: res.data.cribSheet,
      };
    } else {
      toast.error('Failed to generate crib sheet');
      return null;
    }
  } catch (error) {
    toast.error('Failed to generate crib sheet');
    console.error(error);
    return null;
  }
}
