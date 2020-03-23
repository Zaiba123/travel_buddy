import requests
from flask import Flask, request
from flask_cors import CORS

GOOGLE_PLACES_KEY=''
GOOGLE_CLIENT_ID=''
FIXER_API_KEY=''
PREDICT_HQ_API_ID=''
PREDICT_HQ_API_SECRET=''
PREDICT_HQ_API_ACCESS_TOKEN=''
WEATHER_STACK_API_KEY=''

app = Flask(__name__)
CORS(app)

@app.route("/get-coords")
def getCoords():
    address = request.args['address']
    response = requests.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + GOOGLE_PLACES_KEY )
    return response.text

@app.route("/get-distance")
def getDistance():
    origins = request.args['origins']
    destinations = request.args['destinations']
    response = requests.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + origins + '&destinations=' + destinations + '&key=' + GOOGLE_PLACES_KEY )
    return response.text

@app.route("/get-events")
def getEvents():
    origin = request.args['origin']
    nextLink = request.args.get('next')
    if (nextLink):
        response = requests.get(request.args['next'], headers={'Authorization': 'Bearer ' + PREDICT_HQ_API_ACCESS_TOKEN} )
    else:
        response = requests.get('https://api.predicthq.com/v1/events?location_around.origin=' + origin, headers={'Authorization': 'Bearer ' + PREDICT_HQ_API_ACCESS_TOKEN} )
    return response.text

@app.route("/get-event-details")
def getEventDetails():
    eventId = request.args['eventId']
    response = requests.get('https://api.predicthq.com/v1/events?id=' + eventId, headers={'Authorization': 'Bearer ' + PREDICT_HQ_API_ACCESS_TOKEN} )
    return response.text

@app.route("/get-weather")
def getWeather():
    query = request.args['query']
    response = requests.get('http://api.weatherstack.com/current?query=' + query + '&access_key=' + WEATHER_STACK_API_KEY )
    return response.text

@app.route("/get-currency-symbols")
def getCurrencySymbols():
    response = requests.get('http://data.fixer.io/api/symbols?&access_key=' + FIXER_API_KEY )
    return response.text

@app.route("/get-latest-rates")
def getLatestRates():
    response = requests.get('http://data.fixer.io/api/latest?&access_key=' + FIXER_API_KEY )
    return response.text

if __name__ == '__main__':
    from werkzeug.serving import run_simple
    run_simple('localhost', 9000, app)
