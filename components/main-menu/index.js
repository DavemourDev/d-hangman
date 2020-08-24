import Link from 'next/link';

import PropTypes from 'prop-types';

const MenuOption = ({ link, title, description }) => {
    return (
        <Link href={ link } passHref>
            <a className="card">
                <h3>{ title }</h3>
                <p>{ description }</p>
            </a>
        </Link>
    );
}

const MainMenu = ({
    // props
    display,
    options
}) => {

    const renderMenuOption = ({link, title, description}, index) => (
        <MenuOption key={ index } link={ link } title={ title } description={ description }/>
    );

    return (
        <div className={ display }>
            { options.map(renderMenuOption) }
        </div>
    );
};

MainMenu.propTypes = {
    display: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        link: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
    })).isRequired
}

export default MainMenu;