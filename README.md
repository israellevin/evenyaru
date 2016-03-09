This is the Android apk version of the Evenyaru server, implemented in kivy as a service

* One of the 2 phones should serve as a hotspot (internet connection not needed),
  and also run this apk.

* Both phones should either browse to `http://192.168.43.1:5000`
  or run the Ionic client hardwired to that address
  instead of the Heroku server.


### Current status

What I did was create a mock `redis.py` that uses
`slite3dbm` (they don't have `anydbm` on android)
where methods are wrapped in a Lock.acquire(True)
for thread-safety (not sure it's needed, but better
than thread-sorry).

At the moment it runs on linux, but the apk crashes
because some `.so` files get built as linux and not ARM.
Buildozer/python-for-android handle such things
with what they call recipes.

Buildozer's `android` target uses a branch of python-for-android
called `old_toolchain`, and recipes there are shell script based
(in `master`, they're python code). Some recipes only exist in one
branch and not the other.

#### Where do we go from here?

Either

* Add recipes so that gevent, greenlet, etc. build correctly
* Surprisingly, if we use the latest `Flask_SocketIO`
  (not  0.6.0), gevent is no longer needed and it compiles
  nicely, but then we need to change stuff at both server
  and client (different version of socket.io protocol),
  and so far I couldn't get this to run even on linux.
* Try the `android_new` target (uses p4a's
  master branch), but it doesn't have gevent [and maybe
  there are reasons why they don't yet mention it
  in the buildozer docs yet ;) ]

### Adding our own recipes [as far as I understand this]

To add our own recipes [ as explained at
http://buildozer.readthedocs.org/en/latest/contribute.html ],
we set `android.p4a_dir` to a folder created with
`git clone -b old_toolchain https://github.com/kivy/python-for-android`

and then we mess with the `recipes/` folder
(e.g. I've added `gevent102` which is a copy of `gevent`, but with ver `1.0.2`).

I have some alf-baked recipes there, but nothing worth committing so far.

### State-changing buildozer by-products

If `android.p4a_dir` is not set, when you rm `.buildozer/` you get a clean slate,
but if not, it creates `dist/MYAPP/` under the p4a dir, and [if build breaks]
there's also a `build/` folder there you have to remove.


----

### Original README

----


# Evenyaru

A game for people waiting in traffic lights.

Implemented on mobile phones with a browser connected to distributed servers
coordinating via redis and websockets because that's the fastest way to go.
Unbelievable.
