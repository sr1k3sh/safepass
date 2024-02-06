import * as crypto from 'crypto';

export class Encrypter {
  private algorithm: string;
  private key: Buffer;

  constructor(encryptionKey: string) {
    this.algorithm = 'aes-192-cbc';
    this.key = crypto.scryptSync(encryptionKey, 'salt', 24);
  }

  encrypt(clearText: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    const encrypted = cipher.update(clearText, 'utf8', 'hex');
    return [encrypted + cipher.final('hex'), iv.toString('hex')].join('|');
  }

  decrypt(encryptedText: string): string {
    const [encrypted, iv] = encryptedText.split('|');
    if (!iv) throw new Error('IV not found');
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, Buffer.from(iv, 'hex'));
    return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
  }
}