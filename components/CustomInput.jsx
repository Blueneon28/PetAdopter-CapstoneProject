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

function CustomInputComboBox({ id, title, op1, op2, op3 }) {
  return (
    <select
      id={id}
      defaultValue="none"
      className="w-72 p-1 rounded-lg font-light text-sm italic border-2 border-primary font-Poppins bg-white"
    >
      <option value="none" disabled>
        {title}
      </option>
      <option value={op1}>{op1}</option>
      <option value={op2}>{op2}</option>
      <option value={op3}>{op3}</option>
    </select>
  );
}

export { CustomInput, CustomInputComboBox };
