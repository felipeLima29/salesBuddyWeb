export default function InputAddUser({ value, onChange , type = "text", name}) {
    return (
        <div>
            <input type={type}
                   name={name}
                   className="inputAddUser"
                   value={value}
                   onChange={onChange}
            />
        </div>
    )
}