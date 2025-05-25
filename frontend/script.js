let shortlisted = new Set();
let filterOn = false;
let designers = [];

async function loadDesigners() {
    const res = await fetch('https://emptycup-1-9y9p.onrender.com/api/designers');
    designers = await res.json();
    renderDesigners();
}

function renderDesigners() {
    const container = document.getElementById('designer-list');
    container.innerHTML = '';

    const list = filterOn
        ? designers.filter(d => shortlisted.has(d.id))
        : designers;

    list.forEach((d,index) => {
        const div = document.createElement('div');
        div.className = 'designer-card';
           // Add alternating background class
        const bgClass = index % 2 === 0 ? 'card-dark' : 'card-light';
        div.classList.add(bgClass);

        div.innerHTML = `
      <div class="card-left">
        <h2>${d.name}</h2>
  <div class="rating">${'★'.repeat(Math.floor(d.rating)) + '☆'.repeat(5 - Math.floor(d.rating))}</div>
  <p>${d.description}</p>
  <div class="stats">
    <div><b>${d.projects}</b>Projects</div>
    <div><b>${d.years}</b>Years</div>
    <div><b>${d.price}</b>Price</div>
  </div>
  <div class="phone">
    +91 - 984532853<br />
    +91 - 984532854
  </div>
    </div>
      <div class="card-right">
         <div class="action-button">
    <img src="icons/details.svg" alt="Details" />
    <span>Details</span>
  </div>
  <div class="action-button">
    <img src="icons/hide.svg" alt="Hide" />
    <span>Hide</span>
  </div>
  <div class="action-button" onclick="toggleShortlist(${d.id})">
    <img src="icons/${shortlisted.has(d.id) ? 'shortlist-selected.svg' : 'shortlist-unselected.svg'}" alt="Shortlist" />
    <span>Shortlist</span>
  </div>
  <div class="action-button">
    <img src="icons/report.svg" alt="Report" />
    <span>Report</span>
  </div>
      </div>
    `;
        container.appendChild(div);
    });
}

function toggleShortlist(id) {
    if (shortlisted.has(id)) {
        shortlisted.delete(id);
    } else {
        shortlisted.add(id);
    }
    renderDesigners();
}

document.getElementById('shortlist-filter').addEventListener('click', () => {
    filterOn = !filterOn;
    renderDesigners();
});

loadDesigners();
