import Progress from '../components/Progress';
import ServiceOption from '../components/ServiceOption';
import { extras, timeSlots } from '../data/booking';
import length1Image from '../largo1.jpg';
import length2Image from '../largo2.jpg';
import length3Image from '../largo3.jpg';
import length4Image from '../largo4.jpg';
import length5Image from '../largo5.jpg';
import nailShapesImage from '../puntas1.png';

const lengthOptions = [
  { label: 'Largo 1', image: length1Image },
  { label: 'Largo 2', image: length2Image },
  { label: 'Largo 3', image: length3Image },
  { label: 'Largo 4', image: length4Image },
  { label: 'Largo 5', image: length5Image },
];

export default function ClientWizard(p) {
  const pedicureIds = ['pedi', 'spa'];
  const manicureServices = p.services.filter((service) => !pedicureIds.includes(service.id));
  const pedicureServices = p.services.filter((service) => pedicureIds.includes(service.id));
  const changeCategory = (category) => {
    p.update('category', category);
    if (category === 'Pedicura' && !pedicureIds.includes(p.form.service)) p.update('service', p.form.pedicureService || 'pedi');
    if (category === 'Manicura' && pedicureIds.includes(p.form.service)) p.update('service', 'gel');
  };
  const selectService = (service) => {
    if (pedicureIds.includes(service.id)) {
      p.update('pedicureService', service.id);
      if (p.form.category === 'Pedicura') p.update('service', service.id);
    } else p.update('service', service.id);
  };
  const soloServices = p.form.category === 'Pedicura' ? pedicureServices : manicureServices;
  const content = [
    <section className="fields" key="personal"><h1>Empecemos por conocerte ✨</h1><p>Usaremos estos datos para confirmar tu cita.</p><label>Nombres y apellidos completos *<input value={p.form.name} onChange={(e) => p.update('name', e.target.value)} placeholder="Ej. Valentina Ruiz" /></label><div className="two"><label>DNI o C.E. *<input value={p.form.dni} onChange={(e) => p.update('dni', e.target.value)} /></label><label>Número de celular *<input value={p.form.phone} onChange={(e) => p.update('phone', e.target.value)} placeholder="999 999 999" /></label></div><label>¿Cómo nos conociste? *<select value={p.form.source} onChange={(e) => p.update('source', e.target.value)}>{['TikTok', 'Instagram', 'Facebook', 'Recomendación'].map((item) => <option key={item}>{item}</option>)}</select></label></section>,
    <section className="fields" key="health">
      <h1>Cuidemos tus uñas</h1>
      <p>Esta información ayuda a recomendarte el sistema adecuado.</p>
      <label>¿Tienes algún sistema actualmente? *
        <select value={p.form.currentSystem} onChange={(e) => p.update('currentSystem', e.target.value)}>{['Gel color semipermanente', 'Soft gel', 'Rubber', 'Polygel', 'Acrílica', 'Builder', 'Esmalte tradicional', 'Ningún sistema'].map((item) => <option key={item}>{item}</option>)}</select>
      </label>
      {p.form.currentSystem !== 'Ningún sistema' && (
        <label>¿Hace cuántos días lo realizaste?
          <input type="number" value={p.form.days} onChange={(e) => p.update('days', e.target.value)} placeholder="Ej. 21" />
        </label>
      )}
      <label>¿Crees que tus uñas naturales están maltratadas por morderlas, retiro indebido del sistema de otro salón, etc? *
        <select value={p.form.condition} onChange={(e) => p.update('condition', e.target.value)}>{['No', 'Sí, por morderlas', 'Sí, por retiro indebido de otro salón', 'Mis uñas naturales son débiles'].map((item) => <option key={item}>{item}</option>)}</select>
      </label>
      <label> ¿Sueles tener sensibilidad cuando te realizas algún sistema? *
        <div className="segmented">{['Sí', 'No'].map((item) => <button type="button" className={p.form.sensitive === item ? 'selected' : ''} onClick={() => p.update('sensitive', item)} key={item}>{item}</button>)}
        </div>
      </label>
    </section>,
    <section className="fields" key="service">
      <h1>Tu momento Haru</h1>
      <p>Selecciona el servicio y el sistema que deseas.</p>
      <div className="segmented">{['Manicura', 'Pedicura', 'Manicura y pedicura'].map((item) => <button type="button" className={p.form.category === item ? 'selected' : ''} onClick={() => changeCategory(item)} key={item}>{item}</button>)}
      </div>
      {p.form.category === 'Manicura y pedicura' ? <div className="combined-services">
        <section className="service-group"><h3>Manicura</h3><div className="service-grid">{manicureServices.map((service) => <ServiceOption key={service.id} service={service} selected={p.form.service === service.id} onSelect={() => selectService(service)} />)}</div></section>
        <div className="service-separator" aria-hidden="true"><span>y</span></div>
        <section className="service-group"><h3>Pedicura</h3><div className="service-grid">{pedicureServices.map((service) => <ServiceOption key={service.id} service={service} selected={p.form.pedicureService === service.id} onSelect={() => selectService(service)} />)}</div></section>
      </div> : <div className="service-grid">{soloServices.map((service) => <ServiceOption key={service.id} service={service} selected={p.form.service === service.id} onSelect={() => selectService(service)} />)}</div>}
      <h3>Extras</h3>{extras.map((extra) => <label className="check" key={extra.id}><input type="checkbox" checked={p.form.extras.includes(extra.id)} onChange={() => p.toggleExtra(extra.id)} /> {extra.name}<b>+ S/{extra.price}</b></label>)}
    </section>,
    <section className="fields" key="design"><h1>El diseño que imaginas</h1><p>Sube una referencia; así podremos cotizar mejor tu cita.</p><label className="upload">＋ <strong>Subir foto de tus uñas actuales</strong><small>JPG o PNG, máximo 10 MB</small><input type="file" accept="image/*" /></label><label className="upload">＋ <strong>Subir foto de diseño de referencia</strong><small>JPG o PNG, máximo 10 MB</small><input type="file" accept="image/*" /></label><h3>¿Qué largo deseas?</h3><div className="length-options">{lengthOptions.map(({ label, image }) => <button type="button" className={`length-option${p.form.length === label ? ' selected' : ''}`} aria-pressed={p.form.length === label} onClick={() => p.update('length', label)} key={label}><img src={image} alt={`Ejemplo de ${label.toLowerCase()}`} /><span>{label}</span></button>)}</div><h3>Tipo de punta</h3><img className="nail-shapes-image" src={nailShapesImage} alt="Tipos de punta: coffin, cuadrada, almendra, stiletto y redonda" /><div className="segmented">{['Almendra', 'Coffin', 'Cuadrada', 'Stiletto', 'Redonda'].map((item) => <button type="button" className={p.form.shape === item ? 'selected' : ''} onClick={() => p.update('shape', item)} key={item}>{item}</button>)}</div></section>,
    <section className="fields" key="booking"><h1>Agenda tu cita</h1><p>Atendemos de lunes a sábado, de 11 AM a 8 PM.</p><div className="two"><label>Fecha que deseas *<input type="date" value={p.form.date} onChange={(e) => p.update('date', e.target.value)} /></label><label>Hora *<select value={p.form.time} onChange={(e) => p.update('time', e.target.value)}><option value="">Selecciona</option>{timeSlots.map((time) => <option key={time}>{time}</option>)}</select></label></div><label>Notas para tu cita<textarea value={p.form.notes} onChange={(e) => p.update('notes', e.target.value)} placeholder="Cuéntanos algo que debamos saber…" /></label><aside className="estimate"><span>Cotización estimada</span><strong>S/{p.total}</strong><small>La confirmación final depende del diagnóstico y diseño.</small></aside><p className="fine">Luego de confirmar disponibilidad tendrás 5 minutos para abonar S/30 por Yape o transferencia.</p></section>,
  ][p.step];

  if (p.submitted) return <main className="success"><div className="success-mark">✓</div><h1>¡Solicitud recibida!</h1><p>Revisaremos la disponibilidad y te escribiremos por WhatsApp para confirmar tu cita y cotización.</p><button type="button" onClick={() => { p.setSubmitted(false); p.setStep(0); }}>Hacer otra reserva</button></main>;
  return <main className="wizard"><Progress currentStep={p.step} /><Progress currentStep={p.step} compact /><div className="card">{content}<footer><button type="button" className="ghost" disabled={p.step === 0} onClick={() => p.setStep((step) => step - 1)}>Atrás</button>{p.step === 4 ? <button type="button" onClick={p.submit}>Enviar solicitud</button> : <button type="button" onClick={() => p.setStep((step) => step + 1)}>Continuar</button>}</footer></div><div className="booking-summary"><span>Tu selección</span><b>{p.selectedServices.map((service) => service.name).join(' + ')}</b><strong>S/{p.total}</strong></div></main>;
}
