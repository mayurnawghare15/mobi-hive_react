import CryptoJS from 'crypto-js';


const  ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY
const decryptData = (ciphertext) => {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
      const originalData = bytes.toString(CryptoJS.enc.Utf8);
      return originalData;
    } catch (error) {
      console.error('Decryption error:', error);
      return null;
    }
  };

export { decryptData };