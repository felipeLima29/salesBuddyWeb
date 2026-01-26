export default function InputUser({onChange, placeholder}) {

    return (
        <div>
            <input type="text" onChange={onChange} placeholder={placeholder} className="inputLogin"/>
        </div>
    )
}