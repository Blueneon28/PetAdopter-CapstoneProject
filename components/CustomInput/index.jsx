function CustomInput({ id, type, placeholder, value, onChange }) {
  return (
    <input
      className="input input-bordered input-primary input-sm md:input-md lg:input-md w-72 md:w-full lg:w-full p-1 rounded-lg font-light text-sm md:text-2xl lg:text-2xl border-2 border-primary font-Poppins bg-white dark:bg-black"
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
      className="select select-primary select-sm md:select-md lg:select-md w-72 md:w-full lg:w-full p-1 rounded-lg font-light text-sm md:text-2xl lg:text-2xl border-2 border-primary font-Poppins bg-white dark:bg-black"
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
