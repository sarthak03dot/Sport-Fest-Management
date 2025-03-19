const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const Event = require("../models/Event");
const Match = require("../models/Match");

const router = express.Router();

// Generate PDF Report for Event Results
router.get("/event-report/:eventId", async (req, res) => {
    const { eventId } = req.params;

    try {
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: "Event not found" });

        const matches = await Match.find({ eventId });

        const doc = new PDFDocument();
        const filePath = path.join(__dirname, `../../reports/${event.name}-Report.pdf`);
        const writeStream = fs.createWriteStream(filePath);

        doc.pipe(writeStream);

        // Title
        doc.fontSize(20).text(`Event Report: ${event.name}`, { align: "center" });
        doc.moveDown(2);

        // Matches Details
        matches.forEach((match, index) => {
            doc.fontSize(14).text(`Match ${index + 1}: ${match.teamA} vs ${match.teamB}`);
            doc.text(`Score: ${match.teamAScore} - ${match.teamBScore}`);
            doc.text(`Winner: ${match.winner || "Not Decided"}`);
            doc.moveDown(1);
        });

        doc.end();

        writeStream.on("finish", () => {
            res.download(filePath, `${event.name}-Report.pdf`);
        });

    } catch (error) {
        res.status(500).json({ message: "Error generating report" });
    }
});

module.exports = router;
