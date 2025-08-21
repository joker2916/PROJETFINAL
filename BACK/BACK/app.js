const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/sensors", require("./routes/Sensor"));
app.use("/api/actuators", require("./routes/Actuator"));
app.use("/api/alerts", require("./routes/Alert"));
app.use("/api/users", require("./routes/User"));

/* Esp32 */
app.use("/api/esp32", require("./routes/Esp32"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
    console.log(`Serveur démarré sur le port ${PORT}`)
    //await initFirestore();
});

