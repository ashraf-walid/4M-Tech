export default function InputField({ 
    type, 
    name, 
    placeholder, 
    value, 
    onChange, 
    className, 
    required, 
    error 
  }) {
    return (
      <div className="flex flex-col">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${className} ${error ? 'border-red-300' : ''} ${name === 'phone' ? 'text-right' : ''}`}
          dir={name === 'phone' ? 'rtl' : undefined}
          required={required}
        />
        {error && (
          <p className="text-xs text-red-400 mt-1">{error}</p>
        )}
      </div>
    );
  }