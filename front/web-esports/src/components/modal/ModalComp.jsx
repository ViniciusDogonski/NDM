import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
export const EmpListing = () => {

    const [empdata, setEmpdata] = useState(null);

    const navigate = useNavigate();

    const loadDetails = (id) => {

        navigate("/time/details/" + id)
    }

    const loadEdit = (id) => {
        navigate("/time/edit/" + id)
    }

    const removeFuntion = (id) => {

        if (window.confirm("voce deseja remover?")) {

            let data = { id: id }

            fetch("http://localhost:3333/deleteTimes", {
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


        fetch("http://localhost:3333/listTimes").then((res) => {
            return res.json()
        }).then((resp) => {
            setEmpdata(resp.times)
            // console.log(resp)
        }).catch((err) => {
            console.log(err.message)
        })
    }, [])


    return (

        <div class="container-lg">

            <div>
                <div class="table-title" style={{ color: "#adadad" }}>
                    <div class="row">
                        <div class="col-sm-8"><h2 class="m-2">lista de <b>TIMES</b></h2></div>
                        <div class="col-sm-4">
                            <Link to="/time/create" className="btn btn-success m-2">Add Time(+)</Link>
                            <Link to="/jogador/list/" className="btn btn-info">lista de jogadores</Link>
                        </div>
                    </div>
                </div>
                <div className="table-responsive-lg">
                    <table className="table table-borderless table-dark">
                        <thead>
                            <tr>
                                <th scope="col"><div className="p-2 text-center" style={{ marginTop: 0 }}>#</div></th>
                                <th scope="col"><div className="p-2 text-center" style={{ marginTop: 0 }}>Nome do time</div></th>
                                <th scope="col"><div className="p-2 text-center" style={{ marginTop: 0 }}>Ação</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {empdata &&
                                empdata.map((item) => (
                                    <tr key={item.id}>
                                        <td><div className="p-2 text-center" style={{ marginTop: 0 }}>{item.id}</div></td>
                                        <td><div className="p-2 text-center" style={{ marginTop: 0 }}>{item.nome_time}</div></td>
                                        <td>
                                            <div className="text-center" style={{ marginTop: 0 }}>
                                                <button className="btn btn-success m-1" onClick={() => { loadEdit(item.id) }}>Edit </button>
                                                <button onClick={() => { removeFuntion(item.id) }} className="btn btn-danger m-1" >Remover</button>
                                                <button className="btn btn-info m-1" onClick={() => { loadDetails(item.id) }}>detalhes</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))

                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )

}