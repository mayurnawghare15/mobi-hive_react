function formatDate(inputDate) {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    const parts = inputDate.split('-');
    const day = parseInt(parts[2]);
    const month = months[parseInt(parts[1]) - 1];
    const year = parts[0];

    return `${month}. ${day} ${year}`;
}
export { formatDate };
