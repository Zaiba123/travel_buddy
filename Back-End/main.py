import requests
from flask import Flask, request
from flask_cors import CORS
import googlemaps
import pprint
import time
import json

GOOGLE_PLACES_KEY = 'AIzaSyDMda7TV57EnsuSh4pu49UqhoHUKzaPNvc'
GOOGLE_CLIENT_ID = '1008790135767-v0eopbt6hsdplugq49j0c7940ocq63i8.apps.googleusercontent.com'
FIXER_API_KEY = '0ee35b948a4b30beeb47ce658ecd5ad9'
PREDICT_HQ_API_ID = 'ttjizU4FjGA'
PREDICT_HQ_API_SECRET = 'SjzUMXipT3_fAQQXxxm9FqR0ZHwCktB3vKEWxzOuqSUJsNPDWEZD2w'
PREDICT_HQ_API_ACCESS_TOKEN = 'paKVbqgAbto9AX-R11fXhp9-UI3IG3SYPW1ZzfuB'
WEATHER_STACK_API_KEY = '79ec836e718dc90704afaeb995b633ee'

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return 'hi'


@app.route("/get-coords")
def getCoords():
    address = request.args['address']
    response = requests.get(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + GOOGLE_PLACES_KEY)
    return response.text


@app.route("/get-distance")
def getDistance():
    origins = request.args['origins']
    destinations = request.args['destinations']
    response = requests.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins=' +
                            origins + '&destinations=' + destinations + '&key=' + GOOGLE_PLACES_KEY)
    return response.text


@app.route("/get-events")
def getEvents():
    origin = request.args['origin']
    nextLink = request.args.get('next')
    if (nextLink):
        response = requests.get(request.args['next'], headers={
                                'Authorization': 'Bearer ' + PREDICT_HQ_API_ACCESS_TOKEN})
    else:
        response = requests.get('https://api.predicthq.com/v1/events?location_around.origin=' +
                                origin, headers={'Authorization': 'Bearer ' + PREDICT_HQ_API_ACCESS_TOKEN})
    return response.text


@app.route("/get-event-details")
def getEventDetails():
    eventId = request.args['eventId']
    response = requests.get('https://api.predicthq.com/v1/events?id=' + eventId,
                            headers={'Authorization': 'Bearer ' + PREDICT_HQ_API_ACCESS_TOKEN})
    return response.text


@app.route("/get-weather")
def getWeather():
    query = request.args['query']
    response = requests.get('http://api.weatherstack.com/current?query=' +
                            query + '&access_key=' + WEATHER_STACK_API_KEY)
    return response.text


@app.route("/get-currency-symbols")
def getCurrencySymbols():
    response = requests.get(
        'http://data.fixer.io/api/symbols?&access_key=' + FIXER_API_KEY)
    return response.text


@app.route("/get-latest-rates")
def getLatestRates():
    response = requests.get(
        'http://data.fixer.io/api/latest?&access_key=' + FIXER_API_KEY)
    return response.text


@app.route("/get-places")
def getplaces():
    gmaps = googlemaps.Client(key=GOOGLE_PLACES_KEY)
    weather = 'sunny'
    temperature = 60
    if temperature > 75 and weather == 'sunny':
        rec = 'aquarium||night_club||park||zoo'
    elif temperature < 75 and temperature >= 65 and weather == 'sunny':
        rec = 'park||amusement_park||bowling_alley'
    elif temperature < 65 and temperature >= 45 and weather == 'sunny' or 'cloudy':
        rec = 'cafe||restaurant||bowling_alley||book_store'
    else:
        rec = 'bar||restaurant||museum'
    places_result = gmaps.places_nearby(
        location='40.732430, -73.886490', radius=40000, open_now=True, type=rec)
    #data = json.dumps(places_result)
    data = json.dumps(places_result['results'])
    return data


if __name__ == '__main__':
    from werkzeug.serving import run_simple
    run_simple('localhost', 9000, app)
