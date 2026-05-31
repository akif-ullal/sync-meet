import mongoose from "mongoose";

const messageSchema =
    new mongoose.Schema({

        meetingId: {
            type: String
        },

        sender: {
            type: String
        },

        text: {
            type: String
        }

    }, {

        timestamps: true
    });


// TTL INDEX
messageSchema.index(
    {
        createdAt: 1
    },
    {
        expireAfterSeconds:
            60 * 60 * 24
    }
);

const Message =
    mongoose.model(
        "Message",
        messageSchema
    );

export default Message;