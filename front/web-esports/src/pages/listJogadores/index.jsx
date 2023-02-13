import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
export const ListJogador = () => {

    const [jogadores, setJogadores] = useState(null);

    const navigate = useNavigate();

    const loadEdit = (id) => {
        navigate("/jogador/edit/" + id)
    }

    const removeFuntion = (id) => {

        if (window.confirm("voce deseja remover?")) {

            let data = { id: id }

            fetch("http://localhost:3333/deleteJogador", {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }).then((resp) => {
                resp.json().then((data) => alert(data.message))
                window.location.reload()

            }).catch((err) => {
                console.log(err.message)
            })

        }

    }

    useEffect(() => {


        fetch("http://localhost:3333/listJogador").then((res) => {
            return res.json()
        }).then((resp) => {
            setJogadores(resp.jogadores)
            console.log(resp)
        }).catch((err) => {
            console.log(err.message)
        })
    }, [])

    // console.log(empdata[0].id)

    // for (let value of empdata) {
    //     console.log(value)
    // }



    return (

        <div class="container-lg">

            <div>
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-8" style={{ color: "#adadad" }}><h2 className="m-2">lista de <b>JOGADORES</b></h2></div>
                        <div class="col-sm-4">
                            <Link to="/jogador/create" className="btn btn-success m-2">Add jogador(+)</Link>
                            <Link to="/home" className="btn btn-info">lista de Times</Link>
                        </div>
                    </div>
                </div>
                <table className="table table-borderless table-dark">
                    <thead>
                        <tr>
                            <th scope="col"><div className="p-2 text-center" style={{ marginTop: 0 }}>#</div></th>
                            <th scope="col"><div className="p-2 text-center" style={{ marginTop: 0 }}>Nome do Jogador</div></th>
                            <th scope="col"><div className="p-2 text-center" style={{ marginTop: 0 }}>idade</div></th>
                            <th scope="col"><div className="p-2 text-center" style={{ marginTop: 0 }}>Ação</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {jogadores &&
                            jogadores.map((item) => (
                                <tr key={item.id}>
                                    <td><div className="p-2 text-center" style={{ marginTop: 0 }}>{item.id}</div></td>
                                    <td><div className="p-2 text-center" style={{ marginTop: 0 }}>{item.nome_jogador}</div></td>
                                    <td><div className="p-2 text-center" style={{ marginTop: 0 }}>{item.idade}</div></td>
                                    <td>
                                        <div className="text-center" style={{ marginTop: 0 }}>
                                            <button className="btn btn-success m-1" onClick={() => { loadEdit(item.id) }}>Edit </button>
                                            <button onClick={() => { removeFuntion(item.id) }} className="btn btn-danger m-1" >Remover</button>
                                        </div>
                                    </td>
                                </tr>
                            ))

                        }
                    </tbody>
                </table>
            </div>
        </div >
    )

}