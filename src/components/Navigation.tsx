import { NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import './Navigation.css';

const Navigation = () => {
    const { t } = useLanguage();

    return (
        <nav className="bottom-navigation">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                <span className="nav-icon">🏠</span>
                <span className="nav-label">{t('nav.home')}</span>
            </NavLink>

            <NavLink to="/map" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                <span className="nav-icon">🗺️</span>
                <span className="nav-label">{t('nav.map')}</span>
            </NavLink>

            <NavLink to="/quests" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                <span className="nav-icon">🎯</span>
                <span className="nav-label">{t('nav.quests')}</span>
            </NavLink>

            <NavLink to="/rewards" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                <span className="nav-icon">🎁</span>
                <span className="nav-label">{t('nav.rewards')}</span>
            </NavLink>

            <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                <span className="nav-icon">👤</span>
                <span className="nav-label">{t('nav.profile')}</span>
            </NavLink>
        </nav>
    );
};

export default Navigation;
