const LocationService = require('../services/LocationService');
const Util = require ('../utils/Utils');

const util = new Util();

class LocationController {
  static async getAllLocations(req, res) {
    try {
      const allLocations = await LocationService.getAllLocations();
      if (allLocations.length > 0) {
        util.setSuccess(200, 'Locations fetched', allLocations);
      } else {
        util.setSuccess(200, 'No Location found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addLocation(req, res) {
    if (!req.body.name || !req.body.males || !req.body.females) {
      util.setError(400, 'All fields are required');
      return util.send(res);
    }

    req.body["total"] = Number(req.body.males) + Number(req.body.females);
    const newLocation = req.body;
    if(req.body.parent_id) {
      try {
        const theLocation = await LocationService.getALocation(req.body.parent_id);
        if (!theLocation) {
          util.setError(404, `Cannot find parent Location with the id ${req.body.parent_id}`);
        } else {
          const subLocationsTotal = await LocationService.getSumOfSublocationsTotal(req.body.parent_id);
          if((subLocationsTotal+req.body["total"]) > theLocation.location.total) {
            util.setError(400, `Sum of the totals of sublocations cannot be greater than the total on the location`);
          }
          else {
            try {
              const createdLocation = await LocationService.addLocation(newLocation);
              util.setSuccess(201, 'Location Added!', createdLocation);
              return util.send(res);
            } catch (error) {
              util.setError(400, error.message);
              return util.send(res);
            }
          }
        }
        return util.send(res);
      } catch (error) {
        util.setError(404, error);
        return util.send(res);
      }
    }
    else {
      try {
          const createdLocation = await LocationService.addLocation(newLocation);
          util.setSuccess(201, 'Location Added!', createdLocation);
        return util.send(res);
      } catch (error) {
        util.setError(400, error.message);
        return util.send(res);
      }
    }
  }

  static async updatedLocation(req, res) {
    req.body["total"] = Number(req.body.males) + Number(req.body.females);
    const alteredLocation = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Invalid id');
      return util.send(res);
    }
    try {
      const updateLocation = await LocationService.updateLocation(id, alteredLocation);
      if (!updateLocation) {
        util.setError(404, `Cannot find Location with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Location updated', updateLocation);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getALocation(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Invalid id');
      return util.send(res);
    }

    try {
      const theLocation = await LocationService.getALocation(id);
      console.log(theLocation.location.total)

      if (!theLocation) {
        util.setError(404, `Cannot find Location with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Location', theLocation);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteLocation(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Invalid id');
      return util.send(res);
    }

    try {
      const LocationToDelete = await LocationService.deleteLocation(id);

      if (LocationToDelete) {
        util.setSuccess(200, 'Location deleted');
      } else {
        util.setError(404, `Location with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

module.exports = LocationController;
