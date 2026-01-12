export default function InputAddUser({ value, onChange , type = "text"}) {
    return (
        <div>
            <input type={type}
                   className="inputAddUser"
                   value={value}
                   onChange={onChange}
            />
        </div>
    )
}