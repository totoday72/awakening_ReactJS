import React from 'react';
import logo from '../../images/logo.png';
import '../../css/App.css';
import "../../styles.css";
import { withCookies, Cookies, useCookies} from 'react-cookie';
import Button_login from './loginbutton';



function ComponentWillMount() {
    const [cookies] = useCookies();
    // let  getCookievalue = cookies.name.maxAge;/*
    // let exp = cookies.load('exp');
    // console.log(getCookie);
    // if(getCookie === undefined || ((exp - new Date().getTime()) < 0)) {
    //     let url = 'http://localhost:8080/login.html'
    //     window.location.href =  url
    //     console.log(url)
    // }*/
    // console.log(getCookievalue);
    // updateCookies.name;
    return (<div> {cookies.name + cookies.name} </div>);

}

function Close_Session(){
    const [cookies, ] = useCookies();
    const cookie = cookies["name"];

    if (cookie) {
        console.log("Existe la cookie y sy valor es:" + cookie);
        return (<div>1</div>);
    } else {
        console.log('NO HAY COOKIE LLAMADA NAME');
        return (<div>0</div>);
    }
}

function Header() {
    return (

        <header className="navbar navbar-expand-lg navbar-light bg-light fixed-top row">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="" width="75" height="50" className="d-inline-block align-text-top"/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
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
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider"></hr></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#" tabIndex={-1}  aria-disabled="true">Disabled</a>
                        </li>
                    </ul>
                    <hr/>
                    <Button_login />



                </div>

            </div>
            <ComponentWillMount />
            <Close_Session />
        </header>)
}



    //const headerElement = document.getElementById("header");
    //ReactDOM.render(<Header/>, headerElement);


    export default Header;