export default function InputUser({onChange, placeholder, type}) {

    return (
        <div>
            <input type={type}onChange={onChange} placeholder={placeholder} className="inputLogin"/>
        </div>
    )
}