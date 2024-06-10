import { HashLoader } from 'react-spinners'

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

export default Loader