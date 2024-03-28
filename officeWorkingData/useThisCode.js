apiRoutes.post("/getAllNewGrievance", async function (req, res) {
    let empId = req.body.employeeId
    console.log(empId)
    sequelize.query(`select * from tickets
    cross join json_table(assignedEmails,'$[*]' columns(data json path '$.employeeId')) as j
    where j.data = '${empId}' AND status != 'Draft';`,
    {
        type: Sequelize.QueryTypes.SELECT
    }).then(teams => {
        res.status(200).send(teams)
    }), err => {
        res.status(400).send(err)
    }
  });




  apiRoutes.post('/getUserTeams', async function (req, res) {

    sequelize.query(`SELECT * from Teams WHERE JSON_CONTAINS(users, '${req.body.userId}', '$');`,
      {
        type: Sequelize.QueryTypes.SELECT
      }).then(resp => {
        res.send(resp)
      }, err => {
        res.status(400).send(err)
      })

  })


  apiRoutes.post('/getTeamsReporting', async function (req, res) {
    sequelize.query(`SELECT * from Teams WHERE JSON_CONTAINS(managers, '${req.body.userId}', '$');`,
      {
        type: Sequelize.QueryTypes.SELECT
      }).then(resp => {
        res.send(resp)
      }, err => {
        res.status(400).send(err)
      })
  })

  {
    "userId":138,
    "permissionName":"Dashboard",
    "employeeIdMiddleware":"344"
}

  [
    {
        "teamId": 106,
        "teamName": "Development (Hind)",
        "users": [
            396,
            352,
            389,
            394,
            295,
            353,
            358
        ],
        "managers": [
            138
        ]
    }
]



apiRoutes.post('/getUserTeams', async function (req, res) {

    sequelize.query(`SELECT managers from Teams WHERE JSON_CONTAINS(users, '${req.body.userId}', '$');`,
      {
        type: Sequelize.QueryTypes.SELECT
      }).then(resp => {
        res.send(resp)
      }, err => {
        res.status(400).send(err)
      })

  })

  [
    {
        "managers": [
            134,
            354,
            141
        ]
    },
    {
        "managers": [
            138
        ]
    }
]










module.exports = (Sequelize, Sequelize) => {
  const holidays = Sequelize.define(
    "holydays",
    {
      holydayEntryId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true,
        unique: true,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      event: {
        type: Sequelize.STRING(200),
      },
      dayOfWeek: {
        type: Sequelize.STRING(50),
      },
      holyday: {
        type: Sequelize.STRING(200),
      },
      applicableForTeam: {
        type: Sequelize.STRING(100),
      },
    },
    { timestamps: true }
  );
  holydays.sync();
  return holidays;
};



// -----------------------------------------------------------------------------------------------------------------------
leaves ...  [
  leave {
    dataValues: {
      leaveId: 1757,
      employeeId: 295,
      sdate: '2024-01-02',
      edate: '2024-01-02',
      leaveType: 'paid',
      days: '1',
      reason: 'Family reason.',
      certificate: 'None',
      status: 'Rejected',
      organisationId: 5,
      createdAt: 2024-01-02T12:33:38.000Z,
      updatedAt: 2024-01-02T16:46:41.000Z 
    },
    _previousDataValues: {
      leaveId: 1757,
      employeeId: 295,
      sdate: '2024-01-02',
      edate: '2024-01-02',
      leaveType: 'paid',
      days: '1',
      reason: 'Family reason.',
      certificate: 'None',
      status: 'Rejected',
      organisationId: 5,
      createdAt: 2024-01-02T12:33:38.000Z,
      updatedAt: 2024-01-02T16:46:41.000Z 
    },
    uniqno: 1,
    _changed: Set(0) {},
    _options: {
      isNewRecord: false,
      _schema: null,
      _schemaDelimiter: '',
      raw: true,
      attributes: [Array]
    },
    isNewRecord: false
  }
]
teamId... [ 88, 106 ]
holidays ...  [
  holidays {
    dataValues: {
      holidayId: 8,
      date: '2024-01-01',
      event: "New Year's Day",
      dayOfWeek: 'Monday',
      holidayType: 'OFF',
      forTeam: 'ALL Teams',
      applicableForTeam: [Array],
      createdAt: 2024-01-03T16:42:50.000Z,
      updatedAt: 2024-01-03T16:42:50.000Z
    },
    _previousDataValues: {
      holidayId: 8,
      date: '2024-01-01',
      event: "New Year's Day",
      dayOfWeek: 'Monday',
      holidayType: 'OFF',
      forTeam: 'ALL Teams',
      applicableForTeam: [Array],
      createdAt: 2024-01-03T16:42:50.000Z,
      updatedAt: 2024-01-03T16:42:50.000Z
    },
    uniqno: 1,
    _changed: Set(0) {},
    _options: {
      isNewRecord: false,
      _schema: null,
      _schemaDelimiter: '',
      raw: true,
      attributes: [Array]
    },
    isNewRecord: false
  }
]
currentDay ...  Sunday
currentDay ...  Monday
currentDate ...  2024-01-01
isLeavetaken ...  false
isHoliday ...  true
allocatedPerHr--- 0
currentDay ...  Tuesday
currentDate ...  2024-01-02
isLeavetaken ...  true
isHoliday ...  false
allocatedPerHr--- 0
currentDay ...  Wednesday
currentDate ...  2024-01-03
isLeavetaken ...  false
isHoliday ...  false
allocatedPerHr--- 9
currentDay ...  Thursday
currentDate ...  2024-01-04
isLeavetaken ...  false
isHoliday ...  false
allocatedPerHr--- 18
currentDay ...  Friday
currentDate ...  2024-01-05
isLeavetaken ...  false
isHoliday ...  false
allocatedPerHr--- 27
currentDay ...  Saturday




// apiRoutes.delete("/deleteData", async function (req, res) {
//   try {
//     const deletedRows = await donations.destroy({
//       where: {
//         paymentId: req.body.paymentId,
//       },
//     });
//     if (deletedRows === 0) {
//       return res.status(404).json({ error: "No data found" });
//     }
//     res.status(200).json({ message: "data deleted successfully", deletedRows });
//   } catch (error) {
//     console.error("Error deleting data:", error);
//     res.status(500).json({ error: "Failed to delete data" });
//   }
// });



apiRoutes.post("/deleteEvent", function (req, res) {
  const eventId = req.body.id;

  events
    .update({ isActive: 0 }, { where: { id: eventId } })
    .then((resp) => {
      //   sequelize
      //     .query(`UPDATE events SET isActive = 0 WHERE id = ${eventId}`).then((resp) => {
      //     res.status(200).send({ resp, msg: "Event successfully deleted." });
      //   },
      //   (error) => {
      //     res.status(401).send({ error });
      //   }
      // );
      const rowsAffected = resp[0];
      if (rowsAffected > 0) {
        res.status(200).send({ msg: "Event successfully deleted." });
      } else {
        res
          .status(404)
          .send({ error: "No event found with the specified ID." });
      }
    })
    .catch((error) => {
      console.error("Error deleting event:", error);
      res
        .status(500)
        .send({ error: "An error occurred while deleting the event." });
    });
});



apiRoutes.get('/getAllevents', async function (req, res) {
  try {
      const currentDate = new Date(); 

      // Step 1: Find events with a past end date
      const pastEvents = await events.findAll({
          where: {
              endDate: { [Op.lt]: currentDate }
          }
      });

      // Step 2: Update isActive field of past events to false
      if (pastEvents.length > 0) {
          const eventIdsToUpdate = pastEvents.map(event => event.id);
          await events.update(
              { isActive: false },
              { where: { id: eventIdsToUpdate } }
          );
      }

      // Step 3: Fetch all events
      const eventsData = await events.findAll();
      
      res.send(eventsData);
  } catch (error) {
      res.status(500).send({ status: 500, error: error.message });
  }
});



// Original date and time string in UTC
const originalDateTimeString = '2024-03-13 18:44:33';

// Parse the original date string as UTC
const originalDate = new Date(originalDateTimeString + ' UTC');

// Convert to IST (Indian Standard Time)
const istOptions = {
  timeZone: 'Asia/Kolkata',
  weekday: 'long', // To get the full name of the day
  year: 'numeric',
  month: 'long', // To get the full name of the month
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};

const istDateTimeString = originalDate.toLocaleString('en-IN', istOptions);
console.log(istDateTimeString); // Output: "Tuesday, 14 March 2024, 12:14:33 AM IST"

