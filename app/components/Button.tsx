import React from "react"

interface ButtonProps {
    type: "submit" | "reset" | "button" | undefined,
    children: React.ReactNode
    className?: string
}

const Button = ({ type, children, className }: ButtonProps) => {
    const defaultStyle = "border rounded p-2 hover:text-gray-50 hover:bg-red-400 hover:border-red-400"
    const styles = className ? `${defaultStyle} ${className}` : defaultStyle

    return (
        <button
            type={type}
            className={styles}
        >
            {children}
        </button>
    )
}

export default Button