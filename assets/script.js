// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const jumbotron = document.querySelector('.jumbotron');

    function createStarFirework(x, y) {
        const star = document.createElement('div');
        star.classList.add('firework', 'star');
        star.style.left = x + 'px';
        star.style.top = y + 'px';

        jumbotron.appendChild(star);

        setTimeout(() => {
            star.classList.add('explode');
        }, 50); // Explode quickly for a star effect

        setTimeout(() => {
            star.classList.add('fade-out');
        }, 800); // Start fading out after the explosion

        setTimeout(() => {
            jumbotron.removeChild(star);
        }, 1500); // Remove after the fade-out
    }

    function spawnStar() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const startX = Math.random() * windowWidth;
        const startY = Math.random() * windowHeight;

        createStarFirework(startX, startY);
    }

    // Spawn a star on a timer
    setInterval(spawnStar, 50);
});

// Project loader
fetch('assets/projects.json')
  .then(r => r.json())
  .then(projects => {
    const container = document.querySelector('#projectContainer');
    if (!container) return;

    projects.forEach((p, idx) => {
      const col = document.createElement('div');
      col.className = 'col-sm-6 col-lg-4 mb-4';

      const card = document.createElement('div');
      card.className = 'card h-100';

      // ---------- Media ----------
      if (Array.isArray(p.images) && p.images.length) {
        const cId = `carousel-${idx}`;
        card.innerHTML += `
          <div id="${cId}" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner ratio ratio-4x3">
              ${p.images.map((src, i) => `
                <div class="carousel-item ${i === 0 ? 'active' : ''}">
                  <img src="${src}" class="d-block w-100" alt="${p.title} image ${i + 1}">
                </div>`).join('')}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#${cId}" data-bs-slide="prev">
              <span class="carousel-control-prev-icon"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#${cId}" data-bs-slide="next">
              <span class="carousel-control-next-icon"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>`;
      } else if (p.image) {
        card.innerHTML += `
          <div class="ratio ratio-1x1">
            <img src="${p.image}" class="card-img-top" alt="${p.title}">
          </div>`;
      } else {
        card.classList.add('no-img');
      }

      // ---------- Body ----------
      const body = document.createElement('div');
      body.className = 'card-body d-flex flex-column py-2';

      body.innerHTML += `
        <h6 class="card-title mb-2">${p.title}</h6>
        <p class="card-text small mb-3">${p.description}</p>
        <div class="d-flex justify-content-between align-items-center mt-auto">
        <div class="btn-group">
          ${Array.isArray(p.links) ? p.links.map(link =>
            `<a href="${link.url}" target="_blank" class="btn btn-sm btn-outline-secondary">${link.label}</a>`
          ).join('') : ''}
        </div>
          <small class="text-muted">${p.date}</small>
        </div>`;

      card.appendChild(body);
      col.appendChild(card);
      container.appendChild(col);
    });
  })
  .catch(console.error);
