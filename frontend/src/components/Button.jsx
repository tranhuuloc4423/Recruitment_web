const Button = ({
  label,
  icon = false,
  iconPosition = 'left',
  onClick,
  className = ''
}) => {
  return (
    <div
      onClick={onClick}
      className={
        `py-2 px-4 bg-primary active:bg-[rgba(40,79,158,0.85)] transition-all gap-2 rounded flex justify-center items-center cursor-pointer ` +
        className
      }
    >
      {iconPosition === 'left' && icon && <span className="">{icon}</span>}
      <div className="text-white text-center whitespace-nowrap">{label}</div>
      {iconPosition === 'right' && icon && <span className="">{icon}</span>}
    </div>
  )
}

export default Button
