angular.module('CRM',[])
.factory('employeeServices',['$http',function($http){
    function getAllEmployee() {
        return $http.get('/api/employee/').catch(err => console.log(err.toString()));
    }
    function saveEmployer(emp){
        return $http.put('/api/employee/'+emp._id, emp).catch(err => console.log(err.toString()));
    }
    function deleteEmployer(id){
        return $http.delete('/api/employer/'+id).catch(err =>console.log(err.toString()));
    }
    function addEmployer(emp){
        return $http.post('/api/employee/').catch(err => console.log(err.toString()));
    }
    return {getAllEmployee,saveEmployer,deleteEmployer,addEmployer};
}])
.controller('MainController',['$scope','employeeServices',function($scope,employeeServices){
    console.log("Main controller is running");
    employeeServices.getAllEmployee().then(res=>$scope.employee = res.data);
    $scope.employerCardClick = (employer)=> employerCardClick($scope);
    $scope.employee = [];
    addNewEmployer($scope);
    $scope.saveCurrentEmployer = () =>saveEmployer(employeeServices, $scope.currentEmployer, $scope);
    $scope.deleteCurrentEmployer = () =>deleteEmployer(employeeServices, $scope);
    $scope.addNewEmployer = ()=> addEmployer($scope);
}]);
function deleteEmployer(employeeServices,$scope){
    var emp = $scope.currentEmployer;
    if (emp._id) {
        employeeServices.deleteEmployer(emp._id).then(res => 
            {
                console.log(res);
                $scope.employee = $scope.employee.filter(em=>em != emp);
            });
    }
    addNewEmployer($scope);
}
function saveEmployer(employeeServices,$scope) {
    let {currentEmployer:employer,employee} = $scope;
    if(employer._id){
        employeeServices.saveEmployer(employer).then(res => {console.log(res)});
    }
    else if(employer.new){
        employeeServices.addNewEmployer(employer).then(res => {
            console.log(res);
            let newEmployer = res.data;
            delete res.data.__v;
            employee.push(newEmployer);
        });       
    }
}
function employerCardClick($scope, employer){
    // console.log("A card is clicked");
    // console.log(employer);
    $scope.currentEmployer = employer;
}
function addNewEmployer($scope){
    console.log("Start creating new employer");
    $scope.currentEmployer = {
        new:true
    };
}