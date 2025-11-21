import { cn } from '../../cn/utils/helpers'

export type ButtonProps = React.ComponentProps<'button'>

export const Button = ({ className, ...props }: ButtonProps) => (
  <button
    {...props}
    className={cn(
      'focus-visible:bg-accent hover:bg-accent flex w-full cursor-pointer items-center gap-x-2 border-t p-12 text-start text-sm outline-0 transition-colors',
      className
    )}
  />
)
