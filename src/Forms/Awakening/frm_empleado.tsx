import React, {useState} from 'react';
import {useCookies} from "react-cookie";
import {Badge, Dropdown, Image} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Leftbar from "../Interface/Leftbar";
import FileBase64 from 'react-file-base64';


const nodJS = 'http://192.168.10.237:3001/api/';

class Empleado extends React.Component {
    getFiles(files)
    {
        base64_file = files[0].base64
        this.setState({files: files})
        console.log(files)
        console.log(base64_file)
    }

    render() {

        var base64_file = "";



        async function Db_insert_empleado(pnombre, snombre, papellido, sapellido, doc_dpi, fchnac, tel1, correo, peso, altura, foto) {
            // POST request using fetch with error handling
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


        const [validated, setValidated] = useState(false);
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

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
            setValidated(true);
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
                const response = await Db_insert_empleado(pnombre, snombre, papellido, sapellido, doc_dpi, fchnac, tel1, correo, peso, altura, foto);
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

        async function Upload_foto(image) {
            // POST request using fetch with error handling
            let idCardBase64 = '';
            GetBase64(image, (result) => {
                idCardBase64 = result;
            });
            console.error(idCardBase64);
            const requestOptions = {
                method: 'POST',
                headers: {
                    "Content-type": "multipart/form-data",
                },
                body: image,
                files: {
                    "Sample-Spreadsheet-100-rows.csv": "data:application/octet-stream;base64,MSwiRWxkb24gQmFzZSBmb3Igc3RhY2thYmxlIHN0b3JhZ2Ugc2hlbGYsIHBsYXRpbnVtIixNdWhhbW1lZCBNYWNJbnR5cmUsMywtMjEzLjI1LDM4Ljk0LDM1LE51bmF2dXQsU3RvcmFnZSAmIE9yZ2FuaXphdGlvbiwwLjgNCjIsIjEuNyBDdWJpYyBGb290IENvbXBhY3QgIiJDdWJlIiIgT2ZmaWNlIFJlZnJpZ2VyYXRvcnMiLEJhcnJ5IEZyZW5jaCwyOTMsNDU3LjgxLDIwOC4xNiw2OC4wMixOdW5hdnV0LEFwcGxpYW5jZXMsMC41OA0KMywiQ2FyZGluYWwgU2xhbnQtRK4gUmluZyBCaW5kZXIsIEhlYXZ5IEdhdWdlIFZpbnlsIixCYXJyeSBGcmVuY2gsMjkzLDQ2LjcxLDguNjksMi45OSxOdW5hdnV0LEJpbmRlcnMgYW5kIEJpbmRlciBBY2Nlc3NvcmllcywwLjM5DQo0LFIzODAsQ2xheSBSb3plbmRhbCw0ODMsMTE5OC45NywxOTUuOTksMy45OSxOdW5hdnV0LFRlbGVwaG9uZXMgYW5kIENvbW11bmljYXRpb24sMC41OA0KNSxIb2xtZXMgSEVQQSBBaXIgUHVyaWZpZXIsQ2FybG9zIFNvbHRlcm8sNTE1LDMwLjk0LDIxLjc4LDUuOTQsTnVuYXZ1dCxBcHBsaWFuY2VzLDAuNQ0KNixHLkUuIExvbmdlci1MaWZlIEluZG9vciBSZWNlc3NlZCBGbG9vZGxpZ2h0IEJ1bGJzLENhcmxvcyBTb2x0ZXJvLDUxNSw0LjQzLDYuNjQsNC45NSxOdW5hdnV0LE9mZmljZSBGdXJuaXNoaW5ncywwLjM3DQo3LCJBbmdsZS1EIEJpbmRlcnMgd2l0aCBMb2NraW5nIFJpbmdzLCBMYWJlbCBIb2xkZXJzIixDYXJsIEphY2tzb24sNjEzLC01NC4wNCw3LjMsNy43MixOdW5hdnV0LEJpbmRlcnMgYW5kIEJpbmRlciBBY2Nlc3NvcmllcywwLjM4DQo4LCJTQUZDTyBNb2JpbGUgRGVzayBTaWRlIEZpbGUsIFdpcmUgRnJhbWUiLENhcmwgSmFja3Nvbiw2MTMsMTI3LjcwLDQyLjc2LDYuMjIsTnVuYXZ1dCxTdG9yYWdlICYgT3JnYW5pemF0aW9uLA0KOSwiU0FGQ08gQ29tbWVyY2lhbCBXaXJlIFNoZWx2aW5nLCBCbGFjayIsTW9uaWNhIEZlZGVybGUsNjQzLC02OTUuMjYsMTM4LjE0LDM1LE51bmF2dXQsU3RvcmFnZSAmIE9yZ2FuaXphdGlvbiwNCjEwLFhlcm94IDE5OCxEb3JvdGh5IEJhZGRlcnMsNjc4LC0yMjYuMzYsNC45OCw4LjMzLE51bmF2dXQsUGFwZXIsMC4zOA0KMTEsWGVyb3ggMTk4MCxOZW9sYSBTY2huZWlkZXIsODA3LC0xNjYuODUsNC4yOCw2LjE4LE51bmF2dXQsUGFwZXIsMC40DQoxMixBZHZhbnR1cyBNYXAgUGVubmFudCBGbGFncyBhbmQgUm91bmQgSGVhZCBUYWNrcyxOZW9sYSBTY2huZWlkZXIsODA3LC0xNC4zMywzLjk1LDIsTnVuYXZ1dCxSdWJiZXIgQmFuZHMsMC41Mw0KMTMsSG9sbWVzIEhFUEEgQWlyIFB1cmlmaWVyLENhcmxvcyBEYWx5LDg2OCwxMzQuNzIsMjEuNzgsNS45NCxOdW5hdnV0LEFwcGxpYW5jZXMsMC41DQoxNCwiRFMvSEQgSUJNIEZvcm1hdHRlZCBEaXNrZXR0ZXMsIDIwMC9QYWNrIC0gU3RhcGxlcyIsQ2FybG9zIERhbHksODY4LDExNC40Niw0Ny45OCwzLjYxLE51bmF2dXQsQ29tcHV0ZXIgUGVyaXBoZXJhbHMsMC43MQ0KMTUsIldpbHNvbiBKb25lcyAxIiIgSGFuZ2luZyBEdWJsTG9ja64gUmluZyBCaW5kZXJzIixDbGF1ZGlhIE1pbmVyLDkzMywtNC43Miw1LjI4LDIuOTksTnVuYXZ1dCxCaW5kZXJzIGFuZCBCaW5kZXIgQWNjZXNzb3JpZXMsMC4zNw0KMTYsVWx0cmEgQ29tbWVyY2lhbCBHcmFkZSBEdWFsIFZhbHZlIERvb3IgQ2xvc2VyLE5lb2xhIFNjaG5laWRlciw5OTUsNzgyLjkxLDM5Ljg5LDMuMDQsTnVuYXZ1dCxPZmZpY2UgRnVybmlzaGluZ3MsMC41Mw0KMTcsIiMxMC00IDEvOCIiIHggOSAxLzIiIiBQcmVtaXVtIERpYWdvbmFsIFNlYW0gRW52ZWxvcGVzIixBbGxlbiBSb3NlbmJsYXR0LDk5OCw5My44MCwxNS43NCwxLjM5LE51bmF2dXQsRW52ZWxvcGVzLDAuNA0KMTgsSG9uIDQtU2hlbGYgTWV0YWwgQm9va2Nhc2VzLFN5bHZpYSBGb3Vsc3RvbiwxMTU0LDQ0MC43MiwxMDAuOTgsMjYuMjIsTnVuYXZ1dCxCb29rY2FzZXMsMC42DQoxOSwiTGVzcm8gU2hlZmZpZWxkIENvbGxlY3Rpb24gQ29mZmVlIFRhYmxlLCBFbmQgVGFibGUsIENlbnRlciBUYWJsZSwgQ29ybmVyIFRhYmxlIixTeWx2aWEgRm91bHN0b24sMTE1NCwtNDgxLjA0LDcxLjM3LDY5LE51bmF2dXQsVGFibGVzLDAuNjgNCjIwLGc1MjAsSmltIFJhZGZvcmQsMTM0NCwtMTEuNjgsNjUuOTksNS4yNixOdW5hdnV0LFRlbGVwaG9uZXMgYW5kIENvbW11bmljYXRpb24sMC41OQ0KMjEsTFggNzg4LEppbSBSYWRmb3JkLDEzNDQsMzEzLjU4LDE1NS45OSw4Ljk5LE51bmF2dXQsVGVsZXBob25lcyBhbmQgQ29tbXVuaWNhdGlvbiwwLjU4DQoyMixBdmVyeSA1MixDYXJsb3MgU29sdGVybywxNDEyLDI2LjkyLDMuNjksMC41LE51bmF2dXQsTGFiZWxzLDAuMzgNCjIzLFBseW1vdXRoIEJveGVkIFJ1YmJlciBCYW5kcyBieSBQbHltb3V0aCxDYXJsb3MgU29sdGVybywxNDEyLC01Ljc3LDQuNzEsMC43LE51bmF2dXQsUnViYmVyIEJhbmRzLDAuOA0KMjQsIkdCQyBQcmUtUHVuY2hlZCBCaW5kaW5nIFBhcGVyLCBQbGFzdGljLCBXaGl0ZSwgOC0xLzIiIiB4IDExIiIiLENhcmwgTHVkd2lnLDE1MzksLTE3Mi44OCwxNS45OSwxMy4xOCxOdW5hdnV0LEJpbmRlcnMgYW5kIEJpbmRlciBBY2Nlc3NvcmllcywwLjM3DQoyNSwiTWF4ZWxsIDMuNSIiIERTL0hEIElCTS1Gb3JtYXR0ZWQgRGlza2V0dGVzLCAxMC9QYWNrIixDYXJsIEx1ZHdpZywxNTM5LC0xNDQuNTUsNC44OSw0LjkzLE51bmF2dXQsQ29tcHV0ZXIgUGVyaXBoZXJhbHMsMC42Ng0KMjYsTmV3ZWxsIDMzNSxEb24gTWlsbGVyLDE1NDAsNS43NiwyLjg4LDAuNyxOdW5hdnV0LFBlbnMgJiBBcnQgU3VwcGxpZXMsMC41Ng0KMjcsU0FORk9SRCBMaXF1aWQgQWNjZW50mSBUYW5rLVN0eWxlIEhpZ2hsaWdodGVycyxBbm5pZSBDeXBydXMsMTcwMiw0LjkwLDIuODQsMC45MyxOdW5hdnV0LFBlbnMgJiBBcnQgU3VwcGxpZXMsMC41NA0KMjgsQ2Fub24gUEM5NDAgQ29waWVyLENhcmwgTHVkd2lnLDE3NjEsLTU0Ny42MSw0NDkuOTksNDksTnVuYXZ1dCxDb3BpZXJzIGFuZCBGYXgsMC4zOA0KMjksIlRlbmV4IFBlcnNvbmFsIFByb2plY3QgRmlsZSB3aXRoIFNjb29wIEZyb250IERlc2lnbiwgQmxhY2siLENhcmxvcyBTb2x0ZXJvLDE3OTIsLTUuNDUsMTMuNDgsNC41MSxOdW5hdnV0LFN0b3JhZ2UgJiBPcmdhbml6YXRpb24sMC41OQ0KMzAsQ29sLUVyYXNlriBQZW5jaWxzIHdpdGggRXJhc2VycyxHcmFudCBDYXJyb2xsLDIyNzUsNDEuNjcsNi4wOCwxLjE3LE51bmF2dXQsUGVucyAmIEFydCBTdXBwbGllcywwLjU2DQozMSwiSW1hdGlvbiAzLjUiIiBEUy9IRCBJQk0gRm9ybWF0dGVkIERpc2tldHRlcywgMTAvUGFjayIsRG9uIE1pbGxlciwyMjc3LC00Ni4wMyw1Ljk4LDQuMzgsTnVuYXZ1dCxDb21wdXRlciBQZXJpcGhlcmFscywwLjc1DQozMiwiV2hpdGUgRHVhbCBQZXJmIENvbXB1dGVyIFByaW50b3V0IFBhcGVyLCAyNzAwIFNoZWV0cywgMSBQYXJ0LCBIZWF2eXdlaWdodCwgMjAgbGJzLiwgMTQgNy84IHggMTEiLERvbiBNaWxsZXIsMjI3NywzMy42Nyw0MC45OSwxOS45OSxOdW5hdnV0LFBhcGVyLDAuMzYNCjMzLFNlbGYtQWRoZXNpdmUgQWRkcmVzcyBMYWJlbHMgZm9yIFR5cGV3cml0ZXJzIGJ5IFVuaXZlcnNhbCxBbGFuIEJhcm5lcywyNTMyLDE0MC4wMSw3LjMxLDAuNDksTnVuYXZ1dCxMYWJlbHMsMC4zOA0KMzQsQWNjZXNzb3J5MzcsQWxhbiBCYXJuZXMsMjUzMiwtNzguOTYsMjAuOTksMi41LE51bmF2dXQsVGVsZXBob25lcyBhbmQgQ29tbXVuaWNhdGlvbiwwLjgxDQozNSxGdWppIDUuMkdCIERWRC1SQU0sSmFjayBHYXJ6YSwyNjMxLDI1Mi42Niw0MC45NiwxLjk5LE51bmF2dXQsQ29tcHV0ZXIgUGVyaXBoZXJhbHMsMC41NQ0KMzYsQmV2aXMgU3RlZWwgRm9sZGluZyBDaGFpcnMsSnVsaWEgV2VzdCwyNzU3LC0xNzY2LjAxLDk1Ljk1LDc0LjM1LE51bmF2dXQsQ2hhaXJzICYgQ2hhaXJtYXRzLDAuNTcNCjM3LEF2ZXJ5IEJpbmRlciBMYWJlbHMsRXVnZW5lIEJhcmNoYXMsMjc5MSwtMjM2LjI3LDMuODksNy4wMSxOdW5hdnV0LEJpbmRlcnMgYW5kIEJpbmRlciBBY2Nlc3NvcmllcywwLjM3DQozOCxIb24gRXZlcnktRGF5riBDaGFpciBTZXJpZXMgU3dpdmVsIFRhc2sgQ2hhaXJzLEV1Z2VuZSBCYXJjaGFzLDI3OTEsODAuNDQsMTIwLjk4LDMwLE51bmF2dXQsQ2hhaXJzICYgQ2hhaXJtYXRzLDAuNjQNCjM5LCJJQk0gTXVsdGktUHVycG9zZSBDb3B5IFBhcGVyLCA4IDEvMiB4IDExIiIsIENhc2UiLEV1Z2VuZSBCYXJjaGFzLDI3OTEsMTE4Ljk0LDMwLjk4LDUuNzYsTnVuYXZ1dCxQYXBlciwwLjQNCjQwLEdsb2JhbCBUcm95mSBFeGVjdXRpdmUgTGVhdGhlciBMb3ctQmFjayBUaWx0ZXIsRWR3YXJkIEhvb2tzLDI5NzYsMzQyNC4yMiw1MDAuOTgsMjYsTnVuYXZ1dCxDaGFpcnMgJiBDaGFpcm1hdHMsMC42DQo0MSxYdHJhTGlmZa4gQ2xlYXJWdWWZIFNsYW50LUSuIFJpbmcgQmluZGVycyBieSBDYXJkaW5hbCxCcmFkIEVhc29uLDMyMzIsLTExLjgzLDcuODQsNC43MSxOdW5hdnV0LEJpbmRlcnMgYW5kIEJpbmRlciBBY2Nlc3NvcmllcywwLjM1DQo0MixDb21wdXRlciBQcmludG91dCBQYXBlciB3aXRoIExldHRlci1UcmltIFBlcmZvcmF0aW9ucyxOaWNvbGUgSGFuc2VuLDM1MjQsNTIuMzUsMTguOTcsOS4wMyxOdW5hdnV0LFBhcGVyLDAuMzcNCjQzLDYxNjAsRG9yb3RoeSBXYXJkbGUsMzkwOCwtMTgwLjIwLDExNS45OSwyLjUsTnVuYXZ1dCxUZWxlcGhvbmVzIGFuZCBDb21tdW5pY2F0aW9uLDAuNTcNCjQ0LEF2ZXJ5IDQ5LEFhcm9uIEJlcmdtYW4sNDEzMiwxLjMyLDIuODgsMC41LE51bmF2dXQsTGFiZWxzLDAuMzYNCjQ1LEhvb3ZlciBQb3J0YXBvd2VymSBQb3J0YWJsZSBWYWN1dW0sSmltIFJhZGZvcmQsNDYxMiwtMzc1LjY0LDQuNDgsNDksTnVuYXZ1dCxBcHBsaWFuY2VzLDAuNg0KNDYsVGltZXBvcnQgTDcwODksQW5uaWUgQ3lwcnVzLDQ2NzYsLTEwNC4yNSwxMjUuOTksNy42OSxOdW5hdnV0LFRlbGVwaG9uZXMgYW5kIENvbW11bmljYXRpb24sMC41OA0KNDcsQXZlcnkgNTEwLEFubmllIEN5cHJ1cyw0Njc2LDg1Ljk2LDMuNzUsMC41LE51bmF2dXQsTGFiZWxzLDAuMzcNCjQ4LFhlcm94IDE4ODEsQW5uaWUgQ3lwcnVzLDQ2NzYsLTguMzgsMTIuMjgsNi40NyxOdW5hdnV0LFBhcGVyLDAuMzgNCjQ5LExYIDc4OCxBbm5pZSBDeXBydXMsNDY3NiwxMTE1LjY5LDE1NS45OSw4Ljk5LE51bmF2dXQsVGVsZXBob25lcyBhbmQgQ29tbXVuaWNhdGlvbiwwLjU4DQo1MCwiQ2FyZGluYWwgU2xhbnQtRK4gUmluZyBCaW5kZXIsIEhlYXZ5IEdhdWdlIFZpbnlsIixBbm5pZSBDeXBydXMsNTI4NCwtMy4wNSw4LjY5LDIuOTksTnVuYXZ1dCxCaW5kZXJzIGFuZCBCaW5kZXIgQWNjZXNzb3JpZXMsMC4zOQ0KNTEsIk1lbW9yZXggNC43R0IgRFZELVJBTSwgMy9QYWNrIixDbGF5IFJvemVuZGFsLDUzMTYsNTE0LjA3LDMxLjc4LDEuOTksTnVuYXZ1dCxDb21wdXRlciBQZXJpcGhlcmFscywwLjQyDQo1MixVbnBhZGRlZCBNZW1vIFNsaXBzLERvbiBKb25lcyw1NDA5LC03LjA0LDMuOTgsMi45NyxOdW5hdnV0LFBhcGVyLDAuMzUNCjUzLCJBZGFtcyBUZWxlcGhvbmUgTWVzc2FnZSBCb29rIFcvRGl2aWRlcnMvU3BhY2UgRm9yIFBob25lIE51bWJlcnMsIDUgMS80IiJYOCAxLzIiIiwgMzAwL01lc3NhZ2VzIixCZXRoIFRob21wc29uLDU1MDYsNC40MSw1Ljg4LDMuMDQsTnVuYXZ1dCxQYXBlciwwLjM2DQo1NCwiRWxkb24gRXhwcmVzc2lvbnOZIERlc2sgQWNjZXNzb3J5LCBXb29kIFBlbmNpbCBIb2xkZXIsIE9hayIsRnJhbmsgUHJpY2UsNTU2OSwtMC4wNiw5LjY1LDYuMjIsTnVuYXZ1dCxPZmZpY2UgRnVybmlzaGluZ3MsMC41NQ0KNTUsQmVsbCBTb25lY29yIEpCNzAwIENhbGxlciBJRCxNaWNoZWxsZSBMb25zZGFsZSw1NjA3LC01MC4zMyw3Ljk5LDUuMDMsTnVuYXZ1dCxUZWxlcGhvbmVzIGFuZCBDb21tdW5pY2F0aW9uLDAuNg0KNTYsQXZlcnkgQXJjaCBSaW5nIEJpbmRlcnMsQW5uIENob25nLDU4OTQsODcuNjgsNTguMSwxLjQ5LE51bmF2dXQsQmluZGVycyBhbmQgQmluZGVyIEFjY2Vzc29yaWVzLDAuMzgNCjU3LEFQQyA3IE91dGxldCBOZXR3b3JrIFN1cmdlQXJyZXN0IFN1cmdlIFByb3RlY3RvcixBbm4gQ2hvbmcsNTg5NCwtNjguMjIsODAuNDgsNC41LE51bmF2dXQsQXBwbGlhbmNlcywwLjU1DQo1OCwiRGVmbGVjdC1vIFJvbGxhTWF0IFN0dWRkZWQsIEJldmVsZWQgTWF0IGZvciBNZWRpdW0gUGlsZSBDYXJwZXRpbmciLEpveSBCZWxsLDU5MjUsLTM1NC45MCw5Mi4yMywzOS42MSxOdW5hdnV0LE9mZmljZSBGdXJuaXNoaW5ncywwLjY3DQo1OSxBY2Nlc3Nvcnk0LEpveSBCZWxsLDU5MjUsLTI2Ny4wMSw4NS45OSwwLjk5LE51bmF2dXQsVGVsZXBob25lcyBhbmQgQ29tbXVuaWNhdGlvbiwwLjg1DQo2MCxQZXJzb25hbCBDcmVhdGlvbnOZIEluayBKZXQgQ2FyZHMgYW5kIExhYmVscyxTa3llIE5vcmxpbmcsNjAxNiwzLjYzLDExLjQ4LDUuNDMsTnVuYXZ1dCxQYXBlciwwLjM2DQo2MSxIaWdoIFNwZWVkIEF1dG9tYXRpYyBFbGVjdHJpYyBMZXR0ZXIgT3BlbmVyLEJhcnJ5IFdlaXJpY2gsNjExNiwtMTc1OS41OCwxNjM3LjUzLDI0LjQ5LE51bmF2dXQsIlNjaXNzb3JzLCBSdWxlcnMgYW5kIFRyaW1tZXJzIiwwLjgxDQo2MixYZXJveCAxOTY2LEdyYW50IENhcnJvbGwsNjE4MiwtMTE2Ljc5LDYuNDgsNi42NSxOdW5hdnV0LFBhcGVyLDAuMzYNCjYzLFhlcm94IDIxMyxHcmFudCBDYXJyb2xsLDYxODIsLTY3LjI4LDYuNDgsNy44NixOdW5hdnV0LFBhcGVyLDAuMzcNCjY0LCJCb3N0b24gRWxlY3RyaWMgUGVuY2lsIFNoYXJwZW5lciwgTW9kZWwgMTgxOCwgQ2hhcmNvYWwgQmxhY2siLEFkcmlhbiBIYW5lLDY1MzUsLTE5LjMzLDI4LjE1LDguOTksTnVuYXZ1dCxQZW5zICYgQXJ0IFN1cHBsaWVzLDAuNTcNCjY1LEhhbW1lcm1pbGwgQ29weVBsdXMgQ29weSBQYXBlciAoMjBMYi4gYW5kIDg0IEJyaWdodCksU2t5ZSBOb3JsaW5nLDY4ODQsLTYxLjIxLDQuOTgsNC43NSxOdW5hdnV0LFBhcGVyLDAuMzYNCjY2LCJUZWxlcGhvbmUgTWVzc2FnZSBCb29rcyB3aXRoIEZheC9Nb2JpbGUgU2VjdGlvbiwgNSAxLzIiIiB4IDMgMy8xNiIiIixTa3llIE5vcmxpbmcsNjg4NCwxMTkuMDksNi4zNSwxLjAyLE51bmF2dXQsUGFwZXIsMC4zOQ0KNjcsQ3JhdGUtQS1GaWxlc5ksQW5kcmV3IEdqZXJ0c2VuLDY5MTYsLTE0MS4yNywxMC45LDcuNDYsTnVuYXZ1dCxTdG9yYWdlICYgT3JnYW5pemF0aW9uLDAuNTkNCjY4LCJBbmdsZS1EIEJpbmRlcnMgd2l0aCBMb2NraW5nIFJpbmdzLCBMYWJlbCBIb2xkZXJzIixSYWxwaCBLbmlnaHQsNjk4MCwtNzcuMjgsNy4zLDcuNzIsTnVuYXZ1dCxCaW5kZXJzIGFuZCBCaW5kZXIgQWNjZXNzb3JpZXMsMC4zOA0KNjksIjgwIE1pbnV0ZSBDRC1SIFNwaW5kbGUsIDEwMC9QYWNrIC0gU3RhcGxlcyIsRG9yb3RoeSBXYXJkbGUsNjk4Miw0MDcuNDQsMzkuNDgsMS45OSxOdW5hdnV0LENvbXB1dGVyIFBlcmlwaGVyYWxzLDAuNTQNCjcwLCJCdXNoIFdlc3RmaWVsZCBDb2xsZWN0aW9uIEJvb2tjYXNlcywgRGFyayBDaGVycnkgRmluaXNoLCBGdWxseSBBc3NlbWJsZWQiLERvcm90aHkgV2FyZGxlLDY5ODIsLTMzOC4yNywxMDAuOTgsNTcuMzgsTnVuYXZ1dCxCb29rY2FzZXMsMC43OA0KNzEsMTItMS8yIERpYW1ldGVyIFJvdW5kIFdhbGwgQ2xvY2ssRG9yb3RoeSBXYXJkbGUsNjk4Miw1Mi41NiwxOS45OCwxMC40OSxOdW5hdnV0LE9mZmljZSBGdXJuaXNoaW5ncywwLjQ5DQo3MixTQUZDTyBBcmNvIEZvbGRpbmcgQ2hhaXIsR3JhbnQgQ2Fycm9sbCw3MTEwLDE5MDIuMjQsMjc2LjIsMjQuNDksTnVuYXZ1dCxDaGFpcnMgJiBDaGFpcm1hdHMsDQo3MywiIzEwIFdoaXRlIEJ1c2luZXNzIEVudmVsb3Blcyw0IDEvOCB4IDkgMS8yIixCYXJyeSBXZWlyaWNoLDc0MzAsMzUzLjIwLDE1LjY3LDEuMzksTnVuYXZ1dCxFbnZlbG9wZXMsMC4zOA0KNzQsM00gT2ZmaWNlIEFpciBDbGVhbmVyLEJldGggUGFpZ2UsNzkwNiwyNzEuNzgsMjUuOTgsNS4zNyxOdW5hdnV0LEFwcGxpYW5jZXMsMC41DQo3NSwiR2xvYmFsIExlYXRoZXIgYW5kIE9hayBFeGVjdXRpdmUgQ2hhaXIsIEJsYWNrIixTeWx2aWEgRm91bHN0b24sODM5MSwtMjY4LjM2LDMwMC45OCw2NC43MyxOdW5hdnV0LENoYWlycyAmIENoYWlybWF0cywwLjU2DQo3NixYZXJveCAxOTM2LE5pY29sZSBIYW5zZW4sODQxOSw3MC4zOSwxOS45OCw1Ljk3LE51bmF2dXQsUGFwZXIsMC4zOA0KNzcsWGVyb3ggMjE0LE5pY29sZSBIYW5zZW4sODQxOSwtODYuNjIsNi40OCw3LjAzLE51bmF2dXQsUGFwZXIsMC4zNw0KNzgsQ2FyaW5hIERvdWJsZSBXaWRlIE1lZGlhIFN0b3JhZ2UgVG93ZXJzIGluIE5hdHVyYWwgJiBCbGFjayxOaWNvbGUgSGFuc2VuLDg4MzMsLTg0Ni43Myw4MC45OCwzNSxOdW5hdnV0LFN0b3JhZ2UgJiBPcmdhbml6YXRpb24sMC44MQ0KNzksU3RhcGxlc64gR2VuZXJhbCBVc2UgMy1SaW5nIEJpbmRlcnMsQmV0aCBQYWlnZSw4OTk1LDguMDUsMS44OCwxLjQ5LE51bmF2dXQsQmluZGVycyBhbmQgQmluZGVyIEFjY2Vzc29yaWVzLDAuMzcNCjgwLFhlcm94IDE5MDQsQmV0aCBQYWlnZSw4OTk1LC03OC4wMiw2LjQ4LDUuODYsTm9ydGh3ZXN0IFRlcnJpdG9yaWVzLFBhcGVyLDAuMzYNCjgxLEx1eG8gUHJvZmVzc2lvbmFsIENvbWJpbmF0aW9uIENsYW1wLU9uIExhbXBzLEJldGggUGFpZ2UsODk5NSw3MzcuOTQsMTAyLjMsMjEuMjYsTm9ydGh3ZXN0IFRlcnJpdG9yaWVzLE9mZmljZSBGdXJuaXNoaW5ncywwLjU5DQo4MixYZXJveCAyMTcsQmV0aCBQYWlnZSw4OTk1LC0xOTEuMjgsNi40OCw4LjE5LE5vcnRod2VzdCBUZXJyaXRvcmllcyxQYXBlciwwLjM3DQo4MyxSZXZlcmUgQm94ZWQgUnViYmVyIEJhbmRzIGJ5IFJldmVyZSxCZXRoIFBhaWdlLDg5OTUsLTIxLjQ5LDEuODksMC43NixOb3J0aHdlc3QgVGVycml0b3JpZXMsUnViYmVyIEJhbmRzLDAuODMNCjg0LCJBY2NvIFNtYXJ0c29ja2V0mSBUYWJsZSBTdXJnZSBQcm90ZWN0b3IsIDYgQ29sb3ItQ29kZWQgQWRhcHRlciBPdXRsZXRzIixTeWx2aWEgRm91bHN0b24sOTEyNiw4ODQuMDgsNjIuMDUsMy45OSxOb3J0aHdlc3QgVGVycml0b3JpZXMsQXBwbGlhbmNlcywwLjU1DQo4NSwiVGVubnNjbyBTbmFwLVRvZ2V0aGVyIE9wZW4gU2hlbHZpbmcgVW5pdHMsIFN0YXJ0ZXIgU2V0cyBhbmQgQWRkLU9uIFVuaXRzIixCcnlhbiBEYXZpcyw5MTI3LC0zMjkuNDksMjc5LjQ4LDM1LE5vcnRod2VzdCBUZXJyaXRvcmllcyxTdG9yYWdlICYgT3JnYW5pemF0aW9uLDAuOA0KODYsSG9uIDQwNzAgU2VyaWVzIFBhZ29kYZkgUm91bmQgQmFjayBTdGFja2luZyBDaGFpcnMsSm95IEJlbGwsOTUwOSwyODI1LjE1LDMyMC45OCw1OC45NSxOb3J0aHdlc3QgVGVycml0b3JpZXMsQ2hhaXJzICYgQ2hhaXJtYXRzLDAuNTcNCjg3LFhlcm94IDE4ODcsSm95IEJlbGwsOTUwOSwyLjEzLDE4Ljk3LDUuMjEsTm9ydGh3ZXN0IFRlcnJpdG9yaWVzLFBhcGVyLDAuMzcNCjg4LFhlcm94IDE4OTEsSm95IEJlbGwsOTUwOSw3MDcuMTUsNDguOTEsNS44MSxOb3J0aHdlc3QgVGVycml0b3JpZXMsUGFwZXIsMC4zOA0KODksQXZlcnkgNTA2LEFsYW4gQmFybmVzLDk3NjMsNzUuMTMsNC4xMywwLjUsTm9ydGh3ZXN0IFRlcnJpdG9yaWVzLExhYmVscywwLjM5DQo5MCwiQnVzaCBIZXJpdGFnZSBQaW5lIENvbGxlY3Rpb24gNS1TaGVsZiBCb29rY2FzZSwgQWxiYW55IFBpbmUgRmluaXNoLCAqU3BlY2lhbCBPcmRlciIsR3JhbnQgQ2Fycm9sbCw5OTI3LC0yNzAuNjMsMTQwLjk4LDUzLjQ4LE5vcnRod2VzdCBUZXJyaXRvcmllcyxCb29rY2FzZXMsMC42NQ0KOTEsIkxpZmV0aW1lIEFkdmFudGFnZZkgRm9sZGluZyBDaGFpcnMsIDQvQ2FydG9uIixHcmFudCBDYXJyb2xsLDk5MjcsMzM4Ny4zNSwyMTguMDgsMTguMDYsTm9ydGh3ZXN0IFRlcnJpdG9yaWVzLENoYWlycyAmIENoYWlybWF0cywwLjU3DQo5MixNaWNyb3NvZnQgTmF0dXJhbCBNdWx0aW1lZGlhIEtleWJvYXJkLEdyYW50IENhcnJvbGwsOTkyNywtODIuMTYsNTAuOTgsNi41LE5vcnRod2VzdCBUZXJyaXRvcmllcyxDb21wdXRlciBQZXJpcGhlcmFscywwLjczDQo5MywiU3RhcGxlcyBXaXJlYm91bmQgU3Rlbm8gQm9va3MsIDYiIiB4IDkiIiwgMTIvUGFjayIsRGVsZmluYSBMYXRjaGZvcmQsMTAwMjIsLTMuODgsMTAuMTQsMi4yNyxOb3J0aHdlc3QgVGVycml0b3JpZXMsUGFwZXIsMC4zNg0KOTQsIkdCQyBQcmUtUHVuY2hlZCBCaW5kaW5nIFBhcGVyLCBQbGFzdGljLCBXaGl0ZSwgOC0xLzIiIiB4IDExIiIiLERvbiBKb25lcywxMDQzNywtMTkxLjIyLDE1Ljk5LDEzLjE4LE5vcnRod2VzdCBUZXJyaXRvcmllcyxCaW5kZXJzIGFuZCBCaW5kZXIgQWNjZXNzb3JpZXMsMC4zNw0KOTUsQmV2aXMgQm9hdC1TaGFwZWQgQ29uZmVyZW5jZSBUYWJsZSxEb3VnIEJpY2tmb3JkLDEwNDk5LDMxLjIxLDI2Mi4xMSw2Mi43NCxOb3J0aHdlc3QgVGVycml0b3JpZXMsVGFibGVzLDAuNzUNCjk2LCJMaW5kZW6uIDEyIiIgV2FsbCBDbG9jayBXaXRoIE9hayBGcmFtZSIsRG91ZyBCaWNrZm9yZCwxMDUzNSwtNDQuMTQsMzMuOTgsMTkuOTksTm9ydGh3ZXN0IFRlcnJpdG9yaWVzLE9mZmljZSBGdXJuaXNoaW5ncywwLjU1DQo5NyxOZXdlbGwgMzI2LERvdWcgQmlja2ZvcmQsMTA1MzUsLTAuNzksMS43NiwwLjcsTm9ydGh3ZXN0IFRlcnJpdG9yaWVzLFBlbnMgJiBBcnQgU3VwcGxpZXMsMC41Ng0KOTgsUHJpc21hY29sb3IgQ29sb3IgUGVuY2lsIFNldCxKYW1pZSBLdW5pdHosMTA3ODksNzYuNDIsMTkuODQsNC4xLE5vcnRod2VzdCBUZXJyaXRvcmllcyxQZW5zICYgQXJ0IFN1cHBsaWVzLDAuNDQNCjk5LFhlcm94IEJsYW5rIENvbXB1dGVyIFBhcGVyLEFudGhvbnkgSm9obnNvbiwxMDc5MSw5My4zNiwxOS45OCw1Ljc3LE5vcnRod2VzdCBUZXJyaXRvcmllcyxQYXBlciwwLjM4DQoxMDAsNjAwIFNlcmllcyBGbGlwLFJhbHBoIEtuaWdodCwxMDk0NSw0LjIyLDk1Ljk5LDguOTksTm9ydGh3ZXN0IFRlcnJpdG9yaWVzLFRlbGVwaG9uZXMgYW5kIENvbW11bmljYXRpb24sMC41Nw0K"
                }
            }
            const response = await fetch(nodJS + 'upload/images', requestOptions)
            // return response;
            return await response.json();
        }


        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });


        function GetBase64(file, cb) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                cb(reader.result)
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }


        const subir_Foto_Empleado = async (event: {
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
                let image = form["image"];
                const file = document.querySelector('#image').attributes.item(0);
                console.log(await toBase64(file));
                // let snombre = form["snombre"].value;
                // let papellido = form["papellido"].value;
                // let sapellido = form["sapellido"].value;
                // let doc_dpi = form["doc_dpi"].value;
                // let fchnac = form["fchnac"].value;
                // let tel1 = form["tel1"].value;
                // let correo = form["correo"].value;
                // let peso = form["peso"].value;
                // let altura = form["altura"].value;
                // let foto = form["foto"].value;
                const response = await Upload_foto(image);
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
        const [file, setFile] = useState(null);

        const upload = async () => {
            const datas = new FormData();
            datas.append("file", file);
            const response = await fetch(nodJS + 'upload/images',
                {method: "POST", body: datas})
            const data_r = await response.json()
            console.log(data_r) // reemplazar con un mensaje de éxito o la acción deseada
        };

        var state = {
            files: []
        };

        function getFiles(files) {
            state = ({files: files})
        }

        return (
            <div className={"index"}>
                <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                    <Form id="form_empleado" noValidate validated={validated} onSubmit={insertar_empleado}
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
                                    <svg className="imgperfil" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
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
                                <Row>
                                    <input type="file" accept=".png,.jpeg,.jpg" onChange={(e) => {
                                        setFile(e.target.files[0]);
                                        upload();
                                    }}></input>
                                    <button onClick={upload}>Upload</button>
                                </Row>
                                <FileBase64> </FileBase64>
                            </Col>
                            <Col xs={1}></Col>
                        </Row>
                        <Row className="mb-auto" as={Col}>
                            <Col xxl={5} xl={5} lg={5} md={5} sm={4}></Col>
                            <Col xxl={2} xl={5} lg={2} md={5} sm={4}>
                                <Button className="btn btn-warning" type={undefined}>Guardar Informacion</Button>
                            </Col>
                            <Col xxl={5} xl={5} lg={5} md={5} sm={4}></Col>
                        </Row>
                    </Form>
                    {/*<Row>*/}
                    {/*    <Form id="form_img_empleado" noValidate validated={validated}*/}
                    {/*          onSubmit={subir_Foto_Empleado}*/}
                    {/*        // action="http://192.168.10.237:3001/api/upload/images"*/}
                    {/*          method="POST"*/}
                    {/*          encType={"multipart/form-data"}*/}
                    {/*    >*/}
                    {/*        <Form.Group as={Col} controlId="validationCustom01">*/}
                    {/*            <Form.Label>Archivo Imagen</Form.Label>*/}
                    {/*            <Form.Control*/}
                    {/*                id="image"*/}
                    {/*                accept=".png,.jpeg,.jpg"*/}
                    {/*                name="image"*/}
                    {/*                size={"sm"}*/}
                    {/*                required*/}
                    {/*                type="file"*/}
                    {/*                placeholder="Seleccione la imagen a subir"*/}
                    {/*                // defaultValue="Mark"*/}
                    {/*            />*/}
                    {/*            <Button className="btn btn-warning" type={undefined}>Guardar*/}
                    {/*                Informacion</Button>*/}
                    {/*            <Form.Control.Feedback type="valid">Campo lleno!</Form.Control.Feedback>*/}
                    {/*            <Form.Control.Feedback type="invalid">Ingrese un usuario*/}
                    {/*                valido</Form.Control.Feedback>*/}
                    {/*        </Form.Group>*/}
                    {/*       */}
                    {/*    </Form>*/}
                    {/*</Row>*/}
                </Col>
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


var base64_file = "";
class Apps extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            files: []
        }
    }

    // Callback~
    getFiles(files) {
        base64_file = files[0].base64
        this.setState({files: files})
        console.log(files)
        console.log(base64_file)
    }


    render() {
        function Insertar_empleado(event) {
            event.preventDefault();
            const form = event.currentTarget;
            let foto = form["foto"].value;
            console.log(foto);
            let archivo = base64_file;
            console.log(archivo);
        }

        const _handleReaderLoaded = (readerEvt: any) => {
            let binaryString = readerEvt.target.result
            console.log(btoa(binaryString))
        }

        return (
            <Form onSubmit={Insertar_empleado}>
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
                            id="archivo"
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
                <Row className="mb-auto" as={Col}>
                    <Col xxl={5} xl={5} lg={5} md={5} sm={4}></Col>
                    <Col xxl={2} xl={5} lg={2} md={5} sm={4}>
                        <Button className="btn btn-warning" type={"submit"}>Guardar Informacion</Button>
                    </Col>
                    <Col xxl={5} xl={5} lg={5} md={5} sm={4}></Col>
                </Row>
            </Form>
        )
    }

}

export {Apps as Apps};