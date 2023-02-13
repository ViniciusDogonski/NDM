import { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { LayoutComponents } from '../../components/layoutComponents';
import { AuthContex } from '../../context/authContext';


export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword,] = useState("");
    const { SingIn, Signed } = useContext(AuthContex);

    const handleSingIn = async (e) => {

        e.preventDefault();
        const data = {
            email,
            password
        };
        await SingIn(data);

    }


    if (Signed) {
        return <Navigate to="/home" />
    } else {

        return (

            <LayoutComponents>
                <form onSubmit={handleSingIn} className="login-form">
                    <span className="login-form-title" >BEM VINDO!</span>

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
                        <button className="login-form-btn" type='submit' >Login</button>
                    </div>

                    <div className="text-center">
                        <span className="txt1">Não possui conta?</span>

                        {/* <a href="/" className="txt2">Criar conta.</a> */}
                        <Link to="/register" className="txt2">Criar conta.</Link>
                    </div>


                </form>
            </LayoutComponents>

        )
    }
}