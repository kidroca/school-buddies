(function () {

    angular.module('app')
        .controller('AllActivitiesController',
            ['$log', '$state', 'dataService', 'notifier', 'activities', AllActivitiesController]);

    function AllActivitiesController($log, $state, dataService, notifier, activities) {

        var vm = this;

        vm.selectedMonth = 1; // default to January

        vm.allActivities = activities;

        $log.debug($state.current.data);

        vm.search = function() {
          $state.go('classroom_detail', {
              id: vm.selectedClassroom.id,
              month: vm.selectedMonth
          });
        };

        dataService.getAllClassrooms()
            .then(function(classrooms) {
                vm.allClassrooms = classrooms;
                vm.selectedClassroom = classrooms[0];
            })
            .catch(showError);

        function showError(message) {
            notifier.error(message);
        }

    }

}());