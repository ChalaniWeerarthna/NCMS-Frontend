///////////////////////display hospital Statistics//////////////


function loadHospitalStat() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/StaticsByDoc',
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


