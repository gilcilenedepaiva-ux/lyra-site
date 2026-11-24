/* Funções compartilhadas pelas demonstrações Lyra */
window.LyraDemo = (function(){
  var $ = function(id){ return document.getElementById(id); };
  var q = new URLSearchParams(location.search);
  var emp = (q.get('e') || '').trim().slice(0, 40);

  // título aparecendo palavra por palavra
  function words(el, start){
    var n = 0, d0 = start || 0;
    (function walk(node){
      [].slice.call(node.childNodes).forEach(function(c){
        if(c.nodeType === 3){
          var parts = c.textContent.split(/(\s+)/), frag = document.createDocumentFragment();
          parts.forEach(function(p){
            if(!p) return;
            if(/^\s+$/.test(p)){ frag.appendChild(document.createTextNode(p)); return; }
            var s = document.createElement('span'); s.className = 'w'; s.textContent = p;
            s.style.animationDelay = (d0 + n++ * 0.07) + 's'; frag.appendChild(s);
          });
          c.parentNode.replaceChild(frag, c);
        } else if(c.nodeType === 1 && c.tagName !== 'svg'){ walk(c); }
      });
    })(el);
  }

  // sublinhado desenhado na palavra em destaque
  function underline(el){
    if(!el) return;
    var svg = '<svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true"><path d="M2 8 C 40 2, 80 2, 110 6 S 170 11, 198 4"/></svg>';
    el.insertAdjacentHTML('beforeend', svg);
  }

  // aparece ao rolar
  function reveal(){
    var els = document.querySelectorAll('.rv');
    if(!('IntersectionObserver' in window)){ [].forEach.call(els, function(e){ e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); }, {threshold: .12});
    [].forEach.call(els, function(e){ io.observe(e); });
  }

  // botão fixo de WhatsApp no celular: aparece depois do topo e some quando o CTA final está visível
  function sticky(){
    var s = $('sticky'), cta = document.querySelector('.cta');
    if(!s) return;
    var ctaVis = false;
    if(cta && 'IntersectionObserver' in window){
      new IntersectionObserver(function(es){ ctaVis = es[0].isIntersecting; upd(); }, {threshold: .2}).observe(cta);
    }
    function upd(){ s.classList.toggle('on', scrollY > 420 && !ctaVis); }
    addEventListener('scroll', upd, {passive: true}); upd();
  }

  // links entre as demos levando nome e ramo
  function nav(ramo){
    var p = new URLSearchParams(); if(emp) p.set('e', emp); if(ramo) p.set('r', ramo);
    [].forEach.call(document.querySelectorAll('[data-p]'), function(a){ a.href = a.getAttribute('data-p') + '?' + p.toString(); });
  }

  function wa(texto){
    var href = 'https://wa.me/5562994643122?text=' + encodeURIComponent(texto);
    [].forEach.call(document.querySelectorAll('.js-wa'), function(a){ a.href = href; });
  }

  // trilho de chips (ramo etc.)
  function chips(box, items, cur, label, onpick){
    Object.keys(items).forEach(function(k){
      var b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = label(k);
      b.setAttribute('aria-pressed', k === cur);
      b.onclick = function(){
        [].forEach.call(box.querySelectorAll('.chip'), function(c){ c.setAttribute('aria-pressed', c === b); });
        b.scrollIntoView({behavior: 'smooth', inline: 'center', block: 'nearest'});
        onpick(k);
      };
      box.appendChild(b);
    });
    var on = box.querySelector('[aria-pressed=true]');
    if(on) setTimeout(function(){ box.scrollLeft = on.offsetLeft - box.clientWidth / 2 + on.clientWidth / 2; }, 50);
  }

  // painel "bastidores"
  function Core(logEl, progEl, total){
    progEl.innerHTML = new Array(total + 1).join('<i></i>');
    return {
      reset: function(msg){ logEl.innerHTML = '<li class="empty">' + (msg || 'aguardando a primeira mensagem…') + '</li>'; this.prog(0); },
      line: function(hora, html){
        var e = logEl.querySelector('.empty'); if(e) e.remove();
        [].forEach.call(logEl.querySelectorAll('.cur'), function(x){ x.classList.remove('cur'); });
        var li = document.createElement('li'); li.className = 'cur';
        li.innerHTML = '<time>' + hora + '</time><span>' + html + '</span>';
        logEl.appendChild(li);
      },
      prog: function(n){ [].forEach.call(progEl.children, function(c, i){ c.classList.toggle('on', i < n); }); }
    };
  }

  function esc(s){ var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  function slug(s){ return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 28) || 'suaempresa'; }

  function init(){
    var h = document.querySelector('h1');
    if(h) words(h, 0.1);
    reveal(); sticky();
  }

  return {emp: emp, q: q, $: $, words: words, nav: nav, wa: wa, chips: chips, Core: Core, esc: esc, slug: slug, init: init};
})();
