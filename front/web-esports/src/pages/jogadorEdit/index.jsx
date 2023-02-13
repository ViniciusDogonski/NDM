import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"

export const JogadorEdit = () => {

    const { id } = useParams();
    // console.log(id)

    const [name, setName] = useState("")
    const [idade, setidade] = useState("")
    const [timeid, settimeid] = useState(null)
    const [dataTimes, setdataTimes] = useState([])


    useEffect(() => {

        fetch("http://localhost:3333/listJogador/" + id).then((res) => {
            return res.json()
        }).then((resp) => {

            setName(resp.jogador.nome_jogador)
            setidade(resp.jogador.idade)
            settimeid(resp.jogador.time_id)
            // console.log(resp.jogador)
        }).catch((err) => {
            console.log(err)
        })


        fetch("http://localhost:3333/listTimes").then((res) => {
            return res.json()
        }).then((resp) => {
            // setJogadores(resp.jogadores)
            setdataTimes(resp.times)
        }).catch((err) => {
            console.log(err.message)
        })
    }, [])


    const handleSubimit = (e) => {

        e.preventDefault();

        const data = {
            id: parseInt(id),
            nome_jogador: name,
            idade: parseInt(idade),
            time_id: timeid == null ? timeid : parseInt(timeid)
        }

        console.log(data)
        fetch("http://localhost:3333/editJogador", {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then((resp) => {
            console.log(resp)
            resp.json().then((data) => {
                if (data.message) {
                    alert(data.message)
                } else {
                    alert(data.error)
                }
            })

        }).catch((err) => {
            console.log(err.message)
        })

    }

    return (
        <div class="container card">
            <div class="card-title">
                <h2>edit jogador</h2>
            </div>
            <div class="card-body">
                <form onSubmit={handleSubimit}>
                    <div className="form-group">
                        <label>Nome jogador</label>
                        <input className="form-control" id="name" type="text" placeholder="entre com o nome" required onChange={e => setName(e.target.value)} value={name} />
                    </div>
                    <div className="form-group">
                        <label>idade jogador</label>
                        <input className="form-control" id="idade" type="number" placeholder="entre com a idade" required onChange={e => setidade(e.target.value)} value={idade} />
                    </div>
                    <div class="form-group">
                        <label>Time</label>
                        <select class="form-control" id="exampleFormControlSelect1" onChange={e => settimeid(e.target.value)} value={timeid}>
                            <option value={null} >sem time</option>
                            {dataTimes &&
                                dataTimes.map((elemet) => (
                                    <option key={elemet.id} value={elemet.id} >{elemet.nome_time}</option>
                                ))

                            }
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success">Enviar</button>
                    <Link to="/jogador/list/" className="btn btn-danger">Voltar</Link>
                </form>
            </div>

        </div>
    )
}

{/* <form onSubmit={handleSubimit}>
<div className="form-group">
    <input className="form-control" value={name} id="name" type="text" placeholder="entre com o nome" required onChange={e => setName(e.target.value)} />
</div>

<button type="submit" className="btn btn-success">Enviar</button>
<Link to="/home" className="btn btn-danger">Voltar</Link>
</form> */}