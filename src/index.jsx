import "./style.css";
import ReactDOM from "react-dom/client";
const root = ReactDOM.createRoot(document.querySelector("#root"));

import { useStore } from "./store/useStore";

import { loadCSVData } from "./utils.js";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./ui/theme.js";
import App from "./App";

// load database
Init();

root.render(
    <>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </>
);

async function Init() {
    const database = await loadCSVData(`./data/OMNIART_subsample.csv`, true);
    useStore.setState({ database: database, data: database });
}
