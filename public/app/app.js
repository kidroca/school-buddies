(function() {

    angular.module('app.services', []);
    angular.module('app.controllers', []);
    angular.module('app.filters', []);

    var app = angular.module('app',
        ['ui.router', 'app.services', 'app.controllers', 'app.filters']);

    app.config(['$logProvider', '$stateProvider', '$urlRouterProvider',
                function ($logProvider, $stateProvider, $urlRouterProvider) {

        $logProvider.debugEnabled(true);

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                controller: 'HomeController',
                controllerAs: 'home',
                templateUrl: '/app/templates/home.html'
            })
            .state('schools', {
                url: '/schools',
                controller: 'AllSchoolsController',
                controllerAs: 'schools',
                templateUrl: '/app/templates/allSchools.html'
            })
            .state('classrooms', {
                url: '/classrooms',
                controller: 'AllClassroomsController',
                controllerAs: 'classrooms',
                templateUrl: '/app/templates/allClassrooms.html',
                onEnter: function($log) {
                    $log.debug('Entering the classroom state.');
                },
                onExit: function($log) {
                    $log.debug('Exiting the classroom state');
                }
            })
            .state('classroom_summary', {
                url: '/classrooms/:id',
                controller: 'ClassroomController',
                controllerAs: 'classroom',
                templateUrl: '/app/templates/classroom.html'
            })
            .state('classroom_detail', {
                url: '/classrooms/{id:[0-9]}/detail/{month}',
                controller: 'ClassroomController',
                controllerAs: 'classroom',
                templateUrl: '/app/templates/classroomDetail.html',
                params: {
                    classroomMessage: {value: 'Learning is fun!'}
                }
            })
            .state('activities', {
                url: '/activities',
                controller: 'AllActivitiesController',
                controllerAs: 'activities',
                templateUrl: '/app/templates/allActivities.html',
                resolve: {
                    activities: function(dataService) {
                        return dataService.getAllActivities();
                    }
                },
                data: {
                    name: 'My Activity',
                    desc: 'Fun!'
                }
            })
    }]);

    app.run(['$rootScope', '$log', function($rootScope, $log) {

        $rootScope.$on('$stateChangeSuccess', function(
            event, toState, toParams, fromState, fromParams) { {

                $log.debug('successfully changed states');

                $log.debug('event', event);
                $log.debug('toState', toState);
                $log.debug('toParams', toParams);
                $log.debug('fromState', fromState);
                $log.debug('fromParams', fromParams);
            }
        });

        $rootScope.$on('$stateNotFound', function(
            event, unfoundState, fromState, fromParams) { {

                $log.error('the requested state was not found: ', unfoundState);

            }
        });

        $rootScope.$on('$stateChangeError', function(
            event, toState, toParams, fromState, fromParams, error) { {

            $log.error('error changing states: ', error);

            $log.debug('event', event);
            $log.debug('toState', toState);
            $log.debug('toParams', toParams);
            $log.debug('fromState', fromState);
            $log.debug('fromParams', fromParams);
        }
        });
    }]);

}());