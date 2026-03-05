import { Label } from "@/presentation/shared/components/ui/label";
import { cn } from "@/presentation/shared/lib/utils";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
};

export function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  return (
    <div className="grid w-full gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && (
        <p
          role="alert"
          className={cn("text-destructive text-sm font-medium")}
        >
          {error}
        </p>
      )}
    </div>
  );
}
