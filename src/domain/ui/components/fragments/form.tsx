type FormProps = { onSubmit?: () => void | Promise<void> } & Omit<React.ComponentProps<'form'>, 'onSubmit'>

export const Form = ({ onSubmit, ...props }: FormProps) => (
  <form
    onSubmit={(ev) => {
      ev.preventDefault()
      onSubmit?.()
    }}
    {...props}
  />
)
