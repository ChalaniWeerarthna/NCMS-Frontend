/////////////////////error handling///////////////////////////

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
        window.location.replace("doctor.html");
    }
}

/////////////////////////get patient list//////////////////////////

function loadPatientList() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/PatientList',
        dataType: "json",
        success: function (data, status, xhr) {
            $.each(data, function(key, patient){
                let printStr = '<tr><td>' + patient.patient_id + '</td><td>' + patient.first_name+ '</td><td>' + patient.last_name +'</td><td>' + patient.district + '</td><td>' + patient.location_x + '</td><td>' + patient.location_y + '</td><td>' + patient.severity_level + '</td><td>' + patient.hospital_id + '</td><td>' + patient.bed_id+ '</td><td>' + patient.gender +'</td><td>' + patient.contact+'</td><td>' + patient.email+'</td><td>' + patient.age+'</td><td>' + patient.admit_date+'</td><td>' + patient.admitted_by+'</td><td>' + patient.discharge_date+'</td><td>' + patient.discharged_by ;
                $('#patient-list tr:last').after(printStr); 
            });
        },
        error: function (jqXhr, textStatus, errorMessage) {
            ajaxErrorHandle(jqXhr);
        }
    });
}



//////////////////////////////patient profile load/////////////////////////////

function dashboardPatient() {
    let patient_id = Cookies.get('patient_id');
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/Details?patient_id=' + patient_id + '&ref=1',
        dataType: "json",
        success: function (data, status, xhr) {
            $.each(data, function(key, sendToPatient){
                let printStr = '</td><td>' + sendToPatient.bed_id+'</td><td>' + sendToPatient.hospital_id+ '</td><td>' + sendToPatient.district ;
                $('#patient-profile tr:last').after(printStr); 
            });
        },
        error: function (jqXhr, textStatus, errorMessage) {
            ajaxErrorHandle(jqXhr);
        }
    });
}