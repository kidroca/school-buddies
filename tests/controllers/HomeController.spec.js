/**
 * Created by kidroca on 13.8.2016 г..
 */

describe('Home Controller', function () {

    // Dependencies
    var $rootScope;
    var $controller;
    var $log;
    var $state;
    var $q;

    var dataService;

    // Simple mock;
    var notifier = {
        error: jasmine.createSpy('error')
    };

    var fakeSchools = [
        {
            "id": 1,
            "name": "Fort Craig Elementary",
            "principal": "Michelle Thorne"
        },
        {
            "id": 2,
            "name": "Edgewood Elementary",
            "principal": "Audrey Hills"
        }
    ];

    var fakeClassrooms = [
        {
            "id": 2,
            "name": "Mr. Elliott's Kindergarten",
            "teacher": "Martin Elliott",
            "school_id": 1
        },
        {
            "id": 3,
            "name": "Mrs. Smith's 1st Grade",
            "teacher": "Amanda Smith",
            "school_id": 2
        }
    ];

    var fakeActivities = [
        {
            "activity_id": 2,
            "name": "Book Fair",
            "date": "2015-10-06T16:00:00.000Z",
            "classroom_id": 2,
            "school_id": 1
        },
        {
            "activity_id": 3,
            "name": "Petting Zoo Visit",
            "date": "2015-10-19T16:00:00.000Z",
            "classroom_id": 3,
            "school_id": 2
        }
    ];

    // The tested controller instance
    var ctrl;

    beforeEach(function() {
        angular.mock.module('ui.router');
        angular.mock.module('app.controllers');
        angular.mock.inject(function(_$rootScope_, _$controller_, _$q_, _$log_, _$state_) {
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            $log = _$log_;
            $state =  _$state_;
            $q = _$q_;

            dataService = getDataServiceMock();
        })
    });

    describe('Controller construction', function() {

        it('Should be initialised successfully', function() {

            ctrl = $controller('HomeController', {
                $log: $log,
                $state: $state,
                dataService: dataService,
                notifier: notifier
            });

            expect(ctrl).not.toBeUndefined();
        });
    });

    describe('Initial state', function () {

        beforeEach(function() {
            ctrl = $controller('HomeController', {
                $log: $log,
                $state: $state,
                dataService: dataService,
                notifier: notifier
            });

            $rootScope.$apply();
        });

        it('Should be initialised with a collection of schools', function () {
            expect(dataService.getAllSchools.calls.count()).toEqual(1);
            expect(ctrl.allSchools).toEqual(fakeSchools);
            expect(ctrl.schoolCount).toEqual(fakeSchools.length);
        });

        it('Should be initialised with a collection of classrooms', function () {
            expect(dataService.getAllClassrooms.calls.count()).toEqual(1);
            expect(ctrl.allClassrooms).toEqual(fakeClassrooms);
            expect(ctrl.classroomCount).toEqual(fakeClassrooms.length);
        });

        it('Should be initialised with a collection of activities', function () {
            expect(dataService.getAllActivities.calls.count()).toEqual(1);
            expect(ctrl.allActivities).toEqual(fakeActivities);
            expect(ctrl.activityCount).toEqual(fakeActivities.length);
        });

    });

    describe('Unsuccessful data calls', function() {

        beforeEach(function() {
            notifier.error.calls.reset();
        });

        it('getAllSchools() should show error', function() {
            var msg = 'school error';
            dataService.getAllSchools.and.callFake(function() {
               var deferred = $q.defer();
                deferred.reject(msg);
                return deferred.promise;
            });

            ctrl = $controller('HomeController', {
                $log: $log,
                $state: $state,
                dataService: dataService,
                notifier: notifier
            });

            $rootScope.$apply();

            expect(notifier.error.calls.count()).toEqual(1);
            expect(notifier.error).toHaveBeenCalledWith(msg);
        });

        it('getAllClassrooms() should show error', function() {
            var msg = 'class error';
            dataService.getAllClassrooms.and.callFake(function() {
                var deferred = $q.defer();
                deferred.reject(msg);
                return deferred.promise;
            });

            ctrl = $controller('HomeController', {
                $log: $log,
                $state: $state,
                dataService: dataService,
                notifier: notifier
            });

            $rootScope.$apply();

            expect(notifier.error.calls.count()).toEqual(1);
            expect(notifier.error).toHaveBeenCalledWith(msg);
        });

        it('getAllActivities() should show error', function() {
            var msg = 'activity error';
            dataService.getAllActivities.and.callFake(function() {
                var deferred = $q.defer();
                deferred.reject(msg);
                return deferred.promise;
            });

            ctrl = $controller('HomeController', {
                $log: $log,
                $state: $state,
                dataService: dataService,
                notifier: notifier
            });

            $rootScope.$apply();

            expect(notifier.error.calls.count()).toEqual(1);
            expect(notifier.error).toHaveBeenCalledWith(msg);
        });
    });

    describe('refresh() method', function() {

        beforeEach(function() {
            ctrl = $controller('HomeController', {
                $log: $log,
                $state: $state,
                dataService: dataService,
                notifier: notifier
            });
        });

        it('Should trigger state reload', function() {
            spyOn($state, 'reload').and.returnValue(null);

            ctrl.refresh();

            expect($state.reload.calls.count()).toEqual(1);
        });
    });

    function getDataServiceMock() {
        var mock = jasmine.createSpyObj('dataService', [
            'getAllSchools', 'getAllClassrooms', 'getAllActivities'
        ]);

        mock.getAllSchools.and.callFake(function() {
            var deferred = $q.defer();
            deferred.resolve(fakeSchools);
            return deferred.promise;
        });

        mock.getAllClassrooms.and.callFake(function() {
            var deferred = $q.defer();
            deferred.resolve(fakeClassrooms);
            return deferred.promise;
        });

        mock.getAllActivities.and.callFake(function() {
            var deferred = $q.defer();
            deferred.resolve(fakeActivities);
            return deferred.promise;
        });

        return mock;
    }
});