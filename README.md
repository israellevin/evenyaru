This is the Android apk version of the Evenyaru server, implemented in kivy as a service

* One of the 2 phones should serve as a hotspot (internet connection not needed),
  and also run this apk.

* Both phones should either browse to `http://192.168.43.1:5000`
  or run the Ionic client hardwired to that address
  instead of the Heroku server.



What I did was create a mock `redis.py` that uses
[json-store](https://pypi.python.org/pypi/json-store/)
and methods are wrapped in a `Lock.acquire(True)`
for thread-safety.

**Note:** You can run `DEBUG=1 ./runserver.sh` but can't run in apk as
  debug (don't know why):
  Service crashes (without saying why in the logcat or kivy's log).

### Building

* [Short] docs are at http://buildozer.readthedocs.org/
  (and http://python-for-android.readthedocs.org may also be handy)

* Kivy you can install from pip or git, but buildozer I've cloned from
  https://github.com/kivy/buildozer
  (I'm almost sure it matters).

* To build: `buildozer -v android debug`

* To deploy via usb: `buildozer -v android deploy`

* To run and logcat: `buildozer -v android run logcat | tee android.log`

### Runtime

* Sevrice logs to `/sdcard/.evenyaru-logs/` (`service/redis.py` says that)

* "redis db" is at `/sdcard/.evenyaru.json`

----

### Original README

----


# Evenyaru

A game for people waiting in traffic lights.

Implemented on mobile phones with a browser connected to distributed servers
coordinating via redis and websockets because that's the fastest way to go.
Unbelievable.
