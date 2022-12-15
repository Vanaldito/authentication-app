import "./FormField.css";

interface FormFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  icon?: JSX.Element;
  label?: string;
}

export default function FormField({
  icon,
  className,
  label,
  readOnly,
  ...rest
}: FormFieldProps) {
  className = `form-field ${className ?? ""}`;
  className += ` ${icon ? "form-field--icon" : ""}`;
  className += ` ${readOnly ? "form-field--read-only" : ""}`;

  className = className.trim();

  return (
    <label className="form-field-container">
      {label && <span className="form-field-label">{label}</span>}
      <span className="form-field-icon">{icon}</span>
      <input className={className} readOnly={readOnly} {...rest} />
    </label>
  );
}
