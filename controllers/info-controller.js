const express = require("express");
const router = express.Router();
const {file, user} = require('../models');

router.post("/createFile", async (req, res) => {
    console.log(req);
    console.log(req.body)
    try {
        const newFile = await file.create(req.body);
        res.status(201).json(newFile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
    }
);

router.post("/updateFile", async (req, res) => {
    console.log(req);
    console.log(req.body)
    try {
        const updateFile = await file.findByIdAndUpdate(
            { "_id" : req.body.id },
            req.body,
            { new: true }
        );
        res.status(201).json(updateFile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
    }
);

router.post("/deleteFile", async (req, res) => {
    try {
        const deleteFile = await file.findByIdAndDelete(
            {"_id": req.body.id },
            req.body,
           { new: true } 
        );
        res.status(201).json(deleteFile);

    } catch (err) {
        res.status(400).json({ error: err.message})
    }
})

router.post("/addDate", async (req, res) => {
    try {
        const dateFile = await file.findById(req.body.id, 'date').exec();
        let datesArr = dateFile.date;
        datesArr.push(req.body.dates);
        const updateDate = await file.findByIdAndUpdate(
            { "_id" : req.body.id },
            { 
                "relationship": dateFile.relationship,
                "title": dateFile.title,
                dates: datesArr
            },
            { new: true }
        );
        res.status(201).json(updateDate);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
    }
);

router.get("/getAllUserFiles", async (req, res) => {
    try {
        console.log("a")
        const allFiles = await file.find({});
        console.log(allFiles)
        res.status(200).json(allFiles);
    } catch (err) {
        res.status(400).json({ error: err });

    }
});

router.post("/getFiles", async (req, res) => {
    try{
        const userFiles = await file.find({ userid: req.body.userid }).exec();
        res.status(200).json(userFiles);
    } catch (err) {
        res.status(400).json({ error: err })
    }
});
// router.get("/:id", async (req, res) => {
//     try {
//         console.log("a")
//         const oneFile = await file.findById({});
//         console.log(oneFile)
//         res.status(200).json(oneFile);
//     } catch (err) {
//         res.status(400).json({ error: err });

//     }
// });

router.post("/createFile", async (req, res) => {
    console.log(req);
    console.log(req.body)
    try {
        const newFiles = await file.create(req.body);
        res.status(201).json(newFiles);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
    }
);

// router.put("/:id", async (req, res) => {
//     try{
//         const updatedFiles = await file.findyByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true }
//         );
//         res.status(200).json(updatedFiles);
//     }catch (err) {
//         res.status(400).json({ error: err});
//     }
//     }
// );
// router.delete("/:id", async (req, res) => {
//     try {
//         const deletedFiles = await file.findByIdAndDelete(req.params.id);
//         res.status(200).json(deletedFiles);
//     } catch (err) {
//             res.status(400).json({ error: err})
//         }
//     })

    module.exports = router;
