export function convertDateToGeneral(date) {
  return new Date(date)
    .toLocaleString("en-CA", {
      dateStyle: "short",
    })
    .replace(/\//gi, "-");
}

export function convertDateToCroatian(date) {
  return new Date(date).toLocaleString("hr-HR", {
    dateStyle: "long",
  });
}
