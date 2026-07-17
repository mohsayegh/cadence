function calculateStreak(datesDone){
    const doneSet = new Set(datesDone);

    let streak = 0;
    let day = new Date();


    while(doneSet.has(day.toISOString().split('T')[0])){
        streak += 1; 
        day.setDate(day.getDate() - 1);
    }


    return streak;
}



export default calculateStreak;