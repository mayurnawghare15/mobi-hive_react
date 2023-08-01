import CryptoJS from 'crypto-js';

const  ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY
const encryptData = (data) => {
    try {
      const ciphertext = CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
      return ciphertext;
    } catch (error) {
      console.error('Encryption error:', error);
      return null;
    }
  };

export { encryptData };