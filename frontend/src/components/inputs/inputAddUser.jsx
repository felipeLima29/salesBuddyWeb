export default function InputAddUser({ value, onChange, type = "text", name, maxLength }) {
    return (
        <div>
            <input type={type}
                   name={name}
                   maxLength={maxLength}
                   className="inputAddUser"
                   value={value}
                   onChange={onChange}
            />
        </div>
    )
}