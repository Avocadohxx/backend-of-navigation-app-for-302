import { Injectable } from '@nestjs/common';
import OSS from 'ali-oss';

@Injectable()
export class OssService {
  private ossClient: OSS;

  constructor() {
    this.ossClient = new OSS({
      accessKeyId: 'LTAI5tDsMs7FajoqhDXh28oU',
      accessKeySecret: 'VgGXX1HUiXWpuRU5I9rFLTFijPFl4K',
      bucket: 'naviapp-shanghai-83857',
      region: 'oss-cn-shanghai',
    });
  }

  async generatePresignedUrl(userId: number, fileExt: string) {
    const fileName = `avatar_${Date.now()}.${fileExt}`;
    const objectKey = `avatar/${userId}/${fileName}`;

    try {
      const presignedUrl = await this.ossClient.signatureUrl(objectKey, {
        method: 'PUT',
        expires: 3600,
      });

      const publicUrl = `https://${this.ossClient.options.bucket}.${this.ossClient.options.region}.aliyuncs.com/${objectKey}`;
      return { presignedUrl, publicUrl, objectKey };
    } catch (error) {
      throw new Error(`Failed to generate presigned URL: ${error.message}`);
    }
  }
}