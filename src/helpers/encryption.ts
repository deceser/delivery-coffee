import CryptoJS from "crypto-js";

// Function to encrypt data
export const encryptData = (data: any, secretKey: string): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

// Function to decrypt data
export const decryptData = (encryptedData: string, secretKey: string): any => {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
};
