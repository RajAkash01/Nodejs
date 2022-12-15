const mongoose = require('mongoose');
const LeadData = new mongoose.Schema({
  Lead: {
    type: String,
    required: true,
  },
});

mongoose.model('LeadData', LeadData);
