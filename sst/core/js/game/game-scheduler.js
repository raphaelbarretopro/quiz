function shuffle(list = []) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function uniqueRandomFromRange(start, end, usedPositions = new Set()) {
    const valid = [];
    for (let value = start; value <= end; value++) {
        if (!usedPositions.has(value)) {
            valid.push(value);
        }
    }

    if (!valid.length) return null;
    return valid[randomInt(0, valid.length - 1)];
}

function buildRanges(totalQuestions, slots) {
    if (slots <= 1) {
        return [[Math.max(0, Math.floor(totalQuestions / 2)), totalQuestions - 1]];
    }

    if (slots === 2) {
        const middle = Math.floor(totalQuestions / 2);
        return [
            [Math.max(0, Math.floor(middle / 2)), middle - 1],
            [middle, totalQuestions - 1]
        ];
    }

    const firstEnd = Math.max(0, Math.floor(totalQuestions / 3));
    const secondEnd = Math.max(firstEnd + 1, Math.floor((totalQuestions * 2) / 3));
    return [
        [Math.max(0, Math.floor(firstEnd / 2)), firstEnd],
        [firstEnd + 1, secondEnd],
        [secondEnd + 1, totalQuestions - 1]
    ];
}

function normalizeRangeValue(value, totalQuestions) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return null;

    if (numeric > 0 && numeric <= 1) {
        return Math.max(0, Math.min(totalQuestions - 1, Math.round(numeric * (totalQuestions - 1))));
    }

    return Math.max(0, Math.min(totalQuestions - 1, Math.round(numeric)));
}

function buildConfiguredRanges(totalQuestions, configuredRanges = [], fallbackSlots = 3) {
    const ranges = (configuredRanges || [])
        .map((entry) => {
            const startValue = entry?.start;
            const endValue = entry?.end;
            const start = normalizeRangeValue(startValue, totalQuestions);
            const end = normalizeRangeValue(endValue, totalQuestions);
            if (start === null || end === null) return null;
            return [Math.min(start, end), Math.max(start, end)];
        })
        .filter(Boolean);

    if (ranges.length) return ranges;
    return buildRanges(totalQuestions, fallbackSlots);
}

function buildGamePool(availableGameIds, configuredPool) {
    const availableSet = new Set((availableGameIds || []).filter(Boolean));
    const requested = (configuredPool || []).filter(Boolean);

    if (!requested.length) {
        return [...availableSet];
    }

    return requested.filter((gameId) => availableSet.has(gameId));
}

export function buildRandomGameSchedule(totalQuestions, availableGameIds = [], config = {}) {
    const total = Number(totalQuestions || 0);
    if (total <= 0) return [];

    const gamePool = buildGamePool(availableGameIds, config.gamePool);
    if (!gamePool.length) return [];

    const allowRepeatGames = Boolean(config.allowRepeatGames);
    const desiredSlots = Math.max(1, Math.floor(Number(config.slots || 3)));
    const maxByGames = allowRepeatGames ? desiredSlots : gamePool.length;
    const slots = Math.min(total, maxByGames, desiredSlots);

    const ranges = buildConfiguredRanges(total, config.positionRanges, slots).slice(0, slots);
    const gamesForRun = allowRepeatGames
        ? Array.from({ length: slots }, () => gamePool[randomInt(0, gamePool.length - 1)])
        : shuffle(gamePool).slice(0, slots);

    const usedPositions = new Set();
    const schedule = [];

    for (let index = 0; index < slots; index++) {
        const [start, end] = ranges[index] || [0, total - 1];
        const position = uniqueRandomFromRange(start, end, usedPositions)
            ?? uniqueRandomFromRange(0, total - 1, usedPositions)
            ?? (total - 1);

        usedPositions.add(position);
        schedule.push({
            position,
            gameId: gamesForRun[index],
            used: false
        });
    }

    return schedule.sort((a, b) => a.position - b.position);
}
