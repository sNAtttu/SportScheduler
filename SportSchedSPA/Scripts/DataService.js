var dataserviceStub = {

    GetAllExercises: function (resultCallBack) {
        var serviceUrl = "http://sportsched.azurewebsites.net/api/Exercise/";
        $.ajax({
            type: "GET",
            url: serviceUrl
        }).done(function (data) {
            resultCallBack(data);
        }).error(function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        });
    },

    GetAllExerciseTypes: function (resultCallBack) {
        var serviceUrl = "http://sportsched.azurewebsites.net/api/TrainingType";
        $.ajax({
            type: "GET",
            url: serviceUrl
        }).done(function (data) {
            resultCallBack(data);
        }).error(function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        });
    }

};