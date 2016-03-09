""" Mock Redis
Note: this implementation is neither efficient nor full (or even accurate)
its sole purpose is to perform whatever evenyaru.py expects from redis"""

## ---------------------------------
# This makes log files of the android service accessible without su
# It doesn't belong here, but since we don't want to touch
# main.py, we do it while we're mocking redis :)
from kivy.utils import platform
from kivy.config import Config
if platform=='android':
    Config.set('kivy', 'log_dir', '/sdcard/.evenyaru-logs')
## ---------------------------------

import sqlite3dbm
from threading import Lock
from Queue import Queue, Empty
from kivy import platform
from kivy.logger import Logger

class MockPubSub:
    """Assumes a single subscriber.
might not preserve order of messages (retrieves them in channel order)."""
    channels = None

    def __init__(self):
        self.channels = {}

    def subscribe(self, channel):
        if not self.channels.has_key(channel):
            self.channels[channel] = Queue()

    def unsubscribe(self, channel):
        try:
            self.channels[channel]
        except KeyError:
            pass

    def publish(self, channel, message):
        if self.channels.has_key(channel):
            self.channels[channel].put(message)

    def get_message(self):
        for channel in self.channels.keys():
            try:
               return {'channel': channel, 'data': self.channels[channel].get(False)}
            except Empty:
                pass
        return None

class MockRedis:
    shelf = None
    ###@@@ Not sure a lock is needed, but wouldn't hurt
    lock = None
    _pubsub = None

    def __init__(self, db_filname):
        self.shelf = sqlite3dbm.sshelve.open(db_filname)
        self.lock = Lock()
        self._pubsub = MockPubSub()
    
    def get(self, key):
        key = str(key)
        self.lock.acquire(True)
        val = self.shelf.get(key)
        self.lock.release()
        return val

    def set(self, key, val):
        key = str(key)
        self.lock.acquire(True)
        self.shelf[key] = val
        self.shelf.sync()
        self.lock.release()

    def incr(self, key):
        key = str(key)
        self.lock.acquire(True)
        val = self.shelf[key] = self.shelf.get(key, 0)+1
        self.shelf.sync()
        self.lock.release()
        return val

    def incrby(self, key, amount):
        key = str(key)
        self.lock.acquire(True)
        val = self.shelf[key] = self.shelf.get(key, 0)+amount
        self.shelf.sync()
        self.lock.release()
        return val

    def decr(self, key):
        key = str(key)
        self.lock.acquire(True)
        val = self.shelf[key] = self.shelf.get(key, 0)-1
        self.shelf.sync()
        self.lock.release()
        return val

    def decrby(self, key, amount):
        key = str(key)
        self.lock.acquire(True)
        val = self.shelf[key] = self.shelf.get(key, 0)-amount
        self.shelf.sync()
        self.lock.release()
        return val

    def lrange(self, key, start, stop):
        key = str(key)
        self.lock.acquire(True)
        vec = self.shelf.get(key,[])
        self.lock.release()
        ###@@@ I hope this is what they mean at
        ###@@@ http://redis.io/commands/lrange
        if stop==-1:
            return vec[start:]
        return vec[start:][:stop+1]

    def rpush(self, key, val):
        key = str(key)
        self.lock.acquire(True)
        vec = self.shelf.get(key, [])
        vec.append(val)
        self.shelf[key] = vec
        self.shelf.sync()
        self.lock.release()
        return len(vec)

    def rpop(self, key):
        key = str(key)
        self.lock.acquire(True)
        vec = self.shelf.get(key, [])
        try:
            val = vec.pop()
        except IndexError:
            val = None
        self.shelf[key] = vec
        self.shelf.sync()
        self.lock.release()
        return val

    def lpush(self, key, val):
        key = str(key)
        self.lock.acquire(True)
        vec = self.shelf.get(key, [])
        vec.insert(0, val)
        self.shelf[key] = vec
        self.shelf.sync()
        self.lock.release()
        return len(vec)

    def lpop(self, key):
        key = str(key)
        self.lock.acquire(True)
        vec = self.shelf.get(key, [])
        try:
            val, vec = vec[0], vec[1:]
        except IndexError:
            val = None
        self.shelf[key] = vec
        self.shelf.sync()
        self.lock.release()
        return val

    def lrem(self, key, val, count):
        key = str(key)
        self.lock.acquire(True)
        vec = self.shelf.get(key, [])
        remcount = 0
        if count==0:
            while True:
                try:
                    vec.remove(val)
                    remcount+=1
                except ValueError:
                    break
        else:
            if count<0:
                a.reverse
            for i in range(abs(count)):
                try:
                    vec.remove(val)
                    remcount+=1
                except ValueError:
                    break
            if count<0:
                a.reverse
        self.shelf[key] = vec
        self.shelf.sync()
        self.lock.release()
        return remcount

    def pubsub(self):
        return self._pubsub

    def publish(self, channel, message):
        self._pubsub.publish(channel, message)
    
def from_url(whatever):
    return MockRedis(
            platform=='android' and '/sdcard/.evenyaru.sqlite3' \
            or './.evenyaru.sqlite3')
