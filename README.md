# SWAPMAP 🪄👕
SWAPMAP is a mobile application  that facilitates organizing meetings in public places to swap clothes in order to prolong the lifecycle of used clothes, protecting the environment and helping people make more sustainable and economic choices.

How to run the application:
```sh
# client - first terminal
cd client ; npm install ; npx expo start -w

# server - second terminal
## windows
cd server ; venv\Scripts\activate ; pip install -r requirements.txt ; flask --app server run

## mac-os/linux
cd server ; source venv/bin/activate ; pip install -r requirements.txt ; flask --app server run

# venv\Scripts\activate (windows) or source venv/bin/activate (unix-like OS)
# is necessary to activate a virtual environment (safe zone to run code)
# You can use python3 server.py instead of flask --app server run to automatically refresh the server side when you are coding 
```

How to create the virtual environment for the server side:
```sh
# server (windows/mac-os/linux)
cd server ; python3 -m venv venv

# python -m venv venv instead creates a new virtual environment
# and it is not necessary to run it again after the first time.
```

To deactivate the virtual environment, run:
```sh
# 'server' terminal
deactivate
```

To update the requirements (libraries) needed for the python application, run (before the commit):
```sh
pip freeze > requirements.txt
```

To initialize the database, into the server virtual environment:
```sh
python _initDb.py
```

## Technologies used
### Client
React Native libraries to implement the frontend.

#### Palette
<a href='https://mobilepalette.netlify.app/?color=163f2e'> Link to the palette </a>

<!-- ![](client/assets/palette.svg) -->

### Server
Python Flask to develop the server.