
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}


///////////////error handling/////////////////////


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
        window.location.replace("mohpage.html");
    }
}


////////////////////////add new hospital/////////////////////////////

function addHospital(form) {
    $.ajax({
        type: "POST",
        url: 'http://localhost:8080/hospitalRegister?' + form.serialize(),
        success: function (data, status, xhr) {
            console.log('Hospital inserted successfully');
            toastr.success('Hospital added successfully', 'Save Complete');
        },
        error: function (jqXhr, textStatus, errorMessage) {
            console.error(errorMessage)
            toastr.error('Something went wrong! ' + errorMessage, 'Error')
        }
    });
}

/////////////////////get hospital list///////////////////////////////////

function loadHospitalList() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/HospitalList',
        dataType: "json",
        success: function (data, status, xhr) {
            $.each(data, function(key, hospital){
                let printStr = '<tr><td>' + hospital.hospital_id + '</td><td>' + hospital.name + '</td><td>' + hospital.district +'</td><td>' + hospital.location_x + '</td><td>' + hospital.location_y  +'</td><td>' + hospital.build_date  +'</td><td><a href="edithospital.html?hospital_id=' + hospital.hospital_id + '" class="edit-btn">Edit</a></td></tr>';
                $('#hospitals-list tr:last').after(printStr); 
            });
        },
        error: function (jqXhr, textStatus, errorMessage) {
            ajaxErrorHandle(jqXhr);
        }
    });
}


///////////////////////////edit hospital/////////////////////////////////////


function editHospital(hospital_id){
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/hospitalRegister?hospital_id=' + hospital_id,
        dataType: "json",
        success: function (data, status, xhr) {
            let hospital = data;
            $('#hospital_id').val(hospital.hospital_id);
            $('#name').val(hospital.name).change();
            $('#district').val(hospital.district);
            $('#location_x').val(hospital.locationX);
            $('#location_y').val(hospital.locationY).change();
            $('#build_date').val(hospital.build_date).change();
            // $('#doctor').val(hospital.doctor_id).change();
        },
        error: function (jqXhr, textStatus, errorMessage) {
            ajaxErrorHandle(jqXhr);
        }
    });
}


/////////////////////////update hospital//////////////////////////////

function updateHospital(hospital_id, form){
    $.ajax({
        type: "PUT",
        url:'http://localhost:8080/hospitalRegister?hospital_id=' + hospital_id + '&' + form.serialize(),
        success: function (data, status, xhr) {
            toastr.success('Hospital updated successfully', 'Save Complete');
        },
        error: function (jqXhr, textStatus, errorMessage) {
            toastr.error('Something went wrong! ' + errorMessage, 'Error')
        }
    });
}

//////////////////////////////////delete hospital//////////////////////////////////////

function deleteHospital(hospital_id) {
    $.ajax({
        type: "DELETE",
        url:'http://localhost:8080/hospitalRegister?hospital_id=' + hospital_id,
        success: function (data, status, xhr) {
            toastr.success('Hospital deleted successfully', 'Delete Complete');
        },
        error: function (jqXhr, textStatus, errorMessage) {
            toastr.error('Something went wrong! ' + errorMessage, 'Error')
        }
    });
}


