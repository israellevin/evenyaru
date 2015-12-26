'Evenyaru server'
# pylint: disable=import-error, invalid-name
import os
import time
import uuid
import json
import flask
import redis
import logging
import threading
import flask.ext.socketio as io

app = flask.Flask(__name__, static_url_path='')
app.config['SECRET_KEY'] = 'Should be set in env'

if 'DEBUG' in os.environ:
    app.debug = True
    app.logger.setLevel(logging.DEBUG)
app.logger.info('Flask started')

db = redis.from_url(os.environ['REDISCLOUD_URL'])
pubsub = db.pubsub()

socketio = io.SocketIO(app)

rooms = {}


def resolve(a, b):
    'Rules of the game.'
    if a[1] == b[1]:
        return None
    if (a[1], b[1]) in [('rock', 'scissors'), ('scissors', 'paper'), ('paper', 'rock')]:
        return a[0]
    return b[0]


def checkredis():
    'Check redis for events.'
    while True:
        time.sleep(1)
        while True:
            try:
                message = pubsub.get_message()
            except AttributeError:
                break
            if message is None:
                break
            if not isinstance(message['data'], long):
                data = json.loads(message['data'])
                if 'move' in data.keys():
                    socketio.emit('move', {
                        'player': data['move']}, room=message['channel'])
                elif 'victory' in data.keys():
                    socketio.emit('victory', {
                        'player': data['victory']}, room=message['channel'])
                else:
                    app.logger.debug("unknown message: %s", message)

threading.Thread(target=checkredis).start()


@app.route('/')
def index():
    'Handle token registration and redirect to app.'
    response = app.send_static_file('index.html')
    if 'token' not in flask.session:
        token = flask.request.cookies.get('token')
        if token is None:
            token = str(uuid.uuid4())
            response.set_cookie('token', token)
        flask.session['token'] = token
    return response


@socketio.on('connect')
def connect(_):
    'Report back with token.'
    app.logger.debug("{} connected".format(flask.session.get('token', 'notoken')))
    io.emit('connected', {'token': flask.session.get('token')})


@socketio.on('join')
def join(message):
    'Joins redis channel and socketio room.'
    room = message['room']
    flask.session['room'] = room
    try:
        rooms[room]['count'] += 1
    except KeyError:
        rooms[room] = {'count': 1}
    pubsub.subscribe(room)
    io.join_room(room)
    io.emit('ready', room)


@socketio.on('disconnect')
def disconnect():
    'Cleanup.'
    if 'room' in flask.session.keys():
        room = flask.session['room']
        del flask.session['room']
        try:
            rooms[room]['count'] -= 1
            if rooms[room]['count'] > 1:
                del rooms[room]
                pubsub.unsubscribe(room)
        except KeyError:
            pass


@socketio.on('play')
def play(message):
    'Choose a move.'
    room = flask.session.get('room')
    token = flask.session.get('token')
    choise = message['choise']
    existingchoise = db.rpop(room)
    if existingchoise is None:
        db.lpush(room, json.dumps((token, message['choise'])))
        db.publish(room, json.dumps({'move': token}))
    else:
        db.publish(room, json.dumps({'victory': resolve(
            json.loads(existingchoise), (token, choise))}))


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0')
