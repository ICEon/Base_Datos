$(document).ready(function(e) {
	alert ("Here");

var db = openDatabase ("Test", "1.0", "Test", 65535);

$("#create").bind ("click", function (event)
{
 var infoField = document.getElementById("infoField");
                infoField.innerHTML = device.name;
				
  db.transaction (function (transaction) 
  {
    var sql = "CREATE TABLE customers " +
        " (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
        "lname VARCHAR(100) NOT NULL, " + 
        "fname VARCHAR(100) NOT NULL)"
    transaction.executeSql (sql, undefined, function ()
    { 
      alert ("Table created");
    }, error);
  });
});

$("#remove").bind ("click", function (event)
{
  if (!confirm ("Delete table?", "")) return;;
  db.transaction (function (transaction) 
  {
    var sql = "DROP TABLE customers";
    transaction.executeSql (sql, undefined, ok, error);
  });
});

$("#insert").bind ("click", function (event)
{
  var lname = $("#lname").val ();
  var fname = $("#fname").val ();
  
  db.transaction (function (transaction) 
  {
    var sql = "INSERT INTO customers (lname, fname) VALUES (?, ?)";
    transaction.executeSql (sql, [lname, fname], function ()
    { 
      alert ("Customer inserted");
    }, error);
  });
});

$("#list").bind ("click", function (event)
{
  db.transaction (function (transaction) 
  {
    var sql = "SELECT * FROM customers";
    transaction.executeSql (sql, undefined, 
    function (transaction, result)
    {
      var html = "<ul>";
      if (result.rows.length)
      {
        for (var i = 0; i < result.rows.length; i++) 
        {
          var row = result.rows.item (i);
          var lname = row.lname;
          var fname = row.fname;
          html += "<li>" + lname + "&nbsp;" + fname + "</li>";
        }
      }
      else
      {
        html += "<li> No customer </li>";
      }
      
      html += "</ul>";
      
      $("#win2").unbind ().bind ("pagebeforeshow", function ()
      {
        var $content = $("#win2 div:jqmData(role=content)");
        $content.html (html);
        var $ul = $content.find ("ul");
        $ul.listview ();
      });
      
      $.mobile.changePage ($("#win2"));
      
    }, error);
  });
});

function ok ()
{
	alert ("ok");
}

function error (transaction, err) 
{
  alert ("DB error : " + err.message);
  return false;
}    
});
