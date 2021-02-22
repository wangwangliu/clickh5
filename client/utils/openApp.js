export default class OpenApp {
  constructor(down, isIos) {
    this.url = {
      open: 'qchat://com.hypechat.messenger',
      isIos,
      down,
    };
    this.time = null;
  }

  downLoad() {
    window.location.href = this.url.down;
  }

  open() {
    if (this.url.isIos) {
      window.location.href = this.url.open;
    } else {
      const iframe = document.createElement('iframe');
      const body = document.body;
      iframe.style.cssText = 'display:none;width=0;height=0';
      body.appendChild(iframe);
      iframe.src = this.url.open;
    }
  }
}
