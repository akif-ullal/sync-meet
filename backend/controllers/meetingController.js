import Meeting from "../models/meeting.js";
import crypto from "crypto";


// CREATE MEETING
const createMeeting = async (req, res) => {
    try {

        const roomId = crypto.randomBytes(6).toString("hex");

        const meeting = await Meeting.create({
            roomId,
            host: req.user._id,
            participants: [req.user._id],
            startedAt: new Date()
        });

        res.status(201).json({
            message: "Meeting created",
            meeting
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const joinMeeting = async (req, res) => {
    try {

        const { roomId } = req.body;

        const meeting = await Meeting.findOne({ roomId });

        if (!meeting) {
            return res.status(404).json({
                message: "Meeting not found"
            });
        }

        // add user if not already present
        if (!meeting.participants.includes(req.user._id)) {
            meeting.participants.push(req.user._id);
            await meeting.save();
        }

        res.status(200).json({
            message: "Joined meeting",
            meeting
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



const endMeeting = async (req, res) => {

        try {

            const { roomId } =
                req.body;

            const meeting =
                await Meeting.findOne({
                    roomId
                });

            if (!meeting) {

                return res.status(404)
                    .json({
                        message:
                            "Meeting not found"
                    });
            }

            meeting.endedAt =
                new Date();

            await meeting.save();

            res.json({
                message:
                    "Meeting Ended",
                meeting
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message:
                    "Server Error"
            });
        }
    };

export {createMeeting,joinMeeting,endMeeting};