// eslint-disable-next-line import/prefer-default-export
export function isMobile(userAgent = '') {
  const agentID = userAgent.toLowerCase().match(/(iphone|ipod|ipad|android)/);
  return !!agentID;
}

export function isMobileExexcludeIpad(userAgent = '') {
  const agentID = userAgent.toLowerCase().match(/(iphone|ipod|android)/);
  return !!agentID;
}

export function isIos(userAgent = '') {
  const agentID = userAgent.toLowerCase().match(/(iphone|ipod|ipad)/);
  return !!agentID;
}