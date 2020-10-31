///////////////////display errors//////////////////////

function ajaxErrorHandle(jqXhr, redirect = false) {
    if (jqXhr.responseJSON != null) {
        let errors = '';
        $.each(jqXhr.responseJSON.errors, function (key, error) {
            errors = errors + '<li>' + error + '</li>';
        });
        let printStr = '<div class="alert alert-danger alert-dismissible mt-3 mx-3 fade show errorMessage" role="alert"><strong>Error!</strong> Operation failed. Please check the errors and retry.<ul>' + errors + '</ul><button type="button" class="close"data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
        $('#title').after(printStr);
    } else {
        toastr.error('Something went wrong!', 'Error');
    }

    if (redirect) {
        window.location.replace("index.html");
    }
}
/////////////////////patient login//////////////////

function patientLogin(form) {
    $.ajax({
        type: "POST",
        url: 'http://localhost:8080/PatientLogin?' + form.serialize(),
        success: function (data, status, xhr) {
            let patient_id = data.patient_id;
            let email = data.email;

            Cookies.set('patient_id', patient_id);
            Cookies.set('email', email);
            console.log('login successfully');
            toastr.success('Login successfully', 'Login Complete');
            
            window.location.replace("patientpage.html");
           
           
            

            
        },
        error: function (jqXhr, textStatus, errorMessage) {
            ajaxErrorHandle(jqXhr);
        }
    });
}

/////////////////////doctor login//////////////////

function doctorLogin(form) {
    $.ajax({
        type: "POST",
        url: 'http://localhost:8080/DoctorLogin?' + form.serialize(),
        success: function (data, status, xhr) {
            let doctor_id = data.doctor_id;
            let email = data.email;

            Cookies.set('doctor_id', doctor_id);
            Cookies.set('email', email);

            console.log('login successfully');
            toastr.success('Login successfully', 'Login Complete');

            window.location.replace("doctorpage.html");
        },
        error: function (jqXhr, textStatus, errorMessage) {
            ajaxErrorHandle(jqXhr);
        }
    });
}
/////////////////////director login//////////////////

function directorLogin(form) {
    $.ajax({
        type: "POST",
        url: 'http://localhost:8080/DoctorLogin?' + form.serialize(),
        success: function (data, status, xhr) {
            let doctor_id = data.doctor_id;
            let email = data.email;

            Cookies.set('doctor_id', doctor_id);
            Cookies.set('email', email);

            console.log('login successfully');
            toastr.success('Login successfully', 'Login Complete');

            window.location.replace("directorpage.html");
        },
        error: function (jqXhr, textStatus, errorMessage) {
            ajaxErrorHandle(jqXhr);
        }
    });
}

//////////////////moh login////////////////////
function mohLogin(form) {
    $.ajax({
        type: "POST",
        url: 'http://localhost:8080/MohLogin?' + form.serialize(),
        success: function (data, status, xhr) {
            let moh_id = data.moh_id;
            let email = data.email;

            Cookies.set('moh_id', moh_id);
            Cookies.set('email', email);

            console.log('login successfully');
            toastr.success('Login successfully', 'Login Complete');

            window.location.replace("mohpage.html");
        },
        error: function (jqXhr, textStatus, errorMessage) {
            ajaxErrorHandle(jqXhr);
        }
    });
}