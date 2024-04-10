
const Input = ({ type, value, placeholder, handleInput }) => {
    return (
        <input type={ type } className="p-2" placeholder={ placeholder } value={ value } onInput={e => handleInput(e.target.value)} />
    );
}

export default Input;