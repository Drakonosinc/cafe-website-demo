(() => {
  'use strict';

  /**
   * Formatea un importe entero en pesos argentinos (ej. 3200 -> "$ 3.200").
   * @param {number} amount
   * @param {string} [currency='$']
   * @returns {string}
   */
  function formatPrice(amount, currency = '$') {
    if (typeof amount !== 'number' || !Number.isFinite(amount) || amount < 0) {
      return '';
    }
    const rounded = Math.round(amount).toString();
    const grouped = rounded.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${currency} ${grouped}`;
  }

  /**
   * Filtra los ítems del menú por identificador de categoría.
   * @param {Array<Object>} items
   * @param {string} categoryId
   * @returns {Array<Object>}
   */
  function filterMenuItems(items, categoryId) {
    if (!Array.isArray(items)) return [];
    if (!categoryId || categoryId === 'todos') return items.slice();
    return items.filter((item) => item && item.category === categoryId);
  }

  /**
   * Construye la lista de pestañas agregando "Todos" al inicio.
   * @param {Array<{id: string, label: string}>} categories
   * @returns {Array<{id: string, label: string}>}
   */
  function buildTabsData(categories) {
    const safeCategories = Array.isArray(categories) ? categories : [];
    return [{ id: 'todos', label: 'Todos' }, ...safeCategories];
  }

  /**
   * Calcula el siguiente índice circular para el lightbox.
   * @param {number} current
   * @param {number} delta
   * @param {number} length
   * @returns {number}
   */
  function getWrappedIndex(current, delta, length) {
    if (!length || length <= 0) return 0;
    return ((current + delta) % length + length) % length;
  }

  /**
   * Valida los campos del formulario de contacto de la demo.
   * @param {{ nombre: string, email: string, mensaje: string }} values
   * @returns {{ valid: boolean, errors: Record<string, string>, confirmation: string }}
   */
  function validateContactForm(values) {
    const nombre = (values?.nombre ?? '').trim();
    const email = (values?.email ?? '').trim();
    const mensaje = (values?.mensaje ?? '').trim();
    const errors = {};

    if (nombre.length < 2) {
      errors.nombre = 'Ingresá tu nombre (al menos 2 caracteres).';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(email)) {
      errors.email = 'Ingresá un correo electrónico válido (ej. nombre@ejemplo.com).';
    }

    if (mensaje.length < 10) {
      errors.mensaje = 'Escribí un mensaje de al menos 10 caracteres.';
    }

    const valid = Object.keys(errors).length === 0;
    return {
      valid,
      errors,
      confirmation: valid
        ? 'Consulta validada correctamente. En la demo el formulario no envía datos.'
        : ''
    };
  }

  function getTagModifierClass(tagText) {
    const normalized = String(tagText || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '');
    if (normalized === 'vegano') return 'menu-tag--vegano';
    if (normalized === 'sintacc') return 'menu-tag--sintacc';
    return '';
  }

  function initScrollReveal() {
    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = Array.from(document.querySelectorAll('.reveal'));
    if (prefersReduced || !('IntersectionObserver' in window) || targets.length === 0) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    document.documentElement.classList.add('has-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('is-visible');
      } else {
        observer.observe(el);
      }
    });
  }

  function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('primary-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute(
        'aria-label',
        open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
      );
      nav.classList.toggle('is-open', open);
    }

    toggle.addEventListener('click', () => {
      const currentlyOpen = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!currentlyOpen);
    });

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        setOpen(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', (event) => {
      if (
        toggle.getAttribute('aria-expanded') === 'true' &&
        !nav.contains(event.target) &&
        !toggle.contains(event.target)
      ) {
        setOpen(false);
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
      }
    });
  }

  function createMenuCard(item, categoryMap, currency) {
    const li = document.createElement('li');
    const article = document.createElement('article');
    article.className = 'menu-card';

    const categorySpan = document.createElement('span');
    categorySpan.className = 'menu-category-label';
    categorySpan.textContent = categoryMap.get(item.category) || item.category;
    article.appendChild(categorySpan);

    const head = document.createElement('div');
    head.className = 'menu-card-head';

    const title = document.createElement('h3');
    title.className = 'menu-card-title';
    title.textContent = item.name;

    const price = document.createElement('span');
    price.className = 'menu-price';
    price.textContent = formatPrice(item.price, currency);

    head.append(title, price);
    article.appendChild(head);

    const desc = document.createElement('p');
    desc.className = 'menu-desc';
    desc.textContent = item.description;
    article.appendChild(desc);

    if (Array.isArray(item.tags) && item.tags.length > 0) {
      const tagList = document.createElement('ul');
      tagList.className = 'menu-tags';
      tagList.setAttribute('aria-label', 'Etiquetas');

      item.tags.forEach((tag) => {
        const tagItem = document.createElement('li');
        const modifier = getTagModifierClass(tag);
        tagItem.className = modifier ? `menu-tag ${modifier}` : 'menu-tag';
        tagItem.textContent = tag;
        tagList.appendChild(tagItem);
      });

      article.appendChild(tagList);
    }

    li.appendChild(article);
    return li;
  }

  function initMenu() {
    const tablist = document.getElementById('menu-tablist');
    const panel = document.getElementById('menu-panel');
    const grid = document.getElementById('menu-grid');
    const status = document.getElementById('menu-status');
    const noteEl = document.getElementById('menu-note');
    if (!tablist || !panel || !grid) return;

    const data = globalThis.CAFETERIA_MENU;
    if (!data || !Array.isArray(data.items)) {
      const empty = document.createElement('li');
      empty.className = 'menu-empty';
      empty.textContent = 'No se pudo cargar el menú desde data/menu.js.';
      grid.appendChild(empty);
      return;
    }

    if (noteEl && data.note) {
      noteEl.textContent = data.note;
    }

    const currency = data.currency || '$';
    const categoryMap = new Map(
      (data.categories || []).map((cat) => [cat.id, cat.label])
    );
    const tabs = buildTabsData(data.categories);
    let activeId = tabs[0]?.id || 'todos';

    function renderItems(tabId) {
      const filtered = filterMenuItems(data.items, tabId);
      grid.replaceChildren();

      if (filtered.length === 0) {
        const empty = document.createElement('li');
        empty.className = 'menu-empty';
        empty.textContent = 'No hay productos cargados en esta categoría.';
        grid.appendChild(empty);
      } else {
        const fragment = document.createDocumentFragment();
        filtered.forEach((item) => {
          fragment.appendChild(createMenuCard(item, categoryMap, currency));
        });
        grid.appendChild(fragment);
      }

      const activeTab = tabs.find((t) => t.id === tabId);
      panel.setAttribute('aria-labelledby', `tab-${tabId}`);
      if (status) {
        status.textContent = `Mostrando ${filtered.length} productos en ${activeTab ? activeTab.label : 'Menú'}.`;
      }
    }

    function selectTab(nextId, focusTab) {
      activeId = nextId;
      const buttons = Array.from(tablist.querySelectorAll('[role="tab"]'));
      buttons.forEach((btn) => {
        const selected = btn.dataset.categoryId === activeId;
        btn.setAttribute('aria-selected', String(selected));
        btn.tabIndex = selected ? 0 : -1;
        if (selected && focusTab) {
          btn.focus();
        }
      });
      renderItems(activeId);
    }

    const tabFragment = document.createDocumentFragment();
    tabs.forEach((tab) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.role = 'tab';
      btn.id = `tab-${tab.id}`;
      btn.className = 'menu-tab';
      btn.dataset.categoryId = tab.id;
      btn.setAttribute('aria-controls', 'menu-panel');
      btn.setAttribute('aria-selected', String(tab.id === activeId));
      btn.tabIndex = tab.id === activeId ? 0 : -1;
      btn.textContent = tab.label;

      btn.addEventListener('click', () => selectTab(tab.id, false));
      tabFragment.appendChild(btn);
    });
    tablist.appendChild(tabFragment);

    tablist.addEventListener('keydown', (event) => {
      const buttons = Array.from(tablist.querySelectorAll('[role="tab"]'));
      const currentIdx = buttons.indexOf(document.activeElement);
      if (currentIdx === -1) return;

      let targetIdx = null;
      if (event.key === 'ArrowRight') {
        targetIdx = getWrappedIndex(currentIdx, 1, buttons.length);
      } else if (event.key === 'ArrowLeft') {
        targetIdx = getWrappedIndex(currentIdx, -1, buttons.length);
      } else if (event.key === 'Home') {
        targetIdx = 0;
      } else if (event.key === 'End') {
        targetIdx = buttons.length - 1;
      }

      if (targetIdx !== null) {
        event.preventDefault();
        selectTab(buttons[targetIdx].dataset.categoryId, true);
      }
    });

    renderItems(activeId);
  }

  function initLightbox() {
    const galleryButtons = Array.from(document.querySelectorAll('.gallery-card'));
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (!lightbox || galleryButtons.length === 0 || !closeBtn || !prevBtn || !nextBtn) {
      return;
    }

    const items = galleryButtons.map((btn) => {
      const img = btn.querySelector('img');
      const titleEl = btn.querySelector('.gallery-title');
      return {
        trigger: btn,
        src: img ? img.getAttribute('src') : '',
        alt: img ? img.getAttribute('alt') : '',
        width: img ? img.getAttribute('width') : '480',
        height: img ? img.getAttribute('height') : '360',
        title: titleEl ? titleEl.textContent : 'Ilustración'
      };
    });

    const backgroundLandmarks = Array.from(
      document.querySelectorAll('body > .demo-banner, body > header, body > main, body > footer')
    );
    const focusableInDialog = [closeBtn, prevBtn, nextBtn];
    let currentIndex = 0;
    let lastTrigger = null;

    function updateSlide(index) {
      currentIndex = getWrappedIndex(index, 0, items.length);
      const item = items[currentIndex];
      lightboxImg.setAttribute('src', item.src);
      lightboxImg.setAttribute('alt', item.alt);
      lightboxImg.setAttribute('width', item.width);
      lightboxImg.setAttribute('height', item.height);
      lightboxTitle.textContent = item.title;
      lightboxDesc.textContent = item.alt;
      lightboxCounter.textContent = `Ilustración ${currentIndex + 1} de ${items.length}`;
    }

    function setBackgroundInert(state) {
      backgroundLandmarks.forEach((el) => {
        if ('inert' in el) {
          el.inert = state;
        }
        if (state) {
          el.setAttribute('aria-hidden', 'true');
        } else {
          el.removeAttribute('aria-hidden');
        }
      });
    }

    function openLightbox(index, triggerEl) {
      lastTrigger = triggerEl || items[index].trigger;
      updateSlide(index);
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      setBackgroundInert(true);
      closeBtn.focus();
    }

    function closeLightbox() {
      if (lightbox.hidden) return;
      lightbox.hidden = true;
      document.body.style.overflow = '';
      setBackgroundInert(false);
      if (lastTrigger && typeof lastTrigger.focus === 'function') {
        lastTrigger.focus();
      }
      lastTrigger = null;
    }

    galleryButtons.forEach((btn, idx) => {
      btn.addEventListener('click', () => openLightbox(idx, btn));
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => updateSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => updateSlide(currentIndex + 1));

    lightbox.addEventListener('click', (event) => {
      if (event.target.hasAttribute('data-lightbox-close')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (lightbox.hidden) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        closeLightbox();
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        updateSlide(currentIndex - 1);
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        updateSlide(currentIndex + 1);
        return;
      }

      if (event.key === 'Tab') {
        const first = focusableInDialog[0];
        const last = focusableInDialog[focusableInDialog.length - 1];
        const currentPos = focusableInDialog.indexOf(document.activeElement);

        if (event.shiftKey) {
          if (currentPos <= 0) {
            event.preventDefault();
            last.focus();
          }
        } else if (currentPos === -1 || currentPos >= focusableInDialog.length - 1) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }

  function initContactForm() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    if (!form || !feedback) return;

    const fields = {
      nombre: {
        input: document.getElementById('contact-nombre'),
        error: document.getElementById('error-nombre')
      },
      email: {
        input: document.getElementById('contact-email'),
        error: document.getElementById('error-email')
      },
      mensaje: {
        input: document.getElementById('contact-mensaje'),
        error: document.getElementById('error-mensaje')
      }
    };

    function clearFieldError(key) {
      const pair = fields[key];
      if (!pair || !pair.input || !pair.error) return;
      pair.input.removeAttribute('aria-invalid');
      pair.error.textContent = '';
    }

    Object.keys(fields).forEach((key) => {
      const pair = fields[key];
      if (pair.input) {
        pair.input.addEventListener('input', () => {
          clearFieldError(key);
          if (!feedback.hidden) {
            feedback.hidden = true;
            feedback.textContent = '';
          }
        });
      }
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const values = {
        nombre: fields.nombre.input ? fields.nombre.input.value : '',
        email: fields.email.input ? fields.email.input.value : '',
        mensaje: fields.mensaje.input ? fields.mensaje.input.value : ''
      };

      const result = validateContactForm(values);

      Object.keys(fields).forEach((key) => {
        const msg = result.errors[key];
        const pair = fields[key];
        if (!pair.input || !pair.error) return;
        if (msg) {
          pair.input.setAttribute('aria-invalid', 'true');
          pair.error.textContent = msg;
        } else {
          clearFieldError(key);
        }
      });

      if (!result.valid) {
        feedback.hidden = true;
        feedback.textContent = '';
        const firstInvalidKey = Object.keys(fields).find((key) => result.errors[key]);
        if (firstInvalidKey && fields[firstInvalidKey].input) {
          fields[firstInvalidKey].input.focus();
        }
        return;
      }

      feedback.textContent = result.confirmation;
      feedback.hidden = false;
      form.reset();
    });
  }

  function initApp() {
    initScrollReveal();
    initMobileNav();
    initMenu();
    initLightbox();
    initContactForm();
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initApp);
    } else {
      initApp();
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      formatPrice,
      filterMenuItems,
      buildTabsData,
      getWrappedIndex,
      validateContactForm
    };
  }
})();
