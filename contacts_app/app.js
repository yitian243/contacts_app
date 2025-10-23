let contacts = [];
let filteredContacts = [];
const avatarColors = ['#3b82f6','#10b981','#8b5cf6','#ec4899','#6366f1','#eab308','#ef4444','#14b8a6'];

function getInitials(name){ return name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);}
function getAvatarColor(id){ return avatarColors[id % avatarColors.length]; }

function renderContacts(list){
    const grid = document.getElementById('contactsGrid');
    const resultsCount = document.getElementById('resultsCount');
    const noResults = document.getElementById('noResults');

    resultsCount.textContent = `${list.length} ${list.length===1?'contact':'contacts'} found`;

    if(list.length===0){ grid.style.display='none'; noResults.style.display='block'; return;}
    grid.style.display='grid'; noResults.style.display='none';
    grid.innerHTML = list.map(contact => `
        <div class="contact-card" onclick="showModal(${contact.id})">
            <div class="card-content">
                <div class="card-header">
                    <div class="avatar" style="background-color:${getAvatarColor(contact.id)}">${getInitials(contact.name)}</div>
                    <div>
                        <div class="contact-name">${contact.name}</div>
                        <div class="contact-username">@${contact.username}</div>
                    </div>
                </div>
                <div class="contact-info">
                    <div class="info-row"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><span>${contact.email}</span></div>
                    <div class="info-row"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg><span>${contact.phone}</span></div>
                    <div class="info-row"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg><span>${contact.company.name}</span></div>
                </div>
            </div>
            <div class="card-footer"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline; vertical-align:middle; margin-right:5px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${contact.address.city}, ${contact.address.street}</div>
        </div>
    `).join('');

    // Animate cards
    const cards = document.querySelectorAll('.contact-card');
    cards.forEach((card,i)=> setTimeout(()=>card.classList.add('show'), i*50));
}

function showModal(contactId) {
    const contact = contacts.find(c => c.id === contactId);
    if (!contact) return;

    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <div class="modal-header">
            <div class="modal-avatar" style="background-color: ${getAvatarColor(contact.id)}">
                ${getInitials(contact.name)}
            </div>
            <div>
                <div class="modal-title">${contact.name}</div>
                <div class="contact-username">@${contact.username}</div>
            </div>
        </div>

        <div class="modal-section">
            <div class="section-title">Contact Information</div>
            <div class="detail-row">
                <div>
                    <div class="detail-label">Email</div>
                    <div class="detail-value">${contact.email}</div>
                </div>
            </div>
            <div class="detail-row">
                <div>
                    <div class="detail-label">Phone</div>
                    <div class="detail-value">${contact.phone}</div>
                </div>
            </div>
            <div class="detail-row">
                <div>
                    <div class="detail-label">Website</div>
                    <div class="detail-value">${contact.website}</div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <div class="section-title">Address</div>
            <div class="detail-row">
                <div>
                    <div class="detail-value">${contact.address.suite}, ${contact.address.street}</div>
                    <div class="detail-value">${contact.address.city}, ${contact.address.zipcode}</div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <div class="section-title">Company</div>
            <div class="detail-row">
                <div>
                    <div class="detail-value" style="font-weight: 600;">${contact.company.name}</div>
                    <div class="detail-value" style="font-style: italic; font-size: 0.9rem;">${contact.company.catchPhrase}</div>
                    <div class="detail-value" style="color: #888; font-size: 0.9rem;">${contact.company.bs}</div>
                </div>
            </div>
        </div>

        <button class="close-btn" onclick="closeModal()">Close</button>
    `;

    document.getElementById('modal').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

function handleSearch(term){ filterSortContacts(term, document.getElementById('companyFilter').value, document.getElementById('cityFilter').value, document.getElementById('sortSelect').value); }

function filterSortContacts(search='', company='', city='', sort=''){
    filteredContacts = contacts.filter(c=>{
        return c.name.toLowerCase().includes(search.toLowerCase()) ||
               c.email.toLowerCase().includes(search.toLowerCase()) ||
               c.company.name.toLowerCase().includes(search.toLowerCase());
    });
    if(company) filteredContacts = filteredContacts.filter(c=>c.company.name===company);
    if(city) filteredContacts = filteredContacts.filter(c=>c.address.city===city);
    if(sort){
        filteredContacts.sort((a,b)=> (a[sort] || a.address[sort] || a.company[sort]).localeCompare(b[sort] || b.address[sort] || b.company[sort]));
    }
    renderContacts(filteredContacts);
}

// Populate filter dropdowns
function populateFilters(){
    const companySet = new Set(contacts.map(c=>c.company.name));
    const citySet = new Set(contacts.map(c=>c.address.city));
    const companyFilter = document.getElementById('companyFilter');
    const cityFilter = document.getElementById('cityFilter');
    companySet.forEach(c=>{ const opt=document.createElement('option'); opt.value=c; opt.text=c; companyFilter.appendChild(opt); });
    citySet.forEach(c=>{ const opt=document.createElement('option'); opt.value=c; opt.text=c; cityFilter.appendChild(opt); });
}

// Fetch contacts
fetch('https://jsonplaceholder.typicode.com/users').then(r=>r.json()).then(data=>{
    contacts = data; filteredContacts = data;
    document.getElementById('loadingState').style.display='none';
    renderContacts(filteredContacts);
    populateFilters();
}).catch(e=>{ console.error(e); document.getElementById('loadingState').innerHTML='<p>Error loading contacts</p>'; });

// Event listeners
document.getElementById('searchInput').addEventListener('input',(e)=>handleSearch(e.target.value));
document.getElementById('companyFilter').addEventListener('change',()=>handleSearch(document.getElementById('searchInput').value));
document.getElementById('cityFilter').addEventListener('change',()=>handleSearch(document.getElementById('searchInput').value));
document.getElementById('sortSelect').addEventListener('change',()=>handleSearch(document.getElementById('searchInput').value));
document.getElementById('modal').addEventListener('click',e=>{ if(e.target.id==='modal'){ closeModal(); }});
