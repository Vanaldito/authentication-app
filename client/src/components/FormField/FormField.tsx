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
  ...rest
}: FormFieldProps) {
  className = `form-field ${className ?? ""}`;
  className += ` ${icon ? "form-field--icon" : ""}`;

  className = className.trim();

  return (
    <label className="form-field-container">
      <span className="form-field-label">{label}</span>
      <span className="form-field-icon">{icon}</span>
      <input className={className} {...rest} />
    </label>
  );
}
