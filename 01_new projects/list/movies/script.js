const toWatchEl = document.getElementById('to-watch');
const watchedEl = document.getElementById('watched');
const userInfoEl = document.getElementById('user-info');

async function loadUser() {
    const res = await fetch('me.php');
    if (res.ok) {
        const u = await res.json();
        if (userInfoEl) userInfoEl.textContent = 'Logged in as ' + u.name_id;
    }
}
loadUser();

async function load() {
    const res = await fetch('data.php');
    if (res.status === 401) {
        window.location.href = 'login.php';
        return;
    }
    const movies = await res.json();
    if (!Array.isArray(movies)) {
        toWatchEl.textContent = 'Error: ' + (movies.error || 'failed to load');
        return;
    }
    toWatchEl.innerHTML = '';
    watchedEl.innerHTML = '';
    for (const m of movies) {
        if (m.watched) watchedEl.appendChild(renderCard(m));
        else toWatchEl.appendChild(renderCard(m));
    }
}

function renderCard(m) {
    const card = document.createElement('div');
    card.className = 'card';

    const h3 = document.createElement('h3');
    h3.textContent = m.title + (m.year ? ' (' + m.year + ')' : '');
    card.appendChild(h3);

    if (m.genre) {
        const genre = document.createElement('div');
        genre.className = 'meta';
        genre.textContent = m.genre;
        card.appendChild(genre);
    }
    if (m.reason) {
        const reason = document.createElement('div');
        reason.className = 'reason';
        reason.textContent = m.reason;
        card.appendChild(reason);
    }
    if (m.notes) {
        const notes = document.createElement('div');
        notes.className = 'notes';
        notes.textContent = m.notes;
        card.appendChild(notes);
    }

    if (m.link) {
        const a = document.createElement('a');
        a.href = m.link;
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = 'Link';
        card.appendChild(a);
    }

    card.appendChild(watchedToggle(m));
    card.appendChild(ratingControl(m));
    card.appendChild(deleteButton(m));

    return card;
}

function watchedToggle(m) {
    const label = document.createElement('label');
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = !!m.watched;
    box.addEventListener('change', () => update(m.id, 'watched', box.checked ? '1' : '0'));
    label.appendChild(box);
    label.appendChild(document.createTextNode(' Watched'));
    return label;
}

function ratingControl(m) {
    const label = document.createElement('label');
    label.className = 'rating';
    label.appendChild(document.createTextNode('Rating: '));
    const sel = document.createElement('select');
    const opts = ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    for (const o of opts) {
        const opt = document.createElement('option');
        opt.value = o;
        opt.textContent = o || '--';
        if (String(m.rating) === String(o)) opt.selected = true;
        sel.appendChild(opt);
    }
    sel.addEventListener('change', () => update(m.id, 'rating', sel.value || 'null'));
    label.appendChild(sel);
    return label;
}

function deleteButton(m) {
    const btn = document.createElement('button');
    btn.textContent = 'Delete';
    btn.addEventListener('click', async () => {
        const body = new URLSearchParams({ id: m.id });
        await fetch('delete.php', { method: 'POST', body });
        load();
    });
    return btn;
}

async function update(id, field, value) {
    const body = new URLSearchParams({ id, field, value });
    await fetch('update.php', { method: 'POST', body });
    load();
}

load();
