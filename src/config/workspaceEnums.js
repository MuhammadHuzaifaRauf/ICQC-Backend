const allOptions = {
  OPTIONS: [
    'education',
    'human Resources',
    'operations',
    'sales CRM',
    'small Business',
    'engineering-IT',
    'marketing',
    'other',
  ],
};

const options = allOptions.OPTIONS;
const optionsRights = new Map(Object.entries(allOptions));

module.exports = {
  options,
  optionsRights,
};
