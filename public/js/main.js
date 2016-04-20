var $fileInput = $('#fileInput');
var fileInput = document.getElementById('fileInput');
var $uploadFileButton = $('#uploadFileButton');
var $submitButton = $('#submitButton');
var myfile = null;

$uploadFileButton.on('click', function(event) {
    event.preventDefault();
    $fileInput.trigger('click');
});

$submitButton.click(function(event) {
    event.preventDefault();
    var file = fileInput.files[0];
    var data = new FormData();
    $.each(fileInput.files, function(key, value) {
        data.append(key, value);
    });
    $.ajax({
        url: '/api/upload',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        success: function(data, textStatus, jqXHR) {
            if (typeof data.error === 'undefined') {
                // Success so call function to process the form
                refershView();
            } else {
                // Handle errors here
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Handle errors here
            // STOP LOADING SPINNER
        }
    });
});
var doughnutData = [
    {
      value: 0,
      color:"#f3a1a1"
    },
    {
      value : 0,
      color : "#fff"
    }

  ];

// var chart = new Chart(document.getElementById("doughnut").getContext("2d")).Doughnut(doughnutData);
var ctx = document.getElementById("doughnut").getContext("2d");
var chart= new Chart(ctx).Doughnut(doughnutData, {showTooltips: false});
function refershView() {
  setTimeout(function() {
      $.get("/api/capacity", function(data) {
        doughnutData[1].value = Math.floor(data.size *100/ data.total);
        doughnutData[0].value = 100 -Math.floor(data.size *100/ data.total);

        document.getElementById('totalSizeValue').innerHTML = String(Math.floor(data.size *100/ data.total)) + '%';
        chart= new Chart(ctx).Doughnut(doughnutData, {showTooltips: false});
      });
  }, 1000);
}
refershView();
