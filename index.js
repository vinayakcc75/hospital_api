//const {Datastore} = require('@google-cloud/datastore');
var express=require("express");
var bodyParser=require('body-parser');
var http = require('http');
var app = express();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var server = http.createServer(app);
var session = require('express-session');
var cookieParser = require("cookie-parser");
var MySQLStore = require('express-mysql-session')(session);
var mysql=require('mysql');
var options = {
    host     : '35.202.224.91',
    user     : 'root',
    password : '1234',
    database : 'test',
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 86400000,
    connectTimeout: 3000000,
    createDatabaseTable: true,
    connectionLimit: 50,
    endConnectionOnClose: true,
    acquireTimeout: 20000,
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
                
var cors=require('cors');
app.use(cors());
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
app.post('/apppointments/cancel',cancel_appointmentsRouter.cancel_appointments);
app.post('/register',registerController.register);
app.post('/authenticate',authenticateController.authenticate);

app.post('/appointments',appointmentsRouter.appointments);
app.post('/reset_password',resetpassRouter.resetpass);
app.post('/forgot_password',forgotpassRouter.forgotpass);
app.put('/medical_records',medicalrecordsRouter.records);
app.post('/save_medical_records',save_medicalrecordsRouter.save_records);
app.put('/medical_records/particular',particular_recordRouter.particular_record);
app.get('/profile',profileRouter.profile);
app.put('/patient_records',patRecordsRouter.docrecords);

//app.get('/api/profile/edit',editprofileRouter.editprofile);
app.post('/profile/save_edit',save_editprofileRouter.save_editprofile);
app.get('/register/department',reg_departmentRouter.departments);
app.put('/department/doctor',view_doctorRouter.view_doctor);
app.post('/unavailable',unavailableRouter.unavailable);
app.post('/save_department',save_deptRouter.save_dept);
app.put('/appointments/time_available',time_availableRouter.time_available);
app.put('/appointments/date_available',date_availableRouter.date_available);
app.put('/doctor',doctor_appointmentsRouter.doctor_appointments);
app.put('/patient',patient_appointmentsRouter.patient_appointments);
//session destroy
app.get('/logout',function(req,res){
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