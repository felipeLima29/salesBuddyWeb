export default function InputPassword({onChange}) {

    return (
        <div>
            <input type="password" onChange={onChange} placeholder="Senha" className="inputLogin"/>
        </div>
    )
}