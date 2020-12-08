angular.module('CRM',[])
.factory('employeeServices',['$http',function($http){
    function getAllEmployee() {
        return $http.get('/employees').catch(err => console.log(err.toString()));
    }
    return getAllEmployee();
}])
.controller('MainController',['$scope','employeeServices',function($scope,employeeServices){
    employeeServices.getAllEmployee().then(res=>$scope.employee = res.data);
    $scope.employerCardClick = ()=> employerCardClick();
    $scope.employee = [];
    $scope.currentId = "new";
}]);

function employerCardClick(){
    
}