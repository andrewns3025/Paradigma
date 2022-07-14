import CryptoJS from 'crypto-js';

const iv = CryptoJS.enc.Utf8.parse('4512631236589784');
const key = CryptoJS.enc.Utf8.parse('4512631236589784');

export const Descript = (value:any) => {    
          
    if(value){
        var decrypted = CryptoJS.AES.decrypt(value, key, {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        return decrypted.toString(CryptoJS.enc.Utf8);
    }
    
}

export const Encript = (value:any):string => {        
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(value), 
        key, { iv: iv, 
            mode:CryptoJS.mode.CBC,
            keySize: 128 / 8,
            padding: CryptoJS.pad.Pkcs7
        });        
    return ciphertext.toString();
}