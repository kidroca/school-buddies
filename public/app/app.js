(function() {

    var app = angular.module('app', ['ngRoute']);

    app.config(['$logProvider', '$routeProvider', '$locationProvider',
                function ($logProvider, $routeProvider, $locationProvider) {

        $logProvider.debugEnabled(true);

        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                controller: 'HomeController',
                controllerAs: 'home',
                templateUrl: '/app/templates/home.html'
            })
            .when('/schools', {
                controller: 'AllSchoolsController',
                controllerAs: 'schools',
                templateUrl: '/app/templates/allSchools.html',
                caseInsensitiveMatch: true
            })
            .when('/classrooms', {
                controller: 'AllClassroomsController',
                controllerAs: 'classrooms',
                templateUrl: '/app/templates/allClassrooms.html'
            })
            .when('/classrooms/:id', {
                controller: 'ClassroomController',
                controllerAs: 'classroom',
                templateUrl: '/app/templates/classroom.html'
            })
            .when('/classrooms/:id/detail/:month?', {
                controller: 'ClassroomController',
                controllerAs: 'classroom',
                templateUrl: '/app/templates/classroomDetail.html'
            })
            .when('/activities', {
                controller: 'AllActivitiesController',
                controllerAs: 'activities',
                templateUrl: '/app/templates/allActivities.html',
                resolve: {
                    activities: function (dataService) {
                        return dataService.getAllActivities();
                    }
                }
            })
            .otherwise('/');
    }]);

    app.run(['$rootScope', '$log', function($rootScope, $log) {

        $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
            $log.debug('successfully changed routes');

            $log.debug(event);
            $log.debug(current);
            $log.debug(previous);

        });

        $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
            $log.debug('error during changing routes');

            $log.debug(event);
            $log.debug(current);
            $log.debug(previous);
            $log.debug(rejection);

        });
    }]);

}());