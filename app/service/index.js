import { Service } from 'beidou';

export default class ContactService extends Service {
  constructor(ctx) {
    super(ctx);
    this.root = ctx.app.config.api.domain;
  }
  async getAppConfig() {
    // eslint-disable-next-line max-len
    const appConfig = await this.ctx.curl(`${this.root}xchat/common/commonApi/GetH5Common`, { dataType: 'json' });
    return appConfig;
  }

  async getPrivacyProtocol() {
    // eslint-disable-next-line max-len
    const protocol = await this.ctx.curl(`${this.root}xchat/common/commonApi/PrivacyProtocol`, {
      dataType: 'json',
      data: { os_version: 10000, version: 10000, tk: '1111', device_code: 'abdfg', version_code: '0', platform: 1 },
    });
    return protocol;
  }
  async getPrivacyPolicy() {
    // eslint-disable-next-line max-len
    const policy = await this.ctx.curl(`${this.root}xchat/common/commonApi/PrivacyPolicy`, {
      dataType: 'json',
      data: { os_version: 10000, version: 10000, tk: '1111', device_code: 'abdfg', version_code: '0', platform: 1 },
    });
    return policy;
  }
}
