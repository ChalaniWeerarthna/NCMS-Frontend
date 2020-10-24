/////////////////////error handling/////////////////////

function ajaxErrorHandle(jqXhr, redirect = false) {
    if (jqXhr.responseJSON != null) {
        let errors = '';
        $.each(jqXhr.responseJSON.errors, function (key, error) {
            errors = errors + '<li>' + error + '</li>';
        });
        let printStr = '<div class="alert alert-danger alert-dismissible mt-3 fade show errorMessage" role="alert"><strong>Error!</strong> Operation failed. Please check the errors and retry.<ul>' + errors + '</ul><button type="button" class="close"data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
        $('#title').after(printStr);
    } else {
        toastr.error('Something went wrong!', 'Error');
    }

    if (redirect){
        window.location.replace("login.html");
    }
}


/////////////////////////add new doctor//////////////////////

function addDoctor(form) {
    $.ajax({
        type: "POST",
        url: 'http://localhost:8080/doctorRegister?' + form.serialize(),
        success: function (data, status, xhr) {
            console.log('Dotor inserted successfully');
            toastr.success('Doctor added successfully', 'Save Complete');
        },
        error: function (jqXhr, textStatus, errorMessage) {
            console.error(errorMessage)
            toastr.error('Something went wrong! ' + errorMessage, 'Error')
        }
    });
}

//////////////////////////get doctor list///////////////////////
/*
function loadDoctorList() {
    $.ajax({
        type: "GET",
        url:  'http://localhost:8080/DoctorList',
        dataType: "json",
        success: function (data, status, xhr) {
            $.each(data, function(key, doctor){
                let printStr = '<tr><td>' + doctor.doctor_id + '</td><td>' + doctor.name + '</td><td>' + doctor.email +'</td><td>' + doctor.hospital_id + '</td><td>' + doctor.is_director  +'</td></tr>';
                $('#doctor-list tr:last').after(printStr); 
            });
        },
        error: function (jqXhr, textStatus, errorMessage) {
            ajaxErrorHandle(jqXhr);
        }
    });
}*/