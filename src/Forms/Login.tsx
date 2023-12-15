import React from 'react';
import {useForm} from "react-hook-form";
import "../css/App.css";
import "../css/index.css";
import Leftbar from "../Leftbar";

interface IFormInput {
    user: string;
    password: string;
    example: string;
}

const style = {
    height: 75
}
const style2 = {
    height: 50
}
const nodJS = 'http://192.168.10.237:3001/api/'

function Login() {
    return (<React.StrictMode>
        <div style={style}>
        </div>
        <div className={"d-lg-none d-xl-none"} style={style2}>
        </div>
        <div className={"row"}>
            <Leftbar/>
            <Body/>
        </div>
    </React.StrictMode>);
}

function Body() {


    const {
        register,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm<IFormInput>();

    const onSubmit = async (data: IFormInput) => {
        let objectjs = JSON.stringify(data);
        let name = data.user;
        let response = await parseUser(data.user, data.password);
        alert(name + ' --- ' + objectjs + "Respuesta NodJS JSON:" + response[0].PASS);
        sessionStorage.setItem('PASS',response[0].PASS);
    }; // your form submit function which will invoke after successful validation

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


    console.log(watch("example")); // you can watch individual input by pass the name of the input

    return (
        <div className={'login col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-10 d-lg-block'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Usuario</label>
                <input
                    {...register("user", {
                        required: true,
                        maxLength: 20,
                        pattern: /^[A-Za-z]+$/i
                    })}
                />
                {errors?.user?.type === "required" && <p>This field is required</p>}
                {errors?.user?.type === "maxLength" && (
                    <p>El nombre de usuario no puede exeder mas de 20 letras</p>
                )}
                {errors?.user?.type === "pattern" && (
                    <p>Ingresar solo caracteres y numeros</p>
                )}
                <label className="button">Contraseña</label>
                <input type="password" {...register("password", {
                    required: true
                })} />
                {errors?.password?.type === "pattern" && (
                    <p>Alphabetical characters only</p>
                )}
                <input type="submit"/>
            </form>
        </div>
    );
}

export default Login;
