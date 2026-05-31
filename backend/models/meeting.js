import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
    {
        roomId: {
            type: String,
            required: true
        },

        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        startedAt: {
            type: Date,
            default: Date.now
        },

        endedAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting;