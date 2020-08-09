'use-strict'

const person1Busy = [[9, 10.5], [12, 13], [16, 18]];
const person2Busy = [[10, 11.5], [12.5, 14.5], [14.5, 15], [16, 17]];
const firstSchedule = [9, 20];
const secondSchedule = [10, 18.5];
const duration = 1;

// get the free hours between the busy time, (a time lapse could not be enough)
const getSpaces = (timeBusy, schedule) => {
    let personAvailable = [];
    // before
    if(schedule[0] < timeBusy[0][0]){
        personAvailable =  [[schedule[0], timeBusy[0][0]]];
    }
    // between
    timeBusy.forEach((period, index) => { 
        let period_ = period[1];
        if (timeBusy[index + 1]) {
            let timeBusy_ = timeBusy[index + 1][0];
            if (period_ < timeBusy_) {
                personAvailable.push([period_, timeBusy_]);
            }
        }
    });
    // at the end
    if(timeBusy[timeBusy.length - 1][1] < schedule[1]){
        personAvailable = [...personAvailable,[timeBusy[timeBusy.length - 1][1], schedule[1]]];
    }
    return personAvailable;
}
const person1Free = getSpaces(person1Busy, firstSchedule);
const person2Free = getSpaces(person2Busy, secondSchedule);

const getMeetings = (periodFreeArray, duration) => {
    let meetingsPerson = [];
    periodFreeArray.forEach(periodFree => {
        const [timeStart, timeEnd] = periodFree;
        // time free in each period
        const  timeLapse = timeEnd - timeStart;
        const meetingsByLapse = Math.floor(timeLapse / duration);
        // the meetingStart change in each iteration since you start adding meetings from x duration
        let meetingStart = timeStart;
        let meetingEnd = meetingStart  + duration;
        for (let index = 0; index < meetingsByLapse; index++) {
            meetingsPerson = [...meetingsPerson, [meetingStart, meetingEnd]];
            meetingStart = meetingEnd;
            meetingEnd = meetingStart + duration;
        }
    });
    return meetingsPerson;x
}
const meetingsPerson1 = getMeetings(person1Free, duration);
const meetingsPerson2 = getMeetings(person2Free, duration);
console.log(meetingsPerson1, meetingsPerson2);

// get the common hours
let common = [];
meetingsPerson1.forEach((meeting1) => {
    if(meetingsPerson2.find(meeting2 => {
        return meeting1[0] === meeting2[0] && meeting1[1] === meeting2[1];
    })){
        common = [...common, ...meeting1]
    }
});
// get the final possible meetings :)
console.log('the end', common);