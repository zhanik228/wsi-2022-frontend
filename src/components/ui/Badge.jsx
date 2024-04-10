
const Badge = ({ children, color }) => {
    return (
        <div 
            className={`
                rounded-full 
                px-3 
                text-white 
                font-bold 
                py-1 
                text-sm 
                ${color}
            `}
        >{ children }
        </div>
    );
}

export default Badge;