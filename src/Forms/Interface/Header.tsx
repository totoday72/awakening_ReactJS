import React from 'react';
import logo from '../../images/logo.png';
import '../../css/App.css';
import "../../styles.css";
import Button_login from './Loginbtn';

function Header() {
    const style_sm = {
        height: 130
    }
    const style_md = {
        height: 110
    }
    const style_lg = {
        height: 110
    }
    const style_xl = {
        height: 112
    }

    /* para poder ocultar los campos en la impresion: https://getbootstrap.com/docs/4.0/utilities/display/ */
    return (
        <>
            <header className="d-print-none navbar navbar-expand-md navbar-light bg-light fixed-top row">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={logo} alt="" width="75" height="50" className="d-inline-block align-text-top"/>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Inicio</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li>
                                        <hr className="dropdown-divider"></hr>
                                    </li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#" tabIndex={-1}
                                   aria-disabled="true">Disabled</a>
                            </li>
                        </ul>
                        <hr/>
                        <Button_login/>
                    </div>
                </div>
            </header>
            <div className={"d-sm-block d-md-none d-lg-none d-xl-none d-xll-none"} style={style_sm}/>
            <div className={"d-md-block d-sm-none d-lg-none d-xl-none d-xll-none"} style={style_md}/>
            <div className={"d-lg-block d-sm-none d-md-none d-xl-none d-xll-none"} style={style_lg}/>
            <div className={"d-xl-block d-sm-none d-md-none d-lg-none d-xll-none"} style={style_xl}/>
        </>
    );
}


//const headerElement = document.getElementById("header");
//ReactDOM.render(<Header/>, headerElement);


export default Header;