interface Props {
  children: React.ReactNode;
}

export default function AuthCard({ children }: Props) {
  return <div className="space-y-8 p-8 w-full mx-6">{children}</div>;
}
