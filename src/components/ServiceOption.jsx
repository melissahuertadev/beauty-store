export default function ServiceOption({ service, selected, onSelect }) {
  return (
    <button type="button" className={`service${selected ? ' selected' : ''}`} aria-pressed={selected} onClick={onSelect}>
      <strong>{service.name}</strong><span>Desde S/{service.price} · {service.duration} min</span>
    </button>
  );
}
