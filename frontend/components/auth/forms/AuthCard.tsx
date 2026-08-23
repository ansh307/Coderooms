interface Props {
  children: React.ReactNode;
}

export default function AuthCard({ children }: Props) {
  return <div className="space-y-8 px-2 sm:p-8 w-full sm:mx-6">{children}</div>;
}
