import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
    return (
        <button
            className={clsx(
                "rounded-xl px-4 py-2 font-medium transition",
                variant === "primary" && "bg-white text-zinc-900 hover:bg-zinc-200",
                variant === "secondary" && "border border-zinc-700 hover:bg-zinc-800",
                className
            )}
            {...props}
        />
    );
}
