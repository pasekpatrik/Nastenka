import PropTypes from 'prop-types'

import './Content.css'

const Content = ({ teacher, room, group }) => {
    return (
        <div id='content'>
            {teacher && <span>Učitel: <strong>{teacher}</strong></span>}
            {room && <span>Místnost: <strong>{room}</strong></span>}
            {group && <span>Skupina: <strong>{group}</strong></span>}
        </div>
    )
}

Content.propTypes = {
    teacher: PropTypes.string,
    room: PropTypes.string,
    group: PropTypes.string
}

export default Content