'use client';

import { useStore } from '@tanstack/react-form';
import { RadioGroup, RadioGroupItem } from '@repo/ui/components/ui/radio-group';
import { Label } from '@repo/ui/components/ui/label';
import { FieldDescription, FieldLabel } from '@repo/ui/components/ui/field';
import {
  useFieldContext,
  FormFieldSet,
  FormFieldError,
  createFormField
} from '@repo/ui/components/ui/form-context';

type Option = { value: string; label: string };

interface RadioGroupFieldProps {
  label?: string;
  description?: string;
  required?: boolean;
  options: Option[];
}

export function RadioGroupField({ label, description, required, options }: RadioGroupFieldProps) {
  const field = useFieldContext();
  const value = useStore(field.store, (s) => s.value) as string;

  return (
    <FormFieldSet>
      {label && (
        <FieldLabel>
          {label}
          {required && <span className='text-red-500'> *</span>}
        </FieldLabel>
      )}
      {description && <FieldDescription>{description}</FieldDescription>}
      <RadioGroup
        value={value}
        onValueChange={field.handleChange}
        onBlur={field.handleBlur}
        className='flex flex-wrap gap-x-6 gap-y-2'
      >
        {options.map((opt) => (
          <div key={opt.value} className='flex items-center space-x-2'>
            <RadioGroupItem value={opt.value} id={`${field.name}-${opt.value}`} />
            <Label htmlFor={`${field.name}-${opt.value}`}>{opt.label}</Label>
          </div>
        ))}
      </RadioGroup>
      <FormFieldError />
    </FormFieldSet>
  );
}

export const FormRadioGroupField = createFormField(RadioGroupField);
