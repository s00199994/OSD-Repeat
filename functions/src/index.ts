import * as functions from "firebase-functions";

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const cors = require('cors')({ origin: true});

const db = admin.database().ref('/osd-repeat');

const getGunsFromDatabase = (res) => {
    let guns: any[] = [];
    return db.on(
        'value',
        (snapshot) => {
            snapshot.forEach(gun => {
                    guns.push({
                        $key: gun.$key,
                        ownerName: gun.ownerName,
                        make: gun.make,
                        type: gun.type,
                        address: gun.address,
                        emailAddress: gun.emailAddress,
                        phoneNumber: gun.phoneNumber,
                        logNumber: gun.phoneNumber,
                        serialNumber: gun.serialNumber,
                        dayStored: gun.dayStored
                    });
                });
                res.status(200).json(guns);
            },
            error => {
                res.status(error.code).json({
                    message: `Error: ${error.message}`
                }
            );
        }
    )
}

exports.addGun = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== 'POST') {
            return res.status(401).json({
                message: 'Not allowed'
            });
        }
        const ownerName = req.query.ownerName;
        const make = req.query.make;
        const type = req.query.type;
        const address = req.query.address;
        const emailAddress = req.query.emailAddress;
        const phoneNumber = req.query.phoneNumber;
        const logNumber = req.query.logNumber;
        const serialNumber = req.query.serialNumber;
        const dayStored = req.query.dayStored;

        db.push({ ownerName, make, type, address, emailAddress, phoneNumber, logNumber, serialNumber, dayStored });
        getGunsFromDatabase(res);
    })
})

exports.deleteGun = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if(req.method !== 'DELETE') {
            return res.status(401).json({
                message: 'Not allowed'
            })
        }
        const id = req.query.$key;
        db.child(id).remove();
        getGunsFromDatabase(res);
    })
})

exports.getGuns = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== 'GET') {
            return res.status(404).json({
                message: 'Not allowed'
            })
        }
        getGunsFromDatabase(res);
    })
})