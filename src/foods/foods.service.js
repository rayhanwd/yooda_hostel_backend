const Food = require('./foods.model');

module.exports.createFood = async function (food) {
    return Food.create(food);
};

module.exports.getFood = async function (PAGE_SIZE, PAGE_NUMBER, searchQuery) {
  const query = {};

  if (searchQuery) {
    query.name = { $regex: new RegExp(searchQuery, 'i') };
    PAGE_NUMBER = 0;
  }

  try {
    let total;
    let foods;

    if (searchQuery) {
      
      total = await Food.countDocuments(query);
      foods = await Food.find(query);
      if (total === 1) {
        return {
          total: 1,
          foods: foods,
        };
      } else {
        foods = await Food.find(query)
          .limit(PAGE_SIZE)
          .skip(PAGE_SIZE * PAGE_NUMBER);
        total = await Food.countDocuments(query);
      }
    } else {
      total = await Food.countDocuments();
      foods = await Food.find({})
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * PAGE_NUMBER);
    }

    return {
      total: Math.ceil(total / PAGE_SIZE),
      foods: foods,
    };
  } catch (error) {
    console.error("Error fetching food data:", error);
    return {
      total: 0,
      foods: [],
    };
  }
};


module.exports.getFoodById = async function (foodId) {
    return Food.findById(foodId);
};

module.exports.updateFoodById = async function (foodId, updatedFood) {
    return Food.findByIdAndUpdate(foodId, updatedFood, { new: true });
};

module.exports.deleteFoodById = async function (foodId) {
    return Food.findByIdAndDelete(foodId);
};