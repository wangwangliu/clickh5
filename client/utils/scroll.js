export default class Scroll {
  constructor() {
    this.startx = 0;
    this.starty = 0;
  }
  getAngle(angx, angy) {
    return Math.atan2(angy, angx) * 180 / Math.PI;
  }

  getDirection(startx, starty, endx, endy) {
    const angx = endx - startx;
    const angy = endy - starty;
    let result = 0;
    // 如果滑动距离太短
    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
      return result;
    }
    const angle = this.getAngle(angx, angy);
    if (angle >= -135 && angle <= -45) {
      result = 1;
    } else if (angle > 45 && angle < 135) {
      result = 2;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
      result = 3;
    } else if (angle >= -45 && angle <= 45) {
      result = 4;
    }
    return result;
  }

  init(fn,dom) {
    (dom||document).addEventListener("touchstart", (e) => {
      this.startx = e.touches[0].pageX;
      this.starty = e.touches[0].pageY;
    }, false);
    (dom||document).addEventListener("touchend", (e) => {
      // eslint-disable-next-line one-var
      let endx = e.changedTouches[0].pageX;
      let endy = e.changedTouches[0].pageY;
      const direction = this.getDirection(this.startx, this.starty, endx, endy);
      fn(direction);
      // switch (direction) {
      //     case 0:
      //         console.log("未滑动！");
      //         break;
      //     case 1:
      //         console.log("向上！");
      //         break;
      //     case 2:
      //         console.log("向下！");
      //         break;
      //     case 3:
      //         console.log("向左！");
      //         break;
      //     case 4:
      //         console.log("向右！");
      //         break;
      //     default:
      // }
    }, false);
  }
}
