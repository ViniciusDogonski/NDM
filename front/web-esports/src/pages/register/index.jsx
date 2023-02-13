import { LayoutComponents } from "../../components/layoutComponents"
import { useState } from "react";
import { Link } from 'react-router-dom';
import { api } from "../../services/api";

export const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword,] = useState("");
    const [name, setName,] = useState("");

    const saveUSer = async (e) => {
        e.preventDefault();
        const data = {
            email, password, name
        }

        const response = await api.post("/create", data);
        console.log(response.data)
    }

    return (
        <LayoutComponents>
            <form className="login-form" onSubmit={saveUSer}>
                <span className="login-form-title" >CRIAR CONTA</span>

                <div className="wrap-input">

                    <input
                        className={name !== "" ? "has-value input" : "input"}
                        type="text" value={name} onChange={e => setName(e.target.value)} />
                    <span className="focus-input" data-placeholder="Nome"></span>
                </div>

                <div className="wrap-input">

                    <input
                        className={email !== "" ? "has-value input" : "input"}
                        type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <span className="focus-input" data-placeholder="Email"></span>
                </div>


                <div className="wrap-input">
                    <input className={password !== "" ? "has-value input" : "input"} type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <span className="focus-input" data-placeholder="Password"></span>
                </div>

                <div className="container-login-form-btn">
                    <button className="login-form-btn" type="submit" >Cadastrar</button>
                </div>

                <div className="text-center">
                    {/* <span className="txt1">Não possui conta?</span> */}

                    {/* <a href="/" className="txt2">Criar conta.</a> */}
                    <Link to="/" className="txt2">Já tenho conta.</Link>
                </div>


            </form>
        </LayoutComponents>
    )

}