function myFormSubmit(e) {
  createEvent_(e.namedValues);
  
}



//This creates the calenedar event 
function createEvent_ (namedValues) {
  
  var options = {description: namedValues.Description[0] +  "        link: " + namedValues.Link[0] + "        Limit of People: " + namedValues.Limit_of_people_who_can_attend[0] + "        As guest, we should bring: " + namedValues.What_should_invitees_bring[0] + "        Organized by: " + namedValues.Organizer_Name[0] + " Organizer's Phone Number: " + namedValues.Organizer_Phone_Number[0] + " Organizer's email: " + namedValues.Organizer_Email[0], location: namedValues.Location[0]};
  var cEvent = CalendarApp.getCalendarsByName("Twelthbright")[0].createEvent(namedValues.Name, new Date(namedValues.Starts), new Date(namedValues.Ends), options)

}


function Initialize() {
  try {
    var triggers = ScriptApp.getProjectTriggers();
    for (var i in triggers)
      ScriptApp.deleteTrigger(triggers[i]);
    ScriptApp.newTrigger("EmailGoogleFormData")
      .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
      .onFormSubmit().create();
  } catch (error) {
    throw new Error("Please add this code in the Google Spreadsheet");
  }
}

function EmailGoogleFormData(e) {
  createEvent_(e.namedValues);
 
  if (!e) {
    throw new Error("Please go the Run menu and choose Initialize");
  }
 
  try {
 
    if (MailApp.getRemainingDailyQuota() > 0) {
 
      var email = "jessica.dene.earley@gmail.com, nmargolis89@gmail.com";
 //Hackbright-AcademyFall-2015@googlegroups.com

      var subject = "New Twelthbright Event";
 
      var key, entry,
        message = "",
        ss = SpreadsheetApp.getActiveSheet(),
        cols = ss.getRange(1, 1, 1, ss.getLastColumn()).getValues()[0];
 
      // Iterate through the Form Fields
      for (var keys in cols) {
 
        key = cols[keys];
        entry = e.namedValues[key] ? e.namedValues[key].toString() : "";
 
        // Only include form fields that are not blank
        if ((entry !== "") && (entry.replace(/,/g, "") !== ""))
          message += key + ' : ' + entry + "\n\n";
      }
      message += "Go to the calendar: https://calendar.google.com/calendar/embed?src=pndn0fh23mivoo9093s3f890og%40group.calendar.google.com&ctz=America/Los_Angeles";
 
      MailApp.sendEmail(email, subject, message);
    }
  } catch (error) {
    Logger.log(error.toString());
  }
}