import React from "react";
import background_img from './images/AWK_TRIColor_Op4.jpg'

const style_index = {
    backgroundImage: "URL(" + background_img + ")",
    height: 400,
    weight: 500,
    backgroundRepeat: "no-repeat"
}

const App = () =>{
    return (
        <div style={style_index} className={'col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-10 d-lg-block'}>

        </div>
    );
}


export default App;