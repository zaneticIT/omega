import validator from "validator";

export const convertDateToGeneral = (date) => {
  return new Date(date)
    .toLocaleString("en-CA", {
      dateStyle: "short",
    })
    .replace(/\//gi, "-");
};

export const convertDateToCroatian = (date) => {
  return new Date(date).toLocaleString("hr-HR", {
    dateStyle: "long",
  });
};

export const getCurrentYear = () => {
  return new Date().getFullYear();
};

export const whichInput = (value, name) => {
  switch (name) {
    case "kupac":
      return matchName(value).isValid;
    case "broj_ugovora":
      return matchBroj(value).isValid;
    case "datum_akonotacije":
      return matchDatum(value).isValid;
    case "rok_isporuke":
      return matchDatum(value).isValid;
    case "status":
      return matchStatus(value).isValid;
    default:
      return false;
  }
};

export const matchName = (value) => {
  const nameSanitized = validator.escape(value);
  if (
    validator.matches(nameSanitized, /[a-zčćžšđ\s]+$/i) ||
    nameSanitized.length() === 0
  ) {
    return { isValid: true };
  } else {
    return { isValid: false };
  }
};

export const matchBroj = (value) => {
  const brojSanitized = validator.escape(value);
  if (
    validator.matches(brojSanitized, /^([1-9]|1[0-2])\/\d{4}$/) ||
    brojSanitized.length() === 0
  ) {
    return { isValid: true };
  } else {
    return { isValid: false };
  }
};

export const matchDatum = (value) => {
  if (
    validator.isDate(value, { format: "YYYY-MM-DD", delimiters: ["/", "-"] }) ||
    value.length() === 0
  ) {
    return { isValid: true };
  } else {
    return { isValid: false };
  }
};

export const matchStatus = (value) => {
  const statusSanitized = validator.escape(value);
  if (statusSanitized === "KREIRANO" || statusSanitized.length() === 0) {
    return { isValid: true };
  } else {
    return { isValid: false };
  }
};
