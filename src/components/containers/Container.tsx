import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Container({ children }: Props) {
  return (
    <div className="h-full py-1 md:max-w-6xl flex-col mx-auto">{children}</div>
  );
}
