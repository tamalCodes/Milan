//* All routes related to club's LOGIN AND REGISTER

const express = require("express");
const Club = require("../models/ClubsSchema");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Events = require("../models/EventsSchema");
var jwt = require("jsonwebtoken");

//* Route 1  - Club Registration

router.post("/register", async (req, res) => {
  const { name, email, password, address, pincode, description, tagLine } = req.body;

  if (!email || !password || !name || !address || !pincode || !description || !tagLine) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  Club.findOne({ email: email })
    .then((savedClub) => {
      if (savedClub) {
        return res.json({ exists: true });
      }

      bcrypt
        .hash(password, 12)

        .then((hashedpassword) => {
          const club = new Club({
            email,
            password: hashedpassword,
            name,
            address,
            pincode,
            description,
            tagLine
          });
          club
            .save()
            .then((club) => {
              return res.json({ success: true });
            })
            .catch((err) => {
              console.log(err);
            });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//* ---------------------------------------------------------------------------------------------------------------------------------------------
//* Route 2 - Club Login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const validEmail = await Club.findOne({ email });
    const validPassword = await bcrypt.compare(password, validEmail.password);

    const payload = { Club: { id: validEmail.email } };

    if (validPassword) {
      jwt.sign(payload, process.env.JWT_SECRET, (err, authToken) => {
        return res.json({ success: true, authToken, isuser: false });
      });
    } else {
      return res.json({ success: false });
    }
  } catch (e) {
    return res.json({ success: false });
  }
});

//* Route 3 - Create Event

router.post("/createevent", async (req, res) => {
  try {
    const { eventname, eventlocation, eventdate, eventdescription } = req.body;
    const eventData = Events({
      Eventname: eventname,
      Eventdate: eventdate,
      Eventlocation: eventlocation,
      Eventdescription: eventdescription,
    });
    await eventData.save();
    res.status(200).json(eventData);
  } catch (e) {
    console.log(`Error in creating a event: ${e}`);
  }
});
module.exports = router;
