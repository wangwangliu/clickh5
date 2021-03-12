/* eslint-disable  max-len */
const api = {
  /**
   * 用户登录
   */
  login: {
    path: "/user/v1/login/index",
    type: "post",
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
  },
  /**
   * 用户注册
   */
  register: {
    path: "/user/v1/reg/index",
    type: "post",
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
  },
  /**
    * 获取用户信息
  */
  userInfo: {
    path: "/user/v1/user/info",
    type: "post",
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
  },

  /**
    * 获取用户信息
  */
  redemprionCode: {
    path: "/user/v1/user/redemprion-code",
    type: "post",
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
  },

  /**
    * 获取小说信息
  */
  bookInfo: {
    path: "/user/v1/novel/book-info",
    type: "post",
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
  },

  /**
    * 获取小说信息
  */
  chapterInfo: {
    path: "/user/v1/novel/chapter-info",
    type: "post",
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
  },

  /**
    * 获取小说信息
  */
  basicSearch: {
    path: "/user/v1/basic/search",
    type: "post",
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
  },

  /**
    * 发现页
  */
  discover: {
    path: "/user/v1/basic/index",
    type: "post",
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
  },

  /**
    * 购买章节
  */
  chapterOrder: {
    path: "/user/v1/novel/chapter-order",
    type: "post",
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
  },

  /**
   * 购买整书
   */
  bookOrder: {
    path: "/user/v1/novel/book-order",
    type: "post",
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
  },

  /**
   * 我的书架
  */
  userBooks: {
    path: "/user/v1/user/books",
    type: "post",
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
  },

  /**
   * 设置自动购买
  */
  setPayAuto: {
    path: "/user/v1/user/auto-order",
    type: "post",
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
  },

};


export default api;
