import isEqual from 'lodash/isEqual';

export default (prevProps, nextProps) => {
  const prevPropsMap = new Map(Object.entries(prevProps));
  let equal = true;
  const nextPropsEntries = Object.entries(nextProps);
  for (let prop of nextPropsEntries) {
    const [key, value] = prop;
    let prevValue: any = prevPropsMap.get(key);
    if (typeof value === 'function') {
      if (prevValue.toString() !== value.toString()) {
        equal = false;
        // console.info('debug_render_result_0', equal);
        return equal;
      }
    } else {
      equal = isEqual(prevValue, value);
      if (!equal) {
        // console.info('debug_render_result_1', equal, { key, prevValue, value }, { prevProps, nextProps });
        return equal;
      }
    }
  }
  // console.info('debug_render_result_2', equal);
  return equal;
};
