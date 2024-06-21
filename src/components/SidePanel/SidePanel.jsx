import { memo } from 'react'
import Proptypes from 'prop-types'

import './SidePanel.css'

const SidePanel = memo(function SidePanel({ children, className, active }) {

    return (
        <div id='side-panel' className={active ? className : `${className} active-panel`}>
            {children}
        </div>
    )
})

SidePanel.propTypes = {
    children: Proptypes.node,
    className: Proptypes.string,
    active: Proptypes.bool
}

export default SidePanel