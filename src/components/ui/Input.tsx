import React from 'react';

export interface InputProps {
  id?: string;
  label?: string;
  type?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({ id, label, type = 'text', value, onChange, placeholder }) => {
  return (
    <div className="w-full">
      {label ? <label htmlFor={id} className="block mb-1 text-sm text-gray-300">{label}</label> : null}
      <input id={id} type={type} value={value as any} onChange={onChange} placeholder={placeholder} className="w-full p-2 rounded border border-gray-700 bg-black text-white" />
    </div>
  );
};

export default Input;
