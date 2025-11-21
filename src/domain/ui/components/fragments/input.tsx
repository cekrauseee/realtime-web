import { Input as CnInput } from '../../cn/components/input'

export type InputProps = { onValueChange?: (value: string) => void } & Omit<React.ComponentProps<typeof CnInput>, 'onChange'>

export const Input = ({ onValueChange, ...props }: InputProps) => (
  <CnInput
    onChange={(ev) => onValueChange?.(ev.target.value)}
    {...props}
  />
)
