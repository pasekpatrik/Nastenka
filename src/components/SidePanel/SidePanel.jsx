import './SidePanel.css'

const SidePanel = ({ children, className }) => {
    return (
        <>
            <div id='side-panel' className={className}>
                {children}
            </div>
        </>
    )
}

export default SidePanel