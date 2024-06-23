import { memo } from 'react'

import PropTypes from 'prop-types'

import './Button.css'

const Button = memo(function Button({ children, onClick, className, active }) {
    return (
        <>
            <button onClick={onClick} className={active ? `btn active-btn ${className}` : `btn ${className}`}>{children}</button>
        </>
    )
})

Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    className: PropTypes.string,
    active: PropTypes.bool
}

export default Button

