const codeService = require("../services/code.service");

const codeCache = new Map();

const debounceTimers = new Map();

const MAX_DEBOUNCE = 2000;

const scheduleSave = (roomId, data) => {
  codeCache.set(roomId, data);

  if (debounceTimers.has(roomId)) {
    clearTimeout(debounceTimers.get(roomId));
  }

  const timer = setTimeout(async () => {
    try {
      const latest = codeCache.get(roomId);

      if (!latest) return;

      await codeService.updateCodeContent(
        roomId,
        latest.updatedBy,
        latest.content,
        latest.language
      );

      debounceTimers.delete(roomId);
    } catch (err) {
      console.error(err);
    }
  }, MAX_DEBOUNCE);

  debounceTimers.set(roomId, timer);
};

const flush = async (roomId) => {
  if (!codeCache.has(roomId)) return;

  try {
    const latest = codeCache.get(roomId);

    await codeService.updateCodeContent(
      roomId,
      latest.updatedBy,
      latest.content,
      latest.language
    );
  } finally {
    if (debounceTimers.has(roomId)) {
      clearTimeout(debounceTimers.get(roomId));
    }

    debounceTimers.delete(roomId);

    codeCache.delete(roomId);
  }
};

const flushAll = async () => {
  const rooms = [...codeCache.keys()];

  await Promise.all(
    rooms.map((roomId) => flush(roomId))
  );
};

const getLatestCode = async (roomId, userId) => {
  if (codeCache.has(roomId)) {
    return codeCache.get(roomId);
  }

  return await codeService.getCode(roomId, userId);
};

module.exports = {
  scheduleSave,
  flush,
  flushAll,
  getLatestCode
};