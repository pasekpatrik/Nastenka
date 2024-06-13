import { memo } from 'react'

import './SidePanel.css'

const SidePanel = memo(function SidePanel({ children, className, active }) {

    return (
        <>
            <div id='side-panel' className={active ? className : `${className} active-panel`}>
                {children}
            </div>
        </>
    )
})

export default SidePanel