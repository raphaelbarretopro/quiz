const AVAILABLE_GAMES = ['pacman', 'enduro', 'trex', 'sokoban', 'mario', 'space', 'snake', 'memory', 'lordehero', 'frogger', 'tetris'];

const DEFAULT_GAME_SCHEDULE_CONFIG = {
    slots: 5,
    gamePool: AVAILABLE_GAMES,
    // Posições 0-indexed exatas: 9 (10ª), 19 (20ª), 29 (30ª), 39 (40ª), 49 (50ª questão)
    positionRanges: [
        { start: 8, end: 10 },
        { start: 18, end: 20 },
        { start: 28, end: 30 },
        { start: 38, end: 40 },
        { start: 48, end: 49 }
    ],
    allowRepeatGames: false
};

// Opcional: manter vazio por padrao. Se algum dia precisar forcar uma aula especifica,
// basta incluir o slug aqui sem alterar o formato do course-data.json.
const LESSON_GAME_SCHEDULE_OVERRIDES = {};

function hashString(value) {
    let hash = 2166136261;
    const input = String(value || 'default');
    for (let i = 0; i < input.length; i++) {
        hash ^= input.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
}

function mulberry32(seed) {
    let t = seed >>> 0;
    return function random() {
        t += 0x6D2B79F5;
        let n = Math.imul(t ^ (t >>> 15), 1 | t);
        n ^= n + Math.imul(n ^ (n >>> 7), 61 | n);
        return ((n ^ (n >>> 14)) >>> 0) / 4294967296;
    };
}

function shuffleWithRng(list, random) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function buildAutoRanges(random, slots) {
    const ranges = [];
    for (let index = 0; index < slots; index++) {
        const center = (index + 1) / (slots + 1);
        const width = 0.14 + random() * 0.08;
        const jitter = (random() - 0.5) * 0.08;
        const start = clamp(center - width / 2 + jitter, 0.05, 0.95);
        const end = clamp(center + width / 2 + jitter, 0.05, 0.95);
        ranges.push({
            start: Math.min(start, end),
            end: Math.max(start, end)
        });
    }
    return ranges;
}

function buildAutoLessonConfig(lessonSlug) {
    const normalizedSlug = String(lessonSlug || '').trim().toLowerCase() || 'default-lesson';
    const random = mulberry32(hashString(normalizedSlug));
    const slots = DEFAULT_GAME_SCHEDULE_CONFIG.slots;

    return {
        slots,
        gamePool: shuffleWithRng(AVAILABLE_GAMES, random),
        positionRanges: buildAutoRanges(random, slots),
        allowRepeatGames: false
    };
}

export function getLessonGameScheduleConfig(lessonSlug) {
    const normalizedSlug = String(lessonSlug || '').trim().toLowerCase();
    const overrideConfig = LESSON_GAME_SCHEDULE_OVERRIDES[normalizedSlug] || {};
    const autoConfig = buildAutoLessonConfig(normalizedSlug);

    return {
        ...DEFAULT_GAME_SCHEDULE_CONFIG,
        ...autoConfig,
        ...overrideConfig,
        gamePool: overrideConfig.gamePool || autoConfig.gamePool,
        positionRanges: overrideConfig.positionRanges || autoConfig.positionRanges
    };
}
