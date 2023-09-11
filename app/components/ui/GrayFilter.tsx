type Props = {
  children: React.ReactNode
}

function GrayFilter({ children }: Props) {
  const style = {
    filter: "grayscale(1)",
  }

  return <div style={style}>{children}</div>
}
