import React from 'react';
import '../../css/App.css';
import "../../styles.css";
import { withCookies, Cookies, useCookies} from 'react-cookie';
import Modal from 'react-bootstrap/Modal';


import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {useForm} from "react-hook-form";
import {Alert, Dropdown} from "react-bootstrap";


const nodJS = 'http://192.168.10.237:3001/api/'


function Logged_user() {

    const [cookies, setCookie, removeCookie] = useCookies();

    const [validated, setValidated] = useState(false);

    const iniciar_sesion = async (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else {
            setValidated(true);
        }
        if (form.checkValidity() === true) {
            let usuario = form["usuario"].value;
            let contrasenia = form["contrasenia"].value;
            alert(usuario + " "+ contrasenia);
            let response = parseUser(usuario, contrasenia);



            alert(response);
        }
    };

    const cerrar_sesion = () => {
        removeCookie('name');
    };
    // const onSubmit = async (data) => {
    //
    //
    //     removeCookie('name');
    //     let objectjs = JSON.stringify(data);
    //     let name = data.user;
    //     alert(objectjs);
    //
        /*alert(name + ' --- ' + objectjs + "Respuesta NodJS JSON:" + response[0].PASS);
        // sessionStorage.setItem('PASS',response[0].PASS);
        const expire_time = new Date();
        expire_time.setHours(0, 0, 0, 0);
        expire_time.setDate(expire_time.getDate() + 1);
        setCookie('name', 'Erick',{
            path: "/", expires: expire_time

        });
        */
        // let minutes = 1;
        // let d = new Date();
        // d.setTime(d.getTime() + (minutes*60*1000));
        // setCookie('name', 'Erick',{
        //     path: "/", expires: d
        // });

    // };


    async function parseUser(user: any, password: any) {
        // POST request using fetch with error handling
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: user, password: password})
        };
        return fetch(nodJS + 'users', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                return data;
                //this.setState({ postId: data.id })
            })
            .catch(error => {
                //this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
                return error;
            });
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    let name = cookies.name;
    console.log(name);
    let tabIndex = (-1);
    if (name === undefined || ((name - new Date().getTime()) < 0)) {
        return (
            <>
                <Button variant="outline-primary" size="sm" onClick={handleShow}>
                    Iniciar sesion
                </Button>

                <Modal show={show} onHide={handleClose} animation={true}>
                    <Modal.Header closeButton>
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
                                    <Button type="submit">Iniciar Sesión</Button>
                                </Col>
                                <Col className="mb-4 mb-lg-4" as={Col}></Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </>
        );

        // let url = 'http://localhost:8080/login.html'
        // window.location.href =  url
        // console.log(url)
    } else {
        return (
            <Dropdown >
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30"
                             className="rounded-circle"/>
                        <span className="text-dark">{cookies.name}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="">
                            <Button size="sm" onClick={cerrar_sesion}>Cerrar sesión</Button>
                    </Dropdown.Item>
                    <div> Has iniciado sesion como: {cookies.name} </div>
                </Dropdown.Menu>
            </Dropdown>);
    }
    //console.log(getCookievalue);
    //updateCookies.name;
}

function Log_button() {
    const [cookies] = useCookies();
    return (
        <div id="sidebarMenu"
             className="col-auto col-12 col-sm-12 col-md-3 col-lg-3 col-xl-2 px-sm-2 px-0 d-md-block bg-light sidebar collapse">
            <Logged_user/>
        </div>
    )
}


//const headerElement = document.getElementById("header");
//ReactDOM.render(<Header/>, headerElement);


export default Log_button;