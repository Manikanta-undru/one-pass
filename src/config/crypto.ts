async function deriveKeyFromPassphrase(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
    const encodedPassphrase = new TextEncoder().encode(passphrase);
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      encodedPassphrase,
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );
  
    return window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000, 
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
  }
  
  interface EncryptedData {
    iv: Uint8Array;
    
    encryptedData: ArrayBuffer;
  }
  interface EncryptedDataWithSalt extends EncryptedData {

    salt: Uint8Array;
  }
  
  async function encryptData(key: CryptoKey, data: string): Promise<EncryptedData> {
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Initialization Vector (IV)
    const encodedData = new TextEncoder().encode(data);
  
    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      encodedData
    );
  
    return { iv, encryptedData };
  }
  
  async function decryptData(key: CryptoKey, { iv, encryptedData }: EncryptedData): Promise<string> {
    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      encryptedData
    );
  
    return new TextDecoder().decode(decryptedData);
  }
  
  function encryptedDataToString(data: EncryptedDataWithSalt): string {
    const obj = {
      iv: Array.from(data.iv).map(b => b.toString(16).padStart(2, '0')).join(''),
      salt: Array.from(data.salt).map(b => b.toString(16).padStart(2, '0')).join(''),
      encryptedData: Array.from(new Uint8Array(data.encryptedData)).map(b => b.toString(16).padStart(2, '0')).join('')
    };
  
    return JSON.stringify(obj);
  }

function stringToEncryptedData(str: string): EncryptedDataWithSalt {
    const obj = JSON.parse(str);

    return {
        iv: new Uint8Array(obj.iv.match(/.{1,2}/g).map((byte: string) => parseInt(byte, 16))),
        salt: new Uint8Array(obj.salt.match(/.{1,2}/g).map((byte: string) => parseInt(byte, 16))),
        encryptedData: new Uint8Array(obj.encryptedData.match(/.{1,2}/g).map((byte: string) => parseInt(byte, 16))).buffer
    };
}

  export const crypto = {
    encrypt: async (passphrase: string, data: string):Promise<string> => {
      const salt = window.crypto.getRandomValues(new Uint8Array(16));
  
      const key = await deriveKeyFromPassphrase(passphrase, salt);
      const { iv, encryptedData } = await encryptData(key, data);
    
       return encryptedDataToString({ iv, encryptedData, salt });
    },
  
    decrypt: async (passphrase: string, encryptedString: string) => {
      try {
        const { iv, encryptedData, salt } = stringToEncryptedData(encryptedString);
        const key = await deriveKeyFromPassphrase(passphrase, salt);
        const decryptedData = await decryptData(key, { iv, encryptedData });

        return decryptedData;
      } catch (error) {
        // Handle the error here
        console.error('Error decrypting data:', error,passphrase,encryptedString);
        throw error;
      }
    },
        
    hashPassphrase: async (passphrase: string) => {
        const encodedPassphrase = new TextEncoder().encode(passphrase);
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', encodedPassphrase);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
        return hashHex;
        },
    checkPassphrase: async (passphrase: string, hashHex: string) => {
        const hashHex2 = await crypto.hashPassphrase(passphrase);
    
        return hashHex === hashHex2;
        }
  };
  

  