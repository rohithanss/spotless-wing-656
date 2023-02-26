

function bookingConfirmation(name,timeSlot,date,type,zoom_link) {

    const allSlots = {
        six: "06:00 AM",
        seven: "07:00 AM",
        eight: "08:00 AM",
        nine: "06:00 AM",
        ten: "10:00 AM",
        eleven: "11:00 AM",
        twelve: "12:00 PM",
        one: "01:00 PM",
        two: "02:00 PM",
        three: "3:00 PM",
        four: "04:00 PM",
        five: "05:00 PM",
        six_eve: "06:00 PM",
        seven_eve: "07:00 PM",
        eight_eve: "08:00 PM",
    };
    let time = allSlots[timeSlot];

    return `Hello ${name},
    Your appoitnment for the ${type} on ${date} at ${time} is booked successfully.
    Join the meet from the below link
    ${zoom_link}`
}

module.exports = {bookingConfirmation}