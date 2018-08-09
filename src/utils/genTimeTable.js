const convertTimeslotToTable = timeslot => {
  const startHour = parseInt(timeslot.startTime.split(':')[0]);
  const startMinute = parseInt(timeslot.startTime.split(':')[1]);
  const endHour = parseInt(timeslot.endTime.split(':')[0]);
  const endMinute = parseInt(timeslot.endTime.split(':')[1]);

  const start = startHour * 4 + startMinute / 15;

  let end;
  if (endHour === 0 && endMinute === 0) {
    end = 24 * 4;
  } else {
    end = endHour * 4 + endMinute / 15;
  }

  let table = [];
  for (let day of timeslot.days) {
    let startRange = start + (day - 1) * 24 * 4;
    let endRange = end + (day - 1) * 24 * 4;

    while (startRange < endRange) {
      table.push(startRange + 1);
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

const isTimeOverlapped = (timeslot, timeTable) => {
  const table = convertTimeslotToTable(timeslot);
  for (let slot of table) {
    if (timeTable.indexOf(slot) !== -1) {
      return true;
    }
  }
  return false;
};
