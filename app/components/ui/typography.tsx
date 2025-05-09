import * as React from "react"
import { cn } from "@/app/lib/utils"

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingTag = `h${HeadingLevel}`;

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  as?: HeadingTag;
}

// Heading component with configurable level
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 1, as, children, ...props }, ref) => {
    const Tag = (as || `h${level}`) as React.ElementType;
    
    const styles = {
      h1: "text-4xl font-bold font-heading tracking-tight md:text-5xl",
      h2: "text-3xl font-bold font-heading tracking-tight md:text-4xl",
      h3: "text-2xl font-bold font-heading tracking-tight md:text-3xl",
      h4: "text-xl font-semibold font-heading tracking-tight md:text-2xl",
      h5: "text-lg font-semibold font-heading tracking-tight md:text-xl",
      h6: "text-base font-semibold font-heading tracking-tight md:text-lg",
    };
    
    const headerStyle = `h${level}` as keyof typeof styles;
    
    return (
      <Tag
        ref={ref}
        className={cn(styles[headerStyle], className)}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);
Heading.displayName = "Heading";

// Paragraph component
export const Paragraph = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-base font-primary leading-7 text-secondary", className)}
    {...props}
  />
));
Paragraph.displayName = "Paragraph";

// Lead paragraph (larger, more prominent)
export const Lead = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xl font-primary leading-7 text-secondary", className)}
    {...props}
  />
));
Lead.displayName = "Lead";

// Small text for less prominent content
export const Small = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm font-primary leading-5 text-gray-dark", className)}
    {...props}
  />
));
Small.displayName = "Small";

// Muted text (de-emphasized)
export const Muted = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm font-primary text-gray-dark", className)}
    {...props}
  />
));
Muted.displayName = "Muted";

// Blockquote for quotations
export const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  React.BlockquoteHTMLAttributes<HTMLQuoteElement>
>(({ className, ...props }, ref) => (
  <blockquote
    ref={ref}
    className={cn(
      "mt-6 border-l-4 border-primary pl-6 italic text-secondary",
      className
    )}
    {...props}
  />
));
Blockquote.displayName = "Blockquote"; 