$(document).ready(function () {
    initWindow();
    $('.pull-down').each(function () {
        $(this).css('margin-top', $(this).parent().height() - $(this).height())
    });
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
    showMainPage: ko.observable(true),
    EditedExercise: ko.observable(),
    GetFormData: GetFormData,
    EditExerciseDetails: EditExerciseDetails,
    title:ko.observable("Sport Scheduler"),
    exercises: ko.observableArray(),
    filteredExercises: ko.observableArray(),
    selectedPlannedExercise: ko.observable(),
    MyDate: ko.observable(new Date()),
    ShowAll: ShowAll,
    ExerciseDetailsClick: ExerciseDetailsClick,
    CloseExerciseDetails: CloseExerciseDetails,
    log : ko.observable(""),
};

function GetFormData(formElement) {
    console.log(formElement);
    var serializedForm = $(formElement).serializeArray();
    console.log(serializedForm);
};

function EditExerciseDetails(data) {
    console.log(data);
};

function CloseExerciseDetails() {
    console.log("back to calendar");
    vm.showMainPage(true);
};

function ExerciseDetailsClick(exercise) {
    vm.selectedPlannedExercise(exercise);
    console.log(exercise);
    vm.showMainPage(false);
};

function ShowAll() {
    vm.filteredExercises([]);
    vm.filteredExercises(vm.exercises());
};

function initWindow() {
    dataserviceStub.GetAllExercises(function (resultData) {
        console.log(resultData);
        resultData.forEach(function (exercise) {
            exercise["selectedExercise"] = ko.observable();
        });
        ko.utils.arrayPushAll(vm.exercises, resultData);
        ko.utils.arrayPushAll(vm.filteredExercises, resultData);
        ko.applyBindings(vm);
    });
};
vm.MyDate.subscribe(function (date) {
    vm.filteredExercises([]);
    var parsedDate = moment(date).format("YYYY-MM-DD");
    ko.utils.arrayForEach(vm.exercises(), function (exercise) {
        if (moment(exercise.ScheduledTime).format("YYYY-MM-DD") === parsedDate) {
            vm.filteredExercises.push(exercise);
        }
    });
    console.log(parsedDate);
});
