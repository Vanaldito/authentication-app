import "./FormField.css";

interface FormFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  icon?: JSX.Element;
}

export default function FormField({
  icon,
  className,
  ...rest
}: FormFieldProps) {
  className = `form-field ${className ?? ""}`.trim();

  return (
    <label className="form-field-label">
      <span className="form-field-icon">{icon}</span>
      <input className={className} {...rest} />
    </label>
  );
}
