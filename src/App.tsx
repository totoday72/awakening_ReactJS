import React from "react";
import background_img from './images/AWK_TRIColor_Op4.jpg'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Image} from "react-bootstrap";



const App = () => {
    return (
        <div className={"index col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-10 d-lg-block"}>
            <div className={''}>
                    <Row>

                    </Row>
                    <Row>
                        <Col xxl={1} xl={1} lg={1} md={1} sm={1}></Col>
                        <Col xxl={10} xl={10} lg={10} md={10} sm={10}>
                            <Image src={background_img} fluid rounded ></Image>
                        </Col>
                        <Col xxl={1} xl={1} lg={1} md={1} sm={1}></Col>
                    </Row>

            </div>
        </div>
    );
}


export default App;