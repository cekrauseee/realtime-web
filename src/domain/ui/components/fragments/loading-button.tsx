import { Button } from '../../cn/components/button'
import { Spinner } from '../../cn/components/spinner'
import type { ButtonProps } from './button'

type LoadingButtonProps = { loading?: boolean } & ButtonProps

export const LoadingButton = ({ children, disabled, loading, ...props }: LoadingButtonProps) => (
  <Button
    disabled={loading || disabled}
    {...props}
  >
    {!loading && children}
    {loading && <Spinner />}
  </Button>
)
