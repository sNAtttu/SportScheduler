$(document).ready(function () {
    initWindow();
});

ko.bindingHandlers.datePicker = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        // Register change callbacks to update the model
        // if the control changes.       
        ko.utils.registerEventHandler(element, "change", function () {
            var value = valueAccessor();
            value(new Date(element.value));
        });
    },
    // Update the control whenever the view model changes
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor();
        element.value = moment(value()).format("YYYY-MM-DD");
    }
};

var vm = {
    title:ko.observable("Sport Scheduler"),
    exercises: ko.observableArray(),
    MyDate: ko.observable(new Date()),
    log : ko.observable(""),
};

function initWindow() {
    dataserviceStub.GetAllExercises(function (resultData) {
        console.log(resultData);
        resultData.forEach(function (exercise) {
            exercise["selectedExercise"] = ko.observable();
        });
        ko.utils.arrayPushAll(vm.exercises, resultData);
        ko.applyBindings(vm);
    });
};
vm.MyDate.subscribe(function (date) {
    var parsedDate = moment(date).format("YYYY-MM-DD");
    console.log(parsedDate);
});
