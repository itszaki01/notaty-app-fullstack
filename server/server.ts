import express, { Request } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { NotesPostRequest, NotesPutRequest } from "./types/Notes.type";
import { db } from "./Database";
import { Error } from "mongoose";
import Stripe from 'stripe'
import errorHandler, { idErrorHanlder } from "./helpers/errorHandler";
const stripe = new Stripe(process.env.VITE_STRIPE_SK as string);
const app = express();
//MiddleWares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//GetAllNotes API
app.get("/notes", async (req: Request<{}, {}, {}, { title: string }>, res) => {
    try {
        if (req.query.title) {
            const data = await db.getAllNotes({title:RegExp(req.query.title,'ig')});
            console.log(req.query);
            res.send(data);
        } else {
            const data = await db.getAllNotes();
            res.send(data);
        }
    } catch (error) {
        errorHandler(error as Error);
    }
});

//GetNoteByID API
app.get("/notes/:id", async (req: Request<{ id: string }>, res) => {
    const { id } = req.params;
    try {
        const data = await db.getNoteByID(id);
        if (!data) throw new Error(`ObjectId failed`);
        res.send(data);
    } catch (error) {
        idErrorHanlder(error as Error, id, res);
    }
});

//CreateNewPost API
app.post("/notes", async (req: NotesPostRequest, res) => {
    try {
        const doc = await db.addNote(req.body);
        res.send(doc);
    } catch (error) {
        errorHandler(error as Error);
    }
});

//UpdatePostById API
app.put("/notes", async (req: NotesPutRequest, res) => {
    try {
        const data = await db.updateNote(req.body);
        if (!data) throw new Error(`ObjectId failed`);
        res.send(data);
    } catch (error) {
        idErrorHanlder(error as Error, req.body._id, res);
    }
});

app.delete("/notes/:id", async (req: Request<{ id: string }>, res) => {
    try {
        const data = await db.deleteNote(req.params.id);
        if (!data) throw new Error(`ObjectId failed`);
        res.send(data);
    } catch (error) {
        idErrorHanlder(error as Error, req.params.id, res);
    }
});

app.post("/create-payment-intent", async (req, res) => {
    const { items, shipping, description } = req.body;
    
    const calculationOrderAmount = (items:any) => {
        let amount = 0;
        for (const item of items) {
            amount += item.price * item.quantity;
        }
        amount *= 100;
        return amount;
    };

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculationOrderAmount(items),
        currency: "usd",
        payment_method_types: ["card"],
        description,
        shipping: {
            address: {
                line1: shipping.line1,
                city: shipping.city,
                country: shipping.country,
                postal_code: shipping.postal_code,
            },
            name: shipping.name,
            phone: shipping.phone,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    })
});

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log("server is Running in port ", PORT);
    db.connect();
});
