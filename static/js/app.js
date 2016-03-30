var MOVES = ['rock', 'paper', 'scissors'];
var QUIPS = {
    'win': {
        'rock': [
            '"באתי, ראיתי, ניצחתי." ~ יוליוס קיסר',
            '"אין משנים קבוצה מנצחת." ~ פתגם צרפתי'
        ],
        'paper': [
            '"באתי, ראיתי, ניצחתי." ~ יוליוס קיסר',
            '"אין משנים קבוצה מנצחת." ~ פתגם צרפתי'
        ],
        'scissors': [
            '"באתי, ראיתי, ניצחתי." ~ יוליוס קיסר',
            '"אין משנים קבוצה מנצחת." ~ פתגם צרפתי'
        ]
    },
    'draw': {
        'rock': [
            '"אין בנמצא הנאה כמו להיפגש עם חבר ישן, אולי מלבד להתיידד עם חבר חדש." ~ רודיארד קיפלינג',
            '"טוב שכן קרוב מאח רחוק." (משלי כז י)'
        ],
        'paper': [
            '"אין בנמצא הנאה כמו להיפגש עם חבר ישן, אולי מלבד להתיידד עם חבר חדש." ~ רודיארד קיפלינג',
            '"טוב שכן קרוב מאח רחוק." (משלי כז י)'
        ],
        'scissors': [
            '"אין בנמצא הנאה כמו להיפגש עם חבר ישן, אולי מלבד להתיידד עם חבר חדש." ~ רודיארד קיפלינג',
            '"טוב שכן קרוב מאח רחוק." (משלי כז י)'
        ]
    },
    'lose': {
        'rock': [
            '"אם מצאתי אלף דרכים שלא עובדות, לא נכשלתי. כל ניסיון שכשל הוא עוד צעד קדימה" ~ תומאס אלווה אדיסון',
            '"הכישלון איננו מבטל את כנותו של הניסיון." ~ פול אוסטר'
        ],
        'paper': [
            '"אם מצאתי אלף דרכים שלא עובדות, לא נכשלתי. כל ניסיון שכשל הוא עוד צעד קדימה" ~ תומאס אלווה אדיסון',
            '"הכישלון איננו מבטל את כנותו של הניסיון." ~ פול אוסטר'
        ],
        'scissors': [
            '"אם מצאתי אלף דרכים שלא עובדות, לא נכשלתי. כל ניסיון שכשל הוא עוד צעד קדימה" ~ תומאס אלווה אדיסון',
            '"הכישלון איננו מבטל את כנותו של הניסיון." ~ פול אוסטר'
        ]
    }
};

angular.module('evenyaru', ['ionic', 'ngCordova']).config(function($ionicConfigProvider){
    $ionicConfigProvider.views.maxCache(0);
})

.run(function($ionicPlatform){
    $ionicPlatform.ready(function(){
        // Hide the accessory bar.
        if(window.cordova && window.cordova.plugins.Keyboard){
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar){
            StatusBar.styleDefault();
        }
    });
})

.controller('mainCtrl', function($scope, $location, $ionicPopup, $timeout, $interval){
    var home = 'http://' + document.domain + ':' + location.port;
    var socket = io.connect(home);
    var timeoutObj;
    var prevPage=0;
    var call4arms_cancelObj;
    var call4arms_sound = new Audio(home + '/audio/trumpet2.ogg');
    var call4win_cancelObj;
    var call4win_sound = new Audio(home + '/audio/whistle.ogg');
    var kiss_sound = new Audio(home + '/audio/kiss.ogg');
    var win_sound = new Audio(home + '/audio/win.ogg');
    var noo_sound = new Audio(home + '/audio/noo.ogg');

    socket.emit('connect', {});

    socket.on('connected', function(message){
        $scope.token = message.token;
        $scope.room = $location.search().room || 'stam';
        $scope.join($scope.room);
        $scope.$applyAsync();
    });

    socket.on('fail', function(message){
        if(message.type === 'room is full'){
            $ionicPopup.alert({
                title: 'החדר מלא!',
                template: 'נסה שוב?'
            }).then(function(){
                $scope.join($scope.room);
            });
        }else if(message.type === 'wrong team'){
            $ionicPopup.confirm({
                title: 'playing for the wrong team',
                template: 'Would you like to override your default team?'
            }).then(function(override){
                if(override){
                    $scope.join($scope.room, true);
                }
            });
        }else{
            console.log('unknown error', message);
        }
    });

    socket.on('ready', function(message){
        $scope.room = message.room;
        $scope.team = message.team;
        $scope.message = 'בחר:';
        $scope.ready = true;
        $scope.state = 0;
        $scope.$applyAsync();
        if(
            typeof call4arms_cancelObj === 'undefined' ||
            2 === call4arms_cancelObj.$$state.status
        ){
            call4arms_cancelObj = $interval(function(){
                call4arms_sound.play();
            }, 120000);
        }
    });

    socket.on('score', function(message){
        $scope.score = message.score;
        $scope.$applyAsync();
    });

    socket.on('move', function(message){
        $interval.cancel(call4arms_cancelObj);
        if(message.move == $scope.team){
            $scope.state = 2;
        }else{
            if(
                typeof call4win_cancelObj === 'undefined' ||
                2 === call4win_cancelObj.$$state.status
            ){
                call4win_cancelObj = $interval(function(){
                    call4win_sound.play();
                }, 15000);
            }
            $scope.state = -1;
        }
        $scope.$applyAsync();
    });

    socket.on('winner', function(message){
        var rightquips, modifier, you, them='';
        $interval.cancel(call4win_cancelObj);
        if(null === message.winner){
            rightquips = QUIPS.draw[$scope.choice];
            modifier = 0;
            you = them = 'cool';
            kiss_sound.play();
        }else if(message.winner === $scope.team){
            rightquips = QUIPS.win[$scope.choice];
            modifier = 2;
            you = 'win'; them = 'lose';
            win_sound.play();
        }else{
            rightquips = QUIPS.lose[$scope.choice];
            modifier = 1;
            you = 'lose'; them = 'win';
            noo_sound.play();
        }
        $scope.quip = rightquips[Math.floor(Math.random() * rightquips.length)];
        $scope.response = MOVES[(MOVES.indexOf($scope.choice) + modifier) % 3];
        $scope.choicesuccess =  you;
        $scope.them = them;
        $scope.waiting='no';
        $scope.message += ' שחק שוב:';
        $scope.autoplay = '';
        $timeout(function(){
            $scope.state = 3;
            timeoutObj = $timeout(function(){
                $scope.state = 0;
                if(
                    typeof call4arms_cancelObj === 'undefined' ||
                    2 === call4arms_cancelObj.$$state.status
                ){
                    call4arms_cancelObj = $interval(function(){
                        call4arms_sound.play();
                    }, 120000);
                }
            },  10000);
        },  4000);
    });

    $scope.join = function(room, override){
        socket.emit('join', {room: room, override: override});
    };

    $scope.play = function(choice){
        $scope.state = 1;
        socket.emit('play', {choice: choice});
        $scope.choice = choice;
        $scope.response = false;
        $scope.choicesuccess = '';
        $scope.them = '';
        $scope.$applyAsync();
    };

    $scope.log_email = function(address){
        socket.emit('log_email', address);
        $scope.state = prevPage;
    };

    $scope.gotomail = function(){
        if($scope.state === 2) prevPage = $scope.state;
        $scope.state = 3;
        timeoutObj = $timeout(function(){
            $scope.state = prevPage;
            prevPage = 0;
        },  10000);
    };

    $scope.cancelTimeout = function(){
        $timeout.cancel(timeoutObj);
        timeoutObj = $timeout(function(){
            $scope.state = prevPage;
        },  10000);
    };

    $scope.gotomain = function(){
        $scope.state = 0;
    };
});
