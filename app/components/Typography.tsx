interface TextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface TextLinkProps extends TextProps {
  href: string;
  external?: boolean;
}

export function H1({ children, className = '', style = {} }: TextProps) {
  return (
    <h1 style={style} className={`mb-6 text-7xl lg:text-8xl font-[700] text-[hsl(var(--color-text-heading))] font-display ${className}`}>
      {children}
    </h1>
  );
}

export function H2({ children, className = '', style = {} }: TextProps) {
  return (
    <h2 style={style} className={`mb-6 text-5xl font-bold text-[hsl(var(--color-text-heading))] font-display ${className}`}>
      {children}
    </h2>
  );
}

export function H3({ children, className = '', style = {} }: TextProps) {
  return (
    <h3 style={style} className={`mb-6 text-3xl font-bold text-[hsl(var(--color-text-heading))] font-display ${className}`}>
      {children}
    </h3>
  );
}

export function Caption({ children, className = '', style = {} }: TextProps) {
  return (
    <div style={style} className={`text-sm font-body font-[500] text-[oklch(var(--color-text-secondary))] ${className}`}>
      {children}
    </div>
  );
}

export function Overline({ children, className = '', style = {} }: TextProps) {
  return (
    <p style={style} className={`text-xs uppercase tracking-wider text-[hsl(var(--color-text-tertiary))] ${className}`}>
      {children}
    </p>
  );
}

export function TextLink({ children, href, external = false, className = '', style = {} }: TextLinkProps) {
  const externalProps = external ? {
    target: "_blank",
    rel: "noopener noreferrer"
  } : {};

  return (
    <a 
      href={href}
      style={style}
      className={`text-[hsl(var(--color-text-primary))] hover:text-[hsl(var(--color-text-heading))] underline underline-offset-4 transition-colors ${className}`}
      {...externalProps}
    >
      {children}
    </a>
  );
} 