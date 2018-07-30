const convertTimeslotToTable = timeslot => {
  const startHour = parseInt(timeslot.startTime.split(':')[0]);
  const startMinute = parseInt(timeslot.startTime.split(':')[1]);
  const endHour = parseInt(timeslot.endTime.split(':')[0]);
  const endMinute = parseInt(timeslot.endTime.split(':')[1]);

  const start = startHour * 4 + startMinute / 15 + 1;
  const end = endHour * 4 + endMinute / 15 + 1;

  let table = [];
  for (let day of timeslot.days) {
    let startRange = start + (day - 1) * 24 * 4;
    const endRange = end + (day - 1) * 24 * 4;

    while (startRange < endRange) {
      table.push(startRange);
      startRange++;
    }
  }

  return table;
};

const generateTimeTable = timeslots => {
  let timeTable = [];
  for (let timeslot of timeslots) {
    let table = convertTimeslotToTable(timeslot);
    timeTable = [...timeTable, ...table];
  }

  return [...new Set(timeTable)].sort((a, b) => a - b);
};
