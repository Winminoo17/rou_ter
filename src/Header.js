import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa'
import useWindowsize from './hooks/useWindowsize'

const Header = ({ title }) => {
    const { width } = useWindowsize();
    return (
        <header>
            <h1>{title}</h1>
            {width < 768 && <FaMobileAlt />}
            {width >= 768 && width < 992 && <FaTabletAlt />}
            {width >= 992 && <FaLaptop />}
        </header>
    )
}

export default Header