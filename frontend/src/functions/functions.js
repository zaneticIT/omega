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
  }
};

export const matchName = (value) => {
  const nameSanitized = validator.escape(value);
  if (
    nameSanitized.length > 0 &&
    validator.matches(nameSanitized, /[a-zčćžšđ\s]+$/i)
  ) {
    return { isValid: true, name: nameSanitized };
  } else {
    return { isValid: false, name: nameSanitized };
  }
};

export const matchBroj = (value) => {
  const brojSanitized = validator.escape(value);
  if (
    brojSanitized.length > 0 &&
    validator.matches(brojSanitized, /^([1-9]|1[0-2])\/\d{4}$/)
  ) {
    return { isValid: true, name: brojSanitized };
  } else {
    return { isValid: false, name: brojSanitized };
  }
};

export const matchDatum = (value) => {
  if (
    validator.isDate(value, { format: "YYYY-MM-DD", delimiters: ["/", "-"] })
  ) {
    return { isValid: true, name: value };
  } else {
    return { isValid: false, name: value };
  }
};

export const matchStatus = (value) => {
  const statusSanitized = validator.escape(value);
  if (statusSanitized === "KREIRANO") {
    return { isValid: true, name: value };
  } else {
    return { isValid: false, name: value };
  }
};
