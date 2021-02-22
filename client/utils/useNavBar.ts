import { useEffect } from 'react';
import ibridge from './Ibridge';

const index = (show?)=>{
  useEffect(() => {
    if(show){
      ibridge.showTopBar()
    }else{
      ibridge.hideTopBar()
    }
  },[])
};

export default index;