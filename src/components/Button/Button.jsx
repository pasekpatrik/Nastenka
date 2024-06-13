import { memo } from 'react'

import './Button.css'

const Button = memo(function Button({ children, onClick, className, active }) {
    return (
        <>
            <button onClick={onClick} className={active ? `btn active-btn ${className}` : `btn ${className}`}>{children}</button>
        </>
    )
})

export default Button

