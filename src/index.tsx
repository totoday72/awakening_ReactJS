import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import Header from './Header';
import App from './App';
import Leftbar from './Leftbar';
import Footer from './Footer';
import reportWebVitals from './reportWebVitals';
import Login from "./Forms/Login";
import {BrowserRouter, Route,Routes} from "react-router-dom";



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const style = {
    height:75
}
const style2 = {
    height:50
}
function Index (){
    return(
        <React.StrictMode>
            <div style={style}>
            </div>
            <div className={"d-lg-none d-xl-none"} style={style2}>
            </div>
            <div className={"row"}>
                <Leftbar />
                <App />
            </div>
        </React.StrictMode>
    );
}


root.render(
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path='/'  Component={Index}></Route>
            <Route path='/login'  Component={Login}></Route>
        </Routes>
        <Footer />
    </BrowserRouter>
);

/*
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();