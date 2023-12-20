import React, {useState} from 'react';
import {useCookies} from "react-cookie";
import {Dropdown} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import logo from "../../images/logo.png";

const nodJS = 'http://192.168.10.237:3001/api/';
function Charge_Login(){
    const cerrar_sesion = (event) => {
        event.preventDefault();
        removeCookie('session');
        sessionStorage.removeItem("session");
        Redirect_home();
    };

    async function parseUser(user: any, password: any) {
        // POST request using fetch with error handling
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: user, password: password})
        };
        const response =  await fetch(nodJS + 'users', requestOptions)
        // return response;
        return await response.json();

    }

    function Redirect_home (){
        let url = '/';
        window.location.href =  url.toString();
    }

    const [cookies, setCookie, removeCookie] = useCookies();
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const iniciar_sesion = async (event: {
        currentTarget: any;
        preventDefault: () => void;
        stopPropagation: () => void;
    }) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (form.checkValidity() === true) {
            let usuario = form["usuario"].value;
            let contrasenia = form["contrasenia"].value;
            const response = await parseUser(usuario, contrasenia);
            let keyCount  = Object.keys(response).length;
            if (keyCount > 0 ){
                sessionStorage.setItem('session',response[0].PASS);
                const expire_time = new Date();
                expire_time.setHours(0, 0, 0, 0);
                expire_time.setDate(expire_time.getDate() + 1);
                setCookie('session', 'session',{
                    path: "/", expires: expire_time
                });
                setCookie('nombre', response[0].NOMBRE,{
                    path: "/", expires: expire_time
                });
                setCookie('usuario', response[0].USUARIO,{
                    path: "/", expires: expire_time
                });
                Redirect_home();
            }else{
                alert("Usuario o contraseña incorrectos!");
            }
        }
    };

    let session = cookies.session;
    console.log(session);
    if (session === undefined || ((session - new Date().getTime()) < 0)) {
        return (
            <div>
                <Button variant="outline-primary" size="sm" onClick={handleShow} type={undefined}>
                    Iniciar sesion
                </Button>

                <Modal show={show} onHide={handleClose} animation={true}>
                    <Modal.Header closeButton>
                        <a className="navbar-brand" href="/">
                            <img src={logo} alt="" width="75" height="50" className="d-inline-block align-text-top"/>
                        </a>
                        <Modal.Title>Iniciar sesion en Awakening</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form noValidate validated={validated} onSubmit={iniciar_sesion}>
                            <Form.Group as={Col} controlId="validationCustom01">
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control
                                    id="usuario"
                                    required
                                    type="text"
                                    placeholder="Ingrese su usuario"
                                    // defaultValue="Mark"
                                />
                                <Form.Control.Feedback type="valid">Campo lleno!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Ingrese un usuario valido</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="validationCustom02">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    id="contrasenia"
                                    required
                                    type="password"
                                    placeholder="Ingrese una contraseña"
                                    // defaultValue="Ingrese la contraseña"
                                />
                                <Form.Control.Feedback type="valid">Campo lleno!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Ingrese su contraseña</Form.Control.Feedback>
                            </Form.Group>
                            <Row className="mb-auto" as={Col}>
                                <Col className="mb-4 mb-lg-4" as={Col}></Col>
                                <Col className="mb-4 mb-lg-4" as={Col}>
                                    <Button className="btn btn-warning" type={undefined}>Iniciar Sesión</Button>
                                </Col>
                                <Col className="mb-4 mb-lg-4" as={Col}></Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    } else {
        return (
            <Dropdown>
                <Dropdown.Toggle className="btn btn-primary bg-light" type={undefined} variant="success" id="dropdown-basic">
                    <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30"
                         className="rounded-circle"/>
                    <span className="text-dark">{cookies.nombre}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="">
                        <div className="d-grid gap-2">
                            <Button className={"btn btn-sm"} size="sm" variant={"danger"} type={undefined} onClick={cerrar_sesion}>Cerrar sesión</Button>
                        </div>
                    </Dropdown.Item>
                    <div> Has iniciado sesion como: {cookies.usuario} </div>
                </Dropdown.Menu>
            </Dropdown>);
    }


}

function Log_button() {
    const [cookies] = useCookies();
    return (
        <div id="sidebarMenu"
             className="col-auto col-12 col-sm-12 col-md-3 col-lg-3 col-xl-2 px-sm-2 px-0 d-md-block bg-light sidebar collapse">
            <Charge_Login/>
        </div>
    )
}
export default Log_button;