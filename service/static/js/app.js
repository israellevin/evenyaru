var MOVES = ['rock', 'paper', 'scissors'];
var QUIPS = {
    'win': {
        'rock': [
            '"באתי, ראיתי, ניצחתי." ~ יוליוס קיסר',
            '"אין משנים קבוצה מנצחת." ~ פתגם צרפתי',
	    '"גרגר אורז אחד יכול להטות את הכף. אדם אחד יכול להיות ההבדל בין ניצחון לתבוסה." ~ הסרט "מולאן"',
	    '"ללא האפשרות להיכשל, כל שאיפותינו היו מתגשמות בנקל." ~ ז׳\ול ורן',
	    '"אין בנמצא הצלחה שהושגה בקלות, או כישלון מוחלט." ~ מרסל פרוסט',
	    '"יהי כבוד חברך חביב עליך כשלך." ~ מסכת אבות ,פרק ב משנה י'
        ],
        'paper': [
            '"באתי, ראיתי, ניצחתי." ~ יוליוס קיסר',
            '"אין משנים קבוצה מנצחת." ~ פתגם צרפתי',
	    '"גרגר אורז אחד יכול להטות את הכף. אדם אחד יכול להיות ההבדל בין ניצחון לתבוסה." ~ הסרט "מולאן"',
	    '"ללא האפשרות להיכשל, כל שאיפותינו היו מתגשמות בנקל." ~ ז׳\ול ורן',
	    '"אין בנמצא הצלחה שהושגה בקלות, או כישלון מוחלט." ~ מרסל פרוסט',
	    '"יהי כבוד חברך חביב עליך כשלך." ~ מסכת אבות ,פרק ב משנה י'
        ],
        'scissors': [
            '"באתי, ראיתי, ניצחתי." ~ יוליוס קיסר',
            '"אין משנים קבוצה מנצחת." ~ פתגם צרפתי',
	    '"גרגר אורז אחד יכול להטות את הכף. אדם אחד יכול להיות ההבדל בין ניצחון לתבוסה." ~ הסרט "מולאן"',
	    '"ללא האפשרות להיכשל, כל שאיפותינו היו מתגשמות בנקל." ~ ז׳\ול ורן',
	    '"אין בנמצא הצלחה שהושגה בקלות, או כישלון מוחלט." ~ מרסל פרוסט',
	    '"יהי כבוד חברך חביב עליך כשלך." ~ מסכת אבות ,פרק ב משנה י'
        ]
    },
    'draw': {
        'rock': [
            '"אין בנמצא הנאה כמו להיפגש עם חבר ישן, אולי מלבד להתיידד עם חבר חדש." ~ רודיארד קיפלינג',
            '"טוב שכן קרוב מאח רחוק." (משלי כז י)',
	    '"קל יותר לעשות מלחמה מאשר לעשות שלום." ~ ז׳\ורז׳\ קלמנסו',
	    '"ההנאה שבמריבות היא לעשות שלום." ~ אלפרד דה מיסה',
	    '"מי שנמצא במלחמה עם אחרים, לא יכול להיות בשלום עם עצמו." ~ אלמוני',
	    '"השלום מתחיל במקום בו נולדת אהבה" ~ נילי דגן',
	    '"האם אינני מנצח את אויביי אם אני הופך אותם לידידיי?" ~ אברהם לינקולן',
	    '"על האנושות לשים קץ למלחמה, או שהמלחמה תשים קץ לאנושות." ~ ג׳\ון פיצג׳\ראלד קנדי'
        ],
        'paper': [
            '"אין בנמצא הנאה כמו להיפגש עם חבר ישן, אולי מלבד להתיידד עם חבר חדש." ~ רודיארד קיפלינג',
            '"טוב שכן קרוב מאח רחוק." (משלי כז י)',
	    '"קל יותר לעשות מלחמה מאשר לעשות שלום." ~ ז׳\ורז׳\ קלמנסו',
	    '"ההנאה שבמריבות היא לעשות שלום." ~ אלפרד דה מיסה',
	    '"מי שנמצא במלחמה עם אחרים, לא יכול להיות בשלום עם עצמו." ~ אלמוני',
	    '"השלום מתחיל במקום בו נולדת אהבה" ~ נילי דגן',
	    '"האם אינני מנצח את אויביי אם אני הופך אותם לידידיי?" ~ אברהם לינקולן',
	    '"על האנושות לשים קץ למלחמה, או שהמלחמה תשים קץ לאנושות." ~ ג׳\ון פיצג׳\ראלד קנדי'
        ],
        'scissors': [
            '"אין בנמצא הנאה כמו להיפגש עם חבר ישן, אולי מלבד להתיידד עם חבר חדש." ~ רודיארד קיפלינג',
            '"טוב שכן קרוב מאח רחוק." (משלי כז י)',
	    '"קל יותר לעשות מלחמה מאשר לעשות שלום." ~ ז׳\ורז׳\ קלמנסו',
	    '"ההנאה שבמריבות היא לעשות שלום." ~ אלפרד דה מיסה',
	    '"מי שנמצא במלחמה עם אחרים, לא יכול להיות בשלום עם עצמו." ~ אלמוני',
	    '"השלום מתחיל במקום בו נולדת אהבה" ~ נילי דגן',
	    '"האם אינני מנצח את אויביי אם אני הופך אותם לידידיי?" ~ אברהם לינקולן',
	    '"על האנושות לשים קץ למלחמה, או שהמלחמה תשים קץ לאנושות." ~ ג׳\ון פיצג׳\ראלד קנדי'
        ]
    },
    'lose': {
        'rock': [
            '"אם מצאתי אלף דרכים שלא עובדות, לא נכשלתי. כל ניסיון שכשל הוא עוד צעד קדימה" ~ תומאס אלווה אדיסון',
            '"הכישלון איננו מבטל את כנותו של הניסיון." ~ פול אוסטר',
	    '"גרגר אורז אחד יכול להטות את הכף. אדם אחד יכול להיות ההבדל בין ניצחון לתבוסה." ~ הסרט "מולאן"',
	    '"בשעת ניצחון אתה ראוי לשמפניה - בעת הפסד אתה זקוק לה" ~ נפוליאון בונפרטה',
	    '"לפעמים אתה מפסיד, ולפעמים הקבוצה השנייה מנצחת" ~ אוטו רהאגל',
	    '״מעולם לא הפסדתי במשחק - רק נגמר לי הזמן״ (מייקל ג׳\ורדן)',
	    '"לעתים קרובות אנו שמים בידי אויבינו את האמצעים כדי להשמידנו." ~ איזופוס',
	    '"קיים דבר אחד בלבד הגורם לחלום להיות לא אפשרי: הפחד מכישלון." ~ פאולו קואלו',
	    '"מי שמתחיל ללא שיקול דעת, אינו צריך להתפלא אם הוא גומר בכישלון." ~ שבליה דה מרה',
	    '"אין בנמצא הצלחה שהושגה בקלות, או כישלון מוחלט." ~ מרסל פרוסט',
	    '"כישלון הוא הזדמנות להתחיל בדרך חכמה יותר." ~ הלן קלר',
	    '״הפחד מכישלון הוא הכישלון הכי גדול״ ~ אנונימי',
	    '"הדרך איננה חשובה. די ברצון להגיע." ~ אלבר קאמי',
	    '"מוטב לחשוב לפני הפעולה מאשר להתחרט אחריה." ~ דמוקריטוס'
        ],
        'paper': [
            '"אם מצאתי אלף דרכים שלא עובדות, לא נכשלתי. כל ניסיון שכשל הוא עוד צעד קדימה" ~ תומאס אלווה אדיסון',
            '"הכישלון איננו מבטל את כנותו של הניסיון." ~ פול אוסטר',
	    '"גרגר אורז אחד יכול להטות את הכף. אדם אחד יכול להיות ההבדל בין ניצחון לתבוסה." ~ הסרט "מולאן"',
	    '"בשעת ניצחון אתה ראוי לשמפניה - בעת הפסד אתה זקוק לה" ~ נפוליאון בונפרטה',
	    '"לפעמים אתה מפסיד, ולפעמים הקבוצה השנייה מנצחת" ~ אוטו רהאגל',
	    '״מעולם לא הפסדתי במשחק - רק נגמר לי הזמן״ (מייקל ג׳\ורדן)',
	    '"לעתים קרובות אנו שמים בידי אויבינו את האמצעים כדי להשמידנו." ~ איזופוס',
	    '"קיים דבר אחד בלבד הגורם לחלום להיות לא אפשרי: הפחד מכישלון." ~ פאולו קואלו',
	    '"מי שמתחיל ללא שיקול דעת, אינו צריך להתפלא אם הוא גומר בכישלון." ~ שבליה דה מרה',
	    '"אין בנמצא הצלחה שהושגה בקלות, או כישלון מוחלט." ~ מרסל פרוסט',
	    '"כישלון הוא הזדמנות להתחיל בדרך חכמה יותר." ~ הלן קלר',
	    '״הפחד מכישלון הוא הכישלון הכי גדול״ ~ אנונימי',
	    '"הדרך איננה חשובה. די ברצון להגיע." ~ אלבר קאמי',
	    '"מוטב לחשוב לפני הפעולה מאשר להתחרט אחריה." ~ דמוקריטוס'
        ],
        'scissors': [
            '"אם מצאתי אלף דרכים שלא עובדות, לא נכשלתי. כל ניסיון שכשל הוא עוד צעד קדימה" ~ תומאס אלווה אדיסון',
            '"הכישלון איננו מבטל את כנותו של הניסיון." ~ פול אוסטר',
	    '"גרגר אורז אחד יכול להטות את הכף. אדם אחד יכול להיות ההבדל בין ניצחון לתבוסה." ~ הסרט "מולאן"',
	    '"בשעת ניצחון אתה ראוי לשמפניה - בעת הפסד אתה זקוק לה" ~ נפוליאון בונפרטה',
	    '"לפעמים אתה מפסיד, ולפעמים הקבוצה השנייה מנצחת" ~ אוטו רהאגל',
	    '״מעולם לא הפסדתי במשחק - רק נגמר לי הזמן״ (מייקל ג׳\ורדן)',
	    '"לעתים קרובות אנו שמים בידי אויבינו את האמצעים כדי להשמידנו." ~ איזופוס',
	    '"קיים דבר אחד בלבד הגורם לחלום להיות לא אפשרי: הפחד מכישלון." ~ פאולו קואלו',
	    '"מי שמתחיל ללא שיקול דעת, אינו צריך להתפלא אם הוא גומר בכישלון." ~ שבליה דה מרה',
	    '"אין בנמצא הצלחה שהושגה בקלות, או כישלון מוחלט." ~ מרסל פרוסט',
	    '"כישלון הוא הזדמנות להתחיל בדרך חכמה יותר." ~ הלן קלר',
	    '״הפחד מכישלון הוא הכישלון הכי גדול״ ~ אנונימי',
	    '"הדרך איננה חשובה. די ברצון להגיע." ~ אלבר קאמי',
	    '"מוטב לחשוב לפני הפעולה מאשר להתחרט אחריה." ~ דמוקריטוס'
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
        // This trick requires the locktask plugin:
        // ionic plugin add https://github.com/oddmouse/cordova-plugin-locktask
        window.plugins.locktask.startLockTask();
    });
})

.controller('mainCtrl', function($scope, $location, $ionicPopup, $timeout, $interval){
    var home = 'http://' + '192.168.43.1' + ':' + '5000';
    var token = $location.search().token || 'purple';
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

    socket.emit('hello', {token: token});

    socket.on('connected', function(message){
        console.log('connected: '+JSON.stringify(message));
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
            if ($scope.state !== 1 && $scope.state !== 2){ 
		    if($scope.state==3) {prevPage=-1; }
		    else {$scope.state = -1;}
	     }
        }
	console.log("$scope.state-->",$scope.state);
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
                if ($scope.state === 3) $scope.state = 0;
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

    $scope.join = function(room){
        socket.emit('join', {room: room, team: token==='green'?0:1});
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
        if($scope.state === -1) prevPage = $scope.state;
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
	if(prevPage==-1) {$scope.state = -1;}
        else {$scope.state = 0;}
    };

});
