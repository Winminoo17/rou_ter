import { Link } from 'react-router-dom'
import { useContext } from 'react'
import DataContext from './context/DataContext'

const Nav = () => {
    const { search, setSearch } = useContext(DataContext)

    return (
        <nav className="nav">
            <form className="searchFrom" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search</label>
                <input
                    type="text"
                    id="search"
                    role="searchbox"
                    placeholder='Search Items'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/newpost">NewPost</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </form>
        </nav>
    )
}

export default Nav