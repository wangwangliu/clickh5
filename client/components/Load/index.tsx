export const getCurrentTime = () => (performance.now())

export const requestAnimationFrameTool = ((() => {
    const FPS = 60
    let timeout = 1000 / FPS
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      ((callBack) => {
        window.setTimeout(() => {
          const start = getCurrentTime()
          callBack(start)
          const end = getCurrentTime()
          timeout = (1000 / FPS) - (end - start)
        }, timeout)
      })
  }))()

interface StateProps{
    dom:object,
    render:()=>void,
    destroy:()=>void
}

class Load implements StateProps{
    public show=false
    public dom= document.body

    constructor(props){
        this.dom = props.dom||document.body;
        import('./index.less');
    }
    
    render=()=>{
        if(window.document){
            this.dom
            .insertAdjacentHTML( 'beforeend',
            `<div class='__loading_'><div class="__yellow_"></div><div class="__purple_"></div><div class="__red_"></div></div>`);
        }
    }

    destroy =()=>{
        const __loading_ = document.querySelector('.__loading_');
        if(__loading_){
            this.dom
            .removeChild(__loading_);
        }
    }
}

export default Load;