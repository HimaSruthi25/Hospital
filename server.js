const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const port = 3020;

const app = express();

app.use(cors({
    origin: '*',  // This allows all origins; for production, you might want to restrict this
  }));

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGO_URI ||'mongodb://127.0.0.1:27017/form');
const db = mongoose.connection
db.once('open', () => {
    console.log("Mongodb connection successful");
});

const userSchema = new mongoose.Schema({
    Name: String,
    AgeSex: String,
    Reason: String,
    MITRAL_VALVE: String,
    AORTIC_VALVE: String,
    TRICUSPID_VALVE: String,
    RIGHT_ATRIUM: String,
    RIGHT_VENTRICLE: String,
    LEFT_ATRIUM: String,
    LEFT_VENTRICLE: String,
    ED: String,
    ESD: String,
    IVSD: String,
    PWD: String,
    EF: String,
    FS: String,
    IAS: String,
    IVS: String,
    AORTA: String,
    PULMONARY_ARTERY: String,
    PERICARDIUM: String,
    INTRACARDIAC_MASSES: String,
    IVC: String,
    PULMONARY_VEINS: String,
    MR: Number,
    AR: Number,
    TR: Number,
    PR: Number,
    MITRAL: String,
    AORTIC: Number,
    PULMONARY: Number,
    TRICUSPID: Number,
    ECHO_FINAL_IMPRESSION: String
});

const Users = mongoose.model("data", userSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/index.html'));
});

app.post('/post', async (req, res) => {
    console.log("POST /post route hit");
    const { Name,Age_Sex,Reason,MITRAL_VALVE,AORTIC_VALVE,TRICUSPID_VALVE,RIGHT_ATRIUM,RIGHT_VENTRICLE,
        LEFT_ATRIUM,LEFT_VENTRICLE,ED,ESD,IVSD,PWD,EF,FS,IAS,IVS,AORTA,PULMONARY_ARTERY,PERICARDIUM,
        INTRACARDIAC_MASSES,IVC,PULMONARY_VEINS,MR,AR,TR,PR,MITRAL,AORTIC,PULMONARY,
        TRICUSPID,ECHO_FINAL_IMPRESSION} = req.body

        const user = new Users({
            Name,
            Age_Sex,
            Reason,
            MITRAL_VALVE,
            AORTIC_VALVE,
            TRICUSPID_VALVE,
            RIGHT_ATRIUM,
            RIGHT_VENTRICLE,
            LEFT_ATRIUM,
            LEFT_VENTRICLE,
            ED,
            ESD,
            IVSD,
            PWD,
            EF,
            FS,
            IAS,
            IVS,
            AORTA,
            PULMONARY_ARTERY,
            PERICARDIUM,
            INTRACARDIAC_MASSES,
            IVC,
            PULMONARY_VEINS,
            MR,
            AR,
            TR,
            PR,
            MITRAL,
            AORTIC,
            PULMONARY,
            TRICUSPID,
            ECHO_FINAL_IMPRESSION
        });
   try {
        // Save user data to the database
        await user.save();
        console.log(user);
        res.send("Form submission success");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});