import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"

export const TimeEdit = () => {

    const { id } = useParams();
    console.log(id)


    useEffect(() => {
        fetch("http://localhost:3333/listTime/" + id).then((res) => {
            return res.json()
        }).then((resp) => {
            setName(resp.time.nome_time)
            // setName(resp.time.nome_time)
            // const { nome_time } = resp.time

            console.log(resp.time)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    const [name, setName] = useState("")

    const handleSubimit = (e) => {

        e.preventDefault();

        const data = {
            time_id: id,
            nome_time: name
        }

        fetch("http://localhost:3333/editTimes", {
            method: 'PUT',
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
                <h2>Editando time</h2>
            </div>
            <div className="card-body">
            <form onSubmit={handleSubimit}>
                <div className="form-group">
                    <input className="form-control" value={name} id="name" type="text" placeholder="entre com o nome" required onChange={e => setName(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-success">Enviar</button>
                <Link to="/home" className="btn btn-danger">Voltar</Link>
            </form>
            </div>
        </div>
    )
}