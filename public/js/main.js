var $fileInput = $('#fileInput');
var fileInput = document.getElementById('fileInput');
var $uploadFileButton = $('#uploadFileButton');
var $submitButton = $('#submitButton');
var myfile = null;

console.log($fileInput)
$uploadFileButton.on('click', function(event) {
    event.preventDefault();
    $fileInput.trigger('click');
});

$submitButton.click(function(event) {
    event.preventDefault();
    var file = fileInput.files[0];
    console.log(file);
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
                submitForm(event, data);
            } else {
                // Handle errors here
                console.log('ERRORS: ' + data.error);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Handle errors here
            console.log('ERRORS: ' + textStatus);
            // STOP LOADING SPINNER
        }
    });
});

setTimeout(function() {
    $.get("/api/upload", function(data) {
      console.log(data)
    });
}, 1000);
