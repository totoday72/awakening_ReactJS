import React from 'react';
import {Badge, Image} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Leftbar from "../Interface/Leftbar";
import FileBase64 from 'react-file-base64';


const nodJS = 'http://192.168.10.237:3001/api/';
var base64_file = ""
var extention_file = ""

class Empleado extends React.Component {
    getFiles(files) {
        base64_file = files[0].base64;
        extention_file = files[0].file.name.split('.').at(-1);
        this.setState({files: files})
        // console.log(files)
        // console.log(base64_file)
        // console.log(extention_file)
    }

    render() {
        async function Db_insert_empleado(pnombre, snombre, papellido, sapellido, doc_dpi, fchnac, tel1, correo, peso, altura, foto, base64_cuerpo) {
            // POST request using fetch with error handling
            // console.log("imagen en base 64:" + base64_cuerpo);
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    pnombre: pnombre,
                    snombre: snombre,
                    papellido: papellido,
                    sapellido: sapellido,
                    doc_dpi: doc_dpi,
                    fchnac: fchnac,
                    tel1: tel1,
                    correo: correo,
                    peso: peso,
                    altura: altura,
                    foto: foto,
                    tipo_archivo: extention_file,
                    base64_imagen: base64_cuerpo,
                })
            };
            const response = await fetch(nodJS + 'empleado', requestOptions)
            // return response;
            return await response.json();
        }

        function Redirect_home() {
            let url = '/';
            window.location.href = url.toString();
        }


        const insertar_empleado = async (event: {
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

            if (form.checkValidity() === true) {
                let pnombre = form["pnombre"].value;
                let snombre = form["snombre"].value;
                let papellido = form["papellido"].value;
                let sapellido = form["sapellido"].value;
                let doc_dpi = form["doc_dpi"].value;
                let fchnac = form["fchnac"].value;
                let tel1 = form["tel1"].value;
                let correo = form["correo"].value;
                let peso = form["peso"].value;
                let altura = form["altura"].value;
                let foto = form["foto"].value;
                const response = await Db_insert_empleado(pnombre, snombre, papellido, sapellido, doc_dpi, fchnac, tel1, correo, peso, altura, foto, base64_file);
                let keyCount = Object.keys(response).length;
                alert(keyCount);
                if (keyCount > 0) {
                    alert(response[0].resultado);
                    //Redirect_home();
                } else {
                    alert("Exite un problema con el programa!");
                }
            }
        };

        const style_form = {
            maxWidth: '1000px'
        }


        return (
            <div className="row col-auto col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 px-sm-12">
                <Leftbar/>
                <div className="col-auto col-12 col-sm-12 col-md-9 col-lg-9 col-xl-10">
                    <div className={"index"}>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                            <Form id="form_empleado" noValidate onSubmit={insertar_empleado}
                                  className={"bg-light mb-xxl-auto"} style={style_form}>
                                <Row>
                                    <Row>
                                        <h1>
                                            <Badge className="mb-12" bg="secondary">Añadir Empleado</Badge>
                                        </h1>
                                    </Row>
                                    <Row>
                                        <h3>
                                            <Badge bg="secondary">Informacion General</Badge>
                                        </h3>
                                    </Row>
                                </Row>
                                <Row>
                                    <Col xs={1}></Col>
                                    <Col xs={2}>
                                        <a href="#">
                                            <svg className="imgperfil" xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 24 24"
                                                 width="90" height="90">
                                                <path className="heroicon-ui"
                                                      d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"></path>
                                            </svg>
                                        </a>
                                    </Col>
                                    <Col xs={8}>
                                        <Row>
                                            <Form.Group as={Col} controlId="validationCustom01">
                                                <Form.Label>Primer Nombre*</Form.Label>
                                                <Form.Control
                                                    size="sm"
                                                    id="pnombre"
                                                    required
                                                    type="text"
                                                    placeholder="Ingrese primer nombre"
                                                    // defaultValue="Mark"
                                                />
                                                <Form.Control.Feedback type="valid">Campo lleno!</Form.Control.Feedback>
                                                <Form.Control.Feedback type="invalid">Ingrese un usuario
                                                    valido</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="validationCustom01">
                                                <Form.Label>Segundo Nombre</Form.Label>
                                                <Form.Control
                                                    id="snombre"
                                                    size={"sm"}
                                                    required
                                                    type="text"
                                                    placeholder="Ingrese Segundo nombre"
                                                    // defaultValue="Mark"
                                                />
                                                <Form.Control.Feedback type="valid">Campo lleno!</Form.Control.Feedback>
                                                <Form.Control.Feedback type="invalid">Ingrese un usuario
                                                    valido</Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="validationCustom01">
                                                <Form.Label>Primer Apellido*</Form.Label>
                                                <Form.Control
                                                    id="papellido"
                                                    size={"sm"}
                                                    required
                                                    type="text"
                                                    placeholder="Ingrese primer Apellido"
                                                    // defaultValue="Mark"
                                                />
                                                <Form.Control.Feedback type="valid">Campo lleno!</Form.Control.Feedback>
                                                <Form.Control.Feedback type="invalid">Ingrese un usuario
                                                    valido</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="validationCustom01">
                                                <Form.Label>Segundo Apellido*</Form.Label>
                                                <Form.Control
                                                    id="sapellido"
                                                    size={"sm"}
                                                    required
                                                    type="text"
                                                    placeholder="Ingrese segundo apellido"
                                                    // defaultValue="Mark"
                                                />
                                                <Form.Control.Feedback type="valid">Campo lleno!</Form.Control.Feedback>
                                                <Form.Control.Feedback type="invalid">Ingrese un usuario
                                                    valido</Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="validationCustom01">
                                                <Form.Label>DPI*</Form.Label>
                                                <Form.Control
                                                    id="doc_dpi"
                                                    size={"sm"}
                                                    required
                                                    type="text"
                                                    placeholder="Ingrese numero DPI con guiones"
                                                    // defaultValue="Mark"
                                                />
                                                <Form.Control.Feedback type="valid">Campo lleno!</Form.Control.Feedback>
                                                <Form.Control.Feedback type="invalid">Ingrese un usuario
                                                    valido</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="validationCustom01">
                                                <Form.Label>Fecha de Nacimiento</Form.Label>
                                                <Form.Control
                                                    id="fchnac"
                                                    size={"sm"}
                                                    required
                                                    type="date"
                                                    placeholder="Seleccione la fecha"
                                                    // defaultValue="Mark"
                                                />
                                                <Form.Control.Feedback type="valid">Campo lleno!</Form.Control.Feedback>
                                                <Form.Control.Feedback type="invalid">Ingrese un usuario
                                                    valido</Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="validationCustom01">
                                                <Form.Label>Telefono</Form.Label>
                                                <Form.Control
                                                    id="tel1"
                                                    size={"sm"}
                                                    required
                                                    type="text"
                                                    placeholder="Ingrese el telefono con guion"
                                                    // defaultValue="Mark"
                                                />
                                                <Form.Control.Feedback type="valid">Campo lleno!</Form.Control.Feedback>
                                                <Form.Control.Feedback type="invalid">Ingrese un usuario
                                                    valido</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="validationCustom01">
                                                <Form.Label>correo</Form.Label>
                                                <Form.Control
                                                    id="correo"
                                                    size={"sm"}
                                                    required
                                                    type="email"
                                                    placeholder="Ingrese el correo"
                                                    // defaultValue="Mark"
                                                />
                                                <Form.Control.Feedback type="valid">Campo lleno!</Form.Control.Feedback>
                                                <Form.Control.Feedback type="invalid">Ingrese un usuario
                                                    valido</Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="validationCustom01">
                                                <Form.Label>Peso</Form.Label>
                                                <Form.Control
                                                    id="peso"
                                                    size={"sm"}
                                                    required
                                                    type="number"
                                                    placeholder="Ingrese el peso en Kg"
                                                    // defaultValue="Mark"
                                                />
                                                <Form.Control.Feedback type="valid">Campo lleno!</Form.Control.Feedback>
                                                <Form.Control.Feedback type="invalid">Ingrese un usuario
                                                    valido</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="validationCustom01">
                                                <Form.Label>Estatura</Form.Label>
                                                <Form.Control
                                                    id="altura"
                                                    size={"sm"}
                                                    required
                                                    type="number"
                                                    placeholder="Ingrese la estatura en metros"
                                                    // defaultValue="Mark"
                                                />
                                                <Form.Control.Feedback type="valid">Campo lleno!</Form.Control.Feedback>
                                                <Form.Control.Feedback type="invalid">Ingrese un usuario
                                                    valido</Form.Control.Feedback>
                                            </Form.Group>

                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="validationCustom01">
                                                <Form.Label>Peso</Form.Label>
                                                <Form.Control
                                                    id="foto"
                                                    size={"sm"}
                                                    required
                                                    type="text"
                                                    placeholder="Ingrese el nombre de la imagen"
                                                    // defaultValue="Mark"
                                                />
                                                <Form.Control.Feedback type="valid">Campo lleno!</Form.Control.Feedback>
                                                <Form.Control.Feedback type="invalid">Ingrese un usuario
                                                    valido</Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="validationCustom01">
                                                <FileBase64
                                                    accept=".png,.jpeg,.jpg"
                                                    multiple={true}
                                                    onDone={this.getFiles.bind(this)}/>
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="validationCustom01">
                                                <Image
                                                    src={base64_file}
                                                    style={{height: 150, width: 150}}
                                                />
                                            </Form.Group>
                                        </Row>
                                    </Col>
                                    <Col xs={1}></Col>
                                </Row>
                                <Row className="mb-auto" as={Col}>
                                    <Col xxl={5} xl={5} lg={5} md={5} sm={4}></Col>
                                    <Col xxl={2} xl={5} lg={2} md={5} sm={4}>
                                        <Button className="btn btn-warning" type={undefined}>Guardar
                                            Informacion</Button>
                                    </Col>
                                    <Col xxl={5} xl={5} lg={5} md={5} sm={4}></Col>
                                </Row>
                            </Form>
                        </Col>
                    </div>
                </div>
            </div>
        );


    }

    // render() {
    //     return (
    //         <div className="row col-auto col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 px-sm-12">
    //             <Leftbar/>
    //             <div className="col-auto col-12 col-sm-12 col-md-9 col-lg-9 col-xl-10">
    //                 <Body/>
    //             </div>
    //         </div>
    //     )
    // }
}

export default Empleado;

//
// var base64_file = "";
// class Apps extends React.Component {
//
//     constructor(props) {
//         super(props)
//         this.state = {
//             files: []
//         }
//     }
//
//     // Callback~
//     getFiles(files) {
//         base64_file = files[0].base64
//         this.setState({files: files})
//         console.log(files)
//         console.log(base64_file)
//     }
//
//
//     render() {
//         function Insertar_empleado(event) {
//             event.preventDefault();
//             const form = event.currentTarget;
//             let foto = form["foto"].value;
//             console.log(foto);
//             let archivo = base64_file;
//             console.log(archivo);
//         }
//
//         const _handleReaderLoaded = (readerEvt: any) => {
//             let binaryString = readerEvt.target.result
//             console.log(btoa(binaryString))
//         }
//
//         return (
//             <Form onSubmit={Insertar_empleado}>
//                 <Row>
//                     <Form.Group as={Col} controlId="validationCustom01">
//                         <Form.Label>Peso</Form.Label>
//                         <Form.Control
//                             id="foto"
//                             size={"sm"}
//                             required
//                             type="text"
//                             placeholder="Ingrese el nombre de la imagen"
//                             // defaultValue="Mark"
//                         />
//                         <Form.Control.Feedback type="valid">Campo lleno!</Form.Control.Feedback>
//                         <Form.Control.Feedback type="invalid">Ingrese un usuario
//                             valido</Form.Control.Feedback>
//                     </Form.Group>
//                 </Row>
//                 <Row>
//                     <Form.Group as={Col} controlId="validationCustom01">
//                         <FileBase64
//                             id="archivo"
//                             accept=".png,.jpeg,.jpg"
//                             multiple={true}
//                             onDone={this.getFiles.bind(this)}/>
//                     </Form.Group>
//
//                     <Form.Group as={Col} controlId="validationCustom01">
//                         <Image
//                             src={base64_file}
//                             style={{height: 150, width: 150}}
//                         />
//                     </Form.Group>
//                 </Row>
//                 <Row className="mb-auto" as={Col}>
//                     <Col xxl={5} xl={5} lg={5} md={5} sm={4}></Col>
//                     <Col xxl={2} xl={5} lg={2} md={5} sm={4}>
//                         <Button className="btn btn-warning" type={"submit"}>Guardar Informacion</Button>
//                     </Col>
//                     <Col xxl={5} xl={5} lg={5} md={5} sm={4}></Col>
//                 </Row>
//             </Form>
//         )
//     }
//
// }
//
// export {Apps as Apps};