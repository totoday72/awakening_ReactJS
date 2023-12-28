import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import Header from './Forms/Interface/Header';
import App from './App';
import Leftbar from './Forms/Interface/Leftbar';
import Footer from './Forms/Interface/Footer';
import reportWebVitals from './reportWebVitals';
import Login from "./Forms/Paginas/Login";
import Empleado from "./Forms/Awakening/frm_empleado";
import {BrowserRouter, Route,Routes} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

//aca se define la pagina Home de la aplicacion
function Index (){
    return(
        <React.StrictMode>
            <div className={"row"}>
                <Leftbar />
                <App />
            </div>
            <Footer />
        </React.StrictMode>
    );
}
// aca se definen las rutas para las paginas que estan disponibles en la app.
root.render(
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path='/'  Component={Index}></Route>
            <Route path='/login'  Component={Login}></Route>
            <Route path='/empleado'  Component={Empleado}></Route>
        </Routes>
    </BrowserRouter>
);

reportWebVitals();