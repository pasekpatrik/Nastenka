import PropTypes from 'prop-types'

import './Loader.css'

const Loader = ({ loader }) => {
    return (
        <div className={loader ? 'loader' : 'loader hide'}></div>
    )
}

Loader.propTypes = {
    loader: PropTypes.bool
}

export default Loader