const API_BASE = "https://pokeapi.co/api/v2";
const state = {
    limit: 12,
    offset: 0,
    total: 0,
    currentPokemonId: null,
    shinyMode: false
};

const pokemonCache = new Map();
const speciesCache = new Map();
const listCache = new Map();

const typeColors = {
    normal: "#c7c1b4",
    fire: "#ff8c64",
    water: "#66b4ff",
    electric: "#f7d64c",
    grass: "#89dc77",
    ice: "#9deaf5",
    fighting: "#eb6f68",
    poison: "#c67cf3",
    ground: "#d8b06f",
    flying: "#95b5ff",
    psychic: "#ff86c9",
    bug: "#a8d44f",
    rock: "#cfb36f",
    ghost: "#9088f6",
    dragon: "#6f8fff",
    dark: "#85786d",
    steel: "#a8becd",
    fairy: "#f9b0d7"
};

const dom = {
    searchForm: document.querySelector("#search-form"),
    searchInput: document.querySelector("#pokemon-search"),
    randomButton: document.querySelector("#random-button"),
    statusMessage: document.querySelector("#status-message"),
    rangeLabel: document.querySelector("#range-label"),
    countLabel: document.querySelector("#count-label"),
    featureCard: document.querySelector("#feature-card"),
    featureImage: document.querySelector("#feature-image"),
    featureName: document.querySelector("#feature-name"),
    featureId: document.querySelector("#feature-id"),
    featureTypes: document.querySelector("#feature-types"),
    featureFlavor: document.querySelector("#feature-flavor"),
    featureStatsSummary: document.querySelector("#feature-stats-summary"),
    featureAbilities: document.querySelector("#feature-abilities"),
    featureStatBars: document.querySelector("#feature-stat-bars"),
    spriteToggle: document.querySelector("#sprite-toggle"),
    pokemonGrid: document.querySelector("#pokemon-grid"),
    prevButton: document.querySelector("#prev-button"),
    nextButton: document.querySelector("#next-button")
};

function setStatus(message, isError = false) {
    dom.statusMessage.textContent = message;
    dom.statusMessage.style.color = isError ? "#ff94a6" : "";
}

function formatName(value) {
    return value
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

function clampStat(statValue) {
    return Math.min(100, Math.round((statValue / 180) * 100));
}

function getArtwork(pokemon, shiny = false) {
    const artwork =
        pokemon.sprites.other?.["official-artwork"]?.[shiny ? "front_shiny" : "front_default"] ||
        pokemon.sprites.other?.home?.[shiny ? "front_shiny" : "front_default"] ||
        pokemon.sprites[shiny ? "front_shiny" : "front_default"];

    return artwork || pokemon.sprites.other?.["official-artwork"]?.front_default || "";
}

function createTypePill(typeName, className = "type-pill") {
    const pill = document.createElement("span");
    pill.className = className;
    pill.textContent = formatName(typeName);
    pill.style.backgroundColor = typeColors[typeName] || "#d8dde4";
    return pill;
}

function createSummaryChip(label, value) {
    const chip = document.createElement("span");
    chip.className = "summary-chip";
    chip.textContent = `${label}: ${value}`;
    return chip;
}

async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
}

async function getPokemon(identifier) {
    const key = String(identifier).trim().toLowerCase();
    if (pokemonCache.has(key)) {
        return pokemonCache.get(key);
    }

    const pokemon = await fetchJson(`${API_BASE}/pokemon/${key}`);
    pokemonCache.set(key, pokemon);
    pokemonCache.set(String(pokemon.id), pokemon);
    pokemonCache.set(pokemon.name, pokemon);
    return pokemon;
}

async function getSpecies(speciesUrl) {
    if (speciesCache.has(speciesUrl)) {
        return speciesCache.get(speciesUrl);
    }

    const species = await fetchJson(speciesUrl);
    speciesCache.set(speciesUrl, species);
    return species;
}

async function getPokemonPage(offset) {
    const pageKey = `${state.limit}:${offset}`;
    if (listCache.has(pageKey)) {
        return listCache.get(pageKey);
    }

    const page = await fetchJson(`${API_BASE}/pokemon?limit=${state.limit}&offset=${offset}`);
    listCache.set(pageKey, page);
    return page;
}

function renderSkeletonCards() {
    dom.pokemonGrid.innerHTML = "";
    for (let index = 0; index < state.limit; index += 1) {
        const card = document.createElement("div");
        card.className = "skeleton-card";
        dom.pokemonGrid.append(card);
    }
}

function renderFeature(pokemon, species) {
    state.currentPokemonId = pokemon.id;

    const flavorEntry = species.flavor_text_entries.find((entry) => entry.language.name === "en");
    const flavorText = flavorEntry
        ? flavorEntry.flavor_text.replace(/\f/g, " ").replace(/\s+/g, " ").trim()
        : "No Pokedex entry available for this Pokemon yet.";

    const primaryType = pokemon.types[0]?.type.name || "normal";
    dom.featureCard.style.boxShadow = `0 26px 60px rgba(0, 0, 0, 0.28), 0 0 0 1px ${typeColors[primaryType] || "#ffffff22"} inset`;
    dom.featureName.textContent = formatName(pokemon.name);
    dom.featureId.textContent = `#${String(pokemon.id).padStart(4, "0")}`;
    dom.featureImage.src = getArtwork(pokemon, state.shinyMode);
    dom.featureImage.alt = `${formatName(pokemon.name)} artwork`;
    dom.featureFlavor.textContent = flavorText;
    dom.spriteToggle.textContent = state.shinyMode ? "Show Standard" : "Show Shiny";

    dom.featureTypes.innerHTML = "";
    pokemon.types.forEach((typeInfo) => {
        dom.featureTypes.append(createTypePill(typeInfo.type.name));
    });

    dom.featureStatsSummary.innerHTML = "";
    dom.featureStatsSummary.append(
        createSummaryChip("Height", `${pokemon.height / 10} m`),
        createSummaryChip("Weight", `${pokemon.weight / 10} kg`),
        createSummaryChip("Base XP", pokemon.base_experience ?? "N/A")
    );

    dom.featureAbilities.innerHTML = "";
    pokemon.abilities.forEach((abilityInfo) => {
        const ability = document.createElement("li");
        const suffix = abilityInfo.is_hidden ? " (Hidden)" : "";
        ability.textContent = `${formatName(abilityInfo.ability.name)}${suffix}`;
        dom.featureAbilities.append(ability);
    });

    dom.featureStatBars.innerHTML = "";
    pokemon.stats.forEach((statInfo) => {
        const item = document.createElement("div");
        item.className = "stat-item";

        const header = document.createElement("div");
        header.className = "stat-header";

        const statName = document.createElement("span");
        statName.textContent = statInfo.stat.name.replace("special-", "sp. ");

        const statValue = document.createElement("span");
        statValue.textContent = statInfo.base_stat;

        const track = document.createElement("div");
        track.className = "stat-track";

        const fill = document.createElement("div");
        fill.className = "stat-fill";
        fill.style.width = `${clampStat(statInfo.base_stat)}%`;

        header.append(statName, statValue);
        track.append(fill);
        item.append(header, track);
        dom.featureStatBars.append(item);
    });

    updateActiveCard();
}

function createPokemonCard(pokemon) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "pokemon-card";
    card.dataset.pokemonId = String(pokemon.id);

    const primaryType = pokemon.types[0]?.type.name || "normal";
    const artwork = getArtwork(pokemon);

    const top = document.createElement("div");
    top.className = "card-top";

    const number = document.createElement("span");
    number.className = "card-number";
    number.textContent = `#${String(pokemon.id).padStart(4, "0")}`;

    const hp = document.createElement("span");
    hp.className = "card-number";
    hp.textContent = `HP ${pokemon.stats.find((stat) => stat.stat.name === "hp")?.base_stat ?? "?"}`;

    top.append(number, hp);

    const artWrap = document.createElement("div");
    artWrap.className = "card-art-wrap";
    artWrap.style.background = `linear-gradient(160deg, ${typeColors[primaryType] || "#ffffff22"}55, transparent)`;

    const art = document.createElement("img");
    art.className = "card-art";
    art.src = artwork;
    art.alt = `${formatName(pokemon.name)} artwork`;
    artWrap.append(art);

    const titleRow = document.createElement("div");
    titleRow.className = "card-title-row";

    const name = document.createElement("h3");
    name.className = "card-name";
    name.textContent = formatName(pokemon.name);

    const totalStat = document.createElement("span");
    totalStat.className = "card-number";
    totalStat.textContent = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);

    titleRow.append(name, totalStat);

    const types = document.createElement("div");
    types.className = "card-type-row";
    pokemon.types.forEach((typeInfo) => {
        types.append(createTypePill(typeInfo.type.name, "mini-pill"));
    });

    card.append(top, artWrap, titleRow, types);
    card.addEventListener("click", async () => {
        await selectPokemon(pokemon);
    });

    return card;
}

function updateActiveCard() {
    document.querySelectorAll(".pokemon-card").forEach((card) => {
        const isActive = card.dataset.pokemonId === String(state.currentPokemonId);
        card.classList.toggle("is-active", isActive);
    });
}

function updatePager(rangeStart, rangeEnd) {
    dom.rangeLabel.textContent = `${rangeStart} - ${rangeEnd}`;
    dom.countLabel.textContent = `of ${state.total} Pokemon`;
    dom.prevButton.disabled = state.offset === 0;
    dom.nextButton.disabled = state.offset + state.limit >= state.total;
}

async function renderPokemonGrid(offset) {
    renderSkeletonCards();

    const page = await getPokemonPage(offset);
    state.offset = offset;
    state.total = page.count;

    const pokemonList = await Promise.all(page.results.map((entry) => getPokemon(entry.name)));

    dom.pokemonGrid.innerHTML = "";
    pokemonList.forEach((pokemon) => {
        dom.pokemonGrid.append(createPokemonCard(pokemon));
    });

    const rangeStart = page.results.length ? offset + 1 : 0;
    const rangeEnd = offset + page.results.length;
    updatePager(rangeStart, rangeEnd);

    return pokemonList;
}

async function selectPokemon(pokemonOrIdentifier) {
    try {
        setStatus("Loading Pokemon details...");
        const pokemon =
            typeof pokemonOrIdentifier === "object" ? pokemonOrIdentifier : await getPokemon(pokemonOrIdentifier);
        const species = await getSpecies(pokemon.species.url);
        renderFeature(pokemon, species);
        setStatus(`Showing ${formatName(pokemon.name)}.`);
    } catch (error) {
        console.error(error);
        setStatus("That Pokemon could not be found. Try a different name or number.", true);
    }
}

async function loadPage(offset, selectedIdentifier = null) {
    try {
        setStatus("Loading Pokemon page...");
        const pokemonList = await renderPokemonGrid(offset);
        const preferredPokemon =
            selectedIdentifier != null
                ? pokemonList.find((pokemon) => String(pokemon.id) === String(selectedIdentifier) || pokemon.name === selectedIdentifier)
                : pokemonList[0];

        if (preferredPokemon) {
            await selectPokemon(preferredPokemon);
        } else {
            dom.pokemonGrid.innerHTML = '<div class="empty-grid">No Pokemon were returned for this page.</div>';
            setStatus("No Pokemon found on this page.", true);
        }
    } catch (error) {
        console.error(error);
        dom.pokemonGrid.innerHTML =
            '<div class="empty-grid">The PokeAPI request failed. Check your internet connection and try again.</div>';
        setStatus("The PokeAPI request failed. Please try again.", true);
    }
}

async function handleSearch(event) {
    event.preventDefault();
    const query = dom.searchInput.value.trim().toLowerCase();
    if (!query) {
        setStatus("Enter a Pokemon name or number to search.", true);
        dom.searchInput.focus();
        return;
    }

    await selectPokemon(query);
}

async function handleRandomPokemon() {
    try {
        if (!state.total) {
            const firstPage = await getPokemonPage(state.offset);
            state.total = firstPage.count;
        }

        const randomOffset = Math.floor(Math.random() * state.total);
        const randomPage = await fetchJson(`${API_BASE}/pokemon?limit=1&offset=${randomOffset}`);
        const randomPokemonName = randomPage.results[0]?.name;

        if (!randomPokemonName) {
            throw new Error("Random Pokemon lookup returned no results.");
        }

        dom.searchInput.value = randomPokemonName;
        await selectPokemon(randomPokemonName);
    } catch (error) {
        console.error(error);
        setStatus("Could not fetch a random Pokemon right now.", true);
    }
}

async function toggleSpriteMode() {
    state.shinyMode = !state.shinyMode;
    if (!state.currentPokemonId) {
        return;
    }

    const currentPokemon = await getPokemon(state.currentPokemonId);
    const currentSpecies = await getSpecies(currentPokemon.species.url);
    renderFeature(currentPokemon, currentSpecies);
}

dom.searchForm.addEventListener("submit", handleSearch);
dom.randomButton.addEventListener("click", handleRandomPokemon);
dom.spriteToggle.addEventListener("click", toggleSpriteMode);
dom.prevButton.addEventListener("click", () => {
    const nextOffset = Math.max(0, state.offset - state.limit);
    loadPage(nextOffset, state.currentPokemonId);
});
dom.nextButton.addEventListener("click", () => {
    const nextOffset = state.offset + state.limit;
    if (nextOffset < state.total) {
        loadPage(nextOffset, state.currentPokemonId);
    }
});

loadPage(0);
