import React from 'react';
import '../../css/App.css';
import "../../styles.css";


function Charge_Modules(){

}


function Leftbar() {
    return (
        <div id="sidebarMenu" className="col-auto col-12 col-sm-12 col-md-3 col-lg-3 col-xl-2 px-sm-2 px-0 d-md-block bg-light sidebar collapse">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5 ">Menu</span>
                </a>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li className="nav-item">
                        <a href="#" className="nav-link align-middle px-0">
                            <i className="fs-4 bi-house"></i> <span className="ms-1 ">Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="/login" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-people"></i> <span className="ms-1 ">Login</span> </a>
                    </li>
                    <li>
                        <a href="/empleado" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-person-fill-add"></i> <span className="ms-1 ">Ingreso Empleado</span> </a>
                    </li>
                </ul>

            </div>
        </div>
)
}


//const headerElement = document.getElementById("header");
//ReactDOM.render(<Header/>, headerElement);


export default Leftbar;