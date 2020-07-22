//const {Datastore} = require('@google-cloud/datastore');
var express=require("express");
var bodyParser=require('body-parser');
var http = require('http');
var url = require('url');
var app = express();
var server = http.createServer(app);
var session = require('express-session');
var cookieParser = require("cookie-parser");
var MySQLStore = require('express-mysql-session')(session);
var mysql=require('mysql');
var options = {
    host: '35.200.193.123',
    user: 'sakshi',
    password: 'summer2020',
    database: 'test_db',
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 86400000,
    connectTimeout: 30000,
    createDatabaseTable: true,
    connectionLimit: 1,
    endConnectionOnClose: true,
    charset: 'utf8mb4_bin',
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data',
            
        }
    }

};
 
var connection = mysql.createConnection(options); // or mysql.createPool(options);
var sessionStore = new MySQLStore({}/* session store options */, connection);
var cors=require('cors');
app.use(cors());
function checkAuth (req, res, next) {
   console.log('checkAuth ' + req.url);// don't serve /secure to those not logged in
   if (req.url === '/secure' && (!req.session || !req.session.authenticated)) {
      res.render('unauthorised', { status: 403 });
      return;
   }next();
}

app.use(cookieParser());
app.use(session({secret:"smshi",
                store: sessionStore,
				saveUninitialized: true,
				resave: true}));

var cancel_appointmentsRouter=require('./controllers/cancel_appointments');
var doctor_appointmentsRouter=require('./controllers/view_doctor_appointments');
var patient_appointmentsRouter=require('./controllers/view_patient_appointments');
var authenticateController=require('./controllers/authenticate-controller');
var registerController=require('./controllers/register-controller');
var appointmentsRouter = require('./controllers/appointments');
var medicalrecordsRouter=require('./controllers/view_medical_record');
var medicalrecordsRouter=require('./controllers/view_medical_record');
var patRecordsRouter=require('./controllers/patient_records');

var save_medicalrecordsRouter=require('./controllers/save_medicalrecords');
var profileRouter=require('./controllers/profile');
var editprofileRouter=require('./controllers/edit_profile');
var save_editprofileRouter=require('./controllers/profile_save');
var reg_departmentRouter=require('./controllers/departments');
var forgotpassRouter = require('./controllers/forgot_password');
var resetpassRouter = require('./controllers/reset_password');
var unavailableRouter = require('./controllers/unavailable');
var save_deptRouter = require('./controllers/save_departments');
var particular_recordRouter = require('./controllers/particular_record');
var view_doctorRouter = require('./controllers/view_doctor');
var time_availableRouter = require('./controllers/time_available');
var date_availableRouter = require('./controllers/date_available');
app.get('/',(req,res)=>{
	res.json('It is working');
})
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//app.use(session({resave: true, saveUninitialized: true, secret: 'XCR3rsasa%RDHHH', cookie: { maxAge: 60000 }}));
app.post('/api/apppointments/cancel',cancel_appointmentsRouter.cancel_appointments);
app.post('/api/register',registerController.register);
app.post('/api/authenticate',authenticateController.authenticate);

app.post('/api/appointments',appointmentsRouter.appointments);
app.post('/api/reset_password',resetpassRouter.resetpass);
app.post('/api/forgot_password',forgotpassRouter.forgotpass);
app.put('/api/medical_records',medicalrecordsRouter.records);
app.post('/api/save_medical_records',save_medicalrecordsRouter.save_records);
app.put('/api/medical_records/particular',particular_recordRouter.particular_record);
app.get('/api/profile',profileRouter.profile);
app.put('/api/patient_records',patRecordsRouter.docrecords);

//app.get('/api/profile/edit',editprofileRouter.editprofile);
app.post('/api/profile/save_edit',save_editprofileRouter.save_editprofile);
app.get('/api/register/department',reg_departmentRouter.departments);
app.put('/api/department/doctor',view_doctorRouter.view_doctor);
app.post('/api/unavailable',unavailableRouter.unavailable);
app.post('/api/save_department',save_deptRouter.save_dept);
app.put('/api/appointments/time_available',time_availableRouter.time_available);
app.put('/api/appointments/date_available',date_availableRouter.date_available);
app.put('/api/doctor',doctor_appointmentsRouter.doctor_appointments);
app.put('/api/patient',patient_appointmentsRouter.patient_appointments);
//session destroy
app.get('/api/logout',function(req,res){
    sessionData = req.session;
    sessionData.destroy(function(err) {
        if(err){
            msg = 'Error destroying session';
            res.json(msg);
        }else{
            msg = 'Session destroy successfully';
            console.log(msg)
            res.json(msg);
        }
    });
});


//module.exports=app;
app.listen(process.env.PORT||8080,console.log(`Running on ${process.env.PORT}`));