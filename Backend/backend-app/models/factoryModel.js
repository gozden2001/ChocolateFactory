const Location = require('./locationModel');

class Factory{
    constructor(id,name, workingHours, status, location, logoPath='', rating=0, managerId){
        this.id = id;
        this.name = name;
        this.workingHours = workingHours;
        this.status = status;
        this.location = location;
        this.logoPath = logoPath;
        this.rating = rating;
        this.managerId = managerId;
    }
}

module.exports = Factory;