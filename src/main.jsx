import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ArrowUpRight, ArrowRight, Droplets, Sprout, Bug, Wrench, ShieldCheck, Check, Menu, X, MessageCircle, ChevronDown, MoveUpRight, Clock3, MapPin, Plus, Minus} from 'lucide-react';
import './style.css';
import './service-layout.css';

const phone = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '');
const area = import.meta.env.VITE_SERVICE_AREA;
const displayPhone = phone.length === 12 ? `${phone.slice(-10, -7)} ${phone.slice(-7, -4)} ${phone.slice(-4)}` : phone;
const services = [
  {
    name: 'Destape de drenajes', tag: 'DRENAJES Y TUBERÍAS', icon: Droplets,
    image: '/images/drenaje.jpg', alt: 'Trabajador destapando un registro de drenaje con una máquina de cable',
    text: 'Destape de drenajes, tuberías y registros tapados en tu casa o negocio.',
    details: ['Destape de drenajes y desagües', 'Destape de tuberías', 'Limpieza de registros']
  },
  {
    name: 'Fumigación', tag: 'CONTROL DE PLAGAS', icon: Bug,
    image: '/images/fumigacion.jpg', alt: 'Técnico con equipo de protección aplicando un tratamiento de control de plagas',
    text: 'Control de cucarachas, hormigas y otras plagas en casas y negocios.',
    details: ['Control de plagas', 'Fumigación de casas y negocios', 'Recomendaciones para prevenir plagas']
  },
  {
    name: 'Jardinería', tag: 'CUIDADO DE JARDINES', icon: Sprout,
    image: '/images/jardineria.jpg', alt: 'Jardinero podando un seto en un jardín residencial',
    text: 'Corte de pasto, poda y mantenimiento para cuidar tu jardín.',
    details: ['Corte de pasto', 'Poda de plantas y setos', 'Limpieza y mantenimiento de jardines']
  },
  {
    name: 'Plomería', tag: 'FUGAS E INSTALACIONES', icon: Wrench,
    image: '/images/plomeria.jpg', alt: 'Plomero reparando una conexión de tubería debajo de un fregadero',
    text: 'Reparación de fugas e instalación de llaves, lavabos y sanitarios.',
    details: ['Reparación de fugas', 'Instalación de llaves, lavabos y sanitarios', 'Reparación de tuberías de agua']
  }
];

function Brand({light = false}) {
  return <a href="#inicio" className={`brand ${light ? 'light' : ''}`} aria-label="Servinex inicio">
    <svg viewBox="0 0 80 52" aria-hidden="true"><path d="M49 5H23L4 25l33 6-13 14H1l-1 6h31l24-26-33-6 7-7h20z" fill="currentColor"/><path d="M45 24l25 27h10L53 20z" fill="currentColor"/><path d="M56 5h21L62 20H43z" fill="#ff792b"/></svg>
    <span>Servinex<span className="brand-sub">SERVICIOS EN QUERÉTARO</span></span>
  </a>;
}

function Tilt({children, className = ''}) {
  const ref = useRef();
  return <div ref={ref} className={`tilt ${className}`} onPointerMove={e => {
    if (e.pointerType === 'touch' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    ref.current.style.setProperty('--rx', `${-(e.clientY-r.top-r.height/2)/45}deg`);
    ref.current.style.setProperty('--ry', `${(e.clientX-r.left-r.width/2)/45}deg`);
  }} onPointerLeave={() => {
    ref.current.style.setProperty('--rx', '0deg');
    ref.current.style.setProperty('--ry', '0deg');
  }}>{children}</div>;
}

function App() {
  const [menu, setMenu] = useState(false);
  const [service, setService] = useState('');
  const [open, setOpen] = useState(null);
  const [status, setStatus] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    }), {threshold: .08});
    document.querySelectorAll('.reveal').forEach(e => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  function request(name = '') {
    setService(name); setSent(false); setStatus(''); setMenu(false);
    document.getElementById('contacto').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  }

  function submit(e) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const message = `Hola, Servinex. Soy ${d.get('nombre')}. Quiero cotizar: ${service}. Mi zona es ${d.get('zona')}. Detalles: ${d.get('mensaje')}. Mi teléfono: ${d.get('telefono')}.`;
    if (phone) {
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
      setSent(true);
      setStatus('Envía el mensaje en WhatsApp para solicitar tu cotización. La cita se confirma con Servinex.');
    } else {
      setSent(true);
      setStatus('El número de WhatsApp aún no está disponible. Tu solicitud no se ha enviado.');
      navigator.clipboard?.writeText(message).then(() => setStatus('Solicitud copiada. El número de WhatsApp está pendiente; tu solicitud no se ha enviado.')).catch(() => setStatus(message));
    }
  }

  const faqs = [
    ['¿Quién realiza el trabajo?', 'Un proveedor contratado por Servinex realiza el servicio. Nosotros coordinamos tu solicitud y tu cita, y somos tu contacto para cualquier duda.'],
    ['¿A quién le pago?', 'El pago se hace a Servinex. Te compartimos la cotización y los datos de pago directamente al confirmar tu servicio.'],
    ['¿Cómo solicito una cotización?', 'Dinos qué servicio necesitas, en qué zona de Querétaro estás y qué trabajo se requiere. Con esos datos revisamos el caso con el proveedor y te compartimos una cotización.'],
    ['¿Qué zonas atienden?', 'Atendemos en todo Querétaro. Al solicitar el servicio, confirmamos la disponibilidad del proveedor para tu zona y el horario de la visita.']
  ];

  return <>
    <header><div className="nav-wrap">
      <Brand/>
      <nav className={menu ? 'nav open' : 'nav'} aria-label="Principal">
        {[['inicio', 'Inicio'], ['servicios', 'Servicios'], ['nosotros', 'Por qué Servinex'], ['proceso', 'Cómo funciona']].map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{label}</a>)}
      </nav>
      <button className="button nav-cta" onClick={() => request()}>Pedir cotización <ArrowUpRight size={17}/></button>
      <button className="menu" aria-label={menu ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button>
    </div></header>

    <main>
      <section className="hero" id="inicio">
        <div className="hero-photo"/><div className="hero-shade"/>
        <div className="hero-inner">
          <div className="eyebrow light-label"><span/> SERVICIOS EN TODO QUERÉTARO</div>
          <h1>Servicios para<br/>tu <span>hogar</span><br/>y tu <span>negocio.</span></h1>
          <p>Destape de drenajes, fumigación, jardinería y plomería.<br/>Solicita tu servicio. Nosotros coordinamos al proveedor y tu cita.</p>
          <div className="hero-actions">
            <button className="button" onClick={() => request()}>Pedir cotización <ArrowUpRight size={20}/></button>
            <a className="text-link" href="#servicios">Ver servicios <ArrowRight size={18}/></a>
          </div>
          <div className="hero-assurance"><ShieldCheck size={18}/><span>Un solo contacto para cotizar y agendar.</span></div>
        </div>
        <Tilt className="hero-note"><span className="note-icon"><Wrench size={23}/></span><div><small>TU CONTACTO ES SERVINEX</small><strong>Nosotros coordinamos.</strong><span>El proveedor realiza el trabajo.</span></div><div className="note-dot"/></Tilt>
        <div className="hero-bottom"><span>PARA CASAS Y NEGOCIOS EN QUERÉTARO</span><a href="#servicios" aria-label="Ver servicios"><ChevronDown size={20}/></a><span>4 SERVICIOS · UN SOLO CONTACTO</span></div>
      </section>

      <div className="service-strip">{services.map((s, i) => <React.Fragment key={s.name}>{i > 0 && <i/>}<div><s.icon/> {s.name}</div></React.Fragment>)}</div>

      <section className="section services" id="servicios">
        <div className="section-heading reveal"><div><div className="eyebrow">NUESTROS SERVICIOS</div><h2>¿Qué servicio<br/><em>necesitas?</em></h2></div><p>Elige el servicio y cuéntanos qué necesitas. Te ayudamos a cotizar y a coordinar la visita del proveedor.</p></div>
        <div className="service-grid">{services.map((s, i) => <Tilt className="service-card reveal" key={s.name}>
          <button className="card-button" onClick={() => request(s.name)} aria-label={`Cotizar ${s.name.toLowerCase()}`}>
            <div className="card-image"><img src={s.image} alt={s.alt} loading="lazy"/><span className="card-number">0{i+1}</span><span className="card-icon"><s.icon size={23}/></span></div>
            <div className="card-content"><small>{s.tag}</small><h3>{s.name}<ArrowUpRight size={24}/></h3><p>{s.text}</p><div className="card-line"/><span className="card-link">Pedir cotización <ArrowRight size={16}/></span></div>
          </button>
        </Tilt>)}</div>
      </section>

      <section className="about" id="nosotros">
        <div className="about-visual"><img src="/images/plomeria.jpg" loading="lazy" alt="Trabajo de reparación de plomería bajo un fregadero"/><div className="image-label"><span/> SERVICIOS PARA CASAS Y NEGOCIOS</div><div className="visual-word">Servinex.</div></div>
        <div className="about-copy reveal">
          <div className="eyebrow">POR QUÉ SERVINEX</div><h2>Nosotros<br/><em>organizamos</em><br/>tu servicio.</h2>
          <p>En Servinex coordinamos servicios de destape de drenajes, fumigación, jardinería y plomería. Tú nos contactas y nosotros contratamos al proveedor que realiza el trabajo.</p>
          <div className="values">{[
            ['01', 'Hablas con Servinex', 'Nos dices qué necesitas y te compartimos la cotización.'],
            ['02', 'Coordinamos tu cita', 'Acordamos contigo la visita y confirmamos al proveedor.'],
            ['03', 'Pagas a Servinex', 'Nosotros gestionamos la contratación y el pago al proveedor.']
          ].map(([n, t, d]) => <div key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div><Check size={18}/></div>)}</div>
          <a className="text-link" href="#contacto">Solicita tu cotización <ArrowUpRight size={18}/></a>
        </div>
      </section>

      <section className="section process" id="proceso">
        <div className="section-heading reveal"><div><div className="eyebrow">CÓMO FUNCIONA</div><h2>Así contratas<br/><em>tu servicio.</em></h2></div><p>Desde la cotización hasta la visita,<br/>tu contacto es Servinex.</p></div>
        <div className="steps">{[
          ['Pide tu servicio', 'Escríbenos por WhatsApp con el trabajo que necesitas y tu ubicación.', MessageCircle],
          ['Recibe tu cotización', 'Revisamos tu solicitud con el proveedor y te compartimos el costo.', ShieldCheck],
          ['Confirma la cita y el pago', 'Acordamos contigo el horario y el pago a Servinex.', Clock3],
          ['Recibe al proveedor', 'El proveedor contratado acude a realizar el trabajo. Para dudas, contacta a Servinex.', Wrench]
        ].map(([t, d, Icon], i) => <div className="step reveal" key={t}><div className="step-top"><span>0{i+1}</span><Icon size={25}/></div><h3>{t}</h3><p>{d}</p></div>)}</div>
      </section>

      <section className="cta-band"><div className="reveal"><div className="eyebrow">ATENCIÓN EN TODO QUERÉTARO</div><h2>¿Necesitas<br/><em>un servicio?</em></h2></div><div className="cta-right"><p>Dinos qué necesitas y en dónde.<br/>Te ayudamos a cotizar y agendar.</p><button className="button" onClick={() => request()}>Pedir cotización <ArrowUpRight size={20}/></button></div></section>

      <section className="section contact" id="contacto">
        <div className="contact-copy reveal"><div className="eyebrow">CONTACTO</div><h2>Solicita tu<br/><em>cotización.</em></h2><p>Selecciona el servicio, dinos tu zona y describe el trabajo. Envía tu solicitud por WhatsApp para cotizar con Servinex.</p>
          <div className="contact-detail"><MessageCircle/><div><strong>{phone ? <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer">WhatsApp {displayPhone}</a> : 'Contacto por WhatsApp'}</strong><span>Habla directamente con Servinex.</span></div></div>
          <div className="contact-detail"><MapPin/><div><strong>{area || 'Consulta nuestra cobertura'}</strong><span>Confirmamos disponibilidad para tu zona.</span></div></div>
          <div className="faq"><h3>Preguntas frecuentes</h3>{faqs.map(([q, a], i) => <div className="faq-item" key={q}><button aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>{q}{open === i ? <Minus size={17}/> : <Plus size={17}/>}</button>{open === i && <p>{a}</p>}</div>)}</div>
        </div>
        <form className="request-form reveal" onSubmit={submit}>
          <div className="form-title"><span>¿Qué trabajo necesitas?</span><ArrowUpRight/></div>
          <label>Servicio<select required value={service} onChange={e => {setService(e.target.value);setSent(false)}}><option value="">Selecciona un servicio</option>{services.map(s => <option key={s.name}>{s.name}</option>)}</select></label>
          {service && <div className="service-summary"><strong>Trabajos que puedes solicitar:</strong>{services.find(s => s.name === service)?.details.map(d => <span key={d}><Check size={14}/>{d}</span>)}</div>}
          <div className="form-row"><label>Tu nombre<input name="nombre" placeholder="Nombre" autoComplete="name" maxLength={100} required/></label><label>Teléfono<input name="telefono" type="tel" placeholder="Número de contacto" autoComplete="tel" minLength={8} maxLength={20} required/></label></div>
          <label>Municipio y colonia<input name="zona" placeholder="¿En qué zona de Querétaro estás?" autoComplete="address-level3" maxLength={150} required/></label>
          <label>Describe el trabajo<textarea name="mensaje" placeholder="Por ejemplo: el drenaje de mi patio está tapado…" rows="3" maxLength={2000} required/></label>
          <button className="button submit" type="submit">{phone ? 'Cotizar por WhatsApp' : 'Preparar mi solicitud'}<MessageCircle size={19}/></button>
          <p className="privacy">Se abrirá WhatsApp con tu mensaje. Envíalo para solicitar la cotización; este formulario no confirma una cita.</p>
          {sent && <p className="form-status" role="status">{status}</p>}
        </form>
      </section>
    </main>

    <footer><div className="footer-top">
      <div><Brand light/><p>Destape de drenajes, fumigación,<br/>jardinería y plomería en Querétaro.<br/>Coordinamos tu servicio con proveedores.</p></div>
      <div><span>SERVICIOS</span>{services.map(s => <button key={s.name} onClick={() => request(s.name)}>{s.name}</button>)}</div>
      <div><span>EXPLORA</span><a href="#nosotros">Por qué Servinex</a><a href="#proceso">Cómo funciona</a><a href="#contacto">Contacto</a></div>
      <div className="footer-call"><span>¿QUÉ SERVICIO NECESITAS?</span><button onClick={() => request()}>Cotiza aquí.<MoveUpRight size={30}/></button></div>
    </div><div className="footer-bottom"><span>© {new Date().getFullYear()} Servinex. Todos los derechos reservados.</span><a href="#inicio">Volver arriba ↑</a></div></footer>
  </>;
}

createRoot(document.getElementById('root')).render(<App/>);
