(function () {

    angular.module('app')
        .controller('AllActivitiesController',
            ['$location', 'dataService', 'activities', 'notifier', AllActivitiesController]);

    function AllActivitiesController($location, dataService, activities, notifier) {

        var vm = this;

        vm.selectedMonth = 1; // default to January

        vm.allActivities = activities;

        vm.search = function() {
          var detail_url = '/classrooms/' + vm.selectedClassroom.id +
                            '/detail/' + vm.selectedMonth;

            $location.url(detail_url);
        };

        dataService.getAllClassrooms()
            .then(function(classrooms) {
                vm.allClassrooms = classrooms;
                vm.selectedClassroom = classrooms[0];
            })
            .catch(showError);

        // dataService.getAllActivities()
        //     .then(function(activities) {
        //         vm.allActivities = activities;
        //     })
        //     .catch(showError);

        function showError(message) {
            notifier.error(message);
        }

    }

}());