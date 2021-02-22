class ImageLoad {
  constructor(imgList) {
    this.flag = 0;
    this.timeOut = 3;
    this.count = 0;
    this.imgList = imgList || [];
  }
  load(cb) {
    const that = this;
    const { imgList } = this;
    return new Promise((resolve, reject) => {
      if (!this.isArrayFn(imgList)) reject(new Error("It's not allow params"));
      if (!imgList.length) reject(new Error("It's not null"));
      // 重置队列
      that.reset(imgList.length);

      that.imgList = imgList;

      imgList.forEach((item) => {
        // 开始加载
        const img = new Image();
        // 超时回调
        const timer = that._timeOut(item);

        img.src = item;

        // 加载成功
        img.onload = that.onload.bind(this, item, timer, cb, resolve);
        // 加载失败
        img.onerror = that.onerror.bind(this, item, timer, cb, resolve);
      });
    });
  }


  _timeOut() {
    const that = this;

    const timer = setTimeout(() => {
      clearTimeout(timer);
      // that.timeOutCB({
      //     name: src,
      //     msg: "load timer"
      // });
    }, that.timeOut * 1000);
    return timer;
  }


  onload(src, timer, cb, resolve) {
    // 清理计时器
    clearTimeout(timer);
    // 加载成功信息记录
    this.success.data.push(src);
    // 执行进度回调
    // this.progress(++this.flag, this.count);
    // eslint-disable-next-line no-plusplus
    ++this.flag;
    if (typeof cb === 'function') { cb(this.flag, this.count); }
    // 队列加载完成后调起then
    this.complate(resolve);
  }

  onerror(src, timer, cb, resolve) {
    // 清理计时器
    clearTimeout(timer);
    // 错误信息记录
    this.err.data.push(src);
    // 执行进度回调
    // this.progress(++this.flag, this.count);
    // eslint-disable-next-line no-plusplus
    ++this.flag;
    typeof (cb) === 'function' && cb(this.flag, this.count);
    // 队列加载完成后调起then
    this.complate(resolve);
  }

  complate(resolve) {
    if (this.flag >= this.count) {
      resolve(this.success);
    }
  }

  reset(len) {
    this.imgList = [];
    this.flag = 0;
    this.count = len;
    this.success = {
      code: 0,
      msg: 'success',
      data: [],
    };
    this.err = {
      code: -1,
      msg: 'load error',
      data: [],
    };
  }

  isArrayFn(arr) {
    if (typeof Array.isArray === "function") return Array.isArray(arr);

    return Object.prototype.toString.call(arr) === '[object Array]';
  }
}

export default ImageLoad;
