const router = require("express").Router();
const Events = require("../models/Events");

const validateData = (data) => {
    if (!data.title) {
        return "Validation error: title is required"
    } else if (data.title.length > 15 || data.title.length < 5) {
        return "Validation error: title should be between 5 to 15 characters"
    }

    if (!data.description) {
        return "Validation error: description is required"
    } else if (data.description.length > 30 || data.description.length < 10) {
        return "Validation error: description should be between 10 to 50 characters"
    }

    if (!data.location) {
        return "Validation error: location is required"
    } else if (data.location.length > 15 || data.location.length < 5) {
        return "Validation error: location should be between 5 to 15 characters"
    }

    if (!data.startTime) {
        return "Validation error: startTime is required"
    } else if (data.startTime.length > 20 || data.startTime.length < 5) {
        return "Validation error: startTime should be between 5 to 20 characters"
    }

    if (!data.endTime) {
        return "Validation error: endTime is required"
    } else if (data.endTime.length > 20 || data.endTime.length < 5) {
        return "Validation error: endTime should be between 5 to 20 characters"
    }

    return "";
}

router.get("/events", (req, res) => {
    Events.find().then(data => {
        res.status(200).json(data);
    })
});

router.get("/events/:id", (req, res) => {
    Events.findById(req.params.id).then(data => {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({
                error: "There is no event with that id"
            })
        }
    }).catch(err => {
        res.status(404).json({
            error: "There is no event with that id"
        })
    })
});

router.post("/events", async (req, res) => {
    const valid = await validateData(req.body);
    if (!valid) {
        const event = new Events(req.body)
        event.save().then(data => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(400).json(err);
        })
    } else {
        res.status(400).json({
            error: valid
        })
    }
});

router.put("/events/:id", async (req, res) => {
    Events.findById(req.params.id).then(async(data) => {
        if (data) {
            const valid = await validateData(req.body);
            if (!valid) {
                Events.findByIdAndUpdate(req.params.id, req.body).then(data => {
                    Events.findById(req.params.id).then(event => {
                        res.status(200).json(event);
                    })
                }).catch(err => {
                    res.status(400).json(err);
                })
            } else {
                res.status(400).json({
                    error: valid
                })
            }
        }
        else{
            res.status(404).json({
                error: "There is no event with that id"
            })
        }
    }).catch(err=>{
        res.status(404).json({
            error: "There is no event with that id"
        })
    })
});

router.delete("/events/:id", (req, res) => {
    Events.findByIdAndDelete(req.params.id).then(data => {
        res.status(204).json();
    }).catch(err => {
        res.status(204).json();
    })
});


module.exports = router;