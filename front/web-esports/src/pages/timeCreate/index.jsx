import { useState } from 'react';
import { Link } from 'react-router-dom';

export const TimeCreate = () => {

    const [name, setName] = useState("")

    const handleSubimit = (e) => {

        e.preventDefault();

        const data = { nome_time: name }
        fetch("http://localhost:3333/createTime", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then((resp) => {
            resp.json().then((data) => alert(data.message))

        }).catch((err) => {
            console.log(err.message)
        })


    }

    return (
        <div class="container card">
            <div class="card-title">
                <h2>Criar Time</h2>
            </div>
            <div class="card-body">
            <form onSubmit={handleSubimit}>
                <div className="form-group">
                    <label>nome time</label>
                    <input className="form-control" id="name" type="text" placeholder="entre com o nome" required onChange={e => setName(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-success">Enviar</button>
                <Link to="/home" className="btn btn-danger">Voltar</Link>
            </form>
            </div>
        </div>
    )
}