import qs from 'qs';
import isObject from 'lodash/isObject';
import get from 'lodash/get';

type Callback = (item: any) => void;

type Option = {
  type: number,
  fileType: number,
  url?: string,
  imgUrl?: string,
  description?: string,
  locFile?: string,
  shortUrl?: string,
  videothumb?: string,
  cb?: Callback
}

type playOpt = {
  //type=1 图片 type=2 视频 type=3 音频
  type: number,
  loc: string,
  remote: string
}

interface bannerAdOpt {
  id: number,
  x: number,
  y: number,
  width: number,
  height: number,
  radius?: number
}



export function Pubsub() {
  //存放事件和对应的处理方法
  let handles: any = {};

  return (target: any): any => {
    //    console.log(target.prototype,'target.prototype')

    //传入事件类型type和事件处理handle
    target.prototype.on = function (type: string, handle: Callback) {
      if (!handles[type]) {
        handles[type] = [];
      }
      console.log(handle, 'on, handles[type]')
      handles[type].push(handle);
    };
    target.prototype.emit = function () {
      //通过传入参数获取事件类型
      var type = Array.prototype.shift.call(arguments);
      console.log(handles[type], 'emit, handles[type]')
      if (!handles[type]) {
        return false;
      }
      for (var i = handles[type].length - 1; i >= 0; i--) {
        var handle = handles[type][i];
        //执行事件
        handle.apply(this, arguments);
      }
    }
    target.prototype.off = function (type: string, handle: Callback) {
      let handless = handles[type];
      if (handles) {
        if (!handle) {
          handless.length = 0;//清空数组
        } else {
          for (var i = 0; i < handless.length; i++) {
            var _handle = handless[i];
            if (_handle === handle) {
              handless.splice(i, 1);
            }
          }
        }
      }
    }
  }
}


@Pubsub()
class Ibridge {
  isAndroid: boolean
  isIOS: boolean
  info: Object;
  constructor() {
    this.isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
    this.isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    (<any>window).setCameraMatter = this.setCamera.bind(this);
    (<any>window).shareCallBack = this.shareCallBack.bind(this);
    (<any>window).payCallBackMsg = this.payCallBackMsg.bind(this);
    (<any>window).rewardStatus = this.rewardStatus.bind(this);
    (<any>window).rewardAd = this.rewardAd.bind(this);
    (<any>window).openRewardAd = this.openRewardAd.bind(this);

    this.setupWebViewJavascriptBridge(() => { });
    this.info = {};
  }
  public async setupWebViewJavascriptBridge(callback: Function) {
    if (__CLIENT__) {
      if ((<any>window).WebViewJavascriptBridge) { return callback((<any>window).WebViewJavascriptBridge); }
      if ((<any>window).WVJBCallbacks) { return (<any>window).WVJBCallbacks.push(callback); }
      (<any>window).WVJBCallbacks = [callback];
      console.log('进行scheme请求')
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'https://__bridge_loaded__';
      document.documentElement.appendChild(WVJBIframe);
      console.log('scheme请求结束')
      setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
    }
  }
  /**
   * 
   * @param matterId 唤起拍摄器
   * @param cb 
   */
  public getCamera(matterId: string, cb: Callback) {
    // console.log('start 调起getCamera////',`navigator.userAgent.indexOf("native_iOS")=${navigator.userAgent.indexOf("native_iOS")}`,`window.WebViewJavascriptBridge=${(<any>window).WebViewJavascriptBridge}`)
    if (this.isIOS && navigator.userAgent.indexOf("native_iOS") != -1 && (<any>window).WebViewJavascriptBridge) {
      this.setupWebViewJavascriptBridge((bridge: { callHandler: (arg0: string, arg1: { id: any; }, arg2: (data: any) => void) => void; }) => {
        bridge.callHandler('getCamera', { id: (matterId || '').split(',').map((item) => { return ~~item }) }, (data: any) => {
          if (Object.prototype.toString.call(data).toLowerCase() == "[object object]") {
            data = JSON.stringify(data);
          }
          cb(data)
        })
      })
      return
    }
    this.on('movie', (MovieItem: string) => {
      cb(MovieItem);
      this.off('movie');
    })
    try {
      if (this.isAndroid && (<any>window).qchat) {
        (<any>window).qchat.getCamera(matterId);
      }

    } catch (error) {
      alert('Please upgrade the version')
    }
  }
  public setCamera(val: string) {
    this.emit('movie', val)
  }

  /**
   * 
   * @param opt 唤起分享 toast
   */
  public showShareToast(opt: Option) {
    const { type, fileType, url, imgUrl, locFile, description, shortUrl, videothumb, cb } = opt;
    if (this.isIOS && navigator.userAgent.indexOf("native_iOS") != -1 && (<any>window).WebViewJavascriptBridge) {
      this.setupWebViewJavascriptBridge((bridge: { callHandler: (arg0: string, arg1: Option, arg2: (data: any) => void) => void; }) => {
        bridge.callHandler('showShareToast', { type, fileType, url, imgUrl, locFile, description, shortUrl, videothumb }, (data: any) => {
          cb(data)
        })
      })
      return
    }
    this.on('share', (MovieItem: string) => {
      cb(MovieItem);
      this.off('movie');
    })
    try {
      if (this.isAndroid && (<any>window).qchat) {
        //   opt.type,opt.fileType,opt.url,opt.imgUrl,opt.description
        (<any>window).qchat.showShareToast(JSON.stringify(opt));
      }

    } catch (error) {
      alert('Please upgrade the version')
    }
  }
  public shareCallBack(val: string) {
    this.emit('share', val)
  }

  /**
   * 
   * @param opt 打开视频播放器
   * - type = 2
   * - loc
   * - remote
   */
  public playMedia(opt: playOpt): void {
    if (this.isIOS && navigator.userAgent.indexOf("native_iOS") != -1 && (<any>window).WebViewJavascriptBridge) {
      (<any>window).WebViewJavascriptBridge.callHandler("playMedia", opt)
    }
    if (this.isAndroid && (<any>window).qchat) {
      (<any>window).qchat.playMedia(JSON.stringify(opt))
    }
  }


  platform(): number {
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

  public async asyncInfo() {
    return new Promise((resolve) => {
      this.setupWebViewJavascriptBridge((bridge: { callHandler: (arg0: string, arg1: (data: any) => void) => void; }) => {
        resolve(bridge);
      })
    })
  }

  public async asyncBridge(bridge: any) {
    return new Promise((resolve) => {
      bridge.callHandler("getAppInfo", (data: any) => {
        resolve(data);
      });
    })
  }

  /**
   * 获取用户基本信息
   */
  public async getAppInfo() {
    if (!this) return;
    if (Object.keys(this.info).length) {
      return this.info;
    }
    let infomation = {};

    if (this.isIOS && navigator.userAgent.indexOf("native_iOS") != -1) {
      try {
        infomation = eval(`(${window.prompt('info')})`);
        if (!infomation) {
          const bridge = await this.asyncInfo()
          infomation = await this.asyncBridge(bridge);
          this.info = infomation;
        }
      } catch (error) {
        console.log(`执行 setupWebViewJavascriptBridge`)

      }
    }
    if (this.isAndroid && (<any>window).qchat) {
      infomation = eval(`(${(<any>window).qchat.getAppInfo()})`);
      infomation = { ...eval(`(${(<any>window).qchat.getAppInfo()})`), version: ((+infomation.version || 10000) + 10000) }
      this.info = infomation;
    }
    if (!Object.keys(this.info || {}).length) {
      let user = await import('../../config/localUser');
      infomation = user.default;
    }
    console.log(`获取用户信息结束`)
    return infomation;
  }

  /**
   * 跳出应用 打开链接
   * @param url 
   */
  public openBrowser(url: string): void {
    if (this.isIOS && navigator.userAgent.indexOf("native_iOS") != -1 && (<any>window).WebViewJavascriptBridge) {
      (<any>window).WebViewJavascriptBridge.callHandler("openBrowser", url)
    }
    if (this.isAndroid && (<any>window).qchat) {
      (<any>window).qchat.openBrowser(url)
    }
  }

  /**
   * 打开 native 顶部banner
   */
  public showTopBar(): void {
    try {
      window.qchat.showTopBar()
    } catch (error) {

    }
  }

  /**
   * 关闭native 顶部banner
   */
  public hideTopBar(): void {
    try {
      window.qchat.hideTopBar()
    } catch (error) {

    }
  }

  // 点击物理返回键
  public backUrl(url?, callback?): void {
    if (typeof callback === 'function') {
      if (!(<any>window).backevent) {
        (<any>window).backevent = () => {
          callback();
        }
      }
    }
    try {
      window.qchat.backUrl(url || '')
    } catch (error) {

    }
  }
  /**
   * 关闭webview
   */
  public closeWebView(): void {
    try {
      window.qchat.closeWebView()
    } catch (error) {

    }
  }
  /**
   * 返回, 无历史记录退出
   * 
   *      *     action: 事件类型
   *     0：跳转页面
   *     1：返回上一级（检查backurl）
   *     2:不检测backurl，直接返回上一级或者退出
   *     3:礼物包支付成功
   *     4:取消广告显示
   */
  backOrClose = async () => {
    const info = await this.getAppInfo();
    const version = get(info, ('version'));
    if (version > 10037) {
      (<any>window).qchat.callNative(JSON.stringify({ action: 2 }));
    } else {
      if (document.referrer) {
        return history.back();
      }
      (<any>window).qchat.closeWebView();
    }
  }
  /**
   * 联系客服
   * @param ryId 
   * @param mes 
   */
  public gotoConversation(ryId, mes = ''): void {
    try {
      window.qchat.gotoConversation(ryId, mes)
    } catch (error) {

    }
  }
  chatWith = (ryId) => {
    (<any>window).qchat.callNative(JSON.stringify({
      action: 7,
      data: {
        targetId: ryId
      }
    }));
  }
  viewUser = (userId) => {
    (<any>window).qchat.callNative(JSON.stringify({
      action: 6,
      data: {
        userId
      }
    }));
  }

  /**
   * 发起google支付
   * @param param0 
   */
  public googlePay({ order_id, google_product_id, is_renew = 0, real_product_type, callback }): void {
    this.on('pay', (msg: string) => {
      callback(msg);
      this.off('pay');
    });
    try {
      console.log({ order_id, google_product_id, is_renew, real_product_type }, '{order_id, google_product_id, is_renew, real_product_type}')
      window.qchat.getGooglePay(JSON.stringify({ order_id, google_product_id, is_renew, real_product_type }))
    } catch (error) {

    }
  }

  public payCallBackMsg(val: string) {
    this.emit('pay', JSON.parse(val))
  }

  /**
   * version<=10022
   * 唤起激励视频
   */

  public rewardAd = ({ callback }): void => {
    this.on('reward', (msg: string) => {
      callback(msg);
      this.off('reward');
    });
    try {
      window.qchat.rewardAd()
    } catch (error) {

    }
  }
  public rewardStatus = (val: string) => {
    this.emit('reward', JSON.parse(val))
  }
  /**
   * version>10022
   * 预加载激励视频
   */
  public preloadAd = (id): void => {
    // return
    try {
      window.qchat.preloadAd(id)
    } catch (error) {

    }
  }
  /**
   * version>10022
   * 打开激励视频
   * code 0 看完
   * code 1 加载失败
   * code 2 没看完
   */
  public openRewardAd = async ({ id, callback }: any) => {
    const callbackName = `openRewardAdCallback${Date.now()}`;
    const info = await this.getAppInfo();
    const version = get(info, ('version'));
    console.info('debug_openRewardAd_version', version);
    console.info('openRewardAd callbackName', callbackName);
    if (version > 10037) {
      if (!(<any>window)[callbackName]) {
        (<any>window)[callbackName] = (id, code) => {
          console.info('RewardAdCallback', { id, code });
          this.emit('openrewardad', id, code);
        }
      }
    } else {
      if (!(<any>window).RewardAdCallback) {
        (<any>window).RewardAdCallback = (id, code) => {
          console.info('RewardAdCallback', { id, code });
          this.emit('openrewardad', id, code);
        }
      }
    }

    this.on('openrewardad', (id, code) => {
      console.log('debbug_openRewardAd_callback', id, code);
      if (callback) {
        callback({ id, code });
      }
      this.off('openrewardad');
    });
    try {
      if (version > 10037 && callback) {
        console.log('debbug_openRewardAd_call', callbackName);
        window.qchat.openRewardAd(id, callbackName);
      } else if (version > 10037) {
        window.qchat.openRewardAd(id, '');
      } else {
        console.log('debbug_openRewardAd_call', 'nocallback');
        window.qchat.openRewardAd(id);
      }

    } catch (error) {

    }
  }

  /**
   * version>10022
   * 打开banner视频
   * {id:1,x:1 y:1, width: ,height:, radius:}
   * id 广告位id 
   * x x坐标
   * y y坐标
   * width 宽
   * height 高
   * radius 圆角值
   * openBannerAd({id:1,x:1 y:1, width: ,height:, radius:})
   */
  public openBannerAd = (opt: bannerAdOpt): void => {
    console.log('DEBUG_Banner_Ad_打开', opt)
    try {
      window.qchat.openBannerAd(JSON.stringify(opt))
    } catch (error) {

    }
  }
  /**
  * version>10022
  * 关闭 banner视频
  * closeBannerAd(id)
  */
  public closeBannerAd = (id): void => {
    console.log('DEBUG_Banner_Ad_关闭', id)
    try {
      window.qchat.closeBannerAd(id)
    } catch (error) {

    }
  }

  /**
  * version>10022
  * 预加载插屏广告
  * closeBannerAd(id)
  */
  public interstitialAdPreLoad = (id): void => {
    // return
    try {
      window.qchat.interstitialAdPreLoad(id)
    } catch (error) {

    }
  }

  /**
   * @status:
   *  0:失败
   *  1:关闭 
  */
  public openInterstitialAd = async (id, callback?): void => {
    console.log(`打开${id} 插屏广告`)
    const callbackName = `interstitialCallback${Date.now()}`;
    const info = await this.getAppInfo();
    const version = get(info, ('version'));
    console.info('openInterstitialAd callbackName ', callbackName, callback);
    if (callback) {
      if (!(<any>window)[callbackName]) {
        console.info('(<any>window)[callbackName]___', (<any>window)[callbackName], callbackName);
        (<any>window)[callbackName] = (id, status) => {
          console.info('intertitialAdCallback__', { id, status });
          this.emit('interstitialAdClosed', id, status);
        }
      }
      this.on('interstitialAdClosed', (id, status) => {
        callback(id, status);
        this.off('interstitialAdClosed');
      });
    }
    try {
      if (callback) {
        window.qchat.openInterstitialAd(id, callbackName);
      } else if (version > 10037) {
        console.info('openInterstitialAd_without_callback');
        window.qchat.openInterstitialAd(id, '');
      } else {
        window.qchat.openInterstitialAd(id);
      }
    } catch (error) {

    }
  }

  /**
     * 跳转至客户端
     * {
    "action"
    0: 跳转页面
    3: 更新语音房数据
    4: 取消广告显示
    5: 跳转录音页面
    8: 订单支付相关·
    "data":{
        "pageName":'MAIN', 
        "tabNo": 0,
        //0:首页 1:推荐页面 2:语音房页面 3:聊天页面 4:我的页面  //5:如果聊天窗口有记录就到聊天tab，否则到推荐页面
        },
    }
    9: 跳转游戏中心


    {
    "action":8,
          "data":{
              "type":0   // 0:提交订单，1：支付成功
              name: //产品名
              product_id //产品id
              real_prize  //价格
              order_id //订单id
          }
      }
     */
  public callNative = (arg: any): void => {
    console.log(arg, '协议跳转地址');
    if (isObject(arg)) {
      try {
        window.qchat.callNative(JSON.stringify(arg))
      } catch (error) {

      }
      return
    }
    window.location.href = arg
  }
  goToGameCenter = async (origin?) => {
    const info = await this.getAppInfo();
    const app_key = get(info, ('app_key'));
    const version = get(info, ('version'));
    // if (version < 20005) {
    //   window.location.href = origin ? `/games?from=${origin}` : '/games';
    // } else {
    //   // window.qchat.callNative(JSON.stringify({ action: 9 }));
    //   window.qchat.closeWebView();
    // }
    if ((!app_key || app_key !== 'matche_social') && version < 20005) {
      window.location.href = origin ? `/games?from=${origin}` : '/games';
    } else {
      // window.qchat.callNative(JSON.stringify({ action: 9 }));
      window.qchat.closeWebView();
    }
  }
  /**
   * 解析服务端传的路由
   * matche://main?tabNo=0&action=0&from=1
   */
  public composeRouter = (url: string, from?: number): any => {
    if (/^matche/.test(url)) {
      let search = qs.parse(url.split('?')[1]);
      if(!search['from'] && search['from'] !=0){
        return {
          "action": search['action'] || 0,
          "data": {
            "pageName": 'MAIN',
            "tabNo": search['tabNo'],
          },
        }
      }
      return {
        "action": search['action'] || 0,
        "data": {
          "pageName": 'MAIN',
          "tabNo": search['tabNo'],
          "from":search['from']
          //0:首页 1:推荐页面 2:语音房页面 3:聊天页面 4:我的页面  //5:如果聊天窗口有记录就到聊天tab，否则到推荐页面
        },
      }
    }
    let domain = url.split('?')[0]
    let qsy = qs.parse((url.split('?')[1] || '').split('#')[0]);
    if (typeof (from) !== "undefined" && typeof (from) !== "object") {
      qsy.from = from;
    }
    qsy = qs.stringify(qsy) ? `?${qs.stringify(qsy)}` : '';
    if (/^local:\/\/\//.test(url)) {
      if (/wallet\/recharge/.test(url)) {
        return `${domain}${qsy}#/wallet/recharge`
      } else {
        return `${domain}${qsy}`
      }
    }
    if (/^http/.test(url)) {
      return `${domain}${qsy}`
    }

    return url
  }

  // 调取加密接口
  public getcrypto = (param: object): any => {
    if (isObject(param)) {
      try {
        return JSON.parse(window.qchat.getcrypto(JSON.stringify(param)))
      } catch (error) {
        return {}
      }
    }
    return {}
  }

  uploadTagAudio = (callback) => {
    const global: any = window;
    const _this: any = this;
    try {
      global.qchat.callNative(JSON.stringify({ action: 5 }));
      if (!global.audioRecordCallback) {
        global.audioRecordCallback = (localpath, url, tagId, duration, size) => {
          _this.emit('tag_audio_complete', { localpath, url, tagId, duration, size: +size || 0 });
        };
      }

      _this.on('tag_audio_complete', ({ localpath, url, tagId, duration, size }) => {
        if (typeof callback === 'function') {
          callback({ localpath, url, tagId, duration, size });
        }
      });
    } catch (error) {
    }
  }
}

const ibridge = new Ibridge();

export default ibridge;
