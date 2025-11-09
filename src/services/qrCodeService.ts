import QRCode from 'qrcode';

export interface QRCodeData {
  id: string;
  region: string;
  name: string;
}

export class QRCodeService {
  static async generateQRCode(data: QRCodeData): Promise<string> {
    const qrData = JSON.stringify(data);
    
    try {
      const url = await QRCode.toDataURL(qrData, {
        width: 120,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      return url;
    } catch (error) {
      console.error('QR Code generation failed:', error);
      throw new Error('Failed to generate QR code');
    }
  }

  static validateQRData(data: QRCodeData): boolean {
    return !!(data.id && data.region && data.name);
  }
}