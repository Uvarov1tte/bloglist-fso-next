import React from "react"

interface InputProps {
    type: string
    name: string
    defaultValue?: any
    required?: boolean
    className?: string
}

const Input = ({ type, name, defaultValue, required, className }: InputProps) => {

    const styles = className ? `border rounded border-gray-500 p-2 ${className}` : "border rounded border-gray-500 p-2"

    if (defaultValue) {
        return (
            <>
                {
                    required ?
                        <input type={type} name={name} className={styles} defaultValue={defaultValue} required />
                        :
                        <input type={type} name={name} className={styles} defaultValue={defaultValue} />
                }
            </>
        )
    } else {
        return (
            <>
                {
                    required ?
                        <input type={type} name={name} className={styles} required />
                        :
                        <input type={type} name={name} className={styles} />
                }
            </>
        )
    }


}

export default Input