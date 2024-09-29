const sequelize = require("./databases");
const {Op} = require("sequelize");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const interactCaracteristique = require("./databases/Interaction_user_caracteristique");
const interactCollection = require("./databases/Interaction_user_collection");
const interactCommunaute = require("./databases/Interaction_user_communaute");
const interactItem = require("./databases/Interaction_user_item");

const {collectionRouter} = require("./routes/collection");
const {categoryRouter} = require("./routes/category");
const {itemRouter} = require("./routes/item");
const {userRouter} = require("./routes/user");
const {imageRouter} = require("./routes/image");
const {achievementRouter} = require("./routes/achievement");
const {caracteristiqueRouter} = require("./routes/caracteristique");
const {communauteRouter} = require("./routes/communaute");
const {modelRouter} = require("./routes/model");
const {roleRouter} = require("./routes/role");
const {taskRouter} = require("./routes/task")
const {contentRouter} = require("./routes/content")

app.use("/content", contentRouter)
app.use("/task", taskRouter)
app.use("/role", roleRouter);
app.use("/model", modelRouter);
app.use("/communaute", communauteRouter);
app.use("/caracteristique", caracteristiqueRouter);
app.use("/achievement", achievementRouter);
app.use("/image", imageRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/item", itemRouter);
app.use("/collection", collectionRouter);

app.listen(8000,()=>{
    console.log("Serveur lancé sur localhost:8000")
});




