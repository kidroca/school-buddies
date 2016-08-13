/**
 * Created by kidroca on 13.8.2016 г..
 */

describe('Data Service', function () {

    var BASE_PATH = '/';

    var dataService;
    var $httpBackend;

    var fakeData = [{
            "id": 1,
            "name": "Fort Craig Elementary",
            "principal": "Michelle Thorne"
        },
        {
            "id": 2,
            "name": "Edgewood Elementary",
            "principal": "Audrey Hills"
        }];

    beforeEach(function () {
        angular.mock.module('app.services');

        angular.mock.inject(function (_dataService_, _$httpBackend_) {
            dataService = _dataService_;
            $httpBackend = _$httpBackend_;
        })
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getAllSchools', function () {

        it('Should return schools data', function () {

            // Can be also be exact string or regex
            var expectedUrl = function(url) {
                return url.indexOf('api/schools') !== -1;
            };

            $httpBackend.when('GET', expectedUrl)
                        .respond(200, fakeData);

            dataService.getAllSchools()
                       .then(function (data) {
                           dump(angular.mock.dump(data));
                           expect(data).toEqual(fakeData);
                       })
                       .catch(fail);

            $httpBackend.flush(1);
        });

        it('Should reject when the response is not successful', function() {
            $httpBackend.when('GET', /.*api\/schools.*/)
                        .respond(404);

            dataService.getAllSchools()
                       .then(fail)
                       .catch(function(error) {
                           dump(angular.mock.dump(error));
                       });

            $httpBackend.flush(1);
        });
    });
});