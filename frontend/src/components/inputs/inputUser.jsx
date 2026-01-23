export default function InputUser({onChange}) {

    return (
        <div>
            <input type="text" onChange={onChange} placeholder="Usuário" className="inputLogin"/>
        </div>
    )
}