'use strict';

let advertMoreController = ($scope, $cookies, auth, ui, $routeParams, $window, advertMore, aside) => {
    $scope.user = $cookies.getObject('user');
    $scope.blockTitle = "Категории";
    $scope.formData = {};

    advertMore.getAdvert($routeParams.id).success((response)=>{
        $scope.advert = response;
        $scope.advert.addTime = $scope.advert.addTime.replace(/T/, " ");
        if($scope.user == $scope.advert.owner.id || !$scope.user){
            return;
        } else {
            advertMore.addView($scope.advert._links.incrementViews.href);
        }
    })
    .error((response) => {
        console.log(response);
        $window.location.href = "#/adverts/1";
        $scope.error = "Данный пост сейчас недоступен!";
    });

    aside.getCategories().success((response) => {
        $scope.categories = response._embedded.categories;
    })
    .error(() => {
        console.log("Error: can't get categories");
    });

    $scope.getAdvertCategory = ($event) => {
        $cookies.put('category', $event.target.text);
    };

    aside.getTags().success((response) => {
        $scope.tags = response;
        for(let i in $scope.tags){
            $scope.tags[i].url = encodeURIComponent($scope.tags[i].name);
        }
    })
        .error((response) => {
            console.log(response);
        });

    $scope.setTagSize = () => {
        for(let i in $scope.tags){
            ui.setTagSize($scope.tags[i].id, $scope.tags[i].advertsAmount);
        }
    };

    $scope.scrollTo = () => {
        ui.scrollTo('logo-link', 500);
    };

    $scope.showError = () => {
        ui.toggleError('error');
    };

    $scope.toggleAuthDialog = ui.toggleAuthDialog;

    $scope.unauthorize = () => {
        auth.unauthorize();
        delete $scope.user;
    };

    $scope.authorize = () => {
        auth.authorize($scope.formData).success((response)=>{
            $scope.user = response;
            $scope.user.login = $scope.formData.login;
            $scope.user.password = $scope.formData.password;
            if($scope.user.admin){
                $scope.user.role = "Администраторы";
            } else {
                $scope.user.role = "Пользователи";
            }
            $scope.user.registrationDate = $scope.user.registrationDate.split("T");
            $cookies.putObject('user', $scope.user);
            console.log($scope.user);
            $scope.toggleAuthDialog();
        })
            .error((response) => {
                $scope.error = "Неверный логин или пароль!";
                $scope.showError();
                $scope.toggleAuthDialog();
                console.log(response);
            });
    };

    $scope.searchAdvert = () => {
        $window.location.href = '#/adverts/search/' + $scope.formData.search + "/1";
    };

    $scope.convert = () => {
        var docDefinition = {
            content: [
                {
                    text: $scope.advert.title,
                    fontSize: 32,
                    bold: true,
                    background: '#ff1'
                },
                {
                    text: "Категория: " + $scope.advert.category.name + ", " + $scope.advert.subcategory.name,
                    fontSize: 18
                },
                {
                    canvas: [
                        {
                            type: 'line',
                            x1: 0, y1: 15,
                            x2: 500, y2: 15,
                            lineWidth: 2
                        }
                    ]
                },
                {
                    text: "Контактная информация",
                    margin: [150, 15],
                    fontSize: 18,
                    italic: true
                },
                {
                    ul: [
                        'Имя: ' + $scope.advert.owner.name + " " + $scope.advert.owner.surname,
                        'Моб.телефон: ' + $scope.advert.owner.phone,
                        'Где: ' + $scope.advert.region.name + ", " + $scope.advert.country.name,
                        'Email: ' + $scope.advert.owner.email
                    ]
                },
                {
                    canvas: [
                        {
                            type: 'line',
                            x1: 0, y1: 15,
                            x2: 500, y2: 15,
                            lineWidth: 2
                        }
                    ]
                },
                {
                    text: "Описание",
                    margin: [200, 10],
                    fontSize: 18,
                    bold: true
                },
                {
                    text: $scope.advert.description,
                    fontSize: 14
                },
                {
                    text: "Стоимость: " + $scope.advert.price + " " + $scope.advert.currency.abbreviation,
                    fontSize: 16,
                    color: '#3E6D00',
                    margin: [320, 30, 0, 0]
                }
            ]
        };
        pdfMake.createPdf(docDefinition).open();
    }
};

advertMoreController.$inject = [
    '$scope',
    '$cookies',
    'auth',
    'ui',
    '$routeParams',
    '$window',
    'advertMore',
    'aside'
];

angular.module('app').controller('advertMoreController', advertMoreController);