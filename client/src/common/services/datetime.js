cloudStbApp.factory('dateTime', [ function () {

  function getGridStartTime() {
    var myStartDate = new Date(),
        minutes= myStartDate.getMinutes();

    myStartDate.setSeconds(0,0);

    if(minutes < 30) {
      myStartDate.setMinutes(0);
    } else {
      myStartDate.setMinutes(30);
    }

    var gridStartTime = myStartDate;

    return gridStartTime;
  }

  function getGridEndTime() {
    var gridEndTime = new Date(getGridStartTime()); 

    // Add 90 as we are showing 90 mins data in a screen at a time
    gridEndTime.setMinutes(( gridEndTime.getMinutes())+ 90);

    return gridEndTime;

  }

  function startEndTimeInMilli () {
    // We fetch the data from the currentTime to today endTime
    var startTime = new Date(),
        startTimeMilli = startTime.getTime(),
        endTime = new Date();

        endTime.setHours(23, 59, 59, 999);
        endTimeMilli = endTime.getTime();

    return {
      startTime: startTimeMilli,
      endTime: endTimeMilli
    }
  }

  function UTCLocalTimeConversion () {

  }

  function getCustomStartEndTime (proDuration, proDate) {
    var startDate =null,
        endDate = null,
        dateObj = null;
         
       dateObj = new Date(proDate);
       startDate = new Date(proDate);
      
    var duration = dateObj.getMinutes(); 
        duration = (duration*1)+ (proDuration*1);
        endDate = new Date(dateObj.setMinutes(duration));
    
    return startDate.toTimeString().substring(0,5) +" - "+ endDate.toTimeString().substring(0,5)
   }


function getCustomDate (proDate) {
    var d=new Date(proDate),
        weekday=new Array(7);

    weekday[0]="Sun";
    weekday[1]="Mon";
    weekday[2]="Tue";
    weekday[3]="Wed";
    weekday[4]="Thu";
    weekday[5]="Fri";
    weekday[6]="Sat";

    dm = ((d.getMonth() + 1).toString().length==1)? "0"+(d.getMonth() + 1): d.getMonth() + 1; 
    dd = (d.getDate().toString().length==1)?"0"+d.getDate():d.getDate();
    
    return weekday[d.getDay()]+ " " + dm+"/"+dd;
  }

 return {
  getGridStartTime: getGridStartTime,
  getGridEndTime: getGridEndTime,
  startEndTimeInMilli: startEndTimeInMilli,
  getCustomStartEndTime: getCustomStartEndTime,
  getCustomDate: getCustomDate
 }

}]);