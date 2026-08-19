"use client";

type AnimatedPageProps = {
  children: React.ReactNode;
};

export function AnimatedPage({ children }: AnimatedPageProps) {
  return (
    <main className="relative w-full max-w-full">
      {children}
    </main>
  );
}
