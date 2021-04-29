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

module.exports = {
    comma,
    chunkArray
}