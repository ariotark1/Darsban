(() => {
  'use strict';

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const store = {
    get(key, fallback) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (_) { return fallback; } },
    set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {} }
  };

  const glyphs = {
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z"/><path d="M4 5.5v13A2.5 2.5 0 0 1 6.5 16H20M8 7h8M8 10h7"/>',
    search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    chat: '<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3h.5A8.48 8.48 0 0 1 21 11v.5Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>',
    arrow: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    back: '<path d="m15 18-6-6 6-6"/>',
    drop: '<path d="M12 2.5S5 11 5 15.5a7 7 0 1 0 14 0C19 11 12 2.5 12 2.5Z"/><path d="M9 16a3 3 0 0 0 3 3"/>',
    dna: '<path d="M7 3c0 4 10 4 10 9s-10 5-10 9"/><path d="M17 3c0 4-10 4-10 9s10 5 10 9"/><path d="M8 6h8M7 12h10M8 18h8"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8z"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
    bookmark: '<path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-4-6 4z"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
    filter: '<path d="M4 7h16M7 12h10M10 17h4"/><circle cx="7" cy="7" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="12" cy="17" r="1.5"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',
    graduation: '<path d="m2 10 10-5 10 5-10 5zM6 12v5c3.3 2.7 8.7 2.7 12 0v-5M22 10v6"/>',
    chart: '<path d="M3 3v18h18M8 15l4-4 4 3 5-7"/><path d="M18 7h3v3"/>',
    wifi: '<path d="M5 12.5a11 11 0 0 1 14 0M8.5 16a5.5 5.5 0 0 1 7 0M12 20h.01M2 9a16 16 0 0 1 20 0"/>',
    cloud: '<path d="M20 16.2A4.8 4.8 0 0 0 18 7h-1.2A7 7 0 1 0 5 18h13a4 4 0 0 0 2-1.8Z"/><path d="m8 13 4-4 4 4M12 9v8"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.6.9L16 21h-3l-.3-1.9a8 8 0 0 1-1.6-.9l-1.7.6L8 16.4l1.4-1.3a8 8 0 0 1 0-1.8L8 12l1.4-2.4 1.7.6a8 8 0 0 1 1.6-.9L13 7h3l.3 1.9a8 8 0 0 1 1.6.9l1.7-.6L21 11.6l-1.4 1.3a8 8 0 0 1-.2 2.1Z" transform="translate(-1 -2)"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3M12 14v3"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>',
    spark: '<path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
    flask: '<path d="M9 3h6M10 3v6l-5.5 9.1A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.9L14 9V3"/><path d="M8 15h8"/>',
    microscope: '<path d="m6 18 5-5M9 6l5 5M5 21h14M12 21a7 7 0 0 0 7-7h-2a5 5 0 0 1-5 5M7 4l4-2 4 5-4 3z"/>',
    bookOpen: '<path d="M2 4h6a4 4 0 0 1 4 4v13a4 4 0 0 0-4-4H2zM22 4h-6a4 4 0 0 0-4 4v13a4 4 0 0 1 4-4h6z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    close: '<path d="m18 6-12 12M6 6l12 12"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    question: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9a2.5 2.5 0 1 1 4.7 1.2c-.6 1-2.3 1.3-2.3 3M12 17h.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    flag: '<path d="M5 21V5m0 0c5-4 9 4 14 0v10c-5 4-9-4-14 0"/>',
    play: '<path d="m8 5 12 7-12 7z"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    calendarDays: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01"/>',
    message: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',
    bookmarkCheck: '<path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-4-6 4z"/><path d="m9 10 2 2 4-4"/>',
    smile: '<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z"/>',
    shieldCheck: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    refresh: '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.6 9a7 7 0 0 1 11.8-2L20 12M4 12l2.6 5a7 7 0 0 0 11.8-2"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    dots: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    checkList: '<path d="m4 6 2 2 4-4M4 15l2 2 4-4M13 6h7M13 15h7"/>',
    arrowUp: '<path d="m7 14 5-5 5 5"/>',
    route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h2a4 4 0 0 0 4-4v-4a4 4 0 0 1 4-4"/>'
  };
  const icon = (name, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${glyphs[name] || glyphs.spark}</svg>`;

  // Course titles and semester placement follow a publicly re-posted 1401-onward program.
  // The document does not identify a university, so it is not presented as BMSU's official chart.
  // The public demo uses a generic identity so the shared site never exposes a real student's name.
  const STUDENT_NAME = 'دانشجوی نمونه';
  const DEMO_CREDENTIALS = { username: 'darsban', password: 'darsban1402' };
  const curriculumSource = 'https://www.scribd.com/document/826899417/%DA%A9%D9%88%D8%B1%DB%8C%DA%A9%D9%88%D9%84%D9%88%D9%85-%D8%B9%D9%84%D9%88%D9%85-%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4%DA%AF%D8%A7%D9%87%DB%8C-1401';
  const curriculumTerms = [
    { term: 1, items: [
      ['general-chemistry', 'شیمی عمومی', 'علوم پایه', 'flask', 'gold'],
      ['general-chemistry-lab', 'آزمایشگاه شیمی عمومی', 'علوم پایه', 'flask', 'blue'],
      ['lab-intro', 'مقدمات آزمایشگاه', 'مهارت آزمایشگاهی', 'microscope', 'green'],
      ['anatomy', 'آناتومی', 'علوم پایه', 'bookOpen', 'blue'],
      ['histology', 'بافت‌شناسی', 'علوم پایه', 'layers', 'green'],
      ['histology-lab', 'آزمایشگاه بافت‌شناسی', 'علوم پایه', 'eye', 'gold'],
      ['computer', 'کامپیوتر', 'دروس عمومی', 'settings', 'blue'],
      ['islamic-thought-1', 'اندیشه اسلامی ۱ (مبدأ و معاد)', 'دروس عمومی', 'book', 'green'],
      ['applied-ethics', 'آیین زندگی (اخلاق کاربردی)', 'دروس عمومی', 'heart', 'coral'],
      ['persian-literature', 'ادبیات فارسی', 'دروس عمومی', 'bookOpen', 'gold'],
      ['pre-english', 'زبان پیش', 'دروس عمومی', 'file', 'blue'],
      ['physical-education-1', 'تربیت بدنی ۱', 'دروس عمومی', 'activity', 'coral']
    ]},
    { term: 2, items: [
      ['general-biochemistry', 'بیوشیمی عمومی', 'علوم پایه', 'flask', 'gold'],
      ['general-biochemistry-lab', 'آزمایشگاه بیوشیمی عمومی', 'علوم پایه', 'flask', 'blue'],
      ['cell-molecular-biology', 'زیست‌شناسی سلولی و مولکولی', 'علوم پایه', 'dna', 'green'],
      ['physiology', 'فیزیولوژی', 'علوم پایه', 'heart', 'coral'],
      ['physiology-lab', 'آزمایشگاه فیزیولوژی', 'علوم پایه', 'activity', 'blue'],
      ['biophysics', 'فیزیک حیاتی', 'علوم پایه', 'spark', 'gold'],
      ['general-psychology', 'روان‌شناسی عمومی', 'دروس عمومی', 'smile', 'coral'],
      ['islamic-thought-2', 'اندیشه اسلامی ۲ (نبوت و امامت)', 'دروس عمومی', 'book', 'green'],
      ['constitution', 'آشنایی با قانون اساسی جمهوری اسلامی ایران', 'دروس عمومی', 'file', 'blue'],
      ['general-english', 'زبان انگلیسی عمومی', 'دروس عمومی', 'file', 'gold']
    ]},
    { term: 3, items: [
      ['vital-statistics-research', 'آمار حیاتی و روش تحقیق', 'علوم پایه', 'chart', 'blue'],
      ['medical-biochemistry-1', 'بیوشیمی پزشکی ۱', 'دروس تخصصی', 'flask', 'gold'],
      ['medical-biochemistry-1-lab', 'آزمایشگاه بیوشیمی پزشکی ۱', 'دروس تخصصی', 'flask', 'blue'],
      ['general-microbiology', 'میکروب‌شناسی عمومی', 'دروس تخصصی', 'microscope', 'green'],
      ['general-microbiology-lab', 'آزمایشگاه میکروب‌شناسی عمومی', 'دروس تخصصی', 'microscope', 'blue'],
      ['internship-1', 'کارآموزی ۱', 'کارآموزی', 'graduation', 'gold'],
      ['medical-immunology-2', 'ایمنی‌شناسی پزشکی ۲', 'دروس تخصصی', 'shieldCheck', 'green'],
      ['medical-immunology-2-lab', 'آزمایشگاه ایمنی‌شناسی پزشکی ۲', 'دروس تخصصی', 'shieldCheck', 'blue'],
      ['medical-emergencies', 'فوریت‌های پزشکی', 'دروس تخصصی', 'heart', 'coral'],
      ['islamic-iranian-culture', 'فرهنگ و تمدن اسلام و ایران', 'دروس عمومی', 'book', 'gold'],
      ['physical-education-2', 'تربیت بدنی ۲', 'دروس عمومی', 'activity', 'coral']
    ]},
    { term: 4, items: [
      ['public-health-epidemiology', 'بهداشت عمومی و اپیدمیولوژی', 'علوم پایه', 'heart', 'green'],
      ['medical-bacteriology', 'باکتری‌شناسی پزشکی', 'دروس تخصصی', 'microscope', 'green'],
      ['medical-bacteriology-lab', 'آزمایشگاه باکتری‌شناسی پزشکی', 'دروس تخصصی', 'microscope', 'blue'],
      ['medical-immunology-1', 'ایمنی‌شناسی پزشکی ۱', 'دروس تخصصی', 'shieldCheck', 'green'],
      ['medical-immunology-1-lab', 'آزمایشگاه ایمنی‌شناسی پزشکی ۱', 'دروس تخصصی', 'shieldCheck', 'blue'],
      ['hematology-1', 'خون‌شناسی ۱', 'دروس تخصصی', 'drop', 'coral'],
      ['hematology-1-lab', 'آزمایشگاه خون‌شناسی ۱', 'دروس تخصصی', 'drop', 'gold'],
      ['medical-biochemistry-2', 'بیوشیمی پزشکی ۲', 'دروس تخصصی', 'flask', 'gold'],
      ['medical-biochemistry-2-lab', 'آزمایشگاه بیوشیمی پزشکی ۲', 'دروس تخصصی', 'flask', 'blue'],
      ['medical-language', 'متون انگلیسی و ترمینولوژی پزشکی', 'دروس تخصصی', 'file', 'blue']
    ]},
    { term: 5, items: [
      ['general-pathology', 'آسیب‌شناسی عمومی', 'دروس تخصصی', 'eye', 'coral'],
      ['general-pathology-lab', 'آزمایشگاه آسیب‌شناسی عمومی', 'دروس تخصصی', 'microscope', 'blue'],
      ['hematology-2', 'خون‌شناسی ۲', 'دروس تخصصی', 'drop', 'coral'],
      ['hematology-2-lab', 'آزمایشگاه خون‌شناسی ۲', 'دروس تخصصی', 'drop', 'gold'],
      ['mycology', 'قارچ‌شناسی پزشکی', 'دروس تخصصی', 'microscope', 'gold'],
      ['mycology-lab', 'آزمایشگاه قارچ‌شناسی پزشکی', 'دروس تخصصی', 'microscope', 'blue'],
      ['parasitology-1', 'انگل‌شناسی ۱ (کرم‌ها)', 'دروس تخصصی', 'eye', 'coral'],
      ['parasitology-1-lab', 'آزمایشگاه انگل‌شناسی ۱', 'دروس تخصصی', 'microscope', 'green'],
      ['quran-interpretation', 'تفسیر موضوعی قرآن', 'دروس عمومی', 'book', 'green'],
      ['family-population', 'دانش خانواده و جمعیت', 'دروس عمومی', 'users', 'gold']
    ]},
    { term: 6, items: [
      ['virology', 'ویروس‌شناسی پزشکی', 'دروس تخصصی', 'shieldCheck', 'gold'],
      ['pharmacology-toxicology', 'داروشناسی و سم‌شناسی', 'دروس تخصصی', 'flask', 'coral'],
      ['pharmacology-toxicology-lab', 'آزمایشگاه داروشناسی و سم‌شناسی', 'دروس تخصصی', 'flask', 'blue'],
      ['parasitology-2', 'انگل‌شناسی ۲ (تک‌یاخته و حشره)', 'دروس تخصصی', 'eye', 'coral'],
      ['parasitology-2-lab', 'آزمایشگاه انگل‌شناسی ۲', 'دروس تخصصی', 'microscope', 'green'],
      ['lab-equipment', 'اصول فنی و نگهداری تجهیزات آزمایشگاهی', 'مهارت آزمایشگاهی', 'settings', 'gold'],
      ['transfusion', 'ایمونوهماتولوژی و انتقال خون', 'دروس تخصصی', 'drop', 'coral'],
      ['transfusion-lab', 'آزمایشگاه ایمونوهماتولوژی و انتقال خون', 'دروس تخصصی', 'drop', 'blue'],
      ['lab-quality', 'تضمین کیفیت در آزمایشگاه', 'دروس تخصصی', 'checkList', 'green'],
      ['lab-safety', 'اصول ایمنی و حفاظت در آزمایشگاه', 'مهارت آزمایشگاهی', 'shieldCheck', 'green'],
      ['internal-diseases', 'آشنایی با بیماری‌های داخلی', 'دروس تخصصی', 'heart', 'coral'],
      ['genetics', 'ژنتیک پزشکی', 'دروس تخصصی', 'dna', 'gold']
    ]},
    { term: 7, items: [
      ['endocrinology', 'هورمون‌شناسی', 'دروس تخصصی', 'spark', 'coral'],
      ['lab-management-laws', 'اصول مدیریت و قوانین در آزمایشگاه', 'دروس تخصصی', 'settings', 'blue'],
      ['molecular-diagnostics', 'تکنیک‌های مولکولی و پیشرفته آزمایشگاهی', 'دروس تخصصی', 'dna', 'gold'],
      ['seminar', 'سمینار', 'دروس تخصصی', 'bookOpen', 'green'],
      ['internship-2', 'کارآموزی ۲', 'کارآموزی', 'graduation', 'blue'],
      ['history-of-islam', 'تاریخ تحلیلی صدر اسلام', 'دروس عمومی', 'book', 'gold']
    ]},
    { term: 8, items: [
      ['internship-field', 'کارآموزی در عرصه', 'کارآموزی', 'graduation', 'coral']
    ]}
  ];
  const courses = curriculumTerms.flatMap(({ term, items }) => items.map(([id, title, category, icon, tone]) => ({
    id, title, category, icon, tone, term, subtitle: `نیم‌سال ${term.toLocaleString('fa-IR')}`
  })));

  const resources = [
    { id: 'r1', course: 'anatomy', title: 'مرور اندام فوقانی', type: 'راهنمای مطالعه', kind: 'book', desc: 'قالب پیشنهادی برای مرور ساختار استخوان‌ها، عضلات و عصب‌های اندام فوقانی؛ فایل آموزشی در این پیش‌نمایش وجود ندارد.', status: 'طرح اولیه' },
    { id: 'r3', course: 'physiology', title: 'چرخهٔ قلبی و گردش خون', type: 'نقشهٔ مفهومی', kind: 'layers', desc: 'طرح یک نقشهٔ مفهومی برای پیوند مراحل چرخهٔ قلبی با گردش خون؛ محتوای علمی آن هنوز تدوین نشده است.', status: 'طرح اولیه' },
    { id: 'r4', course: 'general-biochemistry', title: 'مرور آنزیم‌ها', type: 'برنامهٔ مرور', kind: 'route', desc: 'قالب پیشنهادی برای مرتب‌کردن مباحث آنزیم‌شناسی در چند گام مطالعه.', status: 'طرح اولیه' },
    { id: 'r5', course: 'histology', title: 'چک‌لیست مشاهدهٔ بافت‌ها', type: 'چک‌لیست', kind: 'eye', desc: 'قالب ثبت و مقایسهٔ ویژگی‌های قابل مشاهده در نمونه‌های بافتی؛ چک‌لیست علمی نهایی نشده است.', status: 'طرح اولیه' },
    { id: 'r6', course: 'medical-language', title: 'فلش‌کارت اصطلاحات علوم آزمایشگاهی', type: 'فلش‌کارت', kind: 'layers', desc: 'ساختار پیشنهادی کارت شامل اصطلاح، ریشهٔ واژه، معنی و کاربرد در متن پزشکی است.', status: 'طرح اولیه' },
    { id: 'r7', course: 'lab-safety', title: 'چک‌لیست ایمنی و حفاظت در آزمایشگاه', type: 'چک‌لیست', kind: 'shieldCheck', desc: 'قالب پیشنهادی برای ثبت نکات ایمنی کار در آزمایشگاه؛ موارد آن باید با دستورالعمل رسمی درس بازبینی شود.', status: 'طرح اولیه' },
    { id: 'r8', course: 'lab-intro', title: 'راهنمای شروع رشتهٔ علوم آزمایشگاهی', type: 'راهنمای نوورود', kind: 'compass', desc: 'طرحی برای معرفی مسیر تحصیل، آشنایی مقدماتی با آزمایشگاه و راه‌های دریافت راهنمایی.', status: 'طرح اولیه' },
    { id: 'r9', course: 'hematology-1', title: 'مرور خون‌سازی و رده‌های سلولی', type: 'راهنمای مفهومی', kind: 'drop', desc: 'قالب مرور مسیر خون‌سازی و رده‌های اصلی سلول‌های خونی؛ شرح علمی و تصاویر هنوز افزوده نشده‌اند.', status: 'طرح اولیه' },
    { id: 'r10', course: 'mycology', title: 'جدول مرور قارچ‌های پزشکی', type: 'جدول مقایسه‌ای', kind: 'microscope', desc: 'ساختار پیشنهادی جدولی برای مقایسهٔ قارچ‌های پزشکی و روش‌های بررسی آزمایشگاهی.', status: 'طرح اولیه' },
    { id: 'r11', course: 'medical-immunology-1', title: 'نقشهٔ مفاهیم ایمنی‌شناسی پزشکی', type: 'نقشهٔ مفهومی', kind: 'shieldCheck', desc: 'قالب پیشنهادی برای نشان‌دادن پیوند مفاهیم ایمنی‌شناسی با روش‌های آزمایشگاهی.', status: 'طرح اولیه' },
    { id: 'r12', course: 'genetics', title: 'مرور ژنتیک پزشکی', type: 'راهنمای مطالعه', kind: 'dna', desc: 'قالب مرور مفاهیم ژنتیک پزشکی؛ سرفصل‌ها باید با طرح درس مصوب تکمیل شوند.', status: 'طرح اولیه' },
    { id: 'r13', course: 'endocrinology', title: 'آشنایی با مباحث هورمون‌شناسی', type: 'راهنمای مرور', kind: 'spark', desc: 'قالبی برای مرتب‌کردن مباحث درس هورمون‌شناسی؛ محتوای آموزشی تأییدشده در این نسخه درج نشده است.', status: 'طرح اولیه' },
    { id: 'r14', course: 'general-microbiology', title: 'مراحل بررسی نمونهٔ میکروبی', type: 'نمودار فرایند', kind: 'microscope', desc: 'قالب نموداری برای نشان‌دادن مسیر بررسی نمونه از دریافت تا ثبت نتیجه؛ جزئیات باید از دستورالعمل درس افزوده شوند.', status: 'طرح اولیه' },
    { id: 'r15', course: 'medical-bacteriology', title: 'جدول مرور باکتری‌شناسی پزشکی', type: 'جدول مرور', kind: 'microscope', desc: 'قالب پیشنهادی برای دسته‌بندی مباحث باکتری‌شناسی پزشکی.', status: 'طرح اولیه' },
    { id: 'r16', course: 'virology', title: 'ساختار ویروس‌ها و روش‌های تشخیص', type: 'راهنمای تصویری', kind: 'shieldCheck', desc: 'قالب مرور ساختار ویروس‌ها و دسته‌بندی روش‌های تشخیصی؛ محتوای علمی آن هنوز تدوین نشده است.', status: 'طرح اولیه' },
    { id: 'r17', course: 'parasitology-1', title: 'راهنمای مرور انگل‌شناسی ۱', type: 'راهنمای تصویری', kind: 'eye', desc: 'قالب تصویری پیشنهادی برای سامان‌دهی مباحث انگل‌شناسی ۱؛ تصاویر و شناسایی‌های علمی هنوز افزوده نشده‌اند.', status: 'طرح اولیه' },
    { id: 'r18', course: 'lab-quality', title: 'مرور تضمین کیفیت در آزمایشگاه', type: 'چک‌لیست', kind: 'checkList', desc: 'قالب پیشنهادی برای مرور موضوع‌های تضمین کیفیت در آزمایشگاه؛ معیارها باید بر اساس منبع درسی بازبینی شوند.', status: 'طرح اولیه' },
    { id: 'r19', course: 'transfusion', title: 'مرور ایمونوهماتولوژی و انتقال خون', type: 'سناریوی آموزشی', kind: 'drop', desc: 'قالب سناریوی تمرینی برای مرور مباحث ایمونوهماتولوژی و انتقال خون؛ محتوای علمی نهایی نشده است.', status: 'طرح اولیه' },
    { id: 'r20', course: 'molecular-diagnostics', title: 'مراحل کار در روش‌های مولکولی', type: 'نمودار فرایند', kind: 'dna', desc: 'قالب نمودار فرایند برای درس تکنیک‌های مولکولی و پیشرفتهٔ آزمایشگاهی.', status: 'طرح اولیه' },
    { id: 'r21', course: 'internship-1', title: 'چک‌لیست آمادگی برای کارآموزی', type: 'چک‌لیست', kind: 'checkList', desc: 'قالب پیشنهادی برای آماده‌شدن پیش از کارآموزی؛ موارد عملی باید با برنامهٔ محل کارآموزی هماهنگ شوند.', status: 'طرح اولیه' },
    { id: 'r22', course: 'lab-equipment', title: 'آشنایی با تجهیزات آزمایشگاهی', type: 'راهنمای تصویری', kind: 'settings', desc: 'طرح معرفی تجهیزات و موارد استفادهٔ آموزشی آن‌ها در ارتباط با درس اصول فنی و نگهداری تجهیزات آزمایشگاهی.', status: 'طرح اولیه' }
  ];

  const mentors = [
    { id: 'm1', name: 'مریم احمدی', initial: 'م', major: 'علوم آزمایشگاهی · پروفایل نمونه', specialty: 'خون‌شناسی و بانک خون', tone: 'coral-avatar', about: 'حوزهٔ همراهی پیشنهادی: مرور مباحث خون‌شناسی، بانک خون و برنامه‌ریزی مطالعه.' },
    { id: 'm2', name: 'علی رضایی', initial: 'ع', major: 'علوم آزمایشگاهی · پروفایل نمونه', specialty: 'میکروب‌شناسی و قارچ‌شناسی', tone: 'blue-avatar', about: 'حوزهٔ همراهی پیشنهادی: دسته‌بندی مباحث میکروب‌شناسی و طراحی برنامهٔ مرور.' },
    { id: 'm3', name: 'فاطمه محمدی', initial: 'ف', major: 'علوم آزمایشگاهی · پروفایل نمونه', specialty: 'ایمنی‌شناسی و بیوشیمی', tone: '', about: 'حوزهٔ همراهی پیشنهادی: مرور مباحث ایمنی‌شناسی و بیوشیمی.' }
  ];

  let state = { page: 'landing', authenticated: false, tab: 'home', courseId: 'anatomy', resourceId: 'r1', mentorId: 'm1', courseTab: 'resources', courseCategory: 'همه', courseQuery: '', filter: 'همهٔ طرح‌ها', wizardStep: 1, wizardAnswers: {}, chat: store.get('chat-clean-copy-v1', []), previous: [] };
  let landingSlideIndex = 0;
  let landingCarouselTimer;
  let toastTimer;

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const courseById = id => courses.find(c => c.id === id) || courses[0];
  const resourceById = id => resources.find(r => r.id === id) || resources[0];
  const resourceCount = courseId => resources.filter(r => r.course === courseId).length;
  const mentorById = id => mentors.find(m => m.id === id) || mentors[0];
  const savedItems = () => store.get('saved', ['r1', 'r3']);
  const offlineItems = () => store.get('offline', ['r1', 'r8']);
  const completedTasks = () => store.get(`tasks:${state.courseId}`, []);
  const isSaved = id => savedItems().includes(id);
  const isOffline = id => offlineItems().includes(id);

  function logo() {
    return `<span class="brand-mark"><svg viewBox="0 0 40 40" width="25" height="25" fill="none" aria-hidden="true"><path d="M9 10.5c4.5-2.1 9.2-1.5 11 1.7v18c-2.2-3.1-6.3-3.8-11-1.7z" fill="#fff" opacity=".96"/><path d="M31 10.5c-4.5-2.1-9.2-1.5-11 1.7v18c2.2-3.1 6.3-3.8 11-1.7z" fill="#bfe5d4"/><path d="M20 12v18" stroke="#1b7165" stroke-width="1.4"/></svg></span>`;
  }

  function renderDesktopChrome() {
    const sidebar = $('#desktop-sidebar');
    if (!sidebar) return;
    const app = $('#app');
    app?.classList.toggle('public-mode', !state.authenticated);
    $('#desktop-topbar')?.classList.toggle('is-hidden', !state.authenticated);
    sidebar.classList.toggle('is-hidden', !state.authenticated);
    if (!state.authenticated) {
      sidebar.innerHTML = '';
      return;
    }
    const routes = [
      ['home', 'خانه', 'home'], ['courses', 'درس‌ها', 'book'], ['path', 'مسیر مطالعه', 'route'], ['library', 'بانک منابع', 'layers'],
      ['mentors', 'منتورینگ', 'users'], ['support', 'حمایت دانشجویی', 'heart'], ['admin', 'پایش و راهبری', 'chart']
    ];
    const active = state.page === 'course' ? 'courses' : state.page === 'resource' ? 'library' : state.page === 'mentor' ? 'mentors' : state.page;
    sidebar.innerHTML = `<div class="desktop-brand" data-page="home">${logo()}<span><b>درس‌بان</b><small>منابع و راهبری آموزشی</small></span></div><div class="desktop-campus"><span class="campus-mark">ب</span><span><b>پایلوت نمایشی</b><small>نمونهٔ علوم آزمایشگاهی · بقیةالله (عج)</small></span></div><div class="desktop-nav-label">فضای آموزشی</div><nav class="desktop-nav">${routes.map(([route, label, glyph]) => `<button class="desktop-nav-item ${active === route ? 'active' : ''}" data-page="${route}" ${active === route ? 'aria-current="page"' : ''}>${icon(glyph)}<span>${label}</span>${route === 'admin' ? '<i>پایلوت</i>' : ''}</button>`).join('')}</nav><div class="desktop-sidebar-spacer"></div><button class="desktop-offline" data-page="offline">${icon('bookmark')}<span><b>فهرست شخصی</b><small>عنوان‌های ذخیره‌شده</small></span>${icon('chevron')}</button><button class="desktop-profile" data-page="profile">${studentAvatar()}<span><b>${STUDENT_NAME}</b><small>پروفایل نمونه · ترم ۶</small></span>${icon('chevron')}</button><button class="desktop-logout" data-action="logout">${icon('arrow')} خروج از پیش‌نمایش</button><div class="desktop-sidebar-foot">نمونهٔ تعاملی درس‌بان</div>`;
    const titles = { home: 'فضای یادگیری', courses: 'دروس نمونهٔ علوم آزمایشگاهی', course: 'نمای کلی درس', library: 'بانک منابع آموزشی', resource: 'جزئیات محتوا', path: 'مسیر مطالعه', mentors: 'راهنمایی و منتورینگ', mentor: 'پروفایل راهنما', support: 'حمایت دانشجویی', assistant: 'دستیار مطالعه', compass: 'قطب‌نمای برنامه‌ریزی', upload: 'پیشنهاد محتوای آموزشی', admin: 'پایش و راهبری محتوا', offline: 'فهرست شخصی', notifications: 'اعلان‌ها', profile: 'پروفایل دانشجو' };
    const pageTitle = $('#desktop-page-title');
    if (pageTitle) pageTitle.textContent = titles[state.page] || titles.home;
    const desktopUser = $('.desktop-user');
    if (desktopUser) desktopUser.innerHTML = `<span class="desktop-user-avatar">م</span><span><b>${STUDENT_NAME}</b><small>نمونهٔ علوم آزمایشگاهی · ترم ۶</small></span>`;
  }

  function topbarHome() {
    return `<header class="topbar"><div class="brand" data-page="home">${logo()}<div><div class="brand-title">درس‌بان</div><div class="brand-sub">یادگیریِ روشن، قدم‌به‌قدم</div></div></div><div class="top-actions"><button class="icon-button" data-page="admin" aria-label="پنل راهبری">${icon('chart')}</button><button class="icon-button" data-page="notifications" aria-label="اعلان‌ها">${icon('bell')}<i class="notification-dot"></i></button></div></header>`;
  }

  function topbar(title, opts = {}) {
    const right = opts.actions || `<button class="icon-button" data-action="share" aria-label="اشتراک‌گذاری">${icon('dots')}</button>`;
    return `<header class="topbar"><div class="backline"><button class="back-button" data-action="back" aria-label="بازگشت">${icon('back')}</button><h1 class="page-title">${title}</h1></div><div class="top-actions">${right}</div></header>`;
  }

  const tabs = [
    ['home', 'خانه', 'home'], ['courses', 'درس‌ها', 'book'], ['path', 'مسیر', 'route'], ['mentors', 'منتورها', 'users'], ['profile', 'پروفایل', 'user']
  ];
  function renderTabbar() {
    if (!state.authenticated) { $('#tabbar').innerHTML = ''; return; }
    const tab = state.page === 'course' || state.page === 'library' || state.page === 'resource' ? 'courses' : state.page === 'mentor' || state.page === 'assistant' || state.page === 'support' ? 'mentors' : ['admin','upload','offline','notifications'].includes(state.page) ? 'profile' : state.page;
    $('#tabbar').innerHTML = tabs.map(([route, label, ic]) => `<button class="tab-item ${tab === route ? 'active' : ''}" data-page="${route}">${icon(ic)}<span>${label}</span></button>`).join('');
  }

  function courseSymbol(c, extra = '') {
    const tones = { blue: 'blue', coral: 'coral', gold: 'gold', green: 'green' };
    return `<span class="course-symbol ${c.tone || ''}">${icon(c.icon)}</span>`;
  }

  function courseCard(c) {
    return `<article class="course-card card" data-course="${c.id}" data-category="${c.category}">${courseSymbol(c)}<div class="course-card-main"><b>${c.title}</b><p>${c.subtitle}</p><span class="pill course-category">${c.category}</span></div><span class="course-card-open">مشاهده ${icon('bookOpen')}</span></article>`;
  }

  function applyCourseFilters() {
    const query = state.courseQuery.trim().toLocaleLowerCase();
    $$('.course-card').forEach(card => {
      const categoryMatches = state.courseCategory === 'همه' || card.dataset.category === state.courseCategory;
      const queryMatches = !query || card.textContent.toLocaleLowerCase().includes(query);
      card.style.display = categoryMatches && queryMatches ? 'flex' : 'none';
    });
  }

  function resourceCard(r) {
    return `<article class="resource-card card" data-resource="${r.id}"><div class="resource-card-top"><span class="resource-thumb">${icon(r.kind)}</span><div class="resource-card-title"><b>${r.title}</b><span>${courseById(r.course).title} • ${r.type}</span></div><button class="bookmark-btn ${isSaved(r.id) ? 'saved' : ''}" data-action="bookmark" data-id="${r.id}" aria-label="نشان‌کردن">${icon('bookmark')}</button></div><div class="resource-card-meta"><span class="pill gold"><i class="dot"></i>${r.status}</span></div><div class="resource-card-actions"><button class="text-link" data-resource="${r.id}">دیدن جزئیات ${icon('chevron')}</button></div></article>`;
  }

  const landingSlides = [
    {
      tone: 'teal', eyebrow: 'درس‌بان؛ برای شروع مسیر دانشگاه',
      title: 'منابع پراکنده را به یک مسیر روشن تبدیل کن',
      body: 'بانک منابع، راهنمای مطالعه و همراهی دانشجویی را در یک تجربهٔ منسجم کنار هم ببین.',
      action: 'ورود به پیش‌نمایش', actionPage: 'login', image: 'hero-study.svg', alt: 'تصویرسازی دانشجویان در حال مطالعه کنار منابع درسی'
    },
    {
      tone: 'coral', eyebrow: 'از دریافت فایل تا یادگیری هدفمند',
      title: 'هر درس، یک نقشهٔ مطالعهٔ قابل دنبال‌کردن',
      body: 'محتوا بر اساس دانشگاه، رشته، نیمسال و درس سامان می‌گیرد؛ کنار آن هم مسیر مرور و آمادگی قرار می‌گیرد.',
      action: 'دیدن امکانات', actionScroll: '#public-features', image: 'hero-resources.svg', alt: 'تصویرسازی کتاب‌ها و مسیر مرور درسی'
    },
    {
      tone: 'cyan', eyebrow: 'هیچ دانشجوی نوورودی تنها نمی‌ماند',
      title: 'تجربهٔ سال‌بالایی‌ها و مسیر حمایت، کنار درس',
      body: 'منتورینگ آموزشی و ارجاع روشن به مشاورهٔ دانشگاه، بخش مکمل بانک منابع و راهبری مطالعه است.',
      action: 'آشنایی با طرح', actionScroll: '#public-how', image: 'hero-mentoring.svg', alt: 'تصویرسازی همراهی دانشجویان در مسیر تحصیل'
    }
  ];

  function publicHeader() {
    return `<header class="public-header"><div class="public-header-main"><button class="public-brand" data-page="landing" aria-label="درس‌بان، صفحهٔ آغاز">${logo()}<span><b>درس‌بان</b><small>منابع و راهبری آموزشی</small></span></button><form class="public-search" id="public-search-form" role="search">${icon('search')}<input id="public-search-input" type="search" data-search="public" placeholder="جست‌وجو بین امکانات درس‌بان" autocomplete="off"><button type="submit" aria-label="جست‌وجو">${icon('arrow')}</button></form><div class="public-account"><button class="public-help" data-scroll="#public-how">راهنما</button><button class="button public-login-button" data-page="login">${icon('user')} ورود به سامانه</button></div></div><nav class="public-nav" aria-label="بخش‌های درس‌بان"><button data-scroll="#public-audience">مخاطبان</button><button data-scroll="#public-features">امکانات</button><button data-scroll="#public-workflow">چرخهٔ محتوا</button><button data-scroll="#public-how">مراحل اجرا</button><span class="public-nav-note">سامانهٔ پیشنهادی برای دانشجویان نوورود علوم پزشکی</span></nav></header>`;
  }

  function landingScreen() {
    const shortcuts = [
      ['layers', 'بانک منابع', 'library', 'blue'],
      ['route', 'مسیر مطالعه', 'path', 'gold'],
      ['users', 'منتورینگ', 'mentors', 'coral'],
      ['heart', 'حمایت دانشجویی', 'support', 'green'],
      ['upload', 'پیشنهاد محتوا', 'upload', 'blue'],
      ['chart', 'پایش آموزشی', 'admin', 'gold']
    ];
    const audiences = [
      ['graduation', 'دانشجویان نوورود علوم پزشکی', 'آشنایی با شیوهٔ مطالعهٔ دانشگاهی، درس‌ها و مسیرهای پشتیبانی.'],
      ['home', 'دانشجویان خوابگاهی و دور از خانواده', 'پیداکردن منابع و راهنمایی روشن در ماه‌های آغازین تحصیل.'],
      ['users', 'منتورهای دانشجویی', 'انتقال تجربهٔ درسی با چارچوب پاسخ‌گویی و زمان‌بندی مشخص.'],
      ['chart', 'گروه آموزشی و مدیران', 'بازبینی محتوا و بررسی شاخص‌های استفاده و نیازهای آموزشی.']
    ];
    const features = [
      ['layers', 'بانک منابع آموزشی', 'دسته‌بندی بر پایهٔ دانشگاه، دانشکده، رشته، نیمسال، درس، استاد و سرفصل.'],
      ['route', 'راهنمای مطالعهٔ درس‌محور', 'گام‌های پیشنهادی برای اولویت‌بندی، مرور و آمادگی ارزیابی هر درس.'],
      ['users', 'شبکهٔ منتورینگ', 'پروفایل و ارتباط هدایت‌شده با دانشجویان سال‌بالا و آموزش‌دیده.'],
      ['heart', 'حمایت و ارجاع دانشجویی', 'مسیر روشن برای ارجاع به مرکز مشاوره؛ سامانه جایگزین خدمات تخصصی نیست.'],
      ['shieldCheck', 'داوری و نگهداری محتوا', 'دریافت، بازبینی، برچسب اعتبار، نسخه‌بندی و بازنگری دوره‌ای منابع.'],
      ['chart', 'پایش و تصمیم‌سازی', 'اندازه‌گیری زمان دسترسی، استفاده از منابع، تکمیل مسیر و رضایت کاربران.']
    ];
    const workflow = [
      ['01', 'دریافت', 'پیشنهاد منابع از سوی دانشجو، منتور یا گروه آموزشی.'],
      ['02', 'بازبینی', 'بررسی علمی، هم‌راستایی با درس و مجوز انتشار.'],
      ['03', 'انتشار', 'نمایش منبع با درس، نوع محتوا، نسخه و سطح اعتبار.'],
      ['04', 'بازنگری', 'گزارش خطا و به‌روزرسانی مسئولانهٔ محتوا.']
    ];
    const phases = [
      ['ماه ۱ تا ۲', 'نیازسنجی و چارچوب کیفیت', 'گفت‌وگو با دانشجویان و استادان؛ تعریف نقش‌ها، دسته‌بندی و شیوه‌نامهٔ محتوا.'],
      ['ماه ۳ تا ۵', 'پایلوت محدود', 'راه‌اندازی نسخهٔ اولیه برای چند درس پایه و تشکیل شبکهٔ منتورینگ.'],
      ['ماه ۶ تا ۹', 'ارزیابی و بهینه‌سازی', 'بررسی استفاده، رضایت، تکمیل مسیر و بازنگری محتوایی.'],
      ['ماه ۱۰ تا ۱۲', 'تثبیت و توسعه', 'استقرار پایدار، آموزش ادمین‌ها و گسترش مرحله‌ای به ورودی‌ها و دانشکده‌ها.']
    ];
    return `<div class="public-site">${publicHeader()}<main>
      <section class="market-hero" id="public-hero" data-tone="${landingSlides[landingSlideIndex].tone}" aria-label="معرفی درس‌بان">
        <div class="hero-carousel-track">${landingSlides.map((slide, index) => `<article class="landing-slide ${index === landingSlideIndex ? 'active' : ''}" data-slide="${index}" aria-hidden="${index !== landingSlideIndex}"><div class="landing-copy"><span class="landing-eyebrow"><i></i>${slide.eyebrow}</span><h1>${slide.title}</h1><p>${slide.body}</p><div class="landing-actions"><button class="button landing-cta" ${slide.actionPage ? `data-page="${slide.actionPage}"` : `data-scroll="${slide.actionScroll}"`}>${slide.action} ${icon('arrow')}</button><button class="landing-text-link" data-scroll="#public-features">آشنایی با درس‌بان ${icon('chevron')}</button></div><div class="hero-badges"><span>${icon('bookOpen')} منابع ساختارمند</span><span>${icon('users')} راهبری انسانی</span></div></div><div class="landing-visual"><div class="visual-orbit orbit-one"></div><div class="visual-orbit orbit-two"></div><img src="${slide.image}" alt="${slide.alt}" class="hero-illustration"><span class="visual-chip chip-top">${icon('spark')}یادگیری با راهنما</span><span class="visual-chip chip-bottom">${icon('checkCircle')}مسیر روشن‌تر</span></div></article>`).join('')}</div>
        <div class="carousel-controls"><button type="button" class="carousel-arrow" data-action="carousel-next" aria-label="اسلاید بعدی">${icon('chevron')}</button><div class="carousel-dots" role="group" aria-label="انتخاب اسلاید">${landingSlides.map((_, index) => `<button type="button" class="carousel-dot ${index === landingSlideIndex ? 'active' : ''}" data-action="carousel-to" data-index="${index}" aria-label="اسلاید ${index + 1}" aria-pressed="${index === landingSlideIndex}"></button>`).join('')}</div><button type="button" class="carousel-pause" data-action="carousel-toggle" aria-label="توقف پخش خودکار">${icon('pause')}</button><button type="button" class="carousel-arrow" data-action="carousel-prev" aria-label="اسلاید قبلی">${icon('chevron')}</button></div>
      </section>
      <div class="public-content">
        <section class="shortcut-rail" aria-label="دسترسی سریع">${shortcuts.map(([glyph,label,page,tone]) => `<button class="shortcut-item" data-page="${page}"><span class="shortcut-icon ${tone}">${icon(glyph)}</span><b>${label}</b></button>`).join('')}</section>
        <section class="public-section intro-section" id="public-audience"><div class="section-title-line"><div><span class="public-kicker">درس‌بان برای چه کسانی طراحی شده؟</span><h2>یک نقطهٔ شروع مشترک برای جامعهٔ آموزشی علوم پزشکی</h2><p>محور ایده، پشتیبانی از دانشجویان نوورود است؛ با مشارکت منتورها، استادان و مدیران آموزشی.</p></div><span class="section-decoration">${icon('graduation')}</span></div><div class="audience-grid">${audiences.map(([glyph,title,desc]) => `<article class="audience-card" data-public-searchable><span class="audience-icon">${icon(glyph)}</span><h3>${title}</h3><p>${desc}</p></article>`).join('')}</div><div class="field-strip"><span class="field-strip-title">قابل گسترش در دانشکده‌های</span><div class="field-pills"><span>پزشکی</span><span>دندان‌پزشکی</span><span>داروسازی</span><span>پرستاری و مامایی</span><span>پیراپزشکی</span><span>بهداشت و علوم پایه</span></div><small>نمایش این رشته‌ها به‌معنای وجود محتوای تأییدشده برای آن‌ها در نسخهٔ فعلی نیست.</small></div></section>
        <section class="public-section feature-section" id="public-features"><div class="section-title-line"><div><span class="public-kicker">از محتوا تا راهبری</span><h2>امکاناتی که به هم وصل‌اند</h2><p>درس‌بان فقط محل نگهداری فایل نیست؛ هر منبع به درس، مسیر استفاده و پشتیبانی مرتبط می‌شود.</p></div><button class="button outline" data-page="login">ورود به پیش‌نمایش ${icon('arrow')}</button></div><div class="feature-grid">${features.map(([glyph,title,desc],index) => `<article class="feature-card" data-public-searchable><span class="feature-number">۰${index+1}</span><span class="feature-icon feature-tone-${index+1}">${icon(glyph)}</span><h3>${title}</h3><p>${desc}</p><span class="feature-card-foot">${index===3?'مسیر پیشنهادی':index===4?'چرخهٔ کیفیت':'قابلیت محوری'}</span></article>`).join('')}</div></section>
        <section class="workflow-section public-section" id="public-workflow"><div class="workflow-heading"><span class="public-kicker">کیفیت محتوا چطور حفظ می‌شود؟</span><h2>هر محتوا از یک چرخهٔ بازبینی می‌گذرد</h2><p>انتشار نهایی پس از بررسی علمی و روشن‌شدن حقوق استفاده انجام می‌شود.</p></div><div class="workflow-grid">${workflow.map(([num,title,desc],index) => `<article class="workflow-card"><span class="workflow-index">${num}</span><div><h3>${title}</h3><p>${desc}</p></div>${index<workflow.length-1?`<span class="workflow-link">${icon('chevron')}</span>`:''}</article>`).join('')}</div></section>
        <section class="public-section roadmap-section" id="public-how"><div class="section-title-line"><div><span class="public-kicker">روش اجرای پیشنهادی</span><h2>از پایلوت کوچک تا توسعهٔ قابل سنجش</h2><p>زمان‌بندی و مراحل زیر از طرح ایده گرفته شده‌اند؛ نتیجهٔ اجرا یا آمار واقعی نیستند.</p></div><span class="roadmap-stamp">طرح ۱۲ ماهه</span></div><div class="roadmap-grid">${phases.map(([time,title,desc],index) => `<article class="roadmap-card" data-public-searchable><span class="roadmap-step">گام ${index+1}</span><span class="roadmap-time">${time}</span><h3>${title}</h3><p>${desc}</p></article>`).join('')}</div></section>
        <section class="measurement-band"><div><span class="public-kicker">پایش اثر آموزشی</span><h2>موفقیت را با چه چیزی می‌سنجیم؟</h2><p>شاخص‌ها پیش‌بینی‌شده‌اند؛ در این پیش‌نمایش دادهٔ مصرف واقعی ثبت نمی‌شود.</p></div><div class="measurement-points"><span>${icon('clock')}زمان پیدا کردن منبع</span><span>${icon('route')}تکمیل مسیر مطالعه</span><span>${icon('smile')}رضایت دانشجو و منتور</span><span>${icon('chart')}دسترسی پایدار و نرخ استفاده</span></div></section>
        <section class="public-cta"><div><span class="public-kicker">نسخهٔ تعاملی</span><h2>ظاهر و مسیرهای اصلی درس‌بان را ببین</h2><p>برای ورود به پنل نمونه از حساب نمایشی استفاده کن. این ورود، حساب واقعی دانشگاهی نیست.</p></div><button class="button cta-white" data-page="login">ورود به پیش‌نمایش ${icon('arrow')}</button></section>
      </div>
    </main><footer class="public-footer"><div class="footer-brand">${logo()}<b>درس‌بان</b></div><span>سامانهٔ پیشنهادی بانک منابع آموزشی و راهبری دانشجویان نوورود علوم پزشکی</span><button data-page="login">ورود به پیش‌نمایش</button><small>این وب‌سایت نمونهٔ رابط کاربری است؛ ارسال محتوا، درخواست منتور و آمار واقعی هنوز به سامانهٔ پشتیبان متصل نیست.</small></footer></div>`;
  }

  function loginScreen() {
    return `<div class="login-site">${publicHeader()}<main class="login-layout"><section class="login-intro"><span class="public-kicker">فضای نمونهٔ درس‌بان</span><h1>از همین‌جا مسیر یادگیری را ببین</h1><p>با حساب نمایشی وارد شو و صفحه‌های بانک منابع، برنامه‌ریزی مطالعه، منتورینگ و حمایت دانشجویی را مرور کن.</p><img src="hero-mentoring.svg" alt="تصویرسازی گفت‌وگوی آموزشی دو دانشجو" class="login-illustration"><div class="login-points"><span>${icon('layers')}بانک منابع</span><span>${icon('route')}مسیر مطالعه</span><span>${icon('users')}راهنمای درسی</span></div></section><section class="login-card"><button class="back-to-public" data-page="landing">${icon('back')} بازگشت به صفحهٔ اصلی</button><div class="login-mark">${logo()}</div><span class="public-kicker">ورود به پیش‌نمایش</span><h2>خوش آمدی</h2><p class="login-lede">نام کاربری و رمز نمونه را وارد کن تا پنل نمایشی باز شود.</p><form id="login-form" class="login-form"><label for="demo-username">نام کاربری</label><input id="demo-username" name="username" autocomplete="username" placeholder="نام کاربری نمونه" required><label for="demo-password">کلمهٔ عبور</label><input id="demo-password" name="password" type="password" autocomplete="current-password" placeholder="کلمهٔ عبور نمونه" required><button class="button full login-submit" type="submit">ورود به سامانه ${icon('arrow')}</button></form><div class="demo-credentials"><b>${icon('info')} حساب پیش‌فرض پیش‌نمایش</b><div><span>نام کاربری</span><code>${DEMO_CREDENTIALS.username}</code></div><div><span>کلمهٔ عبور</span><code>${DEMO_CREDENTIALS.password}</code></div></div><p class="login-notice">ورود این صفحه نمایشی و فقط در همین مرورگر است؛ اطلاعات ورود داخل فایل عمومی سایت قرار دارد و برای حساب یا دادهٔ واقعی امن نیست. ثبت‌نام و اتصال به حساب دانشگاهی فعال نشده است.</p></section></main><footer class="login-footer">درس‌بان · پیش‌نمایش گرافیکی و تعاملی</footer></div>`;
  }

  function homeScreen() {
    const top = topbarHome();
    const content = `<div class="home-intro">
      <div class="greeting"><div><div class="eyebrow">پایلوت نمایشی علوم آزمایشگاهی • بقیةالله (عج)</div><h1 class="h1">سلام، ${STUDENT_NAME} 🌿</h1><div class="welcome-note">این پنل، نمونهٔ یک پایلوت رشته‌ای است؛ ایدهٔ درس‌بان برای دانشجویان نوورود همهٔ رشته‌های علوم پزشکی طراحی شده است.</div></div><span class="term-chip">${icon('microscope')} علوم آزمایشگاهی</span></div>
      <section class="hero"><div class="hero-content"><div class="eyebrow">پایلوت نمونهٔ درس‌بان</div><h2>برای مطالعهٔ امروز<br>از کجا شروع کنیم؟</h2><p>درس را انتخاب کن و یک مسیر کوتاه برای مرور بساز.</p><button class="button" data-page="compass">برنامه‌ریزی مطالعه ${icon('compass')}</button></div><div class="hero-art"><i class="orbit"></i><i class="book"></i><b class="spark">✦</b></div></section>
      <div class="stat-row"><div class="stat-card"><span class="stat-icon">${icon('book')}</span><div><div class="stat-value">${resources.length.toLocaleString('fa-IR')}</div><div class="stat-label">قالب پیشنهادی محتوا</div></div></div><div class="stat-card"><span class="stat-icon coral-bg">${icon('users')}</span><div><div class="stat-value">${mentors.length.toLocaleString('fa-IR')}</div><div class="stat-label">حوزهٔ راهنمایی نمایشی</div></div></div><div class="stat-card"><span class="stat-icon gold-bg">${icon('microscope')}</span><div><div class="stat-value">${courses.length.toLocaleString('fa-IR')}</div><div class="stat-label">عنوان درسی</div></div></div></div>
      <section class="section"><div class="section-head"><h2 class="h2">قطب‌نمای یادگیری</h2><span class="pill gold">برنامه‌ریزی شخصی</span></div><button class="compass-card card" data-page="compass" style="width:100%;text-align:right"><span class="compass-badge">${icon('compass')}</span><span class="compass-copy"><b>برای مطالعه برنامه بچین</b><span>درس، نیاز و زمانت را انتخاب کن.</span></span><span class="course-card-open">شروع ${icon('back')}</span></button></section>
      <section class="section"><div class="section-head"><h2 class="h2">درس‌های نمونهٔ علوم آزمایشگاهی</h2><button class="text-link" data-page="courses">دیدن فهرست ${icon('chevron')}</button></div><div class="course-strip">${courses.slice(0,4).map(c => `<button class="course-mini" data-course="${c.id}"><span class="course-mini-top">${courseSymbol(c)}</span><span class="course-name">${c.title}</span><span class="course-meta">${c.subtitle}</span></button>`).join('')}</div></section>
      <section class="section"><div class="section-head"><h2 class="h2">طرح‌های محتوایی پیشنهادی</h2><button class="text-link" data-page="library">دیدن همه ${icon('chevron')}</button></div><div class="feature-list">${resources.filter(r => ['hematology-1','mycology'].includes(r.course)).map(r => `<div class="resource-row card" data-resource="${r.id}"><span class="resource-thumb">${icon(r.kind)}</span><span class="resource-info"><b>${r.title}</b><span>${courseById(r.course).title} • ${r.status}</span></span><span class="resource-row-open">جزئیات ${icon('bookOpen')}</span></div>`).join('')}</div></section>
      <section class="section"><div class="section-head"><h2 class="h2">راهنمای درسی</h2><button class="text-link" data-page="mentors">دیدن پروفایل‌ها ${icon('chevron')}</button></div><div class="mentor-preview"><span class="avatar coral-avatar">${mentors[0].initial}</span><span class="mentor-copy"><b>${mentors[0].name}</b><p>حوزهٔ همراهی: ${mentors[0].specialty} · نمونه</p></span><button class="button secondary" data-mentor="m1">مشاهده</button></div></section>
      <section class="section"><button class="offline-banner" style="width:100%;text-align:right;border:0" data-page="offline">${icon('bookmark')}<span><b>فهرست ذخیره‌شده</b><span>عنوان‌هایی را که نشان کرده‌ای، اینجا ببین.</span></span><span class="resource-row-open">مشاهده ${icon('chevron')}</span></button></section>
      <div class="screen-footer">پیش‌نمایش رابط درس‌بان • محتوا و پروفایل‌ها برای نمایش طراحی شده‌اند.</div></div>`;
    return `<div class="screen">${top}${content}</div>`;
  }

  function coursesScreen() {
    const filters = ['همه','علوم پایه','دروس تخصصی','دروس عمومی','مهارت آزمایشگاهی','کارآموزی'];
    const content = `<div class="page-content"><div class="screen-heading"><div class="eyebrow">دانشگاه علوم پزشکی بقیةالله (عج) • ورودی ۱۴۰۲</div><h1 class="h1">درس‌های علوم آزمایشگاهی</h1><p class="body-copy">این فهرست ${courses.length.toLocaleString('fa-IR')} عنوان درسی را بر پایهٔ برنامهٔ عمومیِ ورودی ۱۴۰۱ به بعد نشان می‌دهد.</p></div><label class="searchbox">${icon('search')}<input data-search="courses" value="${esc(state.courseQuery)}" placeholder="نام درس یا مبحث را جست‌وجو کن" autocomplete="off"></label><div class="chip-row" style="margin-top:12px">${filters.map(f=>`<button class="filter-chip ${state.courseCategory===f?'active':''}" data-filter="${f}">${f==='همه'?'همهٔ درس‌ها':f}</button>`).join('')}</div><div class="course-list" id="course-list">${courses.map(courseCard).join('')}</div><div class="soft-card course-note"><span class="stat-icon gold-bg">${icon('info')}</span><div><p>مبنای این فهرست، سند بازنشرشدهٔ «برنامهٔ مدون دروس مقطع کارشناسی پیوستهٔ رشتهٔ علوم آزمایشگاهی، ورودی ۱۴۰۱ به بعد» است. نسخهٔ قابل‌دسترسی در Scribd بازنشر شده و در خود سند نام دانشگاه درج نشده است؛ بنابراین این فهرست چارت اختصاصی یا مصوب دانشگاه علوم پزشکی بقیةالله (عج) نیست. نام دانشگاه در این برنامه، مشخصات دانشجوی پیش‌نمایش است.</p><a class="text-link" href="${curriculumSource}" target="_blank" rel="noreferrer">دیدن نسخهٔ بازنشرشدهٔ سند ${icon('book')}</a></div></div><div class="screen-footer">پروفایل دانشجو: دانشگاه علوم پزشکی بقیةالله (عج) • ورودی ۱۴۰۲</div></div>`;
    return `<div class="screen">${topbar('درس‌های علوم آزمایشگاهی',{actions:`<button class="icon-button" data-page="library">${icon('search')}</button>`})}${content}</div>`;
  }

  function courseScreen() {
    const c = courseById(state.courseId);
    const list = resources.filter(r => r.course === c.id);
    const mentorForCourse = { 'hematology-1': 'm1', 'hematology-1-lab': 'm1', 'hematology-2': 'm1', 'hematology-2-lab': 'm1', transfusion: 'm1', 'transfusion-lab': 'm1', mycology: 'm2', 'mycology-lab': 'm2', 'general-microbiology': 'm2', 'general-microbiology-lab': 'm2', 'medical-bacteriology': 'm2', 'medical-bacteriology-lab': 'm2', virology: 'm2', 'parasitology-1': 'm2', 'parasitology-2': 'm2', 'medical-immunology-1': 'm3', 'medical-immunology-1-lab': 'm3', 'medical-immunology-2': 'm3', 'medical-immunology-2-lab': 'm3', 'medical-biochemistry-1': 'm3', 'medical-biochemistry-2': 'm3', endocrinology: 'm3', genetics: 'm3', 'molecular-diagnostics': 'm3' };
    const courseMentor = mentorById(mentorForCourse[c.id] || 'm1');
    const tabsHtml = `<div class="tabs"><button class="tab ${state.courseTab === 'resources' ? 'active' : ''}" data-course-tab="resources">طرح محتوا (${list.length.toLocaleString('fa-IR')})</button><button class="tab ${state.courseTab === 'path' ? 'active' : ''}" data-course-tab="path">مسیر مطالعه</button><button class="tab ${state.courseTab === 'mentor' ? 'active' : ''}" data-course-tab="mentor">راهنمای درسی</button></div>`;
    let panel = '';
    if (state.courseTab === 'resources') panel = `<div class="filter-row"><span class="body-copy">طرح محتوای این درس</span><button class="filter-chip" data-page="library">${icon('filter')} همهٔ طرح‌ها</button></div>${list.length ? list.map(resourceCard).join('') : '<div class="empty-state">برای این درس هنوز طرح محتوا تعریف نشده است.</div>'}<button class="button secondary full" data-page="upload">${icon('plus')} پیشنهاد یک طرح محتوا</button>`;
    if (state.courseTab === 'path') panel = `<div class="path-banner"><div class="eyebrow">مسیر پیشنهادی برای ${c.title}</div><h2 class="h2">مرور درس، گام‌به‌گام</h2><p class="body-copy">از مرور هدف‌های درس شروع کن و در پایان، دانسته‌هایت را با یک پرسش بسنج.</p></div><div class="timeline">${pathItems(c.title).slice(0,3).join('')}</div><button class="button full" data-page="path">دیدن چهار گام پیشنهادی ${icon('arrow')}</button>`;
    if (state.courseTab === 'mentor') panel = `<div class="mentor-preview"><span class="avatar ${courseMentor.tone}">${courseMentor.initial}</span><span class="mentor-copy"><b>${courseMentor.name}</b><p>حوزهٔ همراهی: ${courseMentor.specialty}</p></span><button class="button secondary" data-mentor="${courseMentor.id}">مشاهده</button></div><div class="privacy-note" style="margin-top:12px">${icon('shield')} این پروفایل برای نمایش مسیر درخواست راهنمایی است؛ هماهنگی واقعی در این نسخه انجام نمی‌شود.</div>`;
    return `<div class="screen">${topbar(c.title)}<div class="page-content"><section class="course-hero"><div class="course-hero-inner"><span class="eyebrow">${c.category} • ${c.subtitle}</span><h1>${c.title}</h1><p>عنوان و نیم‌سال از نسخهٔ بازنشرشدهٔ برنامهٔ عمومیِ ورودی ۱۴۰۱ به بعد برداشته شده است؛ این سند چارت اختصاصی بقیةالله نیست. طرح‌های محتواییِ این صفحه نمونه‌اند.</p><div class="course-hero-bottom"><span class="course-hero-stat"><b>${resourceCount(c.id).toLocaleString('fa-IR')}</b>طرح محتوایی</span><span class="course-hero-stat"><b>گام‌به‌گام</b>مسیر مطالعه</span><button class="button secondary small-button" data-page="compass">برنامه‌ریزی</button></div></div></section>${tabsHtml}${panel}</div></div>`;
  }

  function libraryScreen() {
    const filtered = resources.filter(r => state.filter === 'همهٔ طرح‌ها' || state.filter === 'همه' || r.status === state.filter || r.type.includes(state.filter));
    const chips = ['همهٔ طرح‌ها','طرح اولیه','راهنمای مطالعه','راهنمای تصویری','جدول مرور'];
    return `<div class="screen">${topbar('کتابخانهٔ محتوای درسی',{actions:`<button class="icon-button" data-page="upload">${icon('upload')}</button>`})}<div class="page-content"><div class="screen-heading"><div class="eyebrow">فهرست پیشنهادی رشته</div><h1 class="h1">طرح‌های محتوایی</h1><p class="body-copy">${resources.length.toLocaleString('fa-IR')} طرح اولیه برای تولید محتوای آموزشی؛ هنوز فایل آموزشی پیوست نشده است.</p></div><label class="searchbox">${icon('search')}<input data-search="resources" placeholder="عنوان، درس یا قالب محتوا" autocomplete="off"></label><div class="chip-row" style="margin-top:11px">${chips.map(c=>`<button class="filter-chip ${state.filter===c?'active':''}" data-filter="${c}">${c}</button>`).join('')}</div><div class="filter-row"><span class="body-copy">${filtered.length.toLocaleString('fa-IR')} طرح</span><button class="text-link" data-action="open-modal" data-modal="sort">مرتب‌سازی ${icon('filter')}</button></div><div id="resource-list">${filtered.map(resourceCard).join('')}</div><div class="soft-card" style="padding:14px;margin-top:15px"><div class="row gap-8">${icon('info')}<b class="small">وضعیت محتوا</b></div><p class="body-copy small" style="margin-top:4px">این کارت‌ها عنوان و ساختار پیشنهادی را نشان می‌دهند؛ فایل آموزشی و ارجاع علمی در این نسخه درج نشده است.</p></div></div></div>`;
  }

  function resourceScreen() {
    const r = resourceById(state.resourceId);
    const saved = isSaved(r.id);
    return `<div class="screen">${topbar('جزئیات طرح محتوا',{actions:`<button class="icon-button ${saved?'':'bookmark-btn'}" data-action="bookmark" data-id="${r.id}" aria-label="نشان‌کردن">${icon('bookmark')}</button>`})}<div class="page-content"><section class="detail-cover"><div class="row between"><span class="resource-thumb">${icon(r.kind)}</span><span class="pill gold">${icon('info')} ${r.status}</span></div><h1>${r.title}</h1><p>${courseById(r.course).title} • ${r.type}</p></section><div class="metadata-grid"><div class="metadata"><span>درس مرتبط</span><b>${courseById(r.course).title}</b></div><div class="metadata"><span>قالب محتوا</span><b>${r.type}</b></div><div class="metadata"><span>فایل آموزشی</span><b>در این نسخه درج نشده</b></div><div class="metadata"><span>بازبینی علمی</span><b>انجام نشده</b></div></div><section class="section"><div class="section-head"><h2 class="h2">دربارهٔ این طرح</h2></div><p class="body-copy">${r.desc}</p></section><section class="section trust-card"><div class="row between"><h2 class="h2" style="font-size:14px">پیش از انتشار</h2>${icon('shieldCheck')}</div><div class="trust-line"><span class="check-icon">${icon('clock')}</span><span><b>تهیهٔ محتوای کامل</b><span>این صفحه فقط عنوان و ساختار پیشنهادی را نشان می‌دهد.</span></span></div><div class="trust-line"><span class="check-icon">${icon('bookOpen')}</span><span><b>ثبت منبع علمی</b><span>ارجاع‌ها باید از منابع تعیین‌شدهٔ درس وارد شوند.</span></span></div><div class="trust-line"><span class="check-icon">${icon('users')}</span><span><b>بازبینی گروه آموزشی</b><span>محتوا پس از تأیید علمی برای مطالعه منتشر می‌شود.</span></span></div></section><section class="section"><div class="section-head"><h2 class="h2">گام بعد</h2></div><div class="soft-card" style="padding:14px"><p class="body-copy">برای تکمیل این طرح، متن آموزشی، تصویرهای مجاز و ارجاع‌های معتبر باید افزوده شوند.</p></div></section><div class="sticky-actions"><button class="button secondary" data-action="download" data-id="${r.id}">${icon('bookmark')} ${isOffline(r.id)?'در فهرست من':'ذخیره در فهرست من'}</button><button class="button" data-action="open-modal" data-modal="report">ارسال بازخورد ${icon('flag')}</button></div></div></div>`;
  }

  function pathItems(courseName) {
    const done = completedTasks();
    const course = courses.find(c => c.title === courseName) || courses[0];
    const related = resources.filter(r => r.course === course.id);
    const first = related[0]?.id || resources[0].id;
    const second = related[1]?.id || first;
    const third = related[2]?.id || second;
    const items = [
      ['t1','هدف مطالعه را مشخص کن','از سرفصل درس، مبحثی را که می‌خواهی مرور کنی انتخاب کن.',first],
      ['t2','طرح محتوای درس را ببین','این پیش‌نمایش مسیر پیشنهادی محتوا را نشان می‌دهد؛ متن کامل در نسخهٔ فعلی درج نشده است.',second],
      ['t3','دانسته‌هایت را مرور کن','سه پرسش دربارهٔ مبحث بنویس و پاسخ‌ها را با جزوهٔ درسی‌ات بررسی کن.',third],
      ['t4','در صورت نیاز، راهنمایی بگیر','پرسشت را مشخص کن تا در گفت‌وگو با منتور مطرح کنی.','m1']
    ];
    return items.map(([id,title,desc], i) => `<div class="timeline-item"><span class="timeline-node ${done.includes(id)?'done':''}">${done.includes(id)?icon('check'):String(i+1).toLocaleString('fa-IR')}</span><div class="timeline-body"><b>${title}</b><p>${desc}</p><button class="task-check ${done.includes(id)?'done':''}" data-action="toggle-task" data-id="${id}"><span class="check-icon">${icon(done.includes(id)?'check':'play')}</span>${done.includes(id)?'انجام شد':'علامت‌گذاری به‌عنوان انجام‌شده'}</button></div></div>`).join('');
  }

  function pathScreen() {
    const c = courseById(state.courseId);
    const n = completedTasks().length;
    return `<div class="screen">${topbar('مسیر مطالعه') }<div class="page-content"><div class="path-banner"><div class="eyebrow">${c.title}</div><h1 class="h2" style="font-size:20px;margin-top:4px">مرور درس، گام‌به‌گام</h1><p class="body-copy">این چهار گام را می‌توانی برای برنامهٔ مطالعه‌ات دنبال کنی.</p><div class="path-progress"><div class="progress-line"><span style="width:${Math.min(n*25,100)}%"></span></div><b>${n.toLocaleString('fa-IR')} از ۴ گام</b></div></div><div class="section-head section"><h2 class="h2">گام‌های پیشنهادی</h2></div><div class="timeline">${pathItems(c.title)}</div><div class="privacy-note">${icon('info')} این مسیر یک پیشنهاد عمومی است؛ آن را با سرفصل و برنامهٔ درسی خودت هماهنگ کن.</div><div class="section"><button class="button full" data-page="compass">تنظیم برنامهٔ مطالعه ${icon('compass')}</button></div></div></div>`;
  }

  function mentorsScreen() {
    const cards = mentors.map(m => `<article class="mentor-card card"><span class="avatar ${m.tone}">${m.initial}</span><div class="mentor-info"><b>${m.name}</b><span>${m.major}</span><div class="mentor-tags"><span class="pill coral">${m.specialty}</span></div></div><button class="button secondary" data-mentor="${m.id}">مشاهده</button></article>`).join('');
    return `<div class="screen">${topbar('راهنمای درسی',{actions:`<button class="icon-button" data-page="support">${icon('heart')}</button>`})}<div class="page-content"><div class="screen-heading"><div class="eyebrow">راهنمایی آموزشی</div><h1 class="h1">پرسش از منتور</h1><p class="body-copy">نام‌های این سه پروفایل برای نمایش نمونه ساخته شده‌اند و به افراد واقعی یا برنامهٔ گفت‌وگو وصل نیستند.</p></div><div class="mentor-preview"><span class="stat-icon gold-bg">${icon('shield')}</span><span class="mentor-copy"><b>حدود همراهی</b><p>منتور دربارهٔ درس و روش مطالعه راهنمایی می‌کند و جایگزین استاد یا مشاور تخصصی نیست.</p></span></div><section class="section"><div class="section-head"><h2 class="h2">حوزه‌های همراهی</h2><span class="pill">۳ پروفایل نمایشی</span></div>${cards}</section><section class="section"><div class="section-head"><h2 class="h2">درخواست گفت‌وگو</h2></div><button class="support-option" data-action="open-modal" data-modal="booking"><span class="stat-icon coral-bg">${icon('calendar')}</span><span style="flex:1"><b>انتخاب موضوع گفت‌وگو</b><span>در این پیش‌نمایش، جلسه ثبت یا هماهنگ نمی‌شود.</span></span>${icon('chevron')}</button></section></div></div>`;
  }

  function mentorScreen() {
    const m = mentorById(state.mentorId);
    return `<div class="screen">${topbar('پروفایل راهنما')}<div class="page-content"><section class="mentor-hero"><span class="avatar ${m.tone}">${m.initial}</span><h1>${m.name}</h1><p>${m.major}</p><div class="row" style="justify-content:center;gap:6px"><span class="pill coral">${m.specialty}</span></div><div class="privacy-note" style="margin-top:14px">این پروفایل نمایشی است؛ زمان و امکان گفت‌وگو در نسخهٔ فعلی ثبت نشده است.</div></section><section class="section"><div class="section-head"><h2 class="h2">حوزهٔ همراهی</h2></div><p class="body-copy">${m.about} گفت‌وگوی منتور برای پرسش‌های درسی و روش مطالعه است.</p></section><div class="privacy-note section">${icon('lock')} برای هماهنگی واقعی، اطلاعات تماس و زمان‌بندی باید با رضایت منتور و طبق ضوابط دانشگاه ثبت شود.</div><section class="section"><button class="button full" data-action="open-modal" data-modal="booking">درخواست گفت‌وگوی آموزشی ${icon('message')}</button></section></div></div>`;
  }

  function supportScreen() {
    return `<div class="screen">${topbar('مسیر دریافت حمایت')}<div class="page-content"><div class="screen-heading"><div class="eyebrow">حمایت دانشجو</div><h1 class="h1">لازم نیست تنها پیش بروی</h1><p class="body-copy">از راهنمایی درسی تا ارتباط با خدمات تخصصی دانشگاه، مسیر بعدی را پیدا کن.</p></div><div class="privacy-note">${icon('shield')} درس‌بان ابزار تشخیص یا درمان نیست. گفت‌وگوی منتورینگ آموزشی است؛ برای نیاز تخصصی، ارجاع به مرکز مشاورهٔ دانشگاه پیشنهاد می‌شود.</div><div class="section-head section"><h2 class="h2">چه کمکی می‌خواهی؟</h2></div><button class="support-option" data-action="open-modal" data-modal="booking"><span class="stat-icon">${icon('book')}</span><span style="flex:1"><b>برنامه‌ریزی و روش مطالعه</b><span>گفت‌وگوی کوتاه با منتور دانشجویی</span></span>${icon('chevron')}</button><button class="support-option" data-action="open-modal" data-modal="referral"><span class="stat-icon coral-bg">${icon('heart')}</span><span style="flex:1"><b>ارتباط با مرکز مشاوره</b><span>ارجاع محرمانه از مسیر رسمی دانشگاه</span></span>${icon('chevron')}</button><button class="support-option" data-page="assistant"><span class="stat-icon gold-bg">${icon('chat')}</span><span style="flex:1"><b>سؤال سریع از دستیار درس‌بان</b><span>راهنمایی دربارهٔ مسیر و منابع</span></span>${icon('chevron')}</button><section class="section soft-card" style="padding:15px"><div class="row gap-8">${icon('lock')}<b class="small">حریم خصوصی تو مهم است</b></div><p class="body-copy small" style="margin-top:6px">در این پیش‌نمایش اطلاعاتی ارسال نمی‌شود. در محصول نهایی، فقط دادهٔ لازم با رضایت تو ثبت می‌شود.</p></section></div></div>`;
  }

  function assistantScreen() {
    const chatItems = state.chat.length ? state.chat : [
      { who: 'bot', text: 'سلام. این بخش برای نمایش گفت‌وگوی دستیار مطالعه طراحی شده است.' },
      { who: 'bot', text: 'یک درس را انتخاب کن تا مسیر مرور پیشنهادی‌اش را ببینی. این پاسخ، نمونهٔ ازپیش‌نوشته‌شده است.' }
    ];
    return `<div class="screen">${topbar('دستیار مطالعه',{actions:`<button class="icon-button" data-action="open-modal" data-modal="bot-info">${icon('question')}</button>`})}<div class="page-content"><div class="mentor-preview" style="margin-bottom:12px"><span class="stat-icon">${icon('spark')}</span><span class="mentor-copy"><b>راهنمای مطالعهٔ درس‌بان</b><p>این نسخه فقط گفت‌وگو را شبیه‌سازی می‌کند.</p></span><span class="pill green">پیش‌نمایش</span></div><div class="chat-window"><div class="chat-date">گفت‌وگوی پیش‌نمایش</div>${chatItems.map(m=>`<div class="bubble ${m.who==='user'?'user':'bot'}">${esc(m.text)}<span class="bubble-time">${m.who==='user'?'پیام شما':'راهنمای مطالعه'}</span></div>`).join('')}</div><div class="chat-suggestions" style="margin-top:10px"><button data-chat="برای خون‌شناسی از کجا شروع کنم؟">خون‌شناسی</button><button data-chat="برای قارچ‌شناسی راهنمایی می‌خواهم">قارچ‌شناسی</button><button data-chat="برای ایمنی‌شناسی منبع معرفی کن">ایمنی‌شناسی</button></div><form class="chat-input" id="chat-form"><input id="chat-text" placeholder="نام درس یا مبحث را بنویس" autocomplete="off"><button class="send-button" type="submit" aria-label="ارسال">${icon('send')}</button></form><div class="privacy-note" style="margin-top:12px">${icon('info')} این گفت‌وگو به بات تلگرام یا سامانهٔ هوشمند متصل نیست.</div><div class="screen-footer">در نسخهٔ نهایی، پاسخ‌ها باید از منابع آموزشی تأییدشده تهیه شوند.</div></div></div>`;
  }

  function compassScreen() {
    const a = state.wizardAnswers;
    let body = '';
    if (state.wizardStep === 1) body = `<div class="eyebrow">۱ از ۳ • انتخاب درس</div><h1 class="h2" style="font-size:18px;margin-top:6px">الان کدام درس بیشتر در ذهنت است؟</h1><div class="choice-list">${courses.slice(0,4).map(c=>`<button class="choice ${a.course===c.id?'selected':''}" data-answer="course" data-value="${c.id}">${c.title}</button>`).join('')}</div>`;
    else if (state.wizardStep === 2) body = `<div class="eyebrow">۲ از ۳ • پیدا کردن گره</div><h1 class="h2" style="font-size:18px;margin-top:6px">برای این درس بیشتر چه چیزی لازم داری؟</h1><div class="choice-list">${[['resource','پیدا کردن منبع درست'],['understand','فهمیدن یک مبحث دشوار'],['plan','چیدن برنامهٔ مرور'],['mentor','پرسیدن از یک منتور']].map(([v,l])=>`<button class="choice ${a.need===v?'selected':''}" data-answer="need" data-value="${v}">${l}</button>`).join('')}</div>`;
    else if (state.wizardStep === 3) body = `<div class="eyebrow">۳ از ۳ • زمان در دسترس</div><h1 class="h2" style="font-size:18px;margin-top:6px">امروز چقدر زمان داری؟</h1><div class="choice-row">${[['15','۱۵ دقیقه'],['25','۲۵ دقیقه'],['40','۴۰ دقیقه']].map(([v,l])=>`<button class="choice ${a.minutes===v?'selected':''}" data-answer="minutes" data-value="${v}">${l}</button>`).join('')}</div>`;
    else {
      const c = courseById(a.course || 'anatomy');
      const r = resources.find(x=>x.course===c.id) || resources[0];
      body = `<div class="eyebrow">قطب‌نمای یادگیری</div><h1 class="h2" style="font-size:19px;margin-top:5px">برنامهٔ پیشنهادی برای ${c.title}</h1><p class="body-copy" style="margin-top:5px">این برنامه از انتخاب‌های تو ساخته شده است؛ پیش از اجرا آن را با برنامهٔ درسی‌ات هماهنگ کن.</p><div class="route-result" style="margin-top:14px"><b>برنامهٔ ${a.minutes||25} دقیقه‌ای</b><p>۱) ${a.need==='plan'?'هدف جلسه را مرور کن': 'طرح محتوای مرتبط را ببین'}<br>۲) ${a.need==='mentor'?'پرسشت را برای گفت‌وگو آماده کن':'سه نکتهٔ اصلی را یادداشت کن'}<br>۳) یک پرسش از خودت بساز و پاسخ را با جزوهٔ درس بررسی کن.</p></div><div class="resource-row" style="margin-top:12px" data-resource="${r.id}"><span class="resource-thumb">${icon(r.kind)}</span><span class="resource-info"><b>${r.title}</b><span>${r.status} • ${courseById(r.course).title}</span></span>${icon('chevron')}</div><button class="button full" style="margin-top:13px" data-action="show-selected-path">دیدن مسیر مطالعه ${icon('arrow')}</button><button class="button outline full" style="margin-top:8px" data-page="assistant">گفت‌وگو با راهنمای مطالعه</button>`;
    }
    const footer = state.wizardStep <= 3 ? `<div class="choice-row" style="margin-top:17px">${state.wizardStep>1?'<button class="button outline" data-action="wizard-prev">قبلی</button>':''}<button class="button" style="flex:1" data-action="wizard-next">${state.wizardStep===3?'دیدن پیشنهاد من':'ادامه'} ${icon('arrow')}</button></div>` : `<button class="button outline full" style="margin-top:9px" data-action="wizard-reset">پاسخ دوباره</button>`;
    return `<div class="screen">${topbar('قطب‌نمای یادگیری',{actions:`<span class="pill gold">مسیر شخصی</span>`})}<div class="page-content"><div class="compass-step"><div class="step-dots">${[1,2,3].map(i=>`<span class="${state.wizardStep>=i?'active':''}"></span>`).join('')}</div>${body}${footer}</div><div class="screen-footer">پیشنهاد پایانی بر اساس درس، نیاز و زمان انتخاب‌شده تنظیم می‌شود.</div></div></div>`;
  }

  function uploadScreen() {
    return `<div class="screen">${topbar('پیشنهاد محتوا')}<div class="page-content"><div class="screen-heading"><div class="eyebrow">مشارکت در یادگیری</div><h1 class="h1">پیشنهاد محتوا</h1><p class="body-copy">این فرم برای نمایش روند ثبت محتواست؛ ارسال واقعی در این نسخه فعال نیست.</p></div><div class="form-field"><label>عنوان محتوا</label><input id="upload-title" placeholder="مثلاً مرور مبحث جلسهٔ دوم"></div><div class="form-field"><label>درس مرتبط</label><select id="upload-course">${courses.map(c=>`<option value="${c.id}">${c.title}</option>`).join('')}</select></div><div class="form-field"><label>قالب محتوا</label><select><option>راهنمای مطالعه</option><option>جزوهٔ آموزشی</option><option>نقشهٔ مفهومی</option><option>نمونه‌سؤال با مجوز انتشار</option></select></div><button class="upload-zone" style="width:100%;border-width:1.5px;color:inherit" data-action="choose-file"><span class="stat-icon">${icon('upload')}</span><b id="file-label">انتخاب فایل (در این نسخه غیرفعال)</b><span>PDF یا تصویر • بارگذاری پس از اتصال به سامانه</span></button><div class="form-field"><label>منبع و توضیح</label><textarea placeholder="منبع تهیه و نکته‌ای که برای بازبینی لازم است"></textarea></div><label class="check-row"><input type="checkbox" id="rights-check"><span>تأیید می‌کنم اجازهٔ انتشار این محتوا را دارم و منبع آن را درج کرده‌ام.</span></label><button class="button full" data-action="submit-upload">نمایش روند ثبت ${icon('arrow')}</button><div class="privacy-note" style="margin-top:12px">${icon('shield')} پیش از انتشار، مجوز استفاده و تأیید علمی باید بررسی شود.</div></div></div>`;
  }

  function adminScreen() {
    return `<div class="screen">${topbar('پنل راهبری آموزشی',{actions:`<span class="pill gold">پیش‌نمایش</span>`})}<div class="page-content"><section class="dashboard-hero"><div class="eyebrow">گزارش راهبری آموزشی</div><h1 class="h2">نمای کلی فهرست درس‌بان</h1><p>این صفحه محل نمایش آمار استفاده، درخواست‌های دانشجویان و وضعیت بازبینی محتواست.</p></section><div class="metric-grid"><div class="metric-card"><span>عنوان درسی</span><b>${courses.length.toLocaleString('fa-IR')}</b><small>در فهرست پیشنهادی</small></div><div class="metric-card"><span>طرح محتوایی</span><b>${resources.length.toLocaleString('fa-IR')}</b><small>بدون فایل آموزشی</small></div><div class="metric-card"><span>پروفایل راهنما</span><b>${mentors.length.toLocaleString('fa-IR')}</b><small>برای نمایش مسیر انتخاب</small></div><div class="metric-card"><span>درخواست واقعی</span><b>۰</b><small>در این نسخه ثبت نمی‌شود</small></div></div><section class="section card bar-chart"><div class="section-head"><h2 class="h2">گزارش فعالیت دانشجویان</h2><span class="pill blue">در انتظار اتصال</span></div><div class="empty-state">پس از اتصال سامانه و ثبت داده‌های واقعی، تعداد پرسش‌ها و نیازهای آموزشی در این بخش نمایش داده می‌شود.</div></section><section class="section card" style="padding:14px"><div class="section-head"><h2 class="h2">صف بازبینی محتوا</h2><span class="pill gold">بدون مورد ثبت‌شده</span></div><div class="empty-state">در این پیش‌نمایش، محتوایی برای بازبینی ارسال نشده است.</div></section><section class="section"><button class="button secondary full" data-page="upload">دیدن فرم پیشنهاد محتوا ${icon('plus')}</button></section><div class="screen-footer">آمار و درخواست‌ها پس از اتصال به سامانهٔ واقعی در این صفحه قرار می‌گیرند.</div></div></div>`;
  }

  function offlineScreen() {
    const list = resources.filter(r=>isOffline(r.id));
    return `<div class="screen">${topbar('فهرست شخصی',{actions:`<span class="pill green">روی این دستگاه</span>`})}<div class="page-content"><section class="course-hero"><div class="course-hero-inner"><span class="eyebrow">عنوان‌های نشان‌شده</span><h1>فهرست شخصی تو</h1><p>اینجا عنوان‌هایی را می‌بینی که برای مرور دوباره ذخیره کرده‌ای.</p><div class="course-hero-bottom"><span class="course-hero-stat"><b>${list.length.toLocaleString('fa-IR')}</b>عنوان ذخیره‌شده</span><span class="course-hero-stat"><b>فایل آموزشی</b>در این نسخه موجود نیست</span></div></div></section><div class="privacy-note section">${icon('info')} فقط فهرست عنوان‌ها روی همین دستگاه ذخیره می‌شود؛ فایل آموزشی یا همگام‌سازی با سرور در این نسخه وجود ندارد.</div><section class="section"><div class="section-head"><h2 class="h2">عنوان‌های ذخیره‌شده</h2><span class="pill">${list.length.toLocaleString('fa-IR')} عنوان</span></div>${list.length?list.map(r=>`<div class="saved-resource" data-resource="${r.id}"><span class="resource-thumb">${icon(r.kind)}</span><span style="flex:1"><b>${r.title}</b><span>${courseById(r.course).title} • ${r.status}</span></span>${icon('bookmark')}</div>`).join(''):'<div class="empty-state">هنوز عنوانی ذخیره نکرده‌ای.</div>'}</section><div class="section"><button class="button outline full" data-page="library">دیدن طرح‌های محتوایی ${icon('search')}</button></div></div></div>`;
  }

  function notificationsScreen() {
    const items = [
      ['r8','یادآوری مطالعه','با انتخاب درس و زمان در قطب‌نما، برنامهٔ مرور بساز.','green'],
      ['m1','هماهنگی با راهنما','پس از ثبت درخواست واقعی، زمان گفت‌وگو در این بخش نمایش داده می‌شود.','coral'],
      ['r1','وضعیت طرح محتوا','نتیجهٔ بازبینی علمی پس از اتصال سامانه اینجا قرار می‌گیرد.','blue']
    ];
    return `<div class="screen">${topbar('اعلان‌ها',{actions:`<span class="pill gold">پیش‌نمایش</span>`})}<div class="page-content"><div class="screen-heading"><div class="eyebrow">اعلان‌های درس‌بان</div><h1 class="h1">یادآوری‌ها</h1><p class="body-copy">این کارت‌ها محل نمایش اعلان‌ها را نشان می‌دهند؛ پیام واقعی در این نسخه ثبت نشده است.</p></div>${items.map(([id,title,desc,tone])=>`<button class="resource-row card" style="width:100%;text-align:right;margin-bottom:8px" ${id.startsWith('m')?`data-mentor="${id}"`:`data-resource="${id}"`}><span class="stat-icon ${tone==='coral'?'coral-bg':tone==='blue'?'gold-bg':''}">${icon(id.startsWith('m')?'users':'bell')}</span><span class="resource-info"><b>${title}</b><span>${desc}</span></span></button>`).join('')}</div></div>`;
  }

  function studentAvatar() {
    return `<span class="avatar student-avatar" role="img" aria-label="تصویر نمایشی دانشجو"><svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="32" fill="#e5f1eb"/><path d="M8 64c1-13 10-21 24-21s23 8 24 21" fill="#fff"/><path d="m23 44 9 8 9-8 7 4-8 16H24l-8-16z" fill="#d4e8df"/><path d="M22 23c0-10 5-15 11-15 8 0 12 6 12 15v8c0 8-5 13-12 13s-11-5-11-13z" fill="#e8b99c"/><path d="M21 25c-1-12 5-19 13-19 8 0 13 6 12 18-3-2-6-6-7-9-4 5-10 8-18 8z" fill="#29413d"/><circle cx="28" cy="29" r="1.1" fill="#334541"/><circle cx="38" cy="29" r="1.1" fill="#334541"/><path d="M29 36c2 2 4 2 6 0" stroke="#a85f55" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="m28 47 4 5 4-5M32 52v12" stroke="#76a694" stroke-width="1.5" fill="none"/></svg></span>`;
  }

  function profileScreen() {
    const saved = resources.filter(r=>isSaved(r.id));
    return `<div class="screen">${topbar('پروفایل من',{actions:`<button class="icon-button" data-action="open-modal" data-modal="about">${icon('question')}</button>`})}<div class="page-content"><div class="profile-card card">${studentAvatar()}<span class="profile-identity"><b>${STUDENT_NAME}</b><span>رشتهٔ علوم آزمایشگاهی</span><span>دانشگاه علوم پزشکی بقیةالله (عج) • ورودی ۱۴۰۲</span><span>ترم ۶</span></span><span class="pill gold">پیش‌نمایش</span></div><div class="section-head section"><h2 class="h2">دسترسی‌های من</h2></div><div class="settings-list card"><button class="setting-row" data-page="offline"><span class="stat-icon">${icon('bookmark')}</span><b>فهرست شخصی</b><span class="pill">${offlineItems().length.toLocaleString('fa-IR')}</span>${icon('chevron','row-tail')}</button><button class="setting-row" data-page="library"><span class="stat-icon gold-bg">${icon('bookmark')}</span><b>نشان‌شده‌ها</b><span class="pill">${saved.length.toLocaleString('fa-IR')}</span>${icon('chevron','row-tail')}</button><button class="setting-row" data-page="path"><span class="stat-icon coral-bg">${icon('route')}</span><b>مسیر مطالعه</b>${icon('chevron','row-tail')}</button><button class="setting-row" data-page="upload"><span class="stat-icon">${icon('upload')}</span><b>پیشنهاد محتوا</b>${icon('chevron','row-tail')}</button><button class="setting-row" data-page="support"><span class="stat-icon coral-bg">${icon('heart')}</span><b>راهنمایی و پشتیبانی</b>${icon('chevron','row-tail')}</button><button class="setting-row" data-page="admin"><span class="stat-icon gold-bg">${icon('chart')}</span><b>پنل راهبری</b><span class="pill blue">پیش‌نمایش</span>${icon('chevron','row-tail')}</button></div><div class="section soft-card" style="padding:14px"><div class="row gap-8">${icon('shield')}<b class="small">حریم خصوصی و دسترسی</b></div><p class="body-copy small" style="margin-top:5px">در نسخهٔ نهایی، نقش‌ها، رضایت انتشار محتوا و مسیر ارجاع باید مطابق ضوابط دانشگاه پیاده‌سازی شوند.</p></div><div class="screen-footer">درس‌بان • پیش‌نمایش رابط</div></div></div>`;
  }

  function pageContent() {
    switch (state.page) {
      case 'landing': return landingScreen();
      case 'login': return loginScreen();
      case 'home': return homeScreen();
      case 'courses': return coursesScreen();
      case 'course': return courseScreen();
      case 'library': return libraryScreen();
      case 'resource': return resourceScreen();
      case 'path': return pathScreen();
      case 'mentors': return mentorsScreen();
      case 'mentor': return mentorScreen();
      case 'support': return supportScreen();
      case 'assistant': return assistantScreen();
      case 'compass': return compassScreen();
      case 'upload': return uploadScreen();
      case 'admin': return adminScreen();
      case 'offline': return offlineScreen();
      case 'notifications': return notificationsScreen();
      case 'profile': return profileScreen();
      default: return homeScreen();
    }
  }

  function selectLandingSlide(index) {
    landingSlideIndex = (index + landingSlides.length) % landingSlides.length;
    const hero = $('#public-hero');
    if (!hero) return;
    hero.dataset.tone = landingSlides[landingSlideIndex].tone;
    $$('.landing-slide', hero).forEach((slide, i) => {
      const active = i === landingSlideIndex;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    $$('.carousel-dot', hero).forEach((dot, i) => {
      const active = i === landingSlideIndex;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-pressed', String(active));
    });
  }

  function startLandingCarousel() {
    clearInterval(landingCarouselTimer);
    landingCarouselTimer = undefined;
    if (state.page !== 'landing' || state.carouselPaused || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    landingCarouselTimer = setInterval(() => selectLandingSlide(landingSlideIndex + 1), 6500);
  }

  function render() {
    $('#view').innerHTML = pageContent();
    renderTabbar();
    renderDesktopChrome();
    window.scrollTo(0, 0);
    $('#modal-root').innerHTML = '';
    startLandingCarousel();
  }

  function go(page, data = {}) {
    const privatePages = new Set(['home','courses','course','library','resource','path','mentors','mentor','support','assistant','compass','upload','admin','offline','notifications','profile']);
    if (privatePages.has(page) && !state.authenticated) {
      state.returnPage = page;
      state.returnData = data;
      state.previous.push({ page: state.page, courseTab: state.courseTab, filter: state.filter });
      state.page = 'login';
      return render();
    }
    state.previous.push({ page: state.page, courseTab: state.courseTab, filter: state.filter });
    state.page = page;
    Object.assign(state, data);
    if (page === 'course') state.courseTab = 'resources';
    render();
  }

  function back() {
    const p = state.previous.pop();
    if (p) Object.assign(state, p);
    else state.page = 'home';
    render();
  }
  window.darsbanBack = back;

  function toast(message) {
    const el = $('#toast');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2300);
  }

  function modal(title, body, actions = '') {
    $('#modal-root').innerHTML = `<div class="modal-backdrop" data-action="close-modal"><section class="modal"><div class="modal-handle"></div><h3>${title}</h3><p>${body}</p>${actions || `<button class="button full" data-action="close-modal">متوجه شدم</button>`}</section></div>`;
  }

  function openModal(kind) {
    if (kind === 'report') modal('بازخورد دربارهٔ طرح','اگر پیشنهادی برای کامل‌تر شدن این عنوان داری، موضوع را انتخاب کن. در این نسخه، پیام ارسال نمی‌شود.',`<div class="form-field"><label>موضوع بازخورد</label><select><option>پیشنهاد برای تکمیل محتوا</option><option>اصلاح عنوان یا توضیح</option><option>مورد دیگر</option></select></div><div class="modal-actions"><button class="button outline" data-action="close-modal">لغو</button><button class="button" data-action="confirm-modal">ادامه</button></div>`);
    else if (kind === 'booking') modal('درخواست گفت‌وگوی آموزشی','این فرم مسیر درخواست را نشان می‌دهد؛ در این نسخه، درخواست به منتور ارسال نمی‌شود.',`<div class="form-field"><label>موضوع گفت‌وگو</label><select><option>برنامه‌ریزی مطالعه</option><option>مرور یک درس</option><option>آشنایی با تجربهٔ رشته</option></select></div><div class="modal-actions"><button class="button outline" data-action="close-modal">لغو</button><button class="button" data-action="confirm-modal">ثبت درخواست نمونه</button></div>`);
    else if (kind === 'referral') modal('ارتباط با مرکز مشاوره','درس‌بان خدمات تشخیصی یا درمانی ارائه نمی‌کند. برای حمایت تخصصی، از مسیر رسمی مرکز مشاورهٔ دانشگاه اقدام کن. این نسخه درخواستی ثبت یا ارسال نمی‌کند.');
    else if (kind === 'review') modal('بازبینی محتوای آموزشی','پیش از انتشار، متن، ارجاع‌ها، مجوز استفاده و هم‌راستایی محتوا با سرفصل درس باید بررسی شود. در این نسخه، موردی به صف داوری فرستاده نمی‌شود.');
    else if (kind === 'sort') modal('مرتب‌سازی فهرست','گزینه‌های مرتب‌سازی در این نسخه فعال نیستند. پس از تکمیل کتابخانه، فهرست را می‌توان بر اساس درس یا قالب محتوا مرتب کرد.');
    else if (kind === 'bot-info') modal('دستیار مطالعه','پاسخ‌های این پیش‌نمایش از پیش نوشته شده‌اند و به مدل هوشمند یا بات تلگرام وصل نیستند. در نسخهٔ نهایی، اتصال و منبع پاسخ‌ها باید مشخص شود.');
    else if (kind === 'about') modal('دربارهٔ این نسخه','این فایل پیش‌نمایش رابط درس‌بان است. عنوان‌های درسی و طرح‌های محتوا پیشنهادی‌اند؛ فایل علمی، حساب کاربری، ارسال فرم و اتصال به منتور در این نسخه وجود ندارد.');
    else modal('پیش‌نمایش درخواست','این فرم فقط ظاهر و مراحل پیشنهادی را نشان می‌دهد؛ اطلاعاتی ثبت یا ارسال نشد.',`<button class="button full" data-action="close-modal">بازگشت به درس‌بان</button>`);
  }

  function sendChat(text) {
    const messages = [...state.chat, { who: 'user', text }];
    let answer = 'نام درس یا مبحث را مشخص کن تا طرح محتوای مرتبط را ببینی. پاسخ‌های این بخش از پیش نوشته شده‌اند.';
    if (text.includes('خون') || text.includes('هماتولوژی')) answer = 'در صفحهٔ خون‌شناسی، طرح «مرور خون‌سازی و رده‌های سلولی» قرار دارد. متن کامل آموزشی در این پیش‌نمایش درج نشده است.';
    else if (text.includes('قارچ')) answer = 'در صفحهٔ قارچ‌شناسی، قالب پیشنهادی جدول مرور را می‌بینی. محتوای علمی جدول باید از سوی گروه آموزشی تهیه و بازبینی شود.';
    else if (text.includes('ایمنی')) answer = 'برای ایمنی‌شناسی، طرح نقشهٔ مفاهیم در فهرست قرار دارد؛ این نسخه خود نقشه یا محتوای علمی آن را ارائه نمی‌کند.';
    else if (text.includes('آناتومی')) answer = 'در بخش آناتومی، طرح راهنمای مرور اندام فوقانی را باز کن. فایل یا متن کامل راهنما در این نسخه موجود نیست.';
    else if (text.includes('منبع')) answer = 'کتابخانه، عنوان و قالب پیشنهادی محتوا را نمایش می‌دهد؛ فایل آموزشی و ارجاع علمی در این نسخه درج نشده است.';
    else if (text.includes('منتور')) answer = 'صفحهٔ راهنمای درسی، حوزه‌های همراهی و فرم درخواست گفت‌وگو را نشان می‌دهد. درخواست واقعی ارسال نمی‌شود.';
    messages.push({ who: 'bot', text: answer });
    state.chat = messages.slice(-8);
    store.set('chat-clean-copy-v1', state.chat);
    render();
  }

  function activateAction(action, el) {
    const id = el.dataset.id;
    if (action === 'back') return back();
    if (action === 'logout') {
      state.authenticated = false;
      state.page = 'landing';
      state.previous = [];
      state.returnPage = null;
      state.returnData = null;
      state.carouselPaused = false;
      return render();
    }
    if (action === 'carousel-next') { state.carouselPaused = false; selectLandingSlide(landingSlideIndex + 1); return startLandingCarousel(); }
    if (action === 'carousel-prev') { state.carouselPaused = false; selectLandingSlide(landingSlideIndex - 1); return startLandingCarousel(); }
    if (action === 'carousel-to') { state.carouselPaused = false; selectLandingSlide(Number(el.dataset.index) || 0); return startLandingCarousel(); }
    if (action === 'carousel-toggle') {
      state.carouselPaused = !state.carouselPaused;
      el.innerHTML = icon(state.carouselPaused ? 'play' : 'pause');
      el.setAttribute('aria-label', state.carouselPaused ? 'ادامهٔ پخش خودکار' : 'توقف پخش خودکار');
      return startLandingCarousel();
    }
    if (action === 'bookmark') {
      const s = savedItems();
      store.set('saved', s.includes(id) ? s.filter(x=>x!==id) : [...s,id]);
      toast(s.includes(id) ? 'از نشان‌شده‌ها برداشته شد' : 'برای دسترسی سریع نشان شد');
      return render();
    }
    if (action === 'download') {
      const s = offlineItems();
      if (!s.includes(id)) store.set('offline',[...s,id]);
      toast('عنوان به فهرست شخصی افزوده شد');
      return render();
    }
    if (action === 'toggle-task') {
      const s = completedTasks();
      store.set(`tasks:${state.courseId}`, s.includes(id) ? s.filter(x=>x!==id) : [...s,id]);
      return render();
    }
    if (action === 'open-modal') return openModal(el.dataset.modal);
    if (action === 'close-modal') { $('#modal-root').innerHTML = ''; return; }
    if (action === 'confirm-modal') {
      const modalText = $('#modal-root .modal h3')?.textContent || '';
      $('#modal-root').innerHTML = '';
      if (modalText.includes('گفت‌وگو')) toast('درخواست فقط در پیش‌نمایش نمایش داده شد؛ ارسال نشد.');
      else if (modalText.includes('مرکز مشاوره')) toast('برای هماهنگی، از مسیر رسمی دانشگاه اقدام کن.');
      else if (modalText.includes('بازخورد')) toast('بازخوردی ارسال نشد؛ این فرم نمایشی است.');
      else toast('در این نسخه اطلاعاتی ثبت یا ارسال نمی‌شود.');
      return;
    }
    if (action === 'wizard-next') {
      if (state.wizardStep === 1 && !state.wizardAnswers.course) state.wizardAnswers.course = 'anatomy';
      else if (state.wizardStep === 2 && !state.wizardAnswers.need) state.wizardAnswers.need = 'resource';
      else if (state.wizardStep === 3 && !state.wizardAnswers.minutes) state.wizardAnswers.minutes = '25';
      state.wizardStep = Math.min(4,state.wizardStep+1); return render();
    }
    if (action === 'wizard-prev') { state.wizardStep = Math.max(1,state.wizardStep-1); return render(); }
    if (action === 'wizard-reset') { state.wizardStep=1; state.wizardAnswers={}; return render(); }
    if (action === 'choose-file') { toast('انتخاب و بارگذاری فایل در این نسخه فعال نیست.'); return; }
    if (action === 'submit-upload') {
      if (!$('#upload-title')?.value.trim()) return toast('نام منبع را وارد کن');
      if (!$('#rights-check')?.checked) return toast('برای ارسال، اجازهٔ انتشار را تأیید کن');
      toast('فرم فقط نمایشی است؛ محتوا به سامانه ارسال نشد.'); return;
    }
    if (action === 'clear-notifications') return toast('اعلان‌ها خوانده شدند');
    if (action === 'share') return toast('این نسخهٔ نمایشی به سرویس اشتراک‌گذاری متصل نیست.');
    if (action === 'global-search') {
      state.courseQuery = $('#global-search')?.value.trim() || '';
      return go('courses');
    }
    if (action === 'show-selected-path') return go('path',{courseId:state.wizardAnswers.course || 'anatomy'});
  }

  document.addEventListener('click', event => {
    if (event.target.closest('.modal') && !event.target.closest('.modal [data-action], .modal [data-page], .modal [data-course], .modal [data-resource], .modal [data-mentor]')) return;
    const el = event.target.closest('[data-page],[data-course],[data-resource],[data-mentor],[data-action],[data-course-tab],[data-filter],[data-answer],[data-chat],[data-scroll]');
    if (!el) return;
    if (el.dataset.scroll) {
      event.preventDefault();
      document.querySelector(el.dataset.scroll)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (el.dataset.page) return go(el.dataset.page);
    if (el.dataset.course) return go('course',{courseId:el.dataset.course});
    if (el.dataset.resource) return go('resource',{resourceId:el.dataset.resource});
    if (el.dataset.mentor) return go('mentor',{mentorId:el.dataset.mentor});
    if (el.dataset.courseTab) { state.courseTab=el.dataset.courseTab; return render(); }
    if (el.dataset.filter) {
      if (state.page==='courses') {
        state.courseCategory = el.dataset.filter;
        $$('.filter-chip').forEach(x=>x.classList.toggle('active',x===el));
        applyCourseFilters();
      } else { state.filter=el.dataset.filter; render(); }
      return;
    }
    if (el.dataset.answer) { state.wizardAnswers[el.dataset.answer]=el.dataset.value; return render(); }
    if (el.dataset.chat) return sendChat(el.dataset.chat);
    if (el.dataset.action === 'send-chat') return;
    activateAction(el.dataset.action,el);
  });

  document.addEventListener('input', event => {
    const el = event.target;
    if (el.dataset.search === 'courses') {
      state.courseQuery = el.value;
      applyCourseFilters();
    }
    if (el.dataset.search === 'resources') {
      const q = el.value.trim();
      $$('#resource-list .resource-card').forEach((row) => row.style.display = row.textContent.includes(q) ? 'block' : 'none');
    }
    if (el.dataset.search === 'public') {
      const q = el.value.trim().toLocaleLowerCase();
      $$('[data-public-searchable]').forEach((card) => { card.hidden = q !== '' && !card.textContent.toLocaleLowerCase().includes(q); });
    }
  });

  document.addEventListener('submit', event => {
    if (event.target.id === 'login-form') {
      event.preventDefault();
      const form = event.target;
      const username = form.elements.username.value.trim();
      const password = form.elements.password.value;
      if (username !== DEMO_CREDENTIALS.username || password !== DEMO_CREDENTIALS.password) {
        toast('نام کاربری یا کلمهٔ عبور نمونه درست نیست.');
        return;
      }
      state.authenticated = true;
      state.page = state.returnPage || 'home';
      Object.assign(state, state.returnData || {});
      state.returnPage = null;
      state.returnData = null;
      state.previous = [];
      render();
      toast('وارد پیش‌نمایش درس‌بان شدی.');
      return;
    }
    if (event.target.id === 'public-search-form') {
      event.preventDefault();
      const q = $('#public-search-input')?.value.trim();
      if (q) $('#public-features')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (event.target.id === 'chat-form') {
      event.preventDefault();
      const input = $('#chat-text');
      const text = input.value.trim();
      if (text) sendChat(text);
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Enter' && event.target?.id === 'global-search') {
      event.preventDefault();
      state.courseQuery = event.target.value.trim();
      go('courses');
    }
  });

  render();
})();
