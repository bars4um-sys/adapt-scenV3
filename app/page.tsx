"use client"

import { useEffect, useRef, useState } from "react"
import "./course.css"

const basePath = "/adapt-scenV3"

const Chevron = ({ className }: { className: string }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M5 7.5l5 5 5-5" />
  </svg>
)

const programModules = [
  {
    n: "01",
    title: "Введение в анализ текста",
    tag: "Занятия 1–2",
    items: [
      "Возможности литературного текста и его элементы",
      "Методы литературного анализа как инструменты для экранизации",
    ],
  },
  {
    n: "02",
    title: "Жанры и нарративные стратегии",
    tag: "Занятия 3–5",
    items: [
      "Жанр и его особенности, соотношение литературных и киножанров",
      "Малые эпические формы. Повествователь и герой - варианты моделирования нарратива",
    ],
  },
  {
    n: "03",
    title: "Два языка",
    tag: "Занятия 6–7",
    items: [
      "Литературность и кинематографичность",
      "Перевод филосовских смыслов литературного текста в киноповествование",
    ],
  },
  {
    n: "04",
    title: "Практикум",
    tag: "Занятия 8–9",
    items: [
      "Обсуждение синопсисов",
      "Практические рекомендации по доработке синопсис",
    ],
  },
  {
    n: "05",
    title: "Драма как род",
    tag: "Занятия 10–12",
    items: [
      "Жанр драмы. Особенности театрального и кинотекста",
      "Примеры автопереводов",
    ],
  },
  {
    n: "06",
    title: "Романная форма",
    tag: "Занятия 13–14",
    items: [
      "Разновидности романов, особенность романного героя",
      "Принципы работы с романной фабулой и смыслами при сокращении",
    ],
  },
  {
    n: "07",
    title: "Защита проектов",
    tag: "Занятия 15",
    items: ["Разбор поэпизодников. Финальный практикум"],
    result: "Итог курса: готовый синопсис + поэпизодник (ПЭП)",
  },
]

const films = [
  {
    year: "1988",
    name: "«Собачье сердце»",
    director: "реж. В. Бортко",
    img: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&q=80",
    desc: "Разбор экранизации Михаила Булгакова Владимиром Бортко. Анализ причин успеха переноса сатирической прозы на экран, работа с диалогом и визуальной метафорой.",
    learn:
      "На этом примере вы научитесь находить в прозе уже готовый кинематографический каркас — и понимать, почему одни тексты переносятся на экран легко, а другие нет.",
  },
  {
    year: "2014",
    name: "«Солнечный удар»",
    director: "реж. Н. Михалков",
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
    desc: "Экранизация прозы Ивана Бунина. Как нарратив от третьего лица переводится в визуальный ряд, приёмы создания атмосферы и внутреннего мира героя.",
    learn:
      "На этом примере вы научитесь переводить «невидимый» нарратор третьего лица в визуальные решения — атмосферу, детали, монтаж.",
  },
  {
    year: "1930 / 1979 / 2022",
    name: "«На западном фронте без перемен»",
    director: "реж. Майлстоун / Манн / Бергер",
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
    desc: "Сравнение трёх экранизаций романа Ремарка. Эволюция киноязыка от классического Голливуда до современного реализма.",
    learn:
      "На этом примере вы научитесь видеть, какие решения автора поддаются переносу на экран, а какие требуют замены — и как одна и та же книга превращается в три разных фильма.",
  },
  {
    year: "2018",
    name: "«Королевская игра»",
    director: "реж. Ф. Штёльцель",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    desc: "Экранизация новеллы Стефана Цвейга. Приёмы перевода замкнутого пространства в визуальный нарратив, работа с внутренним монологом.",
    learn:
      "На этом примере вы научитесь работать с «непереводимым» — внутренним монологом и замкнутым пространством, которые кажутся невозможными для экрана.",
  },
  {
    year: "1960",
    name: "«Шахматная новелла»",
    director: "реж. Г. Освальд",
    img: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&q=80",
    desc: "Ранняя экранизация Цвейга. Сравнение подходов к адаптации одного литературного источника разными режиссёрами и кинематографическими школами.",
    learn:
      "На этом примере вы научитесь сравнивать адаптерские стратегии: как один источник порождает разные фильмы в зависимости от эпохи и школы.",
  },
  {
    year: "1968",
    name: "«Ромео и Джульетта»",
    director: "реж. Ф. Дзеффирелли",
    img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80",
    desc: "Классическая экранизация Шекспира. Работа с поэтическим текстом и стихотворной трагедией, поиск визуальных эквивалентов для метафор.",
    learn:
      "На этом примере вы научитесь искать визуальные эквиваленты поэтических метафор — то, что в стихе звучит, на экране должно быть видно.",
  },
  {
    year: "1996",
    name: "«Ромео + Джульетта»",
    director: "реж. Б. Лурман",
    img: "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?w=600&q=80",
    desc: "Постмодернистская адаптация. Осовременивание классического текста через визуальный стиль, монтаж и музыку при сохранении оригинального языка.",
    learn: "На этом примере вы научитесь «осовременивать» классику без потери смысла — как менять форму, сохраняя суть.",
  },
  {
    year: "1957",
    name: "«Летят журавли»",
    director: "реж. М. Калатозов",
    img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80",
    desc: "Экранизация пьесы Виктора Розова «Вечно живые». Пример автоперевода драматургического текста в кинотекст, приёмы расширения пространства.",
    learn:
      "На этом примере вы научитесь «разжимать» театральное пространство в кинематографическое — превращать диалог на сцене в действие в кадре.",
  },
]

const marquee = [
  "Булгаков",
  "Бунин",
  "Ремарк",
  "Цвейг",
  "Шекспир",
  "Розов",
  "Собачье сердце",
  "Летят журавли",
  "Солнечный удар",
  "Ромео и Джульетта",
]

const skills = [
  "Готовый синопсис — 2–5 страниц, которые можно отправить продюсеру или на питчинг",
  "Поэпизодник — структурированный план всего фильма с разбивкой по сценам",
  "Понимание механики адаптации на примерах мировой классики",
  "Личный разбор вашего проекта с обратной связью преподавателя",
  "Навык анализа любого литературного текста инструментарием кинематографиста",
  "Записи всех 15 занятий навсегда и сертификат об окончании курса",
]

const pricing = [
  {
    name: "Базовый",
    price: "15 000 ₽",
    installment: "или рассрочка от 1 250 ₽/мес",
    features: [
      "15 занятий онлайн в Zoom",
      "Записи лекций навсегда",
      "Материалы и списки литературы",
      "Сертификат об окончании",
    ],
    btnClass: "btn btn-dark",
    subject: "Базовый",
  },
  {
    name: "С разбором",
    price: "35 000 ₽",
    installment: "или рассрочка от 2 917 ₽/мес",
    featured: true,
    features: [
      "Всё из Базового",
      "Письменный разбор синопсиса — в течение 5 дней",
      "Разбор поэпизодника с комментариями по каждой сцене",
      "Личный фидбек от Екатерины Москвиной",
    ],
    btnClass: "btn btn-primary",
    subject: "С разбором",
  },
  {
    name: "VIP",
    price: "65 000 ₽",
    installment: "или рассрочка от 5 417 ₽/мес",
    features: [
      "Всё из «С разбором»",
      "2 индивидуальные консультации по 60 минут",
      "Сопровождение 3 месяца после курса",
      "Закрытый чат выпускников в Telegram",
    ],
    btnClass: "btn btn-dark",
    subject: "VIP",
  },
]

const faqs = [
  {
    q: "Нужен ли опыт в сценарном деле?",
    a: "Курс подходит тем, кто разбирается в литературе и кино на уровне насмотренного читателя. Специального сценарного образования не нужно.",
  },
  {
    q: "Как проходит обучение?",
    a: "Занятия проходят онлайн в Zoom, 2 раза в неделю по 1,5 - 2 часа. Записи занятий доступны после окончания курса в течении месяца",
  },
  {
    q: "Какой текст я могу адаптировать?",
    a: "Вы выбираете любое классическое произведение малой прозы или драматургии. В течение курса вы напишете синопсис и поэпизодник по выбранному тексту",
  },
  {
    q: "Что я получу по итогам курса?",
    a: "Готовый синопсис и поэпизодник вашего проекта, сертификат об окончании, и главное — навык анализа любого литературного текста для кино.",
  },
  {
    q: "Есть ли рассрочка?",
    a: "Да, доступна беспроцентная рассрочка на два платежа. Подробности уточняйте у менеджера при записи.",
  },
]

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 },
    )
    document.querySelectorAll(".section").forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openProg, setOpenProg] = useState<number | null>(null)
  const [openFilm, setOpenFilm] = useState<number | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useReveal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.pageYOffset > 60)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navItems = [
    ["#about", "О курсе"],
    ["#program", "Программа"],
    ["#films", "Фильмы"],
    ["#author", "Автор"],
    ["#pricing", "Тарифы"],
    ["#faq", "FAQ"],
  ]

  return (
    <div className="course course-scroll" ref={rootRef}>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#hero" className="logo">
            Адаптированный
            <br />
            сценарий
          </a>
          <button className="burger" aria-label="Меню" onClick={() => setMenuOpen((v) => !v)}>
            <span />
            <span />
            <span />
          </button>
          <ul className={`nav-links${menuOpen ? " open" : ""}`}>
            {navItems.map(([href, label]) => (
              <li key={href}>
                <a href={href} onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#pricing" className="nav-cta">
            Записаться
          </a>
        </div>
      </nav>

      <section className="hero" id="hero">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Онлайн-курс
          </div>
          <h1 className="hero-h1">
            Адаптиро&shy;ванный <em>сценарий</em>
          </h1>
          <p className="hero-sub">От литературы — к экрану</p>
          <p className="hero-desc">
            Научитесь превращать книги и пьесы в сценарии. 15 занятий с личным разбором вашего проекта.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-val">15</span>
              <span className="stat-lbl">занятий</span>
            </div>
            <div className="hero-stat">
              <span className="stat-val">1,5–2ч</span>
              <span className="stat-lbl">каждое</span>
            </div>
            <div className="hero-stat">
              <span className="stat-val">1 ПЭП</span>
              <span className="stat-lbl">в результате</span>
            </div>
          </div>
          <div className="hero-actions">
            <a href="#pricing" className="btn btn-primary">
              Выбрать тариф →
            </a>
            <a href="#program" className="btn-ghost">
              Программа курса
            </a>
          </div>
        </div>
        <div className="hero-right">
          <img src={`${basePath}/hero-cinema.png`} alt="Открытая книга и киноплёнка в тёплом свете" className="hero-photo" />
          <div className="hero-photo-overlay" />
          <div className="hero-quote-card">
            <span className="hero-quote-mark">{'"'}</span>
            <p className="hero-quote-text">
              Адаптация — это не пересказ книги. Это поиск того, что в ней кинематографично по самой своей природе.
            </p>
            <div className="hero-quote-author">Екатерина Москвина</div>
          </div>
        </div>
      </section>

      <div className="strip" aria-hidden="true">
        <div className="strip-track">
          {[...marquee, ...marquee].map((m, i) => (
            <span className="strip-item" key={i}>
              {m}
            </span>
          ))}
        </div>
      </div>

      <section className="section about" id="about">
        <div className="container">
          <div className="sec-label">Для кого</div>
          <h2 className="sec-title">Курс подойдёт вам, если вы…</h2>
          <div className="about-grid">
            <div className="about-card">
              <div className="about-num">01</div>
              <h3>Сценарист или драматург</h3>
              <p>Хотите освоить адаптацию литературных произведений и расширить свою профессию</p>
            </div>
            <div className="about-card">
              <div className="about-num">02</div>
              <h3>Филолог или литератор</h3>
              <p>Чувствуете кино в любимых текстах и хотите научиться его оттуда извлекать</p>
            </div>
            <div className="about-card">
              <div className="about-num">03</div>
              <h3>Режиссёр или продюсер</h3>
              <p>Ищете качественный литературный материал и хотите понять, как с ним работать</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section program" id="program">
        <div className="container">
          <div className="sec-label">Программа</div>
          <h2 className="sec-title">
            7 модулей — от анализа текста
            <br />
            до готового поэпизодника
          </h2>
          <div className="prog-list">
            {programModules.map((m, i) => (
              <div key={m.n} className={`prog-item${openProg === i ? " active" : ""}`}>
                <div className="prog-n">{m.n}</div>
                <div className="prog-body">
                  <button className="prog-header" onClick={() => setOpenProg(openProg === i ? null : i)}>
                    <span className="prog-title">{m.title}</span>
                    <span className="prog-tag">{m.tag}</span>
                    <Chevron className="prog-arrow" />
                  </button>
                  <div className="prog-drop">
                    <ul>
                      {m.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                    {m.result && <div className="prog-result">{m.result}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section films" id="films">
        <div className="container">
          <div className="sec-label">Материалы курса</div>
          <h2 className="sec-title">Фильмы для анализа</h2>
          <p className="sec-desc">Нажмите на фильм, чтобы увидеть кадр и описание</p>
          <div className="films-accordion">
            {films.map((f, i) => (
              <div key={f.name + f.year} className={`film-acc-item${openFilm === i ? " active" : ""}`}>
                <button className="film-acc-header" onClick={() => setOpenFilm(openFilm === i ? null : i)}>
                  <span className="film-year">{f.year}</span>
                  <span className="film-name">{f.name}</span>
                  <span className="film-director">{f.director}</span>
                  <Chevron className="film-arrow" />
                </button>
                <div className="film-acc-body">
                  <div className="film-acc-inner">
                    <div className="film-acc-img" style={{ backgroundImage: `url('${f.img}')` }} />
                    <div className="film-acc-desc">
                      <p>{f.desc}</p>
                      <p className="film-learn">{f.learn}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section author" id="author">
        <div className="container">
          <div className="author-wrap">
            <div className="author-img-wrap">
              <img src={`${basePath}/author-warm.png`} alt="Екатерина Москвина" className="author-photo" />
            </div>
            <div className="author-info">
              <div className="sec-label">Автор курса</div>
              <h2 className="author-name">Екатерина Москвина</h2>
              <p className="author-role">Кандидат филологических наук, режиссёр</p>
              <p className="author-bio">
                Автор курса и преподаватель — кандидат филологических наук, режиссёр{" "}
                <strong>Екатерина Москвина</strong>. За плечами — многолетний опыт анализа литературных текстов и их
                перевода на язык кино.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section skills" id="skills">
        <div className="container">
          <div className="sec-label">Результат</div>
          <h2 className="sec-title">Что вы получите</h2>
          <div className="skills-grid">
            {skills.map((s, i) => (
              <div className="skill-card" key={s}>
                <div className="skill-num">{String(i + 1).padStart(2, "0")}</div>
                <p>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section pricing" id="pricing">
        <div className="container">
          <div className="sec-label">Стоимость</div>
          <h2 className="sec-title">Выберите формат</h2>
          <div className="pricing-grid">
            {pricing.map((p) => (
              <div key={p.name} className={`pricing-card${p.featured ? " pricing-card-featured" : ""}`}>
                {p.featured && <div className="pc-badge">Рекомендуем</div>}
                <div className="pc-name">{p.name}</div>
                <div className="pc-price">{p.price}</div>
                <div className="pc-installment">{p.installment}</div>
                <ul className="pc-features">
                  {p.features.map(( f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <a
                  href={`mailto:info@adaptscenario.ru?subject=Запись на курс — ${p.subject}`}
                  className={p.btnClass}
                >
                  Записаться
                </a>
              </div>
            ))}
          </div>
          <p className="pricing-note">
            Беспроцентная рассрочка на два платежа — уточните при записи
          </p>
        </div>
      </section>

      <section className="section faq" id="faq">
        <div className="container">
          <div className="sec-label">FAQ</div>
          <h2 className="sec-title">Частые вопросы</h2>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={f.q} className={`faq-item${openFaq === i ? " active" : ""}`}>
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <Chevron className="faq-arrow" />
                </button>
                <div className="faq-answer">
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <img src={`${basePath}/cta-cinema.png`} alt="" className="cta-bg" aria-hidden="true" />
        <div className="cta-overlay" />
        <div className="cta-inner">
          <h2 className="cta-title">Начните писать свой сценарий</h2>
          <p className="cta-desc">Превратите любимый текст в кино — от первой страницы до готового поэпизодника.</p>
          <a href="#pricing" className="btn btn-white">
            Выбрать тариф
          </a>
          <p className="cta-note">Следующий поток — уточните дату при записи</p>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-logo">Адаптированный сценарий</div>
          <div className="footer-contacts">
            <span>info@adaptscenario.ru</span>
          </div>
          <div className="footer-copy">© 2026 Екатерина Москвина</div>
        </div>
      </footer>
    </div>
  )
}
