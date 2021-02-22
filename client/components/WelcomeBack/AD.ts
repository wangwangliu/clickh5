

export enum PAGENAME {
  LuckyDraw=1,
  LuckyWheel=2,
  LuckyEggs=3,
  LuckyKnife=4,
  LuckyScratch=5
}

export const PAGE={
  [PAGENAME.LuckyDraw]:'Lucky Draw',
  [PAGENAME.LuckyWheel]:'Lucky Wheel',
  [PAGENAME.LuckyEggs]:'Lucky Eggs',
  [PAGENAME.LuckyKnife]:'Lucky Knife',
  [PAGENAME.LuckyScratch]:'Lucky Scratch',
}

export const ADPOS = {
  [PAGENAME.LuckyDraw]: {
    banner: 7,
    inset: 8,
  },
  [PAGENAME.LuckyWheel]: {
    banner: 15,
    inset: 18,
  },
  [PAGENAME.LuckyEggs]: {
    banner: 22,
    inset: 24,
  },
  [PAGENAME.LuckyKnife]: {
    banner: 44,
    inset: 38,
  },
  [PAGENAME.LuckyScratch]: {
    banner: 53,
    inset: 52,
  }
}


export default ADPOS