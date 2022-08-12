function CustomInput({ id, type, placeholder, value, onChange }) {
  return (
    <input
      className="w-72 p-1 rounded-lg font-light text-sm border-2 border-primary font-Poppins dark:bg-black"
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={value}
    />
  );
}

function CustomInputComboBox({ id, title, op1, op2, op3, onChange }) {
  return (
    <select
      id={id}
      onChange={onChange}
      defaultValue="none"
      className="w-72 p-1 rounded-lg font-light text-sm border-2 border-primary font-Poppins bg-white dark:bg-black"
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
