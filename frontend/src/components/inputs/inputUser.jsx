export default function InputUser({ value, name, maxLength, onChange, onBlur, placeholder, type, className }) {

    return (
        <div>
            <input
                value={value}
                name={name}
                maxLength={maxLength}
                type={type}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                className={className}
            />
        </div>
    )
}