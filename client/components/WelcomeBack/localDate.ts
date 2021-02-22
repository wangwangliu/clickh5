import moment from 'moment';
import store from 'store2';
import get from 'lodash/get';
import ibridge from '../../utils/Ibridge';

class local {
  /**
   * 
   * @param delayed 延时时间进行计数
   * @param name 页面名
   */
  static getStorage({ delayed, name, gameName }) {
    return ibridge.getAppInfo()
      .then(({ uid }) => {
        // console.log(store.getAll(), 'store')
        const key = `${uid}${gameName}.${local.getMoment()}`;
        const val = store(`${name}`);
        let times = get(val, key);
        console.log(get(val, `${uid}${gameName}`),'===')
        if (!get(val, `${uid}${gameName}`)) {
          if (!val) {
            store(`${name}`, {
              [`${uid}${gameName}`]: {
                countTime: Math.ceil((+new Date()) / 1000),
                [`${local.getMoment()}`]: 0
              }
            })
          } else {
            store(`${name}`, {
              ...val,
              [`${uid}${gameName}`]: {
                countTime: Math.ceil((+new Date()) / 1000),
                [`${local.getMoment()}`]: 0
              },
            })
          }
          return 0
        } else {
          console.log(Math.ceil((+new Date()) / 1000) - (+get(val, `${uid}${gameName}.countTime`)),'离显示时间')
          if (Math.ceil((+new Date()) / 1000) - (+get(val, `${uid}${gameName}.countTime`)) < delayed) {
            return 0
          }
          if (!times && times != 0) {
            store(`${name}`, {
              ...val,
              [`${uid}${gameName}`]: {
                countTime: get(val, `${uid}${gameName}.countTime`),
                [`${local.getMoment()}`]: 1
              },
            })
            return 1
          } else {
            store(`${name}`, {
              ...val,
              [`${uid}${gameName}`]: {
                countTime: get(val, `${uid}${gameName}.countTime`),
                [`${local.getMoment()}`]: ++times
              },
             
            })
            return times;
          }
        }
      })
  }

  static setStorage(stage) {

  }

  static getMoment() {
    return moment().format('YYYYMMDD');
  }
  /**
   * 删除当天之外的数据
   */
  static delStorage(front) {
    const ALLDATA = Object.keys(store.getAll() || {});
    ALLDATA.map((item) => {
      if (item.indexOf(front) > -1) {
        store.remove(item);
      }
    })
  }

}
export default local