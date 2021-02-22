
function platform() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return 4;
  }
  if (/android/i.test(userAgent)) {
    return 1;
  }
  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 2;
  }

  return 3;
}
const Bridge = {
  // 获取app基本信息
  // eslint-disable-next-line max-len
  isAndroid: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1,
  isiOS: (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)),
  isInapp() {
    let inapp = false;
    if (window.qchat && Bridge.isAndroid) {
      inapp = true;
    }
    if (Bridge.isiOS && navigator.userAgent.indexOf("native_iOS") != -1) {
      inapp = true;
    }
    return inapp;
  },
  andriodApp() {
    let inapp = false;
    if (window.qchat && Bridge.isAndroid) {
      inapp = true;
    }
    return inapp;
  },
  iosApp() {
    let inapp = false;
    if (Bridge.isiOS && navigator.userAgent.indexOf("native_iOS") != -1) {
      inapp = true;
    }
    return inapp;
  },
  getAppInfo() {
    let info = {};
    // console.log(info,`开始拦截window.prompt`);
    if (window.qchat && Bridge.isAndroid) {
      try {
        // eslint-disable-next-line no-eval
        info = eval(`(${window.qchat.getAppInfo()})`);
      } catch (error) {
      }
    }
    if (Bridge.isiOS && navigator.userAgent.indexOf("native_iOS") != -1) {
      try {
        if (window.WebViewJavascriptBridge) {
          info = window.WebViewJavascriptBridge.callHandler("getAppInfo");
        } else {
          // eslint-disable-next-line no-eval
          // eslint-disable-next-line no-alert
          // eslint-disable-next-line no-eval
          info = eval(`(${window.prompt('info')})`);
        }
      } catch (error) {
      }
    }
    info = Object.assign({ os_version: '10000', version: 10000, tk: 'facemeh5', device_code: '', version_code: '0', platform: platform() }, info);
    return info;
  },
  getQuit() {
    if (window.qchat && Bridge.isAndroid) {
      try {
        window.qchat.getQuit();
      } catch (error) {

      }
    }
  },
  goLoginPage() {
    if (window.qchat && Bridge.isAndroid) {
      try {
        window.qchat.jumpLogin();
      } catch (error) {
      }
    }
    if (Bridge.isiOS && navigator.userAgent.indexOf("native_iOS") != -1) {
      try {
        // eslint-disable-next-line no-alert
        window.prompt('jumpLogin');
      } catch (error) {

      }
    }
  },
  goOfflinePage() {
    if (window.qchat && Bridge.isAndroid) {
      try {
        window.qchat.jumpOffline();
      } catch (error) {
      }
    }
    if (Bridge.isiOS && navigator.userAgent.indexOf("native_iOS") != -1) {
      try {
        // eslint-disable-next-line no-alert
        window.prompt('jumpOffline');
      } catch (error) {
      }
    }
  },
};

export default Bridge;
