'use strict';
angular.module('SpamExpertsApp', ['ionic', 'ngCordova', 'ion-datetime-picker'])
    .run(['$ionicPlatform',
        function($ionicPlatform) {
            $ionicPlatform.ready(function() {

                try {
                    window.cordova.plugins.certificates.trustUnsecureCerts(true);
                } catch (err) {
                    // the above will only work in production
                }

                // we should hide the splashscreen as soon as the app started
                setTimeout(function () {
                    try {
                        navigator.splashscreen.hide();
                    } catch (err) {
                        // the above will only work in production
                    }
                }, 10);

                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if(window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if(window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });
        }
    ])
    .config(['$httpProvider', '$ionicConfigProvider',
        function ($httpProvider, $ionicConfigProvider) {
            // register our $http interceptor
            $httpProvider.interceptors.push('ApiInterceptor');

            // Fixes an issue that causes some controllers to reload
            $ionicConfigProvider.views.forwardCache(true);
        }
    ])
    // created filter for the notification queue messages see 'templates/common/messageQueue.html'
    .filter('trust', ['$sce', function($sce) {
        return $sce.trustAsHtml;
    }]);