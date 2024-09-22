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
        `py-3 px-4 bg-primary active:bg-[rgba(40,79,158,0.85)] transition-all rounded flex justify-center cursor-pointer ` +
        className
      }
    >
      {iconPosition === 'left' && icon && <span className="">{icon}</span>}
      <span className="text-white text-center">{label}</span>
      {iconPosition === 'right' && icon && <span className="">{icon}</span>}
    </div>
  )
}

export default Button
