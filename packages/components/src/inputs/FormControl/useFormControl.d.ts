import { Context } from 'react';
import { FormControlProps } from './FormControl';

export {};

type ContextFromPropsKey = 'disabled' | 'error' | 'hiddenLabel' | 'margin' | 'required' | 'variant';

export interface FormControlState extends Pick<FormControlProps, ContextFromPropsKey> {
  adornedStart: boolean;
  filled: boolean;
  focused: boolean;
  onBlur: () => void;
  onEmpty: () => void;
  onFilled: () => void;
  onFocus: () => void;
}

export default function useFormControl(): FormControlState;
