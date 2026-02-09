export default function InputUser({ value, name, maxLength, onChange, placeholder, type, className }) {

    return (
        <div>
            <input
                value={value}
                name={name}
                maxLength={maxLength}
                type={type}
                onChange={onChange}
                placeholder={placeholder}
                className={className}
            />
        </div>
    )
}