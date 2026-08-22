import AuthBranding from "./AuthBranding";

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <main className="min-h-screen bg-landing-black">
      <div className="flex">
        {/* Left */}
        <div className="hidden w-1/3 border-r border-white/10 lg:flex">
          <AuthBranding />
        </div>

        {/* Right */}
        <div className="flex flex-1 items-center justify-center px-6">
          <div className="w-full max-w-lg ">{children}</div>
        </div>
      </div>
    </main>
  );
}
