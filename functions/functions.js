function comma(number) {
    var i = number.toString();
    i = i.split("").reverse();
    i.forEach((item, index) => {
        if (index % 3 == 0) i[index] = i[index] + ",";
    });
    i[0] = i[0][0];
    return i.reverse().join("");
}
function chunkArray(myArray, chunk_size) {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
        myChunk = myArray.slice(index, index + chunk_size);
        tempArray.push(myChunk);
    }

    return tempArray;
}


function convertMiliseconds(miliseconds, format) {
    var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

    total_seconds = parseInt(Math.floor(miliseconds / 1000));
    total_minutes = parseInt(Math.floor(total_seconds / 60));
    total_hours = parseInt(Math.floor(total_minutes / 60));
    days = parseInt(Math.floor(total_hours / 24));

    seconds = parseInt(total_seconds % 60);
    minutes = parseInt(total_minutes % 60);
    hours = parseInt(total_hours % 24);

    switch (format) {
        case 's':
            return total_seconds;
        case 'm':
            return total_minutes;
        case 'h':
            return total_hours;
        case 'd':
            return days;
        default:
            return { d: days, h: hours, m: minutes, s: seconds };
    }
};

function msToString(ms) {
    var time = ''
    var result = convertMiliseconds(ms)
    if (result.d > 0) time += `${result.d} days, `
    if (result.h > 0) time += `${result.h} hours, `
    if (result.m > 0) time += `${result.m} minutes and `
    time += `${result.s} seconds`

    return time;
}

module.exports = {
    comma,
    chunkArray,
    msToString
}