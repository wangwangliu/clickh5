/* eslint-disable  max-len */
const api = {
  /**
   * 上传图片
   */
  UploadFeedImg: {
    path: "/matche/upload/uploadApi/UploadFeedImg",
    type: "post",
    author: "鹏菊",
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
  },
  /**
   * 获取问题推荐
   * /feedback/feedbackApi/GetFaqRecommend
   */
  GetFaqRecommend: {
    path: "/matche/feedback/feedbackApi/GetFaqRecommend",
    type: "get",
    author: "鹏菊",
  },
  // 获取faq分类
  GetFaqCateList: {
    path: "/matche/feedback/feedbackApi/GetFaqCateList",
    type: "get",
    author: "鹏菊",
  },
  // 获取faq 详情
  GetFaqInfo: {
    path: "/matche/feedback/feedbackApi/GetFaqInfo",
    type: "get",
    author: "鹏菊",
  },
  // 获取faq 列表
  GetFaqList: {
    path: "/matche/feedback/feedbackApi/GetFaqList",
    type: "get",
    author: "鹏菊",
  },
  // 提交反馈
  FeedAdd: {
    path: "/matche/feedback/feedbackApi/FeedAdd",
    type: "post",
    author: "鹏菊",
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
  },
  // 获取用户反馈信息
  GetFeedInfo: {
    path: "/matche/feedback/feedbackApi/GetFeedInfo",
    type: "get",
    author: "鹏菊",
  },
  // 获取用户的反馈列表
  GetFeedList: {
    path: "/matche/feedback/feedbackApi/GetFeedList",
    type: "get",
    author: "鹏菊",
  },
  // 获取用户协议
  PrivacyProtocol: {
    path: "/matche/common/commonApi/PrivacyProtocol",
    type: "get",
    author: "鹏菊",
  },
  // 获取隐私协议
  PrivacyPolicy: {
    path: "/matche/common/commonApi/PrivacyPolicy",
    type: "get",
    author: "鹏菊",
  },
  // 分享
  Share: {
    path: "/matche/common/commonApi/Share",
    type: "get",
    author: "鹏菊",
  },
  // 获取FAQ分类推荐
  GetFaqCateRecommend: {
    path: "/matche/feedback/feedbackApi/GetFaqCateRecommend",
    type: "get",
    author: "鹏菊",
  },
  // 获取分享素材
  H5Share: {
    path: "/matche/common/commonApi/H5Share",
    type: "get",
    author: "鹏菊",
  },
  // 申请种子用户
  ApplySeedUser: {
    path: "/matche/campaign/campaignApi/ApplySeedUser",
    type: "POST",
    author: "栋成",
    headers: { 'Content-Type': 'application/json' },
  },
  // 申请推广用户
  ApplyPromotionUser: {
    path: "/matche/campaign/campaignApi/ApplyPromotionUser",
    type: "POST",
    author: "栋成",
    headers: { 'Content-Type': 'application/json' },
  },
  // 上传申请图片
  UploadImage: {
    path: "/matche/campaign/campaignApi/UploadImage",
    type: "POST",
    author: "栋成",
    headers: { 'Content-Type': 'application/json' },
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
  },
  // 获取地区和语言信息
  GetNativeInfo: {
    path: "/matche/campaign/campaignApi/GetNativeInfo",
    type: "get",
    author: "栋成",
  },
  // 用户登录
  RegisterOrLoginUser: {
    path: "/matche/user/userApi/RegisterOrLoginUser",
    type: "post",
    headers: { 'Content-Type': 'application/json' },
    author: "栋成",
  },
  // 获取用户等级列表
  GetLevels: {
    path: "/matche/campaign/campaignApi/GetLevels",
    type: "get",
    author: "志雄",
  },
  // 获取用户好友
  GetFriends: {
    path: "/matche/campaign/campaignApi/GetFriends",
    type: "get",
    author: "志雄",
  },
  // 获取聊天信息
  GetChats: {
    path: "/matche/campaign/campaignApi/GetChats",
    type: "get",
    author: "志雄",
  },
  // 获取聊天信息
  GetActiveFriends: {
    path: "/matche/campaign/campaignApi/GetActiveFriends",
    type: "get",
    author: "志雄",
  },
  // 活动用户登录
  campaignApiLogin: {
    path: "/matche/campaign/campaignApi/Login",
    type: "POST",
    author: "栋成",
    headers: { 'Content-Type': 'application/json' },
  },
  // 发送短信
  SendSms: {
    path: "/matche/common/commonApi/SendSmsWeb",
    type: "POST",
    author: "志雄",
    headers: { 'Content-Type': 'application/json' },
  },
  // v1.1版本：FAQ列表
  Faq: {
    path: "/matche/feedback/feedbackApi/Faq",
    type: "get",
    author: "pengju",
  },
  // v1.1版本：FAQ搜索
  FaqSearch: {
    path: "/matche/feedback/feedbackApi/FaqSearch",
    type: "post",
    author: "dongcheng",
    headers: { 'Content-Type': 'application/json' },
  },
  // v1.1版本：FAQ详情
  // GetFaqInfo: {
  //   path: "/feedback/feedbackApi/GetFaqInfo",
  //   type: "get",
  //   author: "pengju",
  // },
  // v1.1版本：投票
  FaqHelpful: {
    path: "/matche/feedback/feedbackApi/FaqHelpful",
    type: "post",
    author: "pengju",
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
  },
  // 生成短链
  GetShortUrl: {
    path: "/matche/common/commonApi/GetShortUrl",
    type: "POST",
    author: "栋成",
    headers: { 'Content-Type': 'application/json' },
  },
  // 获取支付订单历史
  getOrderHistoryLog: {
    path: "/matche.paycenter/payCenterApiH5/getOrderHistoryLog",
    type: "POST",
    author: "老蒋",
    headers: { 'Content-Type': 'application/json' },
  },

  // 获得hcoin历史记录
  getXCoinHistoryLog: {
    path: "/matche.paycenter/payCenterApiH5/getXCoinHistoryLog",
    type: "POST",
    author: "老蒋",
    headers: { 'Content-Type': 'application/json' },
  },

  // 获取钻石消费历史记录
  getDiamondHistoryLog: {
    path: "/matche.paycenter/payCenterApiH5/getDiamondHistoryLog",
    type: "POST",
    author: "老蒋",
    headers: { 'Content-Type': 'application/json' },
  },
  // 创建订单
  createCodaOrder: {
    path: "/matche.paycenter/payCenterApiH5/createCodaOrder",
    type: "POST",
    author: "老蒋",
    headers: { 'Content-Type': 'application/json' },
  },

  // 获取钻石产品列表
  getProductList: {
    path: "/matche.paycenter/payCenterApiH5/getProductList",
    type: "POST",
    author: "老蒋",
    headers: { 'Content-Type': 'application/json' },
  },

  // 获取vip产品列表
  getVipList: {
    path: "/matche.paycenter/payCenterApiH5/getVipList",
    type: "POST",
    author: "老蒋",
    headers: { 'Content-Type': 'application/json' },
  },

  // 获取提现信息
  getDrawInfo: {
    path: "/matche.paycenter/payCenterApiH5/getDrawInfo",
    type: "POST",
    author: "老蒋",
    headers: { 'Content-Type': 'application/json' },
  },

  // 提现
  drawMoney: {
    path: "/matche.paycenter/payCenterApiH5/drawMoney",
    type: "POST",
    author: "老蒋",
    headers: { 'Content-Type': 'application/json' },
  },

  // 获取提现历史记录
  getDrawHistoryLog: {
    path: "/matche.paycenter/payCenterApiH5/getDrawHistoryLog",
    type: "POST",
    author: "老蒋",
    headers: { 'Content-Type': 'application/json' },
  },

  // 个人钱包信息
  getWalletInfo: {
    path: "/matche.paycenter/payCenterApiH5/getWalletInfo",
    type: "POST",
    author: "老蒋",
    headers: { 'Content-Type': 'application/json' },
  },
  // 获取收费设置相关信息
  getCharges: {
    path: "/matche.paycenter/payCenterApiH5/getCharges",
    type: "POST",
    author: "老蒋",
    headers: { 'Content-Type': 'application/json' },
  },
  // 设置收费信息
  setCharges: {
    path: "/matche.paycenter/payCenterApiH5/setCharges",
    type: "POST",
    author: "老蒋",
    headers: { 'Content-Type': 'application/json' },
  },
  // 获取vip和钻石信息
  getVipAndDiamond: {
    path: "/matche.paycenter/payCenterApiH5/getVipAndDiamond",
    type: "POST",
    author: "老蒋",
    headers: { 'Content-Type': 'application/json' },
  },
  // 获取订单状态信息
  getOrderStatus: {
    path: "/matche.paycenter/payCenterApiH5/getOrderStatus",
    type: "POST",
    author: "老蒋",
    headers: { 'Content-Type': 'application/json' },
  },
  // 获取个人推荐
  GetRecommendVerification: {
    path: "/matche/user/userApi/GetRecommendVerification",
    type: "POST",
    author: "志雄",
    headers: { 'Content-Type': 'application/json' },
  },
  // 申请推荐认证
  RecommendVerification: {
    path: "/matche/user/userApi/RecommendVerification",
    type: "POST",
    author: "志雄",
    headers: { 'Content-Type': 'application/json' },
  },
  // 获取一些配置信息
  AppStart: {
    path: "/matche/common/commonApi/AppStart",
    type: "GET",
    author: "志雄",
  },
  createLimitCodaOrder: {
    path: "/matche.paycenter/payCenterApiH5/createLimitCodaOrder",
    type: "POST",
    author: "老蒋",
    headers: { 'Content-Type': 'application/json' },
  },
  ChangeCodaLanAndCreateOrder: {
    path: "/matche.paycenter/payCenterApiH5/ChangeCodaLanAndCreateOrder",
    type: "POST",
    author: "老蒋",
    headers: { 'Content-Type': 'application/json' },
  },
  getPayChannelList: {
    path: "/matche.paycenter/payCenterApiH5/getPayChannelList",
    type: "POST",
    author: "老蒋",
    headers: { 'Content-Type': 'application/json' },
  },
  getSpecialProductAndStatus: {
    path: "/matche.paycenter/payCenterApiH5/getSpecialProductAndStatus",
    type: "POST",
    author: "老蒋",
    headers: { 'Content-Type': 'application/json' },
  },
  // 获取广告位概率配置
  GetAdPercent: {
    path: "/matche.common/CommonApiH5/GetAdPercent",
    type: "GET",
    author: "鹏玄",
  },
  // 获取抽奖记录
  ListRaffleRecord: {
    path: "/matche/user/userApi/ListRaffleRecord",
    type: "POST",
    author: "志雄",
    headers: { 'Content-Type': 'application/json' },
  },
  // 抽奖
  GetSpinInfo: {
    path: "/matche/user/userApi/GetSpinInfo",
    type: "POST",
    author: "志雄",
    headers: { 'Content-Type': 'application/json' },
  },
  SpinCallback: {
    path: "/matche/user/userApi/SpinCallback",
    type: "POST",
    author: "志雄",
    headers: { 'Content-Type': 'application/json' },
  },
  SpinGo: {
    path: "/matche/user/userApi/SpinGo",
    type: "POST",
    author: "志雄",
    headers: { 'Content-Type': 'application/json' },
  },
  // 设置
  setIsOpenSurprisedProduct: {
    path: "/matche.paycenter/payCenterApiH5/setIsOpenSurprisedProduct",
    type: "POST",
    author: "老蒋",
    headers: { 'Content-Type': 'application/json' },
  },
  // 获取惊喜产品信息
  getSurprisedProduct: {
    path: "/matche.paycenter/payCenterApiH5/getSurprisedProduct",
    type: "POST",
    author: "老蒋",
    headers: { 'Content-Type': 'application/json' },
  },
  // 兑换碎石
  exchangeDiamondFromShard: {
    path: "/matche.paycenter/payCenterApiH5/exchangeDiamondFromShard",
    type: "POST",
    author: "老蒋",
    headers: { 'Content-Type': 'application/json' },
  },
  // 获取自己用户信息
  GetSelfInfo: {
    path: "/matche/user/userApi/GetSelfInfo",
    type: "POST",
    author: "志雄",
    encrypt: true,
    headers: { 'Content-Type': 'application/json' },
  },
  // 获取达人榜单
  GetTopBeauties: {
    path: "/matche/user/userApi/GetTopBeauties",
    type: "POST",
    author: "志雄",
    encrypt: true,
    headers: { 'Content-Type': 'application/json' },
  },
  // 获取游戏中心列表
  GetGameConfig: {
    path: "/matche/user/userApi/GetGameConfig",
    type: "POST",
    author: "志雄",
    headers: { 'Content-Type': 'application/json' },
  },
  // 游戏中心banner奖励回调
  GameEntryBannerCallback: {
    path: "/matche/user/userApi/GameEntryBannerCallback",
    type: "POST",
    author: "志雄",
    encrypt: true,
    headers: { 'Content-Type': 'application/json' },
  },
  // 获取彩蛋信息
  GetLuckyEggInfo: {
    path: "/matche/user/userApi/GetLuckyEggInfo",
    type: "POST",
    author: "志雄",
    headers: { 'Content-Type': 'application/json' },
  },
  // 获取刮刮卡信息
  GetLuckyScratchInfo: {
    path: "/matche/user/userApi/GetLuckyScratchInfo",
    type: "POST",
    author: "老蒋",
    encrypt: true,
    headers: { 'Content-Type': 'application/json' },
  },
  // 刮刮卡领奖
  luckyScratchCallback: {
    path: "/matche/user/userApi/luckyScratchCallback",
    type: "POST",
    author: "老蒋",
    encrypt: true,
    headers: { 'Content-Type': 'application/json' },
  },
  // 刮刮卡中奖纪录
  luckyScratchHistory: {
    path: "/matche/user/userApi/luckyScratchHistory",
    type: "POST",
    author: "老蒋",
    encrypt: true,
    headers: { 'Content-Type': 'application/json' },
  },
  // 开启宝箱
  OpenBoxCallback: {
    path: "/matche/user/userApi/OpenBoxCallback",
    type: "POST",
    author: "志雄",
    encrypt: true,
    headers: { 'Content-Type': 'application/json' },
  },
  // [Lucky Wheel] 获取转盘信息
  GetLuckyWheelInfo: {
    path: "/matche/user/userApi/GetLuckyWheelInfo",
    type: "POST",
    author: "志雄",
    headers: { 'Content-Type': 'application/json' },
  },
  // 砸彩蛋
  SmashLuckyEgg: {
    path: "/matche/user/userApi/SmashLuckyEgg",
    type: "POST",
    author: "志雄",
    headers: { 'Content-Type': 'application/json' },
  },
  // [Lucky Wheel] 开始转盘
  LuckyWheelGo: {
    path: "/matche/user/userApi/LuckyWheelGo",
    type: "POST",
    author: "志雄",
    headers: { 'Content-Type': 'application/json' },
  },
  // 获取彩蛋记录
  GetLuckyEggRecords: {
    path: "/matche/user/userApi/GetLuckyEggRecords",
    type: "POST",
    author: "志雄",
    headers: { 'Content-Type': 'application/json' },
  },
  // [Lucky Wheel] 获取转盘记录
  GetLuckyWheelRecords: {
    path: "/matche/user/userApi/GetLuckyWheelRecords",
    type: "POST",
    author: "志雄",
    headers: { 'Content-Type': 'application/json' },
  },
  // 中奖后彩蛋回调
  LuckyEggCallback: {
    path: "/matche/user/userApi/LuckyEggCallback",
    type: "POST",
    author: "志雄",
    headers: { 'Content-Type': 'application/json' },
  },
  // [Lucky Wheel] 获取看激励广告随机码
  GetLuckyWheelAdRandom: {
    path: "/matche/user/userApi/GetLuckyWheelAdRandom",
    type: "POST",
    author: "志雄",
    headers: { 'Content-Type': 'application/json' },
  },
  // [Lucky Wheel] 看激励广告回调
  LuckyWheelAdCallback: {
    path: "/matche/user/userApi/LuckyWheelAdCallback",
    type: "POST",
    author: "志雄",
    headers: { 'Content-Type': 'application/json' },
  },
  // 通过商品id获取商品信息
  getProductById: {
    path: "/matche.paycenter/payCenterApiH5/getProductById",
    type: "POST",
    author: "老蒋",
    headers: { 'Content-Type': 'application/json' },
  },
  // 获取用户任务列表
  GetUserTaskList: {
    path: "/matche.paycenter/payCenterApiH5/GetUserTaskList",
    type: "POST",
    author: "鹏菊",
    headers: { 'Content-Type': 'application/json' },
  },
  // 获取用户签到详情
  GetCheckInInfo: {
    path: "/matche.paycenter/payCenterApiH5/GetCheckInInfo",
    type: "POST",
    author: "鹏菊",
    headers: { 'Content-Type': 'application/json' },
  },
  // 用户签到
  CheckIn: {
    path: "/matche.paycenter/payCenterApiH5/CheckIn",
    type: "POST",
    author: "鹏菊",
    headers: { 'Content-Type': 'application/json' },
  },
  // 领取任务
  ReceiveTask: {
    path: "/matche.paycenter/payCenterApiH5/ReceiveTask",
    type: "POST",
    author: "鹏菊",
    headers: { 'Content-Type': 'application/json' },
  },
  // 领取奖励
  ReceiveReward: {
    path: "/matche.paycenter/payCenterApiH5/ReceiveReward",
    type: "POST",
    author: "鹏菊",
    headers: { 'Content-Type': 'application/json' },
  },
  // 增加任务完成数
  IncrTaskFinish: {
    path: "/matche.paycenter/payCenterApiH5/IncrTaskFinish",
    type: "POST",
    author: "鹏菊",
    headers: { 'Content-Type': 'application/json' },
  },
  // 领取DOUBLE奖励
  ReceiveDoubleReward: {
    path: "/matche.paycenter/payCenterApiH5/ReceiveDoubleReward",
    type: "POST",
    author: "鹏菊",
    headers: { 'Content-Type': 'application/json' },
  },
  // 任务banner列表
  GetTaskBanner: {
    path: "/matche.paycenter/payCenterApiH5/GetTaskBanner",
    type: "POST",
    author: "鹏菊",
    headers: { 'Content-Type': 'application/json' },
  },
  // 飞刀游戏
  // [Knife Hit] 获取飞刀游戏信息
  GetKnifeHitInfo: {
    path: "/matche/user/userApi/GetKnifeHitInfo",
    type: "POST",
    author: "志雄",
    encrypt: true,
    headers: { 'Content-Type': 'application/json' },
  },
  // 获取游戏数据
  GetKnifeHits: {
    path: "/matche/user/userApi/GetKnifeHits",
    type: "POST",
    author: "志雄",
    encrypt: true,
    headers: { 'Content-Type': 'application/json' },
  },
  // 飞刀游戏回调
  KnifeHitCallback: {
    path: "/matche/user/userApi/KnifeHitCallback",
    type: "POST",
    author: "志雄",
    encrypt: true,
    headers: { 'Content-Type': 'application/json' },
  },

  // 获取主播数据
  GetDailyAnchor: {
    path: "/matche/user/userApi/GetDailyAnchor",
    type: "POST",
    author: "志雄",
    encrypt: true,
    headers: { 'Content-Type': 'application/json' },
  },
  // 获取主播月数据
  GetMonthlyAnchor: {
    path: "/matche/user/userApi/GetMonthlyAnchor",
    type: "POST",
    author: "志雄",
    encrypt: true,
    headers: { 'Content-Type': 'application/json' },
  },

  // 获取老虎机信息
  GetLuckyGiftInfo: {
    path: "/matche/user/userApi/GetLuckyGiftInfo",
    type: "POST",
    author: "鹏局",
    encrypt: true,
    headers: { 'Content-Type': 'application/json' },
  },
  // 开始老虎机抽奖
  LuckyGiftGo: {
    path: "/matche/user/userApi/LuckyGiftGo",
    type: "POST",
    author: "鹏局",
    encrypt: true,
    headers: { 'Content-Type': 'application/json' },
  },
  // 看完广告回调
  LuckyGiftCallback: {
    path: "/matche/user/userApi/LuckyGiftCallback",
    type: "POST",
    author: "鹏局",
    encrypt: true,
    headers: { 'Content-Type': 'application/json' },
  },
  // 获取老虎机广告随机数
  GetLuckyGiftAdRandom: {
    path: "/matche/user/userApi/GetLuckyGiftAdRandom",
    type: "POST",
    author: "鹏局",
    encrypt: true,
    headers: { 'Content-Type': 'application/json' },
  },
  // 看激励广告回调
  LuckyGiftAdCallback: {
    path: "/matche/user/userApi/LuckyGiftAdCallback",
    type: "POST",
    author: "鹏局",
    encrypt: true,
    headers: { 'Content-Type': 'application/json' },
  },
  // 获取老虎机记录
  GetLuckyGiftRecords: {
    path: "/matche/user/userApi/GetLuckyGiftRecords",
    type: "POST",
    author: "鹏局",
    encrypt: true,
    headers: { 'Content-Type': 'application/json' },
  },
  // 欢迎回来回调
  GameComeBackCallback: {
    path: "/matche/user/userApi/GameComeBackCallback",
    type: "POST",
    author: "志雄",
    encrypt: true,
    headers: { 'Content-Type': 'application/json' },
  },
  GetNewTaskBanner: {
    path: "/matche.paycenter/payCenterApiH5/GetNewTaskBanner",
    type: "get",
    author: "pengju",
  },
  // 获取主播报名信息
  GetOfficialBroadcasterInfo: {
    path: "/matche/user/userApi/GetOfficialBroadcasterInfo",
    type: "POST",
    author: "鹏玄",
    encrypt: true,
    headers: { 'Content-Type': 'application/json' },
  },
  // 提交主播报名信息
  SetOfficialBroadcasterInfo: {
    path: "/matche/user/userApi/SetOfficialBroadcasterInfo",
    type: "POST",
    author: "鹏玄",
    encrypt: true,
    headers: { 'Content-Type': 'application/json' },
  },
  // 新：用户签到
  NewCheckIn: {
    path: "/matche.paycenter/payCenterApiH5/NewCheckIn",
    type: "POST",
    author: "鹏玄",
    // encrypt: true,
    headers: { 'Content-Type': 'application/json' },
  },
  // 任务列表
  GetUserNewTaskList: {
    path: "/matche.paycenter/payCenterApiH5/GetUserNewTaskList",
    type: "GET",
    author: "鹏玄",
  },
  // 新：获取用户签到详情
  GetNewCheckInInfo: {
    path: "/matche.paycenter/payCenterApiH5/GetNewCheckInInfo",
    type: "GET",
    author: "鹏玄",
  },
  // 新：领取DOUBLE奖励
  NewReceiveDoubleReward: {
    path: "/matche.paycenter/payCenterApiH5/NewReceiveDoubleReward",
    type: "POST",
    author: "鹏玄",
    // encrypt: true,
    headers: { 'Content-Type': 'application/json' },
  },
  // 新：领取任务
  NewReceiveTask: {
    path: "/matche.paycenter/payCenterApiH5/NewReceiveTask",
    type: "POST",
    author: "鹏玄",
    // encrypt: true,
    headers: { 'Content-Type': 'application/json' },
  },
  // 新：领取奖励
  NewReceiveReward: {
    path: "/matche.paycenter/payCenterApiH5/NewReceiveReward",
    type: "POST",
    author: "鹏玄",
    encrypt: true,
    headers: { 'Content-Type': 'application/json' },
  },

};


export default api;
