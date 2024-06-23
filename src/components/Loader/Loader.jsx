import { HashLoader } from 'react-spinners'


import PropTypes from 'prop-types'

import './Loader.css'

const Loader = ({ loader }) => {
    return (
        <>
            <div className={loader ? 'container-loader' : 'container-loader hide'}>
                <HashLoader
                    size={100}
                    color='#2a81ba'
                />
            </div>
        </>
    )
}

Loader.propTypes = {
    loader: PropTypes.bool
}

export default Loader