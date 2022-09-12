const express = require('express');
const router = express.Router();
const axios = require('axios');

// Route to get data from public API - City Bikes
router.get('/getData', async  (req, res) => {
    const {data} = await axios.get("http://api.citybik.es/v2/networks");
    res.send(data.networks);
});

// Route to get total number of data fetched
router.get('/getDataLength', async (req, res) => {
    const {data} = await axios.get("http://api.citybik.es/v2/networks");
    res.status(200).json({
        statusCode: res.statusCode,
        message: "Length of total data available in JSON!",
        result: data.networks.length
    });
});

// Route to get all the bike names
router.get('/getBikeNames', async (req, res) => {
    const {data} = await axios.get("http://api.citybik.es/v2/networks");
    let bikes =data.networks;
    let bikeNames = bikes.map(obj => {
        return obj.name;
    });
    // Filtering the list of all bikes name to appear only once
    const justifiedListofBikes = [...new Set(bikeNames)];
    res.status(200).json({
        statusCode: res.statusCode,
        message: "List of all Bike Names!",
        result: justifiedListofBikes
    });
});

// Route to find details by Company Name
router.get('/getDatabyCompanyName/:companyName', async (req, res) => {
    const {data} = await axios.get("https://api.citybik.es/v2/networks");
    let bikes = data.networks;
    // Filter data as per company name
    const filteredBikes = bikes.filter(obj => {
        if(obj.company != null){
            return obj.company[0] === req.params.companyName;
        }
    });
    res.status(200).json({
        statusCode: res.statusCode,
        message: "Bikes as per company: " + req.params.companyName,
        result: filteredBikes
    });
});

// Route to find details by city/country
router.get('/getDataByCityOrCountry/:areaName', async (req, res) => {
    const {data} = await axios.get("https://api.citybik.es/v2/networks");
    const bikes = data.networks;
    // Filter data as per City or Country
    const filteredBikes = bikes.filter(obj => {
        if(obj.location.city != null || obj.location.country != null){
            return obj.location.city === req.params.areaName || obj.location.country === req.params.areaName;
        }
    });
    res.status(200).json({
        statusCode: res.statusCode,
        message: "Bike details of location: " + req.params.areaName,
        result: filteredBikes
    });
});

// Route to get details of stations of particular bike
router.get('/getStationDetails/:id', async (req, res) => {
    const {data} = await axios.get("https://api.citybik.es/v2/networks");
    let bikes = data.networks;
    // Finding no. of stations for a particular id
    const bike = bikes.filter(obj => {
        return obj.id === req.params.id;
    });
    // Get data from next API using href route in bike data
    const  bikeInfo = await axios.get("https://api.citybik.es" + bike[0].href);
    res.status(200).json({
        statusCode: res.statusCode,
        message: "Total no. of stations for bike with id: " + req.params.id,
        result: bikeInfo.data.network.stations.length
    });
});

// Route to get station coordinates from id and station name
router.get('/getStationCoordinates', async (req, res) => {
    const {data} = await axios.get('https://api.citybik.es/v2/networks');
    let bikes = data.networks;
    // Filter bike by id
    const bike = bikes.filter(obj => {
        return obj.id === req.query.id;
    });
    // Get data from next API using href route in bike data
    const  bikeInfo = await axios.get("https://api.citybik.es" + bike[0].href);
    let stations = bikeInfo.data.network.stations;
    // Get station coordinates using station id
    const coordinates = stations.filter(obj => {
        return obj.id === req.query.stationId;
    });
    if(coordinates[0]){
        res.status(200).json({
            statusCode: res.statusCode,
            message: "Coordinates for bike with Id - " + req.query.id + " and given station id",
            result: {
                latitude: coordinates[0].latitude,
                longitude: coordinates[0].longitude
            }
        });
    } else {
        res.status(404).json({
            statusCode: res.statusCode,
            message: "No station found with given id's"
        });
    }
});

// Route to find empty slots in all of the stations
router.get('/getEmptySlots', async (req, res) => {
    const {data} = await axios.get("https://api.citybik.es/v2/networks");
    let bikes = data.networks;
    const bike = bikes.filter(obj => {
        return obj.id === req.query.id;
    });
    // Get data from next API using href route in bike data
    const  bikeInfo = await axios.get("https://api.citybik.es" + bike[0].href);
    const stations = bikeInfo.data.network.stations;
    let emptySlots = 0;
    stations.map(obj => {
        return emptySlots += obj.empty_slots;
    });
    res.status(200).json({
        statusCode: res.statusCode,
        message: "Total empty slots found at " + stations.length + " no. of stations",
        result: emptySlots
    });
});



module.exports = router;