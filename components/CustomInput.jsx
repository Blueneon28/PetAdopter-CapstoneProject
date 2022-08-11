function CustomInput({ id, type, placeholder, value, onChange }) {
  return (
    <input
      className="w-72 p-1 rounded-lg font-light text-sm italic border-2 border-primary font-Poppins"
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={value}
    />
  );
}

export { CustomInput };
