/**
 * Created by kidroca on 13.8.2016 г..
 */

describe('Mocking examples', function () {

    var sampleResponse = ['abc'];

    it('Mocking via an anonymous object', function () {
        var dataService;

        angular.mock.module({
            'myDataService': {
                getAllSchools: function () {
                    return sampleResponse;
                }
            }
        });

        angular.mock.inject(function (_myDataService_) {
            dataService = _myDataService_;
        });

        expect(dataService.getAllSchools()).toBe(sampleResponse);

    });

    it('Mocking via an anonymous function', function () {
        var dataService;

        // Short alias for angular.mock.module
        module(function ($provide) {
            $provide.factory('myDataService', function () {
                return {
                    getAllSchools: function () {
                        return sampleResponse;
                    }
                }
            })
        });

        // Short alias for angular.mock.inject
        inject(function (_myDataService_) {
            dataService = _myDataService_;
        });

        expect(dataService.getAllSchools()).toBe(sampleResponse);
    });

    it('Using existing module', function () {
        var dataService;

        angular.mock.module('app');

        angular.mock.inject(function (_dataService_) {
            dataService = _dataService_;
        });

        expect(dataService).not.toBeUndefined();
    });
});