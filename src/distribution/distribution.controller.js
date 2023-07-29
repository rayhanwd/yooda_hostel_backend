const Distribution = require('./distribution.model');
const Student = require('../students/students.model');

const createDistributionData = async (req, res) => {
  try {
    const { foodId, date } = req.body;

    // Validate date format
    const inputDate = new Date(date);
    if (isNaN(inputDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format. Please provide a valid date.' });
    }

    // Find all students
    const students = await Student.find({}, 'fullName');

    // Prepare distribution data for the specified date
    const distributionData = [];

    for (const student of students) {
      const newEntry = {
        date: inputDate,
        student: student._id,
        meal: [0, 0, 0],
        food: foodId || undefined,
      };
      distributionData.push(newEntry);
    }

    // Insert the distribution data into the Distribution table
    if (distributionData.length > 0) {
      await Distribution.insertMany(distributionData);
    }

    // Return the created distribution data
    return res.status(200).json({ message: 'Distribution data created successfully', data: distributionData });
  } catch (error) {
    console.error('Error creating distribution data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getDistributionDataByDate = async (req, res) => {
  try {
    const { date } = req.body;
    console.log(req.body);
    const inputDate = new Date(date);
    if (isNaN(inputDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format. Please provide a valid date.' });
    }

    const distributionData = await Distribution.find({ date: inputDate })
      .populate('student', 'fullName')
      .populate('food', 'name');

    if (!distributionData || distributionData.length === 0) {
      return res.status(200).json({ error: 'No distribution data found for the specified date', data: [] });
    }

    // Return the distribution data for the specified date
    return res.status(200).json({ data: distributionData });
  } catch (error) {
    console.error('Error getting distribution data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const searchDistributionDataByName = async (req, res) => {
  try {
    const { studentName } = req.body;

    const student = await Student.findOne({ fullName: studentName });
    if (!student) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    const distributionData = await Distribution.find({ student: student._id })
      .populate('food', 'name');

    if (!distributionData || distributionData.length === 0) {
      return res.status(404).json({ error: 'No distribution data found for the specified student.' });
    }

    return res.status(200).json({ data: distributionData });
  } catch (error) {
    console.error('Error searching distribution data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const searchDistributionDataByDate = async (req, res) => {
  try {
    const { date } = req.body;
    const inputDate = new Date(date);
    if (isNaN(inputDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format. Please provide a valid date.' });
    }


    const distributionData = await Distribution.find({ date: inputDate })
      .populate('food', 'name');

    if (!distributionData || distributionData.length === 0) {
      return res.status(404).json({ error: 'No distribution data found for the specified date.' });
    }
    return res.status(200).json({ data: distributionData });
  } catch (error) {
    console.error('Error searching distribution data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  createDistributionData,
  getDistributionDataByDate,
  searchDistributionDataByName,
  searchDistributionDataByDate
};
