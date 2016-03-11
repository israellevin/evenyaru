var MOVES = ['rock', 'paper', 'scissors'];
var QUIPS = {
    'win': {
        'rock': [
            '"באתי, ראיתי, ניצחתי." (בלטינית: " Veni Vidi Vici") ~ יוליוס קיסר',
            '"אין משנים קבוצה מנצחת." ~ פתגם צרפתי'
        ],
        'paper': [
            '"באתי, ראיתי, ניצחתי." (בלטינית: " Veni Vidi Vici") ~ יוליוס קיסר',
            '"אין משנים קבוצה מנצחת." ~ פתגם צרפתי'
        ],
        'scissors': [
            '"באתי, ראיתי, ניצחתי." (בלטינית: " Veni Vidi Vici") ~ יוליוס קיסר',
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

angular.module('evenyaru', ['ionic']).config(function($ionicConfigProvider){
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

.controller('mainCtrl', function($scope, $location, $ionicPopup, $timeout){
    var socket = io.connect('http://' + document.domain + ':' + location.port);
    var timeoutObj;
    socket.emit('connect', {});

    socket.on('connected', function(message){
        $scope.token = message.token;
        $scope.room = $location.search().room || 'stam';
        $scope.join($scope.room);
        $scope.$apply();
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
        $scope.$apply();
    });

    socket.on('score', function(message){
        console.log('score:', message);
        $scope.score = message.score;
        $scope.$apply();
    });

    socket.on('move', function(message){
        if(message.move == $scope.team){
            $scope.state = 2;
        }else{
            $scope.state = -1;
        }
        $scope.$apply();
    });

    socket.on('winner', function(message){
        var rightquips, modifier, you, them='';
        if(null === message.winner){
            rightquips = QUIPS.draw[$scope.choice];
            modifier = 3;
            you = them = 'cool';
        new Audio('http://evenyaru.herokuapp.com/audio/kiss.ogg').play();
        }else if(message.winner === $scope.team){
            rightquips = QUIPS.win[$scope.choice];
            modifier = 2;
            you = 'win'; them = 'lose';
        new Audio('http://evenyaru.herokuapp.com/audio/win.ogg').play();
        }else{
            rightquips = QUIPS.lose[$scope.choice];
            modifier = 4;
            you = 'lose'; them = 'win';
        new Audio('http://evenyaru.herokuapp.com/audio/noo.ogg').play();
        }
        $scope.quip = rightquips[Math.floor(Math.random() * rightquips.length)];
        $scope.response = MOVES[(MOVES.indexOf($scope.choice) + modifier) % 3];
        console.log($scope.response);
        $scope.choicesuccess =  you;
        $scope.them = them;
    $scope.waiting='no';
        $scope.message += ' שחק שוב:';
        $scope.autoplay = '';
        // TODO Here comes the animation.
        $timeout(function(){
        $scope.state = 3;
        timeoutObj = $timeout(function(){
        $scope.state = 0;
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
    $scope.choicesuccess='';
    $scope.them ='';
        $scope.$apply();
    };

    $scope.log_email = function(address){
        socket.emit('log_email', address);
    };
    
    $scope.gotomail = function(){
    $scope.state = 3;
    timeoutObj = $timeout(function(){
        $scope.state = 0;
    },  10000);
    };
    
    $scope.cancelTimeout = function(){
        $timeout.cancel(timeoutObj);
    timeoutObj = $timeout(function(){
        $scope.state = 0;
    },  10000);
    };
    
});
