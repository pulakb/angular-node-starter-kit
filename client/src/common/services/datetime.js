'use strict';

/*
 * @Description: Document all your date time functions.
 * */
angApp.factory('dateTime', [ function () {

function functionName (inputDate) {
    var d=new Date(inputDate),
        weekday=new Array(7),
        dm,
        dd,
        year;

    weekday[0]="Sun";
    weekday[1]="Mon";
    weekday[2]="Tue";
    weekday[3]="Wed";
    weekday[4]="Thu";
    weekday[5]="Fri";
    weekday[6]="Sat";

    dm = ((d.getMonth() + 1).toString().length==1)? "0"+(d.getMonth() + 1): d.getMonth() + 1; 
    dd = (d.getDate().toString().length==1)?"0"+d.getDate():d.getDate();
    year = d.getFullYear();
    
    return weekday[d.getDay()]+ " " + dm+"/"+dd+"/"+year;
  }

 return {
     functionName: functionName
 }

}]);