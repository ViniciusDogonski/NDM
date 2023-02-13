import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const TimeDetails = () => {

    const { id } = useParams();
    const [datajogadores, setdatajogadores] = useState([])
    const [datatime, setdatatime] = useState({})

    useEffect(() => {
        fetch("http://localhost:3333/listjogadorbytime/" + id).then((res) => {
            return res.json()
        }).then((resp) => {

            setdatajogadores(resp.jogadores)
            setdatatime(resp.time)
            // setName(resp.time.nome_time)
            // const { nome_time } = resp.time

            console.log(resp)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (

        <div class="container-lg">

            <div>
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-8">
                            <h2 class="m-2" style={{ color: "#adadad" }}>lista de <b>JOGADORES</b> do <b>TIME:</b> {datatime.nome_time} </h2>
                        </div>
                        <div class="col-sm-4">
                            <Link to="/home" className="btn btn-success m-2">lista de times</Link>
                        </div>
                    </div>
                </div>
                <table className="table table-borderless table-dark">
                    <thead>
                        <tr>
                            <th scope="col"><div className="p-2 text-center" style={{ marginTop: 0 }}>#</div></th>
                            <th scope="col"><div className="p-2 text-center" style={{ marginTop: 0 }}>Nome do Jogador</div></th>
                            <th scope="col"><div className="p-2 text-center" style={{ marginTop: 0 }}>idade</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datajogadores &&
                            datajogadores.map((item) => (
                                <tr key={item.id}>
                                    <td><div className="p-2 text-center" style={{ marginTop: 0 }}>{item.id}</div></td>
                                    <td><div className="p-2 text-center" style={{ marginTop: 0 }}>{item.nome_jogador}</div>
                                    </td>
                                    <td><div className="p-2 text-center" style={{ marginTop: 0 }}>{item.idade}</div>
                                    </td>
                                </tr>
                            ))

                        }
                    </tbody>
                </table>
            </div>
        </div>
    )

}