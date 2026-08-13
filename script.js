document.getElementById('year').textContent = new Date().getFullYear();

  // mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  }));

  // terminal typewriter
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const term = document.getElementById('typedTerminal');
  const script = [
    { p: true,  t: 'whoami' },
    { p: false, t: 'Iqram Bin Mohd Rafie' },
    { p: true,  t: 'cat status.txt' },
    { p: false, t: 'Computer Science graduate — Software Engineering track.\nBuilding backend systems, databases, and AI-integrated tools.' },
    { p: true,  t: 'echo $LOCATION' },
    { p: false, t: 'Kulai, Johor, Malaysia — willing to relocate', dim:true }
  ];

  function render(){
    term.innerHTML = '';
    script.forEach(line => {
      const div = document.createElement('div');
      div.className = 'line';
      if(line.p){
        div.innerHTML = '<span class="prompt">' + line.t + '</span>';
      } else {
        div.innerHTML = '<span class="out' + (line.dim ? ' dim' : '') + '">' + line.t.replace(/\n/g,'<br>') + '</span>';
      }
      term.appendChild(div);
    });
    const cur = document.createElement('span');
    cur.className = 'cursor';
    term.appendChild(cur);
  }

  if(reduceMotion){
    render();
  } else {
    let li = 0;
    function typeLine(){
      if(li >= script.length){ 
        const cur = document.createElement('span');
        cur.className = 'cursor';
        term.appendChild(cur);
        return;
      }
      const line = script[li];
      const div = document.createElement('div');
      div.className = 'line';
      const span = document.createElement('span');
      span.className = line.p ? 'prompt' : ('out' + (line.dim ? ' dim' : ''));
      div.appendChild(span);
      term.appendChild(div);
      const text = line.t;
      let ci = 0;
      const speed = line.p ? 38 : 10;
      (function typeChar(){
        if(ci < text.length){
          span.innerHTML += text[ci] === '\n' ? '<br>' : text[ci];
          ci++;
          setTimeout(typeChar, speed);
        } else {
          li++;
          setTimeout(typeLine, line.p ? 250 : 400);
        }
      })();
    }
    typeLine();
  }

  // fake frame counter ticking on the video-frame panel
  if(!reduceMotion){
    const fc = document.getElementById('frameCounter');
    let n = 32;
    setInterval(() => {
      n = (n + 1) % 999;
      fc.textContent = String(n).padStart(4,'0');
    }, 900);
  }