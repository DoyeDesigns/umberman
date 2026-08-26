"use client";

type AnimatedPageProps = {
  children: React.ReactNode;
};

export function AnimatedPage({ children }: AnimatedPageProps) {
  return (
    <main className="alt-site-push relative w-full max-w-full">
      {children}
    </main>
  );
}
