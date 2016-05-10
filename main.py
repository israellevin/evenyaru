__version__ = '0.5'

from kivy.app import App
from kivy.lang import Builder
from kivy.utils import platform

android_kv = '''
FloatLayout:
    size: root.size

    Button:
        size_hint: 0.5, 0.5
        pos_hint: {"x": 0.25, "y": 0.25}
        background_color: 1, 0, 0, 1
        text: "Click to stop the server"
        on_press: app.stop_service()
'''

desktop_kv = '''
Label:
    size:root.size
    markup: True
    text: "This GUI is for android only.\\nTo debug the service on desktop:\\n$ [b]cd service[/b]\\n$ [b]python2 main.py[/b]"
'''


class ClientServerApp(App):
    def build(self):
        self.service = None
        if self.start_service():
            self.root = Builder.load_string(android_kv)
        else:
            self.root = Builder.load_string(desktop_kv)
        return self.root

    def start_service(self):
        if platform == 'android':
            from android import AndroidService
            service = AndroidService('Evenyaru server', 'Click here for the stop button')
            service.start('Evenyaru server started')
            self.service = service
            return True
        return False

    def stop_service(self):
        if self.service:
            self.service.stop()
            self.service = None
            self.stop()

    def on_suspend(self):
        return True

    def on_resume(self):
        pass

if __name__ == '__main__':
    ClientServerApp().run()
