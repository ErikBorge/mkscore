
//Gets day abbreviation from full day name, e.g. "monday" -> "mon"
export const getDayAbbreviation = (day) => {
  switch (day) {
    case 'monday':
      return 'mon';
    case 'tuesday':
      return 'tue';
    case 'wednesday':
      return 'wed';
    case 'thursday':
      return 'thu';
    case 'friday':
      return 'fri';
    case 'extra':
      return 'ext';
    default:
      break;
  }
}
