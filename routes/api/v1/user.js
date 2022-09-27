const express = require('express');
const router = express.Router();
const userApi = require('../../../controller/api/v1/user_api');


router.get('/session', userApi.session);


module.exports = router;