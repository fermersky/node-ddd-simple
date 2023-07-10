import "reflect-metadata";
import "dotenv/config";

import { app } from "@api/http/routes";

app.listen(8000, () => console.log("server is running on port 8000 🚀"));
