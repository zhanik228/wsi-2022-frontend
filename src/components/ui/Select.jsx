
const Select = ({ title, selectedValue, options, setSelected }) => {
    return (
        <select onChange={(e) => setSelected(e.target.value) } value={ selectedValue ? selectedValue : title } className="bg-gray-800 text-white rounded p-1">
            <option disabled>{ title }</option>
            {options.map((option) => (
                <option 
                    key={ option.value }
                    value={ option.value }
                    className=""
                >{ option.name }</option>
            ))}
        </select>
    );
}

export default Select;