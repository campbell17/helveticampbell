interface TextProps {
  children: React.ReactNode;
  className?: string;
}

interface TextLinkProps extends TextProps {
  href: string;
  external?: boolean;
}

export function H1({ children, className = '' }: TextProps) {
  return (
    <h1 className={`text-8xl font-[700] tracking-tight text-[hsl(var(--color-text-heading))] font-display ${className}`}>
      {children}
    </h1>
  );
}

export function H2({ children, className = '' }: TextProps) {
  return (
    <h2 className={`text-3xl font-bold text-[hsl(var(--color-text-heading))] font-display ${className}`}>
      {children}
    </h2>
  );
}

export function Caption({ children, className = '' }: TextProps) {
  return (
    <div className={`text-sm font-body font-[500] text-[oklch(var(--color-text-secondary))] ${className}`}>
      {children}
    </div>
  );
}

export function Overline({ children, className = '' }: TextProps) {
  return (
    <p className={`text-xs uppercase tracking-wider text-[hsl(var(--color-text-tertiary))] ${className}`}>
      {children}
    </p>
  );
}

export function TextLink({ children, href, external = false, className = '' }: TextLinkProps) {
  const externalProps = external ? {
    target: "_blank",
    rel: "noopener noreferrer"
  } : {};

  return (
    <a 
      href={href}
      className={`text-[hsl(var(--color-text-primary))] hover:text-[hsl(var(--color-text-heading))] underline underline-offset-4 transition-colors ${className}`}
      {...externalProps}
    >
      {children}
    </a>
  );
} 