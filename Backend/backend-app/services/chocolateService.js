const Chocolate = require('../models/chocolateModel');
const ChocolateVarietyEnum = require('../models/chocolateVarietyEnum');
const ChocolateTypeEnum = require('../models/chocolateTypeEnum');
const path = require('path');
const fs = require('fs');

class ChocolateService {
    constructor() {
        this.filePath = path.join(__dirname, '../data/chocolates.json');
        this.chocolates = this.loadChocolates();
    }

    loadChocolates() {
        try {
            if (fs.existsSync(this.filePath)) {
                const data = fs.readFileSync(this.filePath, 'utf8');
                const chocolates = JSON.parse(data);
                return chocolates.map(chocolate => new Chocolate(
                    chocolate.id,
                    chocolate.name,
                    chocolate.price,
                    chocolate.chocolateType,
                    chocolate.factoryId,
                    chocolate.chocolateVariety,
                    chocolate.grams,
                    chocolate.description,
                    chocolate.picturePath,
                    chocolate.status,
                    chocolate.amount
                ));
            }
        } catch (err) {
            console.error('Error reading chocolates from file:', err);
        }
        return [
            new Chocolate(1, 'Magnum', 200, ChocolateTypeEnum.Normal, 1, ChocolateVarietyEnum.Raisins, 250, 'Milky and tasty goodness', '', 'unavailable', 0)
        ];
    }

    saveChocolates() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.chocolates, null, 2));
        } catch (err) {
            console.error('Error writing chocolates to file:', err);
        }
    }

    reduceChocolateAmount(chocolateId, quantity) {
        const chocolate = this.getChocolateById(chocolateId);
        if (chocolate) {
          chocolate.amount -= quantity;
          if (chocolate.amount < 0) {
            chocolate.amount = 0; // Ako količina ide ispod nule, postavi je na nulu
          }
          if(chocolate.amount === 0){
            chocolate.status = "unavailable";
            }else{
                chocolate.status = "available";
            }
          this.saveChocolates();
        } else {
          throw new Error('Chocolate not found');
        }
    }

    getAllChocolates() {
        return this.chocolates;
    }

    getChocolateByFactoryId(factoryId) {
        return this.chocolates.filter(chocolate => chocolate.factoryId === factoryId);
    }

    getChocolateById(id) {
        return this.chocolates.find(chocolate => chocolate.id === id);
    }

    deleteChocolateById(id) {
        const initialLength = this.chocolates.length;
        this.chocolates = this.chocolates.filter(chocolate => chocolate.id !== id);
        const chocolateDeleted = this.chocolates.length < initialLength;
        if (chocolateDeleted) {
            this.saveChocolates();
        }
        return chocolateDeleted;
    }

    addChocolate(name, price, chocolateType, factoryId, chocolateVariety, grams, description, picturePath = '', status = 'unavailable', amount = 0) {
        const maxId = this.chocolates.reduce((max, chocolate) => (chocolate.id > max ? chocolate.id : max), 0);
        const newId = maxId + 1;
        const newChocolate = new Chocolate(newId, name, price, chocolateType, factoryId, chocolateVariety, grams, description, picturePath, status, amount);
        this.chocolates.push(newChocolate);
        this.saveChocolates();
        return newChocolate;
    }

    updateChocolate(id, updatedChocolate) {
        const chocolate = this.chocolates.find(choc => choc.id === id);
        if (chocolate) {
            Object.assign(chocolate, updatedChocolate);
            this.saveChocolates();
            return chocolate;
        }
        return null;
    }

    updateChocolateAmount(id, amount) {
        const chocolate = this.chocolates.find(choc => choc.id === id);
        if (chocolate) {
            chocolate.amount = amount;
            if(chocolate.amount === 0){
                chocolate.status = "unavailable";
            }else{
                chocolate.status = "available";
            }
            this.saveChocolates();
            return chocolate;
        }
        return null;
    }
}

module.exports = new ChocolateService();
