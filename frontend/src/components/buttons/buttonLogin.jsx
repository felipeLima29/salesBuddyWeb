export default function ButtonLogin({handleLogin, text}) {
    return (
        <button className="buttonLogin" type="submit" onClick={handleLogin}>{text}</button>
    )
}