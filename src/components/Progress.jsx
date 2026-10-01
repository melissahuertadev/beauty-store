import { bookingSteps } from '../data/booking';

export default function Progress({ currentStep, compact = false }) {
  if (compact) {
    return (
      <div className="mobile-progress" aria-label={`Paso ${currentStep + 1} de ${bookingSteps.length}`}>
        <span>PASO {String(currentStep + 1).padStart(2, '0')} <i>/ {String(bookingSteps.length).padStart(2, '0')}</i></span>
        <strong>{bookingSteps[currentStep]}</strong>
        <div className="mobile-progress-track" aria-hidden="true"><span style={{ width: `${((currentStep + 1) / bookingSteps.length) * 100}%` }} /></div>
      </div>
    );
  }
  return (
    <div className="progress" aria-label={`Paso ${currentStep + 1} de ${bookingSteps.length}`}>
      {bookingSteps.map((label, index) => (
        <div className={index <= currentStep ? 'done' : ''} key={label}><i>{index + 1}</i><span>{label}</span></div>
      ))}
    </div>
  );
}
