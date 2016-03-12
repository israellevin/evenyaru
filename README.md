This is the Android apk version of the Evenyaru server, implemented in kivy as a service

* One of the 2 phones should serve as a hotspot (internet connection not needed),
  and also run this apk.

* Both phones should either browse to `http://192.168.43.1:5000`
  or run the Ionic client hardwired to that address
  instead of the Heroku server.



What I did was create a mock `redis.py` that uses
`slite3dbm` (they don't have `anydbm` on android)
where methods are wrapped in a Lock.acquire(True)
for thread-safety (not sure it's needed, but better
than thread-sorry).

### Current status

* I've switched requirements to lastest flask_socketio (both at
  `requirements.txt` and `buildozer.spec`).

* Both linux and apk run

* When you do `DEBUG=1 runserver.sh` and browse to `/`,
  you get `TypeError: connect() takes exactly 1 argument (0 given)`

* You run `DEBUG=1 runserver.sh` but can't run in apk as debug (don't know why).
  Service crashes [without saying why in the logcat or its own log].

### Building

* [Short] docs are at http://buildozer.readthedocs.org/
  (and http://python-for-android.readthedocs.org may also be handy)

* Kivy you can install from pip or git, but buildozer I've cloned from
  https://github.com/kivy/buildozer
  (I'm almost sure it matters).

* It is important not to run buildozer from a virtual env,
  (don't remember url, but they say that).
  At my "normal python2" I have kivy installed (1.9.1, but 1.9.2
  is also OK), and cython 0.23 (I think kivy would install that,
  but anyway - you need it).

* To build: `buildozer -v android debug`

* To deploy via usb: `buildozer -v android deploy`

* To run and logcat: `buildozer -v android run logcat | tee android.log`

### Runtime

* Sevrice logs to `/sdcard/.evenyaru-logs/` (`service/redis.py` says that)

* "redis db" is at `/sdcard/.evenyaru3.json`

----

### Original README

----


# Evenyaru

A game for people waiting in traffic lights.

Implemented on mobile phones with a browser connected to distributed servers
coordinating via redis and websockets because that's the fastest way to go.
Unbelievable.
