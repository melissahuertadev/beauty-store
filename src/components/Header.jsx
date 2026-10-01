import Icon from './Icon';

const views = [['client', 'Reservar', 'calendar'], ['artist', 'Artista', 'user'], ['admin', 'Administración', 'settings']];

export default function Header({ view, onViewChange }) {
  return (
    <header className="site-header">
      <div className="brand"><span>H</span><div>HARU <small>BEAUTY STUDIO</small></div></div>
      <nav aria-label="Navegación principal">
        {views.map(([id, label, icon]) => (
          <button type="button" className={view === id ? 'active' : ''} aria-current={view === id ? 'page' : undefined} onClick={() => onViewChange(id)} key={id}><Icon name={icon} size={17} /><span>{label}</span></button>
        ))}
      </nav>
    </header>
  );
}
