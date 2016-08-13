(function () {

    angular.module('app.controllers')
        .controller('AllClassroomsController', ['dataService', 'notifier', AllClassroomsController]);

    function AllClassroomsController(dataService, notifier) {

        var vm = this;

        dataService.getAllClassrooms()
            .then(function(classrooms) {
                vm.allClassrooms = classrooms;
            })
            .catch(showError);

        function showError(message) {
            notifier.error(message);
        }

    }

}());