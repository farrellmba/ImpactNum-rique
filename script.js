/* =========================================================
   ImpactNumérique.ca — script.js
   1. FR/EN toggle  2. Mobile nav  3. Law 25 consent + Consent Mode
   4. ROI calculator  5. Forms  6. Reveal + KPI count-up
   ========================================================= */
(() => {
  'use strict';
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const store = {
    get(k){ try { return localStorage.getItem(k); } catch { return null; } },
    set(k,v){ try { localStorage.setItem(k,v); } catch {} }
  };

  /* ---------- 1. i18n (French lives in the HTML, English here) ---------- */
  const EN = {
    skip:'Skip to content',
    'nav.services':'Services','nav.method':'Method','nav.quebec':'Why local','nav.calc':'Calculator','nav.faq':'FAQ','nav.cta':'Free audit',
    'hero.eyebrow':'Advertising management · Montreal, Quebec',
    'hero.title':'Clicks that become customers, not just traffic.',
    'hero.lead':'We run your Google Ads and social campaigns, set up reliable tracking, and show you every month what each dollar returns.',
    'hero.cta1':'Get my free audit','hero.cta2':'Estimate my return',
    'hero.t1':'No long-term contract','hero.t2':'Your Google Ads account belongs to you','hero.t3':'Service in French and English',
    'hc.title':'Dashboard preview','hc.live':'Live','hc.k1':'Calls','hc.k2':'Forms','hc.k3':'Cost / lead ($)','hc.note':'Sample data, for illustration.',
    'band.1':'Measure.','band.2':'Refine.','band.3':'Improve.',
    'svc.eyebrow':'Our services','svc.title':'Six services, one goal: more profitable customers.','svc.cta':'Discuss this service →',
    's1.t':'Google Ads','s1.d':'Search, Display and Performance Max campaigns designed to attract customers who are ready to buy.',
    's1.l1':'Keyword research and negatives','s1.l2':'Call ads and extensions','s1.l3':'Precise geographic targeting',
    's2.t':'Social Media Advertising','s2.d':'Targeted ads on Meta and other social platforms to reach your ideal customers.',
    's2.l1':'Facebook and Instagram','s2.l2':'Lookalike audiences and remarketing','s2.l3':'Creatives tested continuously',
    's3.t':'SEO & Local Visibility','s3.d':'Google Business Profile optimization, local SEO and optimized content to help your business stand out in your market.',
    's3.l1':'Google Business Profile','s3.l2':'Neighbourhood and service pages','s3.l3':'Customer reviews and local citations',
    's4.t':'Web Presence','s4.d':'Fast, clear, conversion-focused landing pages and websites designed to turn visitors into customers.',
    's4.l1':'Loads in under 2 seconds','s4.l2':'Bilingual FR/EN','s4.l3':'Mobile-first design',
    's5.t':'Analytics & Reporting','s5.d':'Conversion tracking and clear monthly reports so you know where your customers come from and what every dollar you invest delivers.',
    's5.l1':'Calls, forms and chat','s5.l2':'GA4 and Tag Manager','s5.l3':'Law 25 compliant',
    's6.t':'Dashboard & Feedback','s6.d':'An always-accessible dashboard and a direct feedback channel to keep you informed about your campaigns, with your input guiding our next optimizations.',
    's6.l1':'Live report (Looker Studio)','s6.l2':'Direct feedback channel','s6.l3':'30-minute monthly review',
    'm.eyebrow':'Our method','m.title':'Measure. Refine. Improve.','m.sub':'Live reporting. Clear insights. Continuous optimization.',
    'm.1t':'Measure','m.1d':'Before spending a dollar, we set up call, form and sales tracking. Without reliable measurement, every optimization is a guess.',
    'm.2t':'Refine','m.2d':'Every week we cut the search terms that waste your budget and move spend toward what converts.',
    'm.3t':'Improve','m.3d':'Every month we test new ads and pages, then fold in your feedback: you know your customers better than we do.',
    'q.eyebrow':'Why a local partner','q.title':'Advertising in Quebec is not advertising anywhere else.',
    'q.1t':'French first','q.1d':'The Charter of the French Language expects a French presence. We build separate French campaigns and pages, not machine translations. People search "plombier urgence Montréal", not "emergency plumber".',
    'q.2t':'Law 25 and consent','q.2d':'Tracking without consent exposes your business. We install a consent banner tied to Google Consent Mode so you stay compliant while keeping useful data.',
    'q.3t':'A market with many faces','q.3d':'Montreal, the South Shore, Laval and Quebec City differ in cost per click and in habits. We segment by neighbourhood and language instead of one generic radius.',
    'q.4t':'The phone call is still king','q.4d':'For local services, most conversions happen by phone. We track calls, including their duration, not only clicks.',
    'c.eyebrow':'Calculator','c.title':'Estimate what your ads could return.','c.sub':'Conservative numbers beat promises. Change the values to match your reality.',
    'c.budget':'Monthly ad budget ($)','c.cpc':'Average cost per click ($)','c.cr':'Website conversion rate (%)','c.close':'Leads that become customers (%)','c.value':'Average customer value ($)',
    'c.o1':'Clicks','c.o2':'Leads','c.o3':'Cost per lead','c.o4':'New customers','c.o5':'Estimated revenue','c.o6':'Return on ad spend (ROAS)',
    'c.fine':'Estimate for guidance only, not a guarantee of results. Actual results depend on your industry, competition and offer.',
    'd.eyebrow':'Full transparency','d.title':'Your dashboard, available anytime.',
    'd.lead':'Every client gets a live report. No more late PDFs: see calls, forms and cost per lead whenever you want.',
    'd.fbt':'An idea for our next optimizations?','d.fbl':'Your comment','d.fbph':'E.g.: evening calls are better quality.','d.fbb':'Send',
    'f.title':'Frequently asked questions',
    'f.1q':'What ad budget should I plan for?','f.1a':'For a local service in Montreal, plan at least $1,000 to $1,500 a month in ad spend to gather enough data. Our management fee is separate: ads are paid directly to Google with your card.',
    'f.2q':'Do I own the Google Ads account?','f.2a':'Yes. The account is opened in your name and we have manager access. If you leave, you keep the history, data and audiences.',
    'f.3q':'How soon will I see results?','f.3a':'First calls often arrive in the first week. Allow 6 to 8 weeks for optimization to stabilize. Anyone promising guaranteed results in 7 days is not being honest.',
    'f.4q':'Do you run ads in both French and English?','f.4a':'Yes, with separate campaigns per language, human-written ads and adapted landing pages.',
    'f.5q':'Is there a long-term contract?','f.5a':'No. Our agreements are month-to-month with 30 days notice. We would rather keep you through results.',
    'ct.eyebrow':"Let's talk",'ct.title':'Get your free 20-minute audit.',
    'ct.lead':'We review your account (or your market) and tell you honestly where you are losing money, even if you never work with us.',
    'ct.tel':'Phone','ct.mail':'Email','ct.zone':'Service area','ct.zoneV':'Greater Montreal, Laval, South Shore, North Shore','ct.hours':'Hours','ct.hoursV':'Mon–Fri, 9 am to 5 pm (ET)','ct.book':'Book a call',
    'ct.name':'Name','ct.email':'Email','ct.phone':'Phone','ct.company':'Business and website','ct.service':'Service you are interested in','ct.budget':'Approximate monthly ad budget','ct.msg':'Message','ct.send':'Send my request',
    'ct.priv':'By submitting this form you agree that we may use your information to reply to you. See our privacy policy.',
    'ft.tag':'Measure. Refine. Improve.','ft.legal':'Legal','ft.priv':'Privacy policy','ft.cookies':'Manage cookies',
    'ft.rpo':'NEQ: 0000000000 · Privacy officer: impactnumeriquebajef@gmail.com','ft.rights':'All rights reserved.',
    'cc.t':'Your data, your choice','cc.d':'We use analytics and advertising cookies to measure how well our campaigns work. They stay off until you give your consent.','cc.a':'Accept all','cc.r':'Reject all',
    msg:{sent:'Thank you! We will reply within one business day.',err:'Something went wrong. Please call us or email directly.',invalid:'Please fill in your name and a valid email.',fb:'Thank you, your feedback has been noted.',fbEmpty:'Please write a comment first.'}
  };
  const FR_MSG = {sent:'Merci! Nous vous répondons d\'ici un jour ouvrable.',err:'Une erreur est survenue. Veuillez nous appeler ou écrire directement.',invalid:'Veuillez indiquer votre nom et un courriel valide.',fb:'Merci, votre commentaire a bien été noté.',fbEmpty:'Veuillez d\'abord écrire un commentaire.'};

  let lang = 'fr';
  const cache = new WeakMap(); // original FR text per element
  function applyLang(l){
    lang = l;
    document.documentElement.lang = l === 'fr' ? 'fr-CA' : 'en-CA';
    $$('[data-i18n]').forEach(el => {
      if (!cache.has(el)) cache.set(el, el.textContent);
      const k = el.dataset.i18n;
      el.textContent = l === 'fr' ? cache.get(el) : (EN[k] ?? cache.get(el));
    });
    $$('[data-i18n-ph]').forEach(el => {
      if (!cache.has(el)) cache.set(el, el.placeholder);
      el.placeholder = l === 'fr' ? cache.get(el) : (EN[el.dataset.i18nPh] ?? cache.get(el));
    });
    $('#langBtn').textContent = l === 'fr' ? 'EN' : 'FR';
    document.title = l === 'fr'
      ? 'Gestion Google Ads à Montréal | ImpactNumérique.ca'
      : 'Google Ads Management in Montreal | ImpactNumérique.ca';
    store.set('lang', l);
    calc(); // refresh number formats
  }
  const T = k => (lang === 'fr' ? FR_MSG : EN.msg)[k];
  $('#langBtn').addEventListener('click', () => applyLang(lang === 'fr' ? 'en' : 'fr'));

  /* ---------- 2. Mobile nav ---------- */
  const burger = $('#burger'), nav = $('#nav');
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  $$('#nav a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false');
  }));

  /* ---------- 3. Consent (Loi 25 + Google Consent Mode v2) ---------- */
  const banner = $('#consent');
  function setConsent(granted){
    const v = granted ? 'granted' : 'denied';
    gtag('consent', 'update', {
      ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v
    });
    store.set('consent', granted ? 'granted' : 'denied');
    banner.hidden = true;
  }
  const saved = store.get('consent');
  if (saved) {
    const v = saved;
    gtag('consent', 'update', { ad_storage:v, ad_user_data:v, ad_personalization:v, analytics_storage:v });
  } else { banner.hidden = false; }
  $('#ccAccept').addEventListener('click', () => setConsent(true));
  $('#ccReject').addEventListener('click', () => setConsent(false));
  $('#consentReopen').addEventListener('click', () => { banner.hidden = false; $('#ccAccept').focus(); });

  /* ---------- 4. ROI calculator ---------- */
  const num = id => Math.max(0, parseFloat($(id).value) || 0);
  const money = n => new Intl.NumberFormat(lang === 'fr' ? 'fr-CA' : 'en-CA',
    { style:'currency', currency:'CAD', maximumFractionDigits:0 }).format(n);
  const int = n => new Intl.NumberFormat(lang === 'fr' ? 'fr-CA' : 'en-CA', { maximumFractionDigits:0 }).format(n);
  function calc(){
    const budget = num('#cBudget'), cpc = num('#cCpc') || 0.01;
    const cr = num('#cCr')/100, close = num('#cClose')/100, val = num('#cValue');
    const clicks = budget / cpc, leads = clicks * cr, cust = leads * close, rev = cust * val;
    const cpl = leads ? budget / leads : 0, roas = budget ? rev / budget : 0;
    $('#oClicks').textContent = int(clicks);
    $('#oLeads').textContent  = int(leads);
    $('#oCpl').textContent    = leads ? money(cpl) : '—';
    $('#oCust').textContent   = (Math.round(cust * 10) / 10).toLocaleString(lang === 'fr' ? 'fr-CA' : 'en-CA');
    $('#oRev').textContent    = money(rev);
    $('#oRoas').textContent   = roas.toFixed(1) + '×';
  }
  $$('#calc input').forEach(i => i.addEventListener('input', calc));

  /* ---------- 5. Forms ---------- */
  // Preselect service from the card CTA
  $$('a[data-service]').forEach(a => a.addEventListener('click', () => { $('#service').value = a.dataset.service; }));

  const validEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const form = $('#contactForm'), fs = $('#formStatus');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const d = new FormData(form);
    if (!d.get('name').trim() || !validEmail(d.get('email').trim())) {
      fs.textContent = T('invalid'); fs.className = 'status err'; return;
    }
    if (d.get('_gotcha')) return; // honeypot
    fs.textContent = '…'; fs.className = 'status';
    try {
      const r = await fetch(form.action, { method:'POST', body:d, headers:{ Accept:'application/json' } });
      if (!r.ok) throw new Error(r.status);
      fs.textContent = T('sent'); fs.className = 'status ok'; form.reset();
      gtag('event', 'generate_lead', { method: 'contact_form' }); // only fires if consent granted
    } catch {
      fs.textContent = T('err'); fs.className = 'status err';
    }
  });

  // Feedback form: sends to the same endpoint, flagged as feedback
  const fb = $('#fbForm'), fbs = $('#fbStatus');
  fb.addEventListener('submit', async e => {
    e.preventDefault();
    const text = $('#fbText').value.trim();
    if (!text) { fbs.textContent = T('fbEmpty'); fbs.className = 'status err'; return; }
    const d = new FormData(); d.set('type', 'client-feedback'); d.set('feedback', text);
    try {
      const r = await fetch(form.action, { method:'POST', body:d, headers:{ Accept:'application/json' } });
      if (!r.ok) throw new Error(r.status);
      fbs.textContent = T('fb'); fbs.className = 'status ok'; fb.reset();
    } catch { fbs.textContent = T('err'); fbs.className = 'status err'; }
  });

  /* ---------- 6. Reveal on scroll + KPI count-up ---------- */
  $$('.card, .steps li, .note-card, details').forEach(el => el.classList.add('reveal'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(x => {
      if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); }
    }), { threshold: .12 });
    $$('.reveal').forEach(el => io.observe(el));
  } else { $$('.reveal').forEach(el => el.classList.add('in')); }

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function countUp(el, to, ms = 1200){
    if (reduce) { el.textContent = to; return; }
    const t0 = performance.now();
    const step = t => {
      const p = Math.min(1, (t - t0) / ms);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  countUp($('#k1'), 142); countUp($('#k2'), 58); countUp($('#k3'), 27);

  /* ---------- init ---------- */
  $('#yr').textContent = new Date().getFullYear();
  // French is the default in Quebec; only switch if the visitor chose English before.
  applyLang(store.get('lang') === 'en' ? 'en' : 'fr');
})();
