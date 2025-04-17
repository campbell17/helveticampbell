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
    <h1 className={`text-4xl font-bold text-text-heading font-helvetica ${className}`}>
      {children}
    </h1>
  );
}

export function H2({ children, className = '' }: TextProps) {
  return (
    <h2 className={`text-3xl font-bold text-text-heading font-helvetica ${className}`}>
      {children}
    </h2>
  );
}

export function Caption({ children, className = '' }: TextProps) {
  return (
    <p className={`text-sm text-text-secondary ${className}`}>
      {children}
    </p>
  );
}

export function Overline({ children, className = '' }: TextProps) {
  return (
    <p className={`text-xs uppercase tracking-wider text-text-tertiary ${className}`}>
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
      className={`text-text-primary hover:text-text-heading underline underline-offset-4 transition-colors ${className}`}
      {...externalProps}
    >
      {children}
    </a>
  );
} 