import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "font-semibold uppercase tracking-wide",
    "transition-all duration-100",
    "select-none",
    "border-[3px]",
    "rounded-none",
    "focus-visible:outline-none",
    "focus-visible:ring-0",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "active:translate-x-[4px]",
    "active:translate-y-[4px]",
    "font-mono",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-black",
          "text-white",
          "border-black",
          "shadow-[6px_6px_0px_#111]",
          "hover:translate-x-[2px]",
          "hover:translate-y-[2px]",
          "hover:shadow-[4px_4px_0px_#111]",
          "active:shadow-none",
        ].join(" "),

        outline: [
          "bg-white",
          "text-black",
          "border-black",
          "shadow-[6px_6px_0px_#111]",
          "hover:bg-black",
          "hover:text-white",
          "hover:translate-x-[2px]",
          "hover:translate-y-[2px]",
          "hover:shadow-[4px_4px_0px_#111]",
          "active:shadow-none",
        ].join(" "),

        secondary: [
          "bg-zinc-200",
          "text-black",
          "border-black",
          "shadow-[6px_6px_0px_#111]",
          "hover:bg-zinc-300",
          "hover:translate-x-[2px]",
          "hover:translate-y-[2px]",
          "hover:shadow-[4px_4px_0px_#111]",
          "active:shadow-none",
        ].join(" "),

        destructive: [
          "bg-red-700",
          "text-white",
          "border-black",
          "shadow-[6px_6px_0px_#111]",
          "hover:bg-red-800",
          "hover:translate-x-[2px]",
          "hover:translate-y-[2px]",
          "hover:shadow-[4px_4px_0px_#111]",
          "active:shadow-none",
        ].join(" "),

        ghost: [
          "bg-transparent",
          "text-black",
          "border-black",
          "hover:bg-black",
          "hover:text-white",
        ].join(" "),

        link: [
          "border-none",
          "shadow-none",
          "bg-transparent",
          "text-black",
          "underline",
          "underline-offset-4",
          "hover:opacity-70",
          "uppercase",
        ].join(" "),
      },

      size: {
        default: "h-11 px-6 text-sm",

        sm: "h-9 px-4 text-xs",

        lg: "h-14 px-8 text-base",

        icon: "h-11 w-11 p-0",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };