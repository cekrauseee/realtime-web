import { Button } from '../../cn/components/button'
import { Spinner } from '../../cn/components/spinner'

type LoadingButtonProps = { loading?: boolean } & React.ComponentProps<typeof Button>

export const LoadingButton = ({ children, disabled, loading, ...props }: LoadingButtonProps) => (
  <Button
    disabled={loading || disabled}
    {...props}
  >
    {!loading && children}
    {loading && <Spinner />}
  </Button>
)
