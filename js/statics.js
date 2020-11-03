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



///////////////////////display hospital Statistics//////////////


function loadHospitalStat() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/Statistics',
        dataType: "json",
        success: function (data, status, xhr) {
            $.each(data.hospitalPatients, function(key, hospital){
                let printStr = '<tr><td>' + hospital.name + '</td><td>' + hospital.statistics + '</td></tr>';
                $('#hospital-stats tr:last').after(printStr); 
            });
        },
        error: function (jqXhr, textStatus, errorMessage) {
            ajaxErrorHandle(jqXhr);
        }
    });
}

//////////////////display district Statistics////////////////////////


function loadDistrictStat() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/Statistics',
        dataType: "json",
        success: function (data, status, xhr) {
            $.each(data.districtPatients, function(key, district){
                let printStr = '<tr><td>' + district.district+ '</td><td>' + district.statistics + '</td></tr>';
                $('#district-stats tr:last').after(printStr); 
            });
        },
        error: function (jqXhr, textStatus, errorMessage) {
            ajaxErrorHandle(jqXhr);
        }
    });
}


////////////////////////display country Statistics//////////////////////


function loadCountryStat() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/Statistics',
        dataType: "json",
        success: function (data, status, xhr) {
            $.each(data.countryPatients, function(key, country){
                let printStr = '<tr><td>' + country.statistics+ '</td></tr>';
                $('#country-stats tr:last').after(printStr); 
            });
        },
        error: function (jqXhr, textStatus, errorMessage) {
            ajaxErrorHandle(jqXhr);
        }
    });
}

///////////////////////display Bed Statistics//////////////


function loadBedStat() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/BedStatistics',
        dataType: "json",
        success: function (data, status, xhr) {
            $.each(data.hospitalPatients, function(key, hospital){
                let printStr = '<tr><td>' + hospital.name + '</td><td>' + hospital.statistics + '</td></td>'+ hospital.available + '</td></tr>';
                $('#bed-stats tr:last').after(printStr); 
            });
        },
        error: function (jqXhr, textStatus, errorMessage) {
            ajaxErrorHandle(jqXhr);
        }
    });
}
