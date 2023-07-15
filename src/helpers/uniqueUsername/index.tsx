import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
  Config,
} from "unique-names-generator";

const getUniqueUsername = () => {
  const fingerprint =
    navigator.userAgent +
    Intl.DateTimeFormat().resolvedOptions().timeZone +
    navigator.language +
    navigator.maxTouchPoints +
    navigator.vendor;

  const config: Config = {
    dictionaries: [adjectives, colors, animals],
    separator: " ",
    seed: fingerprint,
  };

  return uniqueNamesGenerator(config);
};

export default getUniqueUsername;
