const db = require ('../models');

class LocationService {
  static async getAllLocations() {
    try {
      return await db.Location.findAll({where: { parent_id: null }});
    } catch (error) {
      throw error;
    }
  }

  static async addLocation(newLocation) {
    try {
      return await db.Location.create(newLocation);
    } catch (error) {
      throw error;
    }
  }

  static async updateLocation(id, updateLocation) {
    try {
      const locationToUpdate = await db.Location.findOne({
        where: { id: Number(id) }
      });

      if (locationToUpdate) {
        await db.Location.update(updateLocation, { where: { id: Number(id) } });

        return updateLocation;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getSumOfSublocationsTotal(id) {
    try {
      await db.Location.findOne({
        where: { id: Number(id) }
      });
      let subLocationsTotal;
      await db.Location.sum('total', {where: { parent_id: Number(id) }}).then(sum => {
        subLocationsTotal=sum;
      });

      return subLocationsTotal;
    } catch (error) {
      throw error;
    }
  }


  static async getALocation(id) {
    try {
      const location = await db.Location.findOne({
        where: { id: Number(id) }
      });
      const subLocations = await db.Location.findAll({where: { parent_id: Number(id) }});

      let locationWithSubs = null;
      if(location!== null){
        locationWithSubs = {location, subLocations}
      }

      return locationWithSubs;
    } catch (error) {
      throw error;
    }
  }

  static async deleteLocation(id) {
    try {
      const locationToDelete = await db.Location.findOne({ where: { id: Number(id) } });

      if (locationToDelete) {
        const location = await db.Location.destroy({
          where: { id: Number(id) }
        });
        return location;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = LocationService;
