export default function InputAddUser({ value, onChange, type = "text", name, maxLength, placeholder }) {
    return (
        <div>
            <input type={type}
                   name={name}
                   placeholder={placeholder}
                   maxLength={maxLength}
                   className="inputAddUser"
                   value={value}
                   onChange={onChange}
            />
        </div>
    )
}