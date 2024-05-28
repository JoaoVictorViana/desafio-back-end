import { FC, PropsWithChildren } from 'react'

export const Flex: FC<PropsWithChildren & React.HTMLProps<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div {...props} className={`${className ?? ''} flex`}>
      {children}
    </div>
  )
}

export const Grid: FC<PropsWithChildren & React.HTMLProps<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div {...props} className={`${className ?? ''} grid`}>
      {children}
    </div>
  )
}
