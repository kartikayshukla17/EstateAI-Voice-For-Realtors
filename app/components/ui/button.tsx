import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "ghost";
type ButtonSize = "md" | "sm";

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonOwnProps & ComponentProps<"button">) {
  const classes = [
    "btn",
    variant === "ghost" ? "btn--ghost" : "",
    size === "sm" ? "btn--sm" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <button className={classes} {...props} />;
}
