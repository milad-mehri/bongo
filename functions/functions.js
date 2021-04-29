function comma(number) {
    var i = number.toString();
    i = i.split("").reverse();
    i.forEach((item, index) => {
        if (index % 3 == 0) i[index] = i[index] + ",";
    });
    i[0] = i[0][0];
    return i.reverse().join("");
}

module.exports = {
    comma
}