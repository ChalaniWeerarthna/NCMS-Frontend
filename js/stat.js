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