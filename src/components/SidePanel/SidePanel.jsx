import './SidePanel.css'

const SidePanel = ({ children }) => {
    return (
        <>
            <div id='side-panel'>
                {children}
            </div>
        </>
    )
}

export default SidePanel