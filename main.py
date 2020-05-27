import requests
from flask import Flask, request
from flask_cors import CORS
import googlemaps
import pprint
import time
import json
import os
from dotenv import load_dotenv
load_dotenv()

GOOGLE_PLACES_KEY = os.getenv('GOOGLE_PLACES')
GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT')
FIXER_API_KEY = os.getenv('FIXER_API')
PREDICT_HQ_API_ID = os.getenv('PREDICT_HQ_API')
PREDICT_HQ_API_SECRET = os.getenv('PREDICT_HQ_API_S')
PREDICT_HQ_API_ACCESS_TOKEN = os.getenv('PREDICT_HQ_API_ACCESS')
WEATHER_STACK_API_KEY = os.getenv('WEATHER_STACK_API')

app = Flask(__name__.split('.')[
            0], static_folder='../client/build/static', template_folder="../Front-End/build")
CORS(app)
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
                                origin + "&limit=200", headers={'Authorization': 'Bearer ' + PREDICT_HQ_API_ACCESS_TOKEN})
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


@app.route("/get-places", methods=['GET'])
def getplaces():
    gmaps = googlemaps.Client(key=GOOGLE_PLACES_KEY)
    weather = request.args.get("status")
    temperature = float(request.args.get("temperature"))
    latitude = request.args.get("lat")
    longitude = request.args.get("lon")
    cords = latitude+' , '+longitude
    print(temperature)
    if weather == 'thunderstorm' or 'snow' or 'shower rain':
        rec = 'bar||restaurant||cafe'
    elif temperature > 75 and weather == 'clear sky':
        rec = 'aquarium||night_club||park||zoo'
    elif temperature < 75 and temperature >= 65 and weather == 'clear sky':
        rec = 'park||amusement_park||bowling_alley'
    elif temperature < 65 and temperature >= 45 and weather == 'clear sky' or 'few clouds' or 'scattered clouds':
        rec = 'cafe||restaurant||bowling_alley||book_store'
    else:
        rec = 'bar||restaurant||museum'
    places_result = gmaps.places_nearby(
        location=cords, radius=40000, open_now=True, type=rec)
    #data = json.dumps(places_result)
    data = json.dumps(places_result['results'])
    return data


@app.route("/set-places", methods=['POST'])
def setPlaces():
    temp = request.json
    print(temp)
    return temp


if __name__ == '__main__':
    from werkzeug.serving import run_simple
    run_simple('localhost', 9000, app)
