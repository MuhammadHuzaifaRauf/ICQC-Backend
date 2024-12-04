
const allVisibility = {
    BOARD_VISIBILITY: ['private', 'workspace', 'public']
};

const visibility = allVisibility.BOARD_VISIBILITY;
const visibilityRights = new Map(Object.entries(allVisibility));

module.exports = {
    visibility,
    visibilityRights
};