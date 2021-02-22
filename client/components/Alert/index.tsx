import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './alert.less';
 
let defaultState = {
  alertStatus:false,
  alertContent:"tips",
  closeAlert:function(){},
  oktext:'Yes',
  beforeCloseAlert:function(){}
}
 
class Alert extends Component{

  constructor(){
    super();
    this.confirm = this.confirm.bind(this);
  }
 
  state = {
    ...defaultState
  };

  // 关闭弹框
  async confirm(){
    // const {ayscCloseAlert}= this.state;
    await this.state.beforeCloseAlert()
    this.setState({
      alertStatus:false
    })
    this.state.closeAlert();
  }
  open =(options:any)=>{
    options = options || {};
    options.alertStatus = true;
    this.setState({
      ...defaultState,
      ...options
    })
  }
  close(){
    this.state.closeAlert();
    this.setState({
      ...defaultState
    })
  }

 
  render(){
    return (
        <div className="alert-con" style={this.state.alertStatus? {display:'block'}:{display:'none'}}>
          <div className="alert-context">
            <div className="alert-content-detail">{this.state.alertContent}</div>
            <div className="comfirm" onClick={this.confirm}>{this.state.oktext}</div>
          </div>
        </div>
    );
  }
}

let AlertWrap:any = null;
 
if(window.document){
  let div = document.createElement('div');
  let props = {
  
  };
  document.body.appendChild(div);
  
  AlertWrap = ReactDOM.render(React.createElement(
    Alert,
    props
  ),div);
}

 
export default AlertWrap;